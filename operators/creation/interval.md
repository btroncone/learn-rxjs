# interval

#### signature: `interval(period: number, scheduler: Scheduler): Observable`

## Emit numbers in sequence based on provided timeframe.

<div class="ua-ad"><a href="https://ultimatecourses.com/?ref=76683_kee7y7vk"><img src="https://ultimatecourses.com/assets/img/banners/ultimate-angular-leader.svg" style="width:100%;max-width:100%"></a></div>

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

- [Catch The Dot Game](../../recipes/catch-the-dot-game.md)
- [Flappy Bird Game](../../recipes/flappy-bird-game.md)

### Additional Resources

- [interval](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-interval)
  :newspaper: - Official docs
- [Creation operators: interval and timer](https://egghead.io/lessons/rxjs-creation-operators-interval-and-timer?course=rxjs-beyond-the-basics-creating-observables-from-scratch)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/interval.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/interval.ts)
