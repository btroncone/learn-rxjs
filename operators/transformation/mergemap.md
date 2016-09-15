# mergeMap(project, resultSelector, concurrent)

### TL;DR:
Maps the source's emitted values to new observales.  These inner observables are then flatten with `mergeAll`.  They are then subscribed to and begin emission.

### Description
The `mergeMap` operator subscribes to observable returned from the `project` function, emitting all values emitted from this *inner* observable.  Each time the source emits a new value, the new observable is merged with preexisting ones and their emission are flatten into one continuous stream.  Unlike `switchMap`, many inner subscriptions can be maintained at a time.

An optional `resultSelector` function can also be supplied as a second parameter.  If provided, the function is invoked with the last emitted value of the source observable, inner observable, and the current index (count of emissions) of the inner and outer observable.

Because the source could continue to emits values while the inners observables are incomplete, there is a risk of overloading.  In this scenario, the `concurrent` argument is put to use.  This optional argument allows you to control the number of concurrent values being subscribed.

### Arguments

#### project : function(value: any, index: number): Observable | Array | Iterable
Invoked with the emitted value from the source observable, returning a new observable. The new observable will then be subscribed to and merge with any preexisting innber observables. Values from the merged observables will then be emitted in one continuous stream.

#### resultSelector? : function(outerValue: any, innerValue: any, outerIndex: number, innerIndex: number): any
The `resultSelector` is invoked with four values, the last emitted value from the source observable, the currently emitted value from the inner observable, and the index, or emission count for each of these observables. Because a new subscription is created on each emission from the source, the `innerIndex` will be reset each time a switch to a new observable occurs, on source emission. If a `resultSelector` function is provided, the result of this function will be emitted to subscribers of the `mergeMap` operator.

#### concurrent? : number
This is a number that restricts how many concurrent inner observables are being subscribed to at a time.  By default, this is inifite.  Because the source observable continues to emit, the values are being mapped to new inner observables.  Without any restriction, all of these inner observables would be subscribed to and emit concurrently.  This introduce a number of problems including confusion and overloading. `concurrent` puts a limit on how many are subscribed to at a time which would slow down and draw out the completion time.  As soon as one observable completes, the next will subscribed to and begin emission.

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

##### Example 3: mergeMap with projection function

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

##### Example 4: mergeMap with concurrent number

( [jsFiddle](https://jsfiddle.net/c0c7u60x/1/) )

```js
console.clear();

//Source emits 3 values at .3 second inbetween.
//Each values are mapped to a new observable.
//Inner observable emits at .1 second inbetween.
//Inner values are mapped to an array of values representing the value's state.
//Only two inner observable is subscribed to at a time.

const source = Rx.Observable.interval(300).take(3).do(val=>console.log(val));
//I added the do() here so that we could see that the source continued to emits value.
//These values are being mapped, but they are placed on a back log waiting to be subscribed to.
const example = source.mergeMap(
 (val => Rx.Observable.interval(100).take(5)), //project
  ((oVal, iVal, oIndex, iIndex) => [oIndex, oVal, iIndex, iVal] ), //resultSelector
  2 //concurrent
).subscribe(val => console.log(val));
```


### Additional Resources
* [mergeMap](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMap) :newspaper: - Official docs
* [map vs flatMap](https://egghead.io/lessons/rxjs-rxjs-map-vs-flatmap) :video_camera: - Ben Lesh
* [Async requests and responses in RxJS](https://egghead.io/lessons/rxjs-04-reactive-programming-async-requests-and-responses-in-rxjs) :video_camera: :dollar: - André Staltz

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/mergeMap.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/mergeMap.ts)
