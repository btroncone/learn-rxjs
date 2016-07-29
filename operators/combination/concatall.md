# concatAll
####signature: `concatAll(): Observable`

### Description

###### TL;DR: Concat for nested observables, subscribe to each when previous completes and merge emitted values

The **concatAll** operator behaves similarly to [concat](concat.md), subscribing to each emitted observable as the previous completes. Like other flattening operators, **concatAll** can also accept promises, emitting the result, or arrays and iterables, emitting as a sequence of values.

> :warning: Warning: Be wary of backpressure when the source emits at a faster pace than inner observables complete!

> :bulb: Tip: In many cases you can use [concatMap](../transformation/concatmap.md) as a single operator instead!

### Examples

##### Example 1: concatAll with observable

( [jsBin](http://jsbin.com/nakinenuva/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/8dfuf2y6/) )

```js
//emit a value every 2 seconds
const source = Rx.Observable.interval(2000);
const example = source
  //for demonstration, add 10 to and return as observable
  .map(val => Rx.Observable.of(val + 10))
  //merge values from inner observable
  .concatAll();
//output: 'Example with Basic Observable 0', 'Example with Basic Observable 2'...
const subscribe = example.subscribe(val => console.log('Example with Basic Observable:', val));
```

##### Example 2: concatAll with promise

( [jsBin](http://jsbin.com/bekegeyopu/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/w7kp7qLs/) )

```js
//create and resolve basic promise
const samplePromise = val => new Promise(resolve => resolve(val));
//emit a value every 2 seconds
const source = Rx.Observable.interval(2000);

const example = source
  .map(val => samplePromise(val))
  //merge values from resolved promise
  .concatAll();
//output: 'Example with Promise 0', 'Example with Promise 1'...
const subscribe = example.subscribe(val => console.log('Example with Promise:', val));
```

##### Example 3: When previous inner observable completes, subscribe to next

( [jsBin](http://jsbin.com/pojolatile/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/8230ucbg/) )

```js
const obs1 = Rx.Observable.interval(1000).take(5);
const obs2 = Rx.Observable.interval(500).take(2);
const obs3 = Rx.Observable.interval(2000).take(1);
//emit three observables
const source = Rx.Observable.of(obs1, obs2, obs3);
//subscribe to each inner observable in order when previous completes
const example = source.concatAll();
/*
  output: 0,1,2,3,4,0,1,0
  How it works...
  Subscribes to each inner observable and emit values, when complete subscribe to next
  obs1: 0,1,2,3,4 (complete)
  obs2: 0,1 (complete)
  obs3: 0 (complete)
*/

const subscribe = example.subscribe(val => console.log(val));
```

### Additional Resources
* [concatAll](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-concatAll) :newspaper: - Official docs

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/concatAll.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/concatAll.ts)
