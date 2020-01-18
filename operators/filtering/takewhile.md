# takeWhile

#### signature: `takeWhile(predicate: function(value, index): boolean, inclusive?: boolean): Observable`

## Emit values until provided expression is false.

---

💡 When the optional `inclusive` parameter is set to `true` it will also
emit the first item that didn't pass the predicate.

---

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX "Ultimate RxJS")](https://ultimatecourses.com/courses/rxjs?ref=4)

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
const source$ = of(1, 2, 3, 4, 5);

//allow values until value from source is greater than 4, then complete
source$
  .pipe(takeWhile(val => val <= 4))
   // log: 1,2,3,4
  .subscribe(val => console.log(val));
```

##### Example 2: (v6.4+) takeWhile with inclusive flag

(
[StackBlitz](https://stackblitz.com/edit/typescript-3bwfup?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6.4+
import { of } from 'rxjs';
import { takeWhile, filter } from 'rxjs/operators';

const source$ = of(1, 2, 3, 9);

source$
  // with inclusive flag, the value causing the predicate to return false will also be emitted
  .pipe(takeWhile(val => val <= 3, true))
  // log: 1, 2, 3, 9
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
const source$ = of(3, 3, 3, 9, 1, 4, 5, 8, 96, 3, 66, 3, 3, 3);

// allow values until value from source equals 3, then complete
source$
  .pipe(takeWhile(it => it === 3))
  // log: 3, 3, 3
  .subscribe(val => console.log('takeWhile', val));

source$
  .pipe(filter(it => it === 3))
  // log: 3, 3, 3, 3, 3, 3, 3
  .subscribe(val => console.log('filter', val));
```

### Related Recipes

- [Alphabet Invasion Game](../../recipes/alphabet-invasion-game.md)
- [Battleship Game](../../recipes/battleship-game.md)
- [Breakout Game](../../recipes/breakout-game.md)
- [Car Racing Game](../../recipes/car-racing-game.md)
- [Catch The Dot Game](../../recipes/catch-the-dot-game.md)
- [Click Ninja Game](../../recipes/click-ninja-game.md)
- [Flappy Bird Game](../../recipes/flappy-bird-game.md)
- [Mine Sweeper Game](../../recipes/mine-sweeper-game.md)
- [Platform Jumper Game](../../recipes/platform-jumper-game.md)
- [Smart Counter](../../recipes/smartcounter.md)
- [Swipe To Refresh](../../recipes/swipe-to-refresh.md)
- [Tetris Game](../../recipes/tetris-game.md)
- [Uncover Image Game](../../recipes/uncover-image-game.md)

### Additional Resources

- [takeWhile](https://rxjs-dev.firebaseapp.com/api/operators/takeWhile)
  :newspaper: - Official docs
- [Completing a stream with takeWhile](https://egghead.io/lessons/rxjs-completing-a-stream-with-takewhile?course=step-by-step-async-javascript-with-rxjs)
  🎥 💵 - John Linquist

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/takeWhile.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/takeWhile.ts)
