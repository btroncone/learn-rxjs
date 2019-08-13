# interval

#### signature: `interval(period: number, scheduler: Scheduler): Observable`

## Emit numbers in sequence based on provided timeframe.

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs"><img src="https://ultimatecourses.com/assets/img/banners/rxjs-banner-desktop.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Emit sequence of values at 1 second interval

(
[StackBlitz](https://stackblitz.com/edit/typescript-ohddud?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/vigohomabo/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/x3mrwzr0/) )

```js
// RxJS v6+
import { interval } from 'rxjs';

//emit value in sequence every 1 second
const source = interval(1000);
//output: 0,1,2,3,4,5....
const subscribe = source.subscribe(val => console.log(val));
```

### Related Recipes

- [Alphabet Invasion Game](../../recipes/alphabet-invasion-game.md)
- [Breakout Game](../../recipes/breakout-game.md)
- [Car Racing Game](../../recipes/car-racing-game.md)
- [Catch The Dot Game](../../recipes/catch-the-dot-game.md)
- [Flappy Bird Game](../../recipes/flappy-bird-game.md)
- [Matrix Digital Rain](../../recipes/matrix-digital-rain.md)
- [Memory Game](../../recipes/memory-game.md)
- [Platform Jumper Game](../../recipes/platform-jumper-game.md)
- [Space Invaders Game](../../recipes/space-invaders-game.md)
- [Stop Watch](../../recipes/stop-watch.md)
- [Tank Battle Game](../../recipes/tank-battle-game.md)
- [Tetris Game](../../recipes/tetris-game.md)

### Additional Resources

- [interval](https://rxjs.dev/api/index/function/interval)
  :newspaper: - Official docs
- [Creation operators: interval and timer](https://egghead.io/lessons/rxjs-creation-operators-interval-and-timer?course=rxjs-beyond-the-basics-creating-observables-from-scratch)
  :video_camera: :dollar: - André Staltz
- [Build your own interval operator](https://blog.strongbrew.io/build-the-operators-from-rxjs-from-scratch/?lectureId=interval#app)
  :video_camera: - Kwinten Pisman

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/interval.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/interval.ts)
