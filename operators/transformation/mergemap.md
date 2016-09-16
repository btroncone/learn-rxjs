# mergeMap(project, resultSelector, concurrent)

### TL;DR:
Maps values from source to inner observable. Subscribes to inner observable(s), emitting the values emitted to subscriber.

### Description
The `mergeMap` operator subscribes to the observable returned from the `project` function, emitting all values emitted from this *inner* observable.  Each time the source emits a new value, the returned observable is merged with previous inner observables and their emissions flattened.  Unlike `switchMap`, multiple inner subscriptions can be maintained at a time. .

An optional `resultSelector` function can also be provided as a second parameter.  If provided, the function is invoked with the last emitted value of the source observable and inner observable, as well as the current index (count of emissions) of the inner and outer observable.


### Arguments

#### [project : function(value: any, index: number): Observable](#example-1-mergemap-with-observable)
Invoked with the emitted value from the source observable, returning a new observable. The returned observable will be subscribed to and merge with any preexisting inner observables. Values from the merged observables will then be emitted in one continuous stream.

#### [resultSelector? : function(outerValue: any, innerValue: any, outerIndex: number, innerIndex: number): any](#example-3-mergemap-with-resultselector)
The `resultSelector` is invoked with four values, the last emitted value from the source observable, the currently emitted value from the inner observable, and the index, or emission count for each of these observables. If a `resultSelector` function is provided, the result of this function will be emitted to subscribers of the `mergeMap` operator.

#### [concurrent? : number](#example-4-mergemap-with-concurrent-value)
This restricts the number of inner observables subscribed to at one time.  By default, this is infinite. As soon as one observable completes, the next subscription will occur.

### Walkthrough

Suppose you are initiating an HTTP request, for the sake of example we can imagine a `makeRequest` method which returns an observable.
The `mergeMap` operator will subscribe to this observable, emitting the result to the outer subscriber: 

```js
Observable.of(url)
 /*
    The observable returned from the makeRequest method will be subscribed to, 
    creating an inner subscription.
    Values emitted from this inner observable will be emitted to the outer subscriber, 
    ie the next operator or subscribe function.
 */
  .mergeMap(makeRequest);
```

If a promise is returned from the provided function, `.then` will be called with the result emitted to the outer subscriber:

```js
Observable.of(url)
  /*
    Promises are also fine, the result will be emitted.
  */
  .mergeMap(makePromiseRequest)
```

Lastly, if an array or iterable is returned each item will be emitted in sequence:

```js
Observable.of([1,2,3])
  .mergeMap(arr => arr)
```

Will emit:

```bash
1
2
3
```

---
:bulb:  flatMap is an alias for mergeMap!

:bulb: If the order of emission and subscription of inner observables is important, try [`concatMap`](concatmap.md)!

---

### Examples

##### Example 1: mergeMap with observable

( [jsBin](http://jsbin.com/mojurubana/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/41awjgda/) )

```js
//emit 'Hello'
const source = Rx.Observable.of('Hello');
//map to inner observable and flatten
const example = source.mergeMap(val => Rx.Observable.of(`${val} World!`));
//output: 'Hello World!'
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: mergeMap with promise

( [jsBin](http://jsbin.com/vuhecorana/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/o9kxpvsv/) )

```js
//emit 'Hello'
const source = Rx.Observable.of('Hello');
//mergeMap also emits result of promise
const myPromise = val => new Promise(resolve => resolve(`${val} World From Promise!`));
//map to promise and emit result
const example = source.mergeMap(val => myPromise(val));
//output: 'Hello World From Promise'
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 3: mergeMap with `resultSelector`

( [jsBin](http://jsbin.com/wajokocage/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/zu9a6vr4/) )

```js
/*
  you can also supply a second argument which receives the source value and emitted
  value of inner observable or promise
*/
//emit 'Hello'
const source = Rx.Observable.of('Hello');
//mergeMap also emits result of promise
const myPromise = val => new Promise(resolve => resolve(`${val} World From Promise!`));
const example = source
  .mergeMap(val => myPromise(val), 
    (valueFromSource, valueFromPromise) => {
      return `Source: ${valueFromSource}, Promise: ${valueFromPromise}`;
});
//output: "Source: Hello, Promise: Hello World From Promise!"
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 4: mergeMap with concurrent value

( [jsBin](http://jsbin.com/qaqucuwise/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/2rmLxpyz/) )

```js
//emit value every 1s
const source = Rx.Observable.interval(1000);

const example = source.mergeMap(
	//project
	val => Rx.Observable.interval(5000).take(2),
  //resultSelector
  (oVal, iVal, oIndex, iIndex) => [oIndex, oVal, iIndex, iVal],
  //concurrent
  2 
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
* [mergeMap](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMap) :newspaper: - Official docs
* [map vs flatMap](https://egghead.io/lessons/rxjs-rxjs-map-vs-flatmap) :video_camera: - Ben Lesh
* [Async requests and responses in RxJS](https://egghead.io/lessons/rxjs-04-reactive-programming-async-requests-and-responses-in-rxjs) :video_camera: :dollar: - André Staltz

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/mergeMap.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/mergeMap.ts)
