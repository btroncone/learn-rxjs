# mergeMap

#### signature: `mergeMap(project: function: Observable, resultSelector: function: any, concurrent: number): Observable`

## Map to observable, emit values.

---

💡 flatMap is an alias for mergeMap!

💡 If only one inner subscription should be active at a time, try
[`switchMap`](switchmap.md)!

💡 If the order of emission and subscription of inner observables is important,
try [`concatMap`](concatmap.md)!

---

### Why use `mergeMap`?

This operator is best used when you wish to flatten an inner observable but want
to manually control the number of inner subscriptions.

For instance, when using [`switchMap`](switchmap.md) each inner subscription is
completed when the source emits, allowing only one active inner subscription. In
contrast, `mergeMap` allows for multiple inner subscriptions to be active at a
time. Because of this, one of the most common use-case for `mergeMap` is
requests that should not be canceled, think writes rather than reads. Note that
if order must be maintained [`concatMap`](concatmap.md) is a better option.

Be aware that because `mergeMap` maintains multiple active inner subscriptions
at once it's possible to create a memory leak through long-lived inner
subscriptions. A basic example would be if you were mapping to an observable
with an inner timer, or a stream of dom events. In these cases, if you still
wish to utilize `mergeMap` you may want to take advantage of another operator to
manage the completion of the inner subscription, think
[`take`](../filtering/take.md) or [`takeUntil`](../filtering/takeuntil.md). You
can also limit the number of active inner subscriptions at a time with the
`concurrent` parameter, seen in
[example 5](#example-5-mergemap-with-concurrent-value).

[![Ultimate RxJS](https://ultimatecourses.com/static/banners/banner-rxjs.svg 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: mergeMap simulating save of click locations

(
[StackBlitz](https://stackblitz.com/edit/rxjs-xfwdnl?file=index.ts&devtoolsheight=60)
)

```js
// RxJS v6+
import { fromEvent, of } from 'rxjs';
import { mergeMap, delay } from 'rxjs/operators';

// faking network request for save
const saveLocation = location => {
  return of(location).pipe(delay(500));
};
// streams
const click$ = fromEvent(document, 'click');

click$
  .pipe(
    mergeMap((e: MouseEvent) => {
      return saveLocation({
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      });
    })
  )
  // Saved! {x: 98, y: 170, ...}
  .subscribe(r => console.log('Saved!', r));
```

##### Example 2: mergeMap with ajax observable

(
[StackBlitz](https://stackblitz.com/edit/rxjs-wixf2a?file=index.ts&devtoolsheight=60)
)

```js
// RxJS v6+
import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mergeMap } from 'rxjs/operators';

// free api url
const API_URL = 'https://jsonplaceholder.typicode.com/todos/1';

// streams
const click$ = fromEvent(document, 'click');

click$
  .pipe(
    /*
     * Using mergeMap for example, but generally for GET requests
     * you will prefer switchMap.
     * Also, if you do not need the parameter like
     * below you could use mergeMapTo instead.
     * ex. mergeMapTo(ajax.getJSON(API_URL))
     */
    mergeMap(() => ajax.getJSON(API_URL))
  )
  // { userId: 1, id: 1, ...}
  .subscribe(console.log);
```

##### Example 3: mergeMap with promise (could also use [from](../creation/from.md) to convert to observable)

(
[StackBlitz](https://stackblitz.com/edit/typescript-pnnsrq?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

// helper to create promise
const myPromise = val =>
  new Promise(resolve => resolve(`${val} World From Promise!`));

// emit 'Hello'
const source$ = of('Hello');

// map to promise and emit result
source$
  .pipe(mergeMap(val => myPromise(val)))
  // output: 'Hello World From Promise'
  .subscribe(val => console.log(val));
```

##### Example 4: mergeMap with `resultSelector`

(
[StackBlitz](https://stackblitz.com/edit/typescript-9p6ws7?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

// helper to create promise
const myPromise = val =>
  new Promise(resolve => resolve(`${val} World From Promise!`));

// emit 'Hello'
const source$ = of('Hello');

source$
  .pipe(
    mergeMap(
      val => myPromise(val),
      /*
      you can also supply a second argument which receives the source value and emitted
      value of inner observable or promise
    */
      (valueFromSource, valueFromPromise) => {
        return `Source: ${valueFromSource}, Promise: ${valueFromPromise}`;
      }
    )
  )
  // output: "Source: Hello, Promise: Hello World From Promise!"
  .subscribe(val => console.log(val));
```

##### Example 5: mergeMap with concurrent value

(
[StackBlitz](https://stackblitz.com/edit/typescript-r3gcr4?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { interval } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

// emit value every 1s
const source$ = interval(1000);

source$
  .pipe(
    mergeMap(
      // project
      val => interval(5000).pipe(take(2)),
      // resultSelector
      (oVal, iVal, oIndex, iIndex) => [oIndex, oVal, iIndex, iVal],
      // concurrent
      2
    )
  )
  /*
		Output:
		[0, 0, 0, 0] <--1st inner observable
		[1, 1, 0, 0] <--2nd inner observable
		[0, 0, 1, 1] <--1st inner observable
		[1, 1, 1, 1] <--2nd inner observable
		[2, 2, 0, 0] <--3rd inner observable
		[3, 3, 0, 0] <--4th inner observable
*/
  .subscribe(val => console.log(val));
```

### Related Recipes

- [Breakout Game](../../recipes/breakout-game.md)
- [HTTP Polling](../../recipes/http-polling.md)
- [Save Indicator](../../recipes/save-indicator.md)
- [Swipe To Refresh](/recipes/swipe-to-refresh.md)

### Additional Resources

- [mergeMap](https://rxjs.dev/api/operators/mergeMap) 📰 - Official docs
- [mergeMap](https://indepth.dev/reference/rxjs/operators/merge-map) - In Depth Dev Reference
- [map vs flatMap](https://egghead.io/lessons/rxjs-rxjs-map-vs-flatmap) 🎥 💵 -
  Ben Lesh
- [Async requests and responses in RxJS](https://egghead.io/lessons/rxjs-04-reactive-programming-async-requests-and-responses-in-rxjs)
  🎥 💵 - André Staltz
- [Use RxJS mergeMap to map and merge higher order observables](https://egghead.io/lessons/rxjs-use-rxjs-mergemap-to-map-and-merge-high-order-observables?course=use-higher-order-observables-in-rxjs-effectively)
  🎥 💵 - André Staltz
- [Use RxJS mergeMap for fine grain custom behavior](https://egghead.io/lessons/rxjs-use-rxjs-mergemap-for-fine-grain-custom-behavior?course=use-higher-order-observables-in-rxjs-effectively)
  🎥 💵 - André Staltz
- [Build your own mergeMap operator](https://blog.strongbrew.io/build-the-operators-from-rxjs-from-scratch/?lectureId=mergeMap#app)
  🎥 - Kwinten Pisman

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/mergeMap.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/mergeMap.ts)
