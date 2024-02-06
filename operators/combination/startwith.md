# startWith

#### signature: `startWith(an: Values): Observable`

## Emit given value first.

---

💡 A
[BehaviorSubject](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/subjects/behaviorsubject.md)
can also start with an initial value!

---

### Why use startWith?
The `startWith` operator is a great tool when you need to provide an initial value to an observable sequence, ensuring that the consumer always receives a value upon subscription. It's a handy way to set a default state or value for your observables, making it easier for subscribers to handle the data and minimizing the chances of encountering unexpected scenarios.

A real-world example can be seen in a search functionality, where the search results should display a list of popular items as a default state before the user starts typing their query. By using startWith, you can seamlessly provide this default data to your subscribers.

Keep in mind that startWith emits the initial value immediately upon subscription. This behavior is helpful when you want to make sure your subscribers receive a value right away, even before the source observable starts emitting values.

[![Ultimate RxJS](https://ultimatecourses.com/static/banners/banner-rxjs.svg 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

(
[example tests](https://github.com/btroncone/learn-rxjs/blob/master/operators/specs/combination/startwith-spec.ts)
)

##### Example 1: startWith on number sequence

(
[StackBlitz](https://stackblitz.com/edit/typescript-2qrwjt?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/lezuravizu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/e8dn3ggp/) )

```js
// RxJS v6+
import { startWith } from 'rxjs/operators';
import { of } from 'rxjs';

//emit (1,2,3)
const source = of(1, 2, 3);
//start with 0
const example = source.pipe(startWith(0));
//output: 0,1,2,3
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: startWith for initial scan value

(
[StackBlitz](https://stackblitz.com/edit/typescript-8gkbsc?file=index.ts&devtoolsheight=100)
| | [jsBin](http://jsbin.com/gemevuzoha/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/54r3g83e/) )

```js
// RxJS v6+
import { startWith, scan } from 'rxjs/operators';
import { of } from 'rxjs';

//emit ('World!', 'Goodbye', 'World!')
const source = of('World!', 'Goodbye', 'World!');
//start with 'Hello', concat current string to previous
const example = source.pipe(
  startWith('Hello'),
  scan((acc, curr) => `${acc} ${curr}`)
);
/*
  output:
  "Hello"
  "Hello World!"
  "Hello World! Goodbye"
  "Hello World! Goodbye World!"
*/
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 3: startWith multiple values

(
[StackBlitz](https://stackblitz.com/edit/typescript-ek45ff?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/cumupemuxa/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/ckcyj3ms/) )

```js
// RxJS v6+
import { startWith } from 'rxjs/operators';
import { interval } from 'rxjs';

//emit values in sequence every 1s
const source = interval(1000);
//start with -3, -2, -1
const example = source.pipe(startWith(-3, -2, -1));
//output: -3, -2, -1, 0, 1, 2....
const subscribe = example.subscribe(val => console.log(val));
```

### Related Recipes

- [Alphabet Invasion Game](../../recipes/alphabet-invasion-game.md)
- [Breakout Game](../../recipes/breakout-game.md)
- [Car Racing Game](../../recipes/car-racing-game.md)
- [Platform Jumper Game](../../recipes/platform-jumper-game.md)
- [Smart Counter](../../recipes/smartcounter.md)
- [Space Invaders Game](../../recipes/space-invaders-game.md)
- [Stop Watch](../../recipes/stop-watch.md)
- [Tank Battle Game](../../recipes/tank-battle-game.md)
- [Tetris Game](../../recipes/tetris-game.md)
- [Uncover Image Game](../../recipes/uncover-image-game.md)

### Additional Resources

- [startWith](https://rxjs.dev/api/operators/startWith) 📰 - Official docs
- [Displaying initial data with startWith](https://egghead.io/lessons/rxjs-displaying-initial-data-with-startwith?course=step-by-step-async-javascript-with-rxjs)
  🎥 💵 - John Linquist
- [Clear data while loading with startWith](https://egghead.io/lessons/rxjs-reactive-programming-clear-data-while-loading-with-rxjs-startwith?course=introduction-to-reactive-programming)
  🎥 💵 - André Staltz
- [Combination operator: concat, startWith](https://egghead.io/lessons/rxjs-combination-operators-concat-startwith?course=rxjs-beyond-the-basics-operators-in-depth)
  🎥 💵 - André Staltz

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/startWith.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/startWith.ts)
