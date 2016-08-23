# mergeMap
#### signature: `mergeMap(project: function: Observable, resultSelector: function: any, concurrent: number): Observable`

### Description

###### TL;DR: Map values from source to inner observable, merge output

The **mergeMap** operator takes a project function, subscribing to the returned observable and emitting the output.

__*For instance...*__

Suppose you are initiating an HTTP request, for the sake of example we can imagine a `makeRequest` method which <sup>1</sup>returns an observable.
The `mergeMap` operator will subscribe to this <sup>2</sup>observable, emitting the result to the outer subscriber. 


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

If a promise is returned from the provided function, `.then` will be called with the result emitted to the outer subscriber.

```js
Observable.of(url)
  /*
    Promises are also fine, the result will be emitted.
  */
  .mergeMap(makePromiseRequest)
```

Lastly, if an array or iterable is returned each item will be emitted in sequence. For instance:

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

<sup>1</sup> *This is an example of an Observable of Observables.*

<sup>2</sup> *This is referred to as the inner subscriber.*


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


### Additional Resources
* [mergeMap](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMap) :newspaper: - Official docs
* [map vs flatMap](https://egghead.io/lessons/rxjs-rxjs-map-vs-flatmap) :video_camera: - Ben Lesh
* [Async requests and responses in RxJS](https://egghead.io/lessons/rxjs-04-reactive-programming-async-requests-and-responses-in-rxjs) :video_camera: :dollar: - André Staltz

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/mergeMap.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/mergeMap.ts)
