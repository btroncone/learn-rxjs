# Game Loop

_By [@barryrowe](https://twitter.com/barryrowe)_

This recipe demonstrates one way you might create a Game Loop as a combined set
of streams. The recipe is intended to highlight how you might re-think existing
problems with a reactive approach. In this recipe we provide the overall loop as
a stream of frames and their deltaTimes since the previous frames. Combined with
this is a stream of user inputs, and the current gameState, which we can use to
update our objects, and render to to the screen on each frame emission.



### Example Code

(
[StackBlitz](https://stackblitz.com/edit/rxjs-5-based-game-loop-jlhyfx?file=index.ts&devtoolsheight=50)
)

![Game Loop](https://drive.google.com/uc?export=view&id=1d4j8fx_b_NTT89VhYAqaqaff46oZaPms)

```js
import { BehaviorSubject, Observable, of, fromEvent } from 'rxjs';
import { buffer, bufferCount, expand, filter, map,  share, tap, withLatestFrom } from 'rxjs/operators';

import { IFrameData } from './frame.interface';
import { KeyUtil } from './keys.util';
import { clampMag, runBoundaryCheck, clampTo30FPS } from './game.util';

const boundaries = {
  left: 0,
  top: 0,
  bottom: 300,
  right: 400
};
const bounceRateChanges = {
  left: 1.1,
  top: 1.2,
  bottom: 1.3,
  right: 1.4
}
const baseObjectVelocity = {
  x: 30,
  y: 40,
  maxX: 250,
  maxY: 200
};

const gameArea: HTMLElement = document.getElementById('game');
const fps: HTMLElement = document.getElementById('fps');

/**
 * This is our core game loop logic. We update our objects and gameState here
 * each frame. The deltaTime passed in is in seconds, we are givent our current state,
 * and any inputStates. Returns the updated Game State
 */
const update = (deltaTime: number, state: any, inputState: any): any => {
  //console.log("Input State: ", inputState);
  if(state['objects'] === undefined) {
    state['objects'] = [
      {
        // Transformation Props
        x: 10, y: 10, width: 20, height: 30,
        // State Props
        isPaused: false, toggleColor: '#FF0000', color: '#000000',
        // Movement Props
        velocity: baseObjectVelocity
      },
      {
        // Transformation Props
        x: 200, y: 249, width: 50, height: 20,
        // State Props
        isPaused: false, toggleColor: '#00FF00', color: '#0000FF',
        // Movement Props
        velocity: {x: -baseObjectVelocity.x, y: 2*baseObjectVelocity.y} }
    ];
  } else {

    state['objects'].forEach((obj) => {
      // Process Inputs
      if (inputState['spacebar']) {
        obj.isPaused = !obj.isPaused;
        let newColor = obj.toggleColor;
        obj.toggleColor = obj.color;
        obj.color = newColor;
      }

      // Process GameLoop Updates
      if(!obj.isPaused) {

        // Apply Velocity Movements
        obj.x = obj.x += obj.velocity.x*deltaTime;
        obj.y = obj.y += obj.velocity.y*deltaTime;

        // Check if we exceeded our boundaries
        const didHit = runBoundaryCheck(obj, boundaries);
        // Handle boundary adjustments
        if(didHit){
          if(didHit === 'right' || didHit === 'left') {
            obj.velocity.x *= -bounceRateChanges[didHit];
          } else {
            obj.velocity.y *= -bounceRateChanges[didHit];
          }
        }
      }

      // Clamp Velocities in case our boundary bounces have gotten
      //  us going tooooo fast.
      obj.velocity.x = clampMag(obj.velocity.x, 0, baseObjectVelocity.maxX);
      obj.velocity.y = clampMag(obj.velocity.y, 0, baseObjectVelocity.maxY);
    });
  }

  return state;
}

/**
 * This is our rendering function. We take the given game state and render the items
 * based on their latest properties.
 */
const render = (state: any) => {
  const ctx: CanvasRenderingContext2D = (<HTMLCanvasElement>gameArea).getContext('2d');
  // Clear the canvas
  ctx.clearRect(0, 0, gameArea.clientWidth, gameArea.clientHeight);

  // Render all of our objects (simple rectangles for simplicity)
  state['objects'].forEach((obj) => {
    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
  });
};



/**
 * This function returns an observable that will emit the next frame once the
 * browser has returned an animation frame step. Given the previous frame it calculates
 * the delta time, and we also clamp it to 30FPS in case we get long frames.
 */
const calculateStep: (prevFrame: IFrameData) => Observable<IFrameData> = (prevFrame: IFrameData) => {
  return Observable.create((observer) => {

    requestAnimationFrame((frameStartTime) => {
      // Millis to seconds
      const deltaTime = prevFrame ? (frameStartTime - prevFrame.frameStartTime)/1000 : 0;
      observer.next({
        frameStartTime,
        deltaTime
      });
    })
  })
  .pipe(
    map(clampTo30FPS)
  )
};

// This is our core stream of frames. We use expand to recursively call the
//  `calculateStep` function above that will give us each new Frame based on the
//  window.requestAnimationFrame calls. Expand emits the value of the called functions
//  returned observable, as well as recursively calling the function with that same
//  emitted value. This works perfectly for calculating our frame steps because each step
//  needs to know the lastStepFrameTime to calculate the next. We also only want to request
//  a new frame once the currently requested frame has returned.
const frames$ = of(undefined)
  .pipe(
    expand((val) => calculateStep(val)),
    // Expand emits the first value provided to it, and in this
    //  case we just want to ignore the undefined input frame
    filter(frame => frame !== undefined),
    map((frame: IFrameData) => frame.deltaTime),
    share()
  )

// This is our core stream of keyDown input events. It emits an object like `{"spacebar": 32}`
//  each time a key is pressed down.
const keysDown$ = fromEvent(document, 'keydown')
  .pipe(
    map((event: KeyboardEvent) => {
      const name = KeyUtil.codeToKey(''+event.keyCode);
      if (name !== ''){
        let keyMap = {};
        keyMap[name] = event.code;
        return keyMap;
      } else {
        return undefined;
      }
    }),
    filter((keyMap) => keyMap !== undefined)
  );

// Here we buffer our keyDown stream until we get a new frame emission. This
//  gives us a set of all the keyDown events that have triggered since the previous
//  frame. We reduce these all down to a single dictionary of keys that were pressed.
const keysDownPerFrame$ = keysDown$
  .pipe(
    buffer(frames$),
    map((frames: Array<any>) => {
      return frames.reduce((acc, curr) => {
        return Object.assign(acc, curr);
      }, {});
    })
  );

// Since we will be updating our gamestate each frame we can use an Observable
//  to track that as a series of states with the latest emission being the current
//  state of our game.
const gameState$ = new BehaviorSubject({});

// This is where we run our game!
//  We subscribe to our frames$ stream to kick it off, and make sure to
//  combine in the latest emission from our inputs stream to get the data
//  we need do perform our gameState updates.
frames$
  .pipe(
    withLatestFrom(keysDownPerFrame$, gameState$),
    // HOMEWORK_OPPORTUNITY: Handle Key-up, and map to a true KeyState change object
    map(([deltaTime, keysDown, gameState]) => update(deltaTime, gameState, keysDown)),
    tap((gameState) => gameState$.next(gameState))

  )
  .subscribe((gameState) => {
    render(gameState);
  });


// Average every 10 Frames to calculate our FPS
frames$
  .pipe(
    bufferCount(10),
    map((frames) => {
      const total = frames
        .reduce((acc, curr) => {
          acc += curr;
          return acc;
        }, 0);

        return 1/(total/frames.length);
    })
  ).subscribe((avg) => {
    fps.innerHTML = Math.round(avg) + '';
  })
```

##### supporting js

- [game.util.ts](https://stackblitz.com/edit/rxjs-5-based-game-loop?file=game.util.ts)
- [keys.util.ts](https://stackblitz.com/edit/rxjs-5-based-game-loop?file=keys.util.ts)
- [frame.interface.ts](https://stackblitz.com/edit/rxjs-5-based-game-loop?file=frame.interface.ts)

##### html

```html
<canvas width="400px" height="300px" id="game"></canvas>
<div id="fps"></div>
<p class="instructions">
  Each time a block hits a wall, it gets faster. You can hit SPACE to pause the
  boxes. They will change colors to show they are paused.
</p>
```

### Operators Used

- [buffer](../operators/transformation/buffer.md)
- [bufferCount](../operators/transformation/bufferCount.md)
- [expand](../operators/transformation/expand.md)
- [filter](../operators/filtering/filter.md)
- [fromEvent](../operators/creation/fromevent.md)
- [map](../operators/transformation/map.md)
- [share](../operators/multicasting/share.md)
- [tap](../operators/utility/do.md)
- [withLatestFrom](../operators/transformation/withlatestfrom.md)
