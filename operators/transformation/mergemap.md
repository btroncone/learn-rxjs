# mergeMap
#### signature: `mergeMap(project: function: Observable, resultSelector: function: any, concurrent: number): Observable`

## Map to observable, emit values.

---
:bulb:  flatMap is an alias for mergeMap!

:bulb: If only one inner subscription should be active at a time, try [`switchMap`](switchmap.md)!

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
* [map vs flatMap](https://egghead.io/lessons/rxjs-rxjs-map-vs-flatmap) :video_camera: :dollar: - Ben Lesh
* [Async requests and responses in RxJS](https://egghead.io/lessons/rxjs-04-reactive-programming-async-requests-and-responses-in-rxjs) :video_camera: :dollar: - André Staltz
* [Use RxJS mergeMap to map and merge higher order observables](https://egghead.io/lessons/rxjs-use-rxjs-mergemap-to-map-and-merge-high-order-observables?course=use-higher-order-observables-in-rxjs-effectively) :video_camera: :dollar: - André Staltz
* [Use RxJS mergeMap for fine grain custom behavior](https://egghead.io/lessons/rxjs-use-rxjs-mergemap-for-fine-grain-custom-behavior?course=use-higher-order-observables-in-rxjs-effectively) :video_camera: :dollar: - André Staltz

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/mergeMap.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/mergeMap.ts)
