# mergeMap

#### signature: `mergeMap(project: function: Observable, resultSelector: function: any, concurrent: number): Observable`

## Map to observable, emit values.

---

:bulb: flatMap is an alias for mergeMap!

:bulb: If only one inner subscription should be active at a time, try
[`switchMap`](switchmap.md)!

:bulb: If the order of emission and subscription of inner observables is
important, try [`concatMap`](concatmap.md)!

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
[example 4](#example-4-mergemap-with-concurrent-value).

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: mergeMap with observable

( [StackBlitz](https://stackblitz.com/edit/typescript-4mlj3e?file=index.ts&devtoolsheight=50) |
[jsBin](http://jsbin.com/mojurubana/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/41awjgda/) )

```js
import { of } from 'rxjs/observable/of';
import { mergeMap } from 'rxjs/operators';

//emit 'Hello'
const source = of('Hello');
//map to inner observable and flatten
const example = source.pipe(mergeMap(val => of(`${val} World!`)));
//output: 'Hello World!'
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: mergeMap with promise

( [StackBlitz](https://stackblitz.com/edit/typescript-cxgrtg?file=index.ts&devtoolsheight=50) |
[jsBin](http://jsbin.com/vuhecorana/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/o9kxpvsv/) )

```js
import { of } from 'rxjs/observable/of';
import { mergeMap } from 'rxjs/operators';

//emit 'Hello'
const source = of('Hello');
//mergeMap also emits result of promise
const myPromise = val =>
  new Promise(resolve => resolve(`${val} World From Promise!`));
//map to promise and emit result
const example = source.pipe(mergeMap(val => myPromise(val)));
//output: 'Hello World From Promise'
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 3: mergeMap with `resultSelector`

( [StackBlitz](https://stackblitz.com/edit/typescript-rlfc72?file=index.ts&devtoolsheight=50) |
[jsBin](http://jsbin.com/wajokocage/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/zu9a6vr4/) )

```js
import { of } from 'rxjs/observable/of';
import { mergeMap } from 'rxjs/operators';

/*
  you can also supply a second argument which receives the source value and emitted
  value of inner observable or promise
*/
//emit 'Hello'
const source = of('Hello');
//mergeMap also emits result of promise
const myPromise = val =>
  new Promise(resolve => resolve(`${val} World From Promise!`));
const example = source.pipe(
  mergeMap(
    val => myPromise(val),
    (valueFromSource, valueFromPromise) => {
      return `Source: ${valueFromSource}, Promise: ${valueFromPromise}`;
    }
  )
);
//output: "Source: Hello, Promise: Hello World From Promise!"
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 4: mergeMap with concurrent value

( [StackBlitz](https://stackblitz.com/edit/typescript-arsrsh?file=index.ts&devtoolsheight=50) |
[jsBin](http://jsbin.com/qaqucuwise/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/2rmLxpyz/) )

```js
import { interval } from 'rxjs/observable/interval';
import { mergeMap, take } from 'rxjs/operators';

//emit value every 1s
const source = interval(1000);

const example = source.pipe(
  mergeMap(
    //project
    val => interval(5000).pipe(take(2)),
    //resultSelector
    (oVal, iVal, oIndex, iIndex) => [oIndex, oVal, iIndex, iVal],
    //concurrent
    2
  )
);
/*
		Output:
		[0, 0, 0, 0] <--1st inner observable
		[1, 1, 0, 0] <--2nd inner observable
		[0, 0, 1, 1] <--1st inner observable
		[1, 1, 1, 1] <--2nd inner observable
		[2, 2, 0, 0] <--3rd inner observable
		[3, 3, 0, 0] <--4th inner observable
*/
const subscribe = example.subscribe(val => console.log(val));
```

### Additional Resources

* [mergeMap](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMap)
  :newspaper: - Official docs
* [map vs flatMap](https://egghead.io/lessons/rxjs-rxjs-map-vs-flatmap)
  :video_camera: :dollar: - Ben Lesh
* [Async requests and responses in RxJS](https://egghead.io/lessons/rxjs-04-reactive-programming-async-requests-and-responses-in-rxjs)
  :video_camera: :dollar: - André Staltz
* [Use RxJS mergeMap to map and merge higher order observables](https://egghead.io/lessons/rxjs-use-rxjs-mergemap-to-map-and-merge-high-order-observables?course=use-higher-order-observables-in-rxjs-effectively)
  :video_camera: :dollar: - André Staltz
* [Use RxJS mergeMap for fine grain custom behavior](https://egghead.io/lessons/rxjs-use-rxjs-mergemap-for-fine-grain-custom-behavior?course=use-higher-order-observables-in-rxjs-effectively)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/mergeMap.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/mergeMap.ts)
