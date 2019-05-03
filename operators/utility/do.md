# tap / do

#### signature: `tap(nextOrObserver: function, error: function, complete: function): Observable`

## Transparently perform actions or side-effects, such as logging.

---

:bulb: If you are using as a pipeable operator, `do` is known as `tap`!

---

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs"><img src="https://ultimatecourses.com/assets/img/banners/rxjs-banner-desktop.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Logging with tap

(
[StackBlitz](https://stackblitz.com/edit/typescript-cd2gjp?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/jimazuriva/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/qtyakorq/) )

```js
// RxJS v6+
import { of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

const source = of(1, 2, 3, 4, 5);
// transparently log values from source with 'tap'
const example = source.pipe(
  tap(val => console.log(`BEFORE MAP: ${val}`)),
  map(val => val + 10),
  tap(val => console.log(`AFTER MAP: ${val}`))
);

//'tap' does not transform values
//output: 11...12...13...14...15
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Using tap with object

(
[StackBlitz](https://stackblitz.com/edit/typescript-3xykpb?file=index.ts&devtoolsheight=100))

```js
// RxJS v6+
import { of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

const source = of(1, 2, 3, 4, 5);

// tap also accepts an object map to log next, error, and complete
const example = source
  .pipe(
    map(val => val + 10),
    tap({
      next: val => {
        // on next 11, etc.
        console.log('on next', val);
      },
      error: error => {
        console.log('on error', error.message);
      },
      complete: () => console.log('on complete')
    })
  )
  // output: 11, 12, 13, 14, 15
  .subscribe(val => console.log(val));
```

### Related Recipes

- [Breakout Game](../../recipes/breakout-game.md)
- [Catch The Dot Game](../../recipes/catch-the-dot-game.md)
- [Click Ninja Game](../../recipes/click-ninja-game.md)
- [Flappy Bird Game](../../recipes/flappy-bird-game.md)
- [Horizontal Scroll Indicator](../../recipes/horizontal-scroll-indicator.md)
- [Lockscreen](../../recipes/lockscreen.md)
- [Mine Sweeper Game](../../recipes/mine-sweeper-game.md)
- [Platform Jumper Game](../../recipes/platform-jumper-game.md)
- [Space Invaders Game](/recipes/space-invaders-game.md)
- [Swipe To Refresh](/recipes/swipe-to-refresh.md)
- [Tank Battle Game](../../recipes/tank-battle-game.md)
- [Tetris Game](../../recipes/tetris-game.md)
- [Type Ahead](../../recipes/type-ahead.md)

### Additional Resources

- [tap](https://rxjs.dev/api/operators/tap) :newspaper: - Official docs
- [Logging a stream with do](https://egghead.io/lessons/rxjs-logging-a-stream-with-do?course=step-by-step-async-javascript-with-rxjs)
  :video_camera: :dollar: - John Linquist
- [Utility operator: do](https://egghead.io/lessons/rxjs-utility-operator-do?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz
- [Build your own tap operator](https://blog.strongbrew.io/build-the-operators-from-rxjs-from-scratch/?lectureId=tap#app)
  :video_camera: - Kwinten Pisman

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/do.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/do.ts)
