# delay

#### signature: `delay(delay: number | Date, scheduler: Scheduler): Observable`

## Delay emitted values by given time.

### Why use `delay`?

This operator is your go-to when simulating real-world scenarios such as network latency or introducing a pause before a value is emitted. The `delay` operator allows you to hold back values for a specified duration before they're released to subscribers. 

Keep in mind that **`delay` won’t prevent the original observable from emitting values**. It merely postpones the delivery to its subscribers. This is a _gotcha_ as it could look like your data is lagging or not in sync with the source, especially when multiple observables are at play.

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1qq2-q-eVe-F_-d0eSvTyqaGRjpfLDdJz 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: Delay to recognize long press

( [StackBlitz](https://stackblitz.com/edit/rxjs-bru5fi?devtoolsheight=60) )

```js
import { fromEvent, of } from 'rxjs';
import { mergeMap, delay, takeUntil } from 'rxjs/operators';

const mousedown$ = fromEvent(document, 'mousedown');
const mouseup$ = fromEvent(document, 'mouseup');

mousedown$
  .pipe(mergeMap(event => of(event).pipe(delay(700), takeUntil(mouseup$))))
  .subscribe(event => console.log('Long Press!', event));
```

##### Example 2: Delay for increasing durations

(
[StackBlitz](https://stackblitz.com/edit/typescript-twjn8r?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { of, merge } from 'rxjs';
import { mapTo, delay } from 'rxjs/operators';

//emit one item
const example = of(null);
//delay output of each by an extra second
const message = merge(
  example.pipe(mapTo('Hello')),
  example.pipe(mapTo('World!'), delay(1000)),
  example.pipe(mapTo('Goodbye'), delay(2000)),
  example.pipe(mapTo('World!'), delay(3000))
);
//output: 'Hello'...'World!'...'Goodbye'...'World!'
const subscribe = message.subscribe(val => console.log(val));
```

### Related Recipes

- [Battleship Game](../../recipes/battleship-game.md)
- [Progress Bar](../../recipes/progressbar.md)
- [Save Indicator](../../recipes/save-indicator.md)
- [Swipe To Refresh](/recipes/swipe-to-refresh.md)

### Additional Resources

- [delay](https://rxjs.dev/api/operators/delay) 📰 - Official docs
- [delay](https://indepth.dev/reference/rxjs/operators/delay) - In Depth Dev Reference
- [Transformation operator: delay and delayWhen](https://egghead.io/lessons/rxjs-transformation-operators-delay-and-delaywhen?course=rxjs-beyond-the-basics-operators-in-depth)
  🎥 💵 - André Staltz

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/delay.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/delay.ts)
