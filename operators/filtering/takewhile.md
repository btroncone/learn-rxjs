# takeWhile

#### signature: `takeWhile(predicate: function(value, index): boolean, inclusive?: boolean): Observable`

## Emit values until provided expression is false.

---

:bulb: When optional `inclusive` parameter is set to `true` it will also emit the first item that didn't pass the predicate.

---

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/angular"><img src="https://ultimatecourses.com/assets/img/banners/ultimate-angular-leader.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Take values under limit

(
[StackBlitz](https://stackblitz.com/edit/typescript-af3hdf?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/zanefaqexu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/yakd4jgc/) )

```js
// RxJS v6+
import { of } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

//emit 1,2,3,4,5
const source = of(1, 2, 3, 4, 5);
//allow values until value from source is greater than 4, then complete
const example = source.pipe(takeWhile(val => val <= 4));
//output: 1,2,3,4
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: (v6.4+) takeWhile with inclusive flag

(
[StackBlitz](https://stackblitz.com/edit/typescript-3bwfup?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6.4+
import { of } from 'rxjs';
import { takeWhile, filter } from 'rxjs/operators';

const source = of(3, 3, 3, 9, 10);

source
  // with inclusive flag, the last value before complete will also be emitted
  .pipe(takeWhile(val => val === 3, true))
  // log: 3, 3, 3, 9
  .subscribe(console.log);
```

##### Example 3: Difference between `takeWhile` and [`filter`](filter.md)

(
[StackBlitz](https://stackblitz.com/edit/typescript-roozza?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/yatoqurewi/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/r497jgw3/4/) )

```js
// RxJS v6+
import { of } from 'rxjs';
import { takeWhile, filter } from 'rxjs/operators';

// emit 3, 3, 3, 9, 1, 4, 5, 8, 96, 3, 66, 3, 3, 3
const source = of(3, 3, 3, 9, 1, 4, 5, 8, 96, 3, 66, 3, 3, 3);

// allow values until value from source equals 3, then complete
// log: 3, 3, 3
source
  .pipe(takeWhile(it => it === 3))
  .subscribe(val => console.log('takeWhile', val));

// log: 3, 3, 3, 3, 3, 3, 3
source
  .pipe(filter(it => it === 3))
  .subscribe(val => console.log('filter', val));
```

### Related Recipes

- [Alphabet Invasion Game](../../recipes/alphabet-invasion-game.md)
- [Breakout Game](../../recipes/breakout-game.md)
- [Catch The Dot Game](../../recipes/catch-the-dot-game.md)
- [Click Ninja Game](../../recipes/click-ninja-game.md)
- [Flappy Bird Game](../../recipes/flappy-bird-game.md)
- [Mine Sweeper Game](../../recipes/mine-sweeper-game.md)
- [Platform Jumper Game](../../recipes/platform-jumper-game.md)
- [Smart Counter](../../recipes/smartcounter.md)
- [Swipe To Refresh](../../recipes/swipe-to-refresh.md)

### Additional Resources

- [takeWhile](https://rxjs-dev.firebaseapp.com/api/operators/takeWhile)
  :newspaper: - Official docs
- [Completing a stream with takeWhile](https://egghead.io/lessons/rxjs-completing-a-stream-with-takewhile?course=step-by-step-async-javascript-with-rxjs)
  :video_camera: :dollar: - John Linquist

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/takeWhile.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/takeWhile.ts)
