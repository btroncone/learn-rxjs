# scan

#### signature: `scan(accumulator: function, seed: any): Observable`

## Reduce over time.

---

:bulb: You can create [Redux](http://redux.js.org)-like state management with
scan!

---

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs"><img src="https://ultimatecourses.com/assets/img/banners/rxjs-banner-desktop.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Sum over time

(
[StackBlitz](https://stackblitz.com/edit/typescript-ltcl9d?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { of } from 'rxjs';
import { scan } from 'rxjs/operators';

const source = of(1, 2, 3);
// basic scan example, sum over time starting with zero
const example = source.pipe(scan((acc, curr) => acc + curr, 0));
// log accumulated values
// output: 1,3,6
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Accumulating an object

(
[StackBlitz](https://stackblitz.com/edit/typescript-vu63kz?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/fusunoguqu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/36rbu38b/) )

```js
// RxJS v6+
import { Subject } from 'rxjs';
import { scan } from 'rxjs/operators';

const subject = new Subject();
//scan example building an object over time
const example = subject.pipe(
  scan((acc, curr) => Object.assign({}, acc, curr), {})
);
//log accumulated values
const subscribe = example.subscribe(val =>
  console.log('Accumulated object:', val)
);
//next values into subject, adding properties to object
// {name: 'Joe'}
subject.next({ name: 'Joe' });
// {name: 'Joe', age: 30}
subject.next({ age: 30 });
// {name: 'Joe', age: 30, favoriteLanguage: 'JavaScript'}
subject.next({ favoriteLanguage: 'JavaScript' });
```

##### Example 3: Emitting random values from the accumulated array.

(
[StackBlitz](https://stackblitz.com/edit/typescript-lb8aw9?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { interval } from 'rxjs';
import { scan, map, distinctUntilChanged } from 'rxjs/operators';

// Accumulate values in an array, emit random values from this array.
const scanObs = interval(1000)
  .pipe(
    scan((a, c) => [...a, c], []),
    map(r => r[Math.floor(Math.random() * r.length)]),
    distinctUntilChanged()
  )
  .subscribe(console.log);
```

##### Example 4: Accumulating http responses over time

(
[StackBlitz](https://stackblitz.com/edit/rxjs-scan-accumulate-request-responses?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { interval, of } from 'rxjs';
import { scan, delay, repeat, mergeMap } from 'rxjs/operators';

const fakeRequest = of('response').pipe(delay(2000));

// output:
// ['response'],
// ['response','response'],
// ['response','response','response'],
// etc...

interval(1000)
  .pipe(
    mergeMap(_ => fakeRequest),
    scan<string>((all, current) => [...all, current], [])
  )
  .subscribe(console.log);
```

### Related Recipes

- [Alphabet Invasion Game](../../recipes/alphabet-invasion-game.md)
- [Battleship Game](../../recipes/battleship-game.md)
- [Breakout Game](../../recipes/breakout-game.md)
- [Car Racing Game](../../recipes/car-racing-game.md)
- [Catch The Dot Game](../../recipes/catch-the-dot-game.md)
- [Click Ninja Game](../../recipes/click-ninja-game.md)
- [Flappy Bird Game](../../recipes/flappy-bird-game.md)
- [Matrix Digital Rain](../../recipes/matrix-digital-rain.md)
- [Memory Game](../../recipes/memory-game.md)
- [Platform Jumper Game](../../recipes/platform-jumper-game.md)
- [Progress Bar](../../recipes/progressbar.md)
- [Smart Counter](../../recipes/smartcounter.md)
- [Space Invaders Game](../../recipes/space-invaders-game.md)
- [Stop Watch](../../recipes/stop-watch.md)
- [Tank Battle Game](../../recipes/tank-battle-game.md)
- [Tetris Game](../../recipes/tetris-game.md)

### Additional Resources

- [scan](https://rxjs.dev/api/operators/scan)
  :newspaper: - Official docs
- [Aggregating streams with reduce and scan using RxJS](https://egghead.io/lessons/rxjs-aggregating-streams-with-reduce-and-scan-using-rxjs)
  :video_camera: - Ben Lesh
- [Updating data with scan](https://egghead.io/lessons/rxjs-updating-data-with-scan?course=step-by-step-async-javascript-with-rxjs)
  :video_camera: :dollar: - John Linquist
- [Transformation operator: scan](https://egghead.io/lessons/rxjs-transformation-operator-scan?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz
- [Build your own scan operator](https://blog.strongbrew.io/build-the-operators-from-rxjs-from-scratch/?lectureId=scan#app)
  :video_camera: - Kwinten Pisman

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/scan.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/scan.ts)
