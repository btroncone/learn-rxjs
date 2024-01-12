# concat

#### signature: `concat(observables: ...*): Observable`

## Subscribe to observables in order as previous completes

---

💡 You can think of concat like a line at a ATM, the next transaction
(subscription) cannot start until the previous completes!

💡 If throughput, not order, is a primary concern, try [merge](merge.md)
instead!

---

### Why use `concat`?
The concat operator is best used when you need to combine multiple observables, but you want their emissions to be in a specific order, one after the other. It's like putting together a puzzle where the pieces must come together sequentially to create the full picture. An example of this can be seen in a real-world scenario, like downloading and displaying several images in the correct order, where you don't want the next image to load until the current one is fully loaded.

Keep in mind that concat will only start emitting values from the next observable once the previous one has completed. This means that if one of your observables never completes, the subsequent observables will never emit any values. This behavior can be a _gotcha_, as there will be no output and no error, but one (or more) of your inner observables might not be functioning as intended, or a subscription is not being set up correctly.

In contrast, if you need to combine observables that emit values concurrently, or you require the latest values from multiple observables whenever any of them emit a new value, [combineLatest](combinelatest.md) or [withLatestFrom](withlatestfrom.md) might be more suitable options.

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1qq2-q-eVe-F_-d0eSvTyqaGRjpfLDdJz 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: Basic concat usage with three observables

(
[StackBlitz](https://stackblitz.com/edit/typescript-ks8chl?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { of, concat } from 'rxjs';

concat(
  of(1, 2, 3),
  // subscribed after first completes
  of(4, 5, 6),
  // subscribed after second completes
  of(7, 8, 9)
)
  // log: 1, 2, 3, 4, 5, 6, 7, 8, 9
  .subscribe(console.log);
```

##### Example 2: Display message using concat with delayed observables

( [StackBlitz](https://stackblitz.com/edit/typescript-jtzuaa?file=index.ts) )

![Example 2](https://drive.google.com/uc?export=view&id=1fKsYUKXkSWEDLdii-5rmOAgqy6sUGNjl)

```js
// RxJS v6+
import { concat, empty } from 'rxjs';
import { delay, startWith } from 'rxjs/operators';

// elems
const userMessage = document.getElementById('message');
// helper
const delayedMessage = (message, delayedTime = 1000) => {
  return empty().pipe(startWith(message), delay(delayedTime));
};

concat(
  delayedMessage('Get Ready!'),
  delayedMessage(3),
  delayedMessage(2),
  delayedMessage(1),
  delayedMessage('Go!'),
  delayedMessage('', 2000)
).subscribe((message: any) => (userMessage.innerHTML = message));
```

##### Example 3: (Warning!) concat with source that does not complete

(
[StackBlitz](https://stackblitz.com/edit/typescript-njc2jw?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { interval, of, concat } from 'rxjs';

// when source never completes, any subsequent observables never run
concat(interval(1000), of('This', 'Never', 'Runs'))
  // log: 1,2,3,4.....
  .subscribe(console.log);
```

### Related Recipes

- [Battleship Game](../../recipes/battleship-game.md)
- [Save Indicator](../../recipes/save-indicator.md)

### Additional Resources

- [concat](https://rxjs.dev/api/index/function/concat) 📰 - Official docs
- [concat](https://web.archive.org/web/20230529215358/https://indepth.dev/reference/rxjs/operators/concat) - In Depth Dev Reference
- [Combination operator: concat, startWith](https://egghead.io/lessons/rxjs-combination-operators-concat-startwith?course=rxjs-beyond-the-basics-operators-in-depth)
  🎥 💵 - André Staltz

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/observable/concat.ts](https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/observable/concat.ts)
