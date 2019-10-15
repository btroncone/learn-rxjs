# fromEvent

#### signature: `fromEvent(target: EventTargetLike, eventName: string, selector: function): Observable`

## Turn event into observable sequence.

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs"><img src="https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Observable from mouse clicks

(
[StackBlitz](https://stackblitz.com/edit/typescript-mfyefr?file=index.ts&devtoolsheight=50)
| [jsBin](http://jsbin.com/xikapewoqa/1/edit?js,console,output) |
[jsFiddle](https://jsfiddle.net/btroncone/vbLz1pdx/) )

```js
// RxJS v6+
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

//create observable that emits click events
const source = fromEvent(document, 'click');
//map to string with given event timestamp
const example = source.pipe(map(event => `Event time: ${event.timeStamp}`));
//output (example): 'Event time: 7276.390000000001'
const subscribe = example.subscribe(val => console.log(val));
```

### Related Recipes

- [Alphabet Invasion Game](../../recipes/alphabet-invasion-game.md)
- [Breakout Game](../../recipes/breakout-game.md)
- [Car Racing Game](../../recipes/car-racing-game.md)
- [Catch The Dot Game](../../recipes/catch-the-dot-game.md)
- [Click Ninja Game](../../recipes/click-ninja-game.md)
- [Flappy Bird Game](../../recipes/flappy-bird-game.md)
- [Game Loop](../../recipes/gameloop.md)
- [Horizontal Scroll Indicator](../../recipes/horizontal-scroll-indicator.md)
- [HTTP Polling](../../recipes/http-polling.md)
- [Lockscreen](../../recipes/lockscreen.md)
- [Memory Game](../../recipes/memory-game.md)
- [Mine Sweeper Game](../../recipes/mine-sweeper-game.md)
- [Platform Jumper Game](../../recipes/platform-jumper-game.md)
- [Progress Bar](../../recipes/progressbar.md)
- [Save Indicator]('../../recipes/save-indicator.md)
- [Smart Counter](../../recipes/smartcounter.md)
- [Space Invaders Game](../../recipes/space-invaders-game.md)
- [Stop Watch](../../recipes/stop-watch.md)
- [Swipe To Refresh](../../recipes/swipe-to-refresh.md)
- [Tank Battle Game](../../recipes/tank-battle-game.md)
- [Tetris Game](../../recipes/tetris-game.md)
- [Type Ahead](../../recipes/type-ahead.md)

### Additional Resources

- [fromEvent](https://rxjs.dev/api/index/function/fromEvent)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/fromEvent.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/fromEvent.ts)
