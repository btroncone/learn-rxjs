# concatMap(project, resultSelector)

### TL;DR:
Maps the source's emitted values to new observales.  These inner observables are then flatten with `concatAll`.  They are then subscribed to once the previous completes and begin emission.

### Description
The `concatMap` operator subscribes to observable returned from the `project` function, emitting all values emitted from this *inner* observable. Each time the source emits a new value, the operator waits for the previous *inner* observable to completes before subscribing to the new observable.  Until then, these observables are placed in a backlog.

An optional resultSelector function can also be supplied as a second parameter. If provided, the function is invoked with the last emitted value of the source observable, inner observable, and the current index (count of emissions) of the inner and outer observable.

Because the source observable continues to emit, the values are being mapped to new inner observables.  If the inners observables are not completed in a timely fashion, you will end up with a backlog of observables waiting to be subscribe to.  This could lead to overloading problems if the backlog gets too large.

:bulb: The reason it is called concat is because values emitted by an inner observable is concatted to the the previous.

:warning: If your source significantly outpace your inner observables, you might see some performance issues.

### Arguments

#### project: function(value: any, index: number): Observable | Array | Iterable
Invoked with the emitted value from the source observable, returning a new observable. If a previous inner subscription exists and incomplete, the returned observable is placed in a backlog waiting to be subscribe once the observable before it completes.

#### resultSelector: function(outerValue: any, innerValue: any, outerIndex: number, innerIndex: number): any
The `resultSelector` is invoked with four values, the last emitted value from the source observable, the currently emitted value from the inner observable, and the index, or emission count for each of these observables. Because a new subscription is created on each emission from the source, the `innerIndex` will be reset each time a switch to a new observable occurs, on source emission. If a `resultSelector` function is provided, the result of this function will be emitted to subscribers of the `concatMap` operator.

### Examples

##### Example 1: Map to inner observable

( [jsBin](http://jsbin.com/powivemaxu/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/y3yx666r/) )

```js
//emit 'Hello' and 'Goodbye'
const source = Rx.Observable.of('Hello', 'Goodbye');
// map value from source into inner observable, when complete emit result and move to next
const example = source.concatMap(val => Rx.Observable.of(`${val} World!`));
//output: 'Example One: 'Hello World', Example One: 'Goodbye World'
const subscribe = example
  .subscribe(val => console.log('Example One:', val));
```

##### Example 2: Map to promise

( [jsBin](http://jsbin.com/celixodeba/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/Lym33L97/) )


```js
//emit 'Hello' and 'Goodbye'
const source = Rx.Observable.of('Hello', 'Goodbye');
//example with promise
const examplePromise = val => new Promise(resolve => resolve(`${val} World!`));
// map value from source into inner observable, when complete emit result and move to next
const example = source.concatMap(val => examplePromise(val))
//output: 'Example w/ Promise: 'Hello World', Example w/ Promise: 'Goodbye World'
const subscribe = example.subscribe(val => console.log('Example w/ Promise:', val));
```

##### Example 3: Supplying a projection function

( [jsBin](http://jsbin.com/vihacewozo/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/5sr5zzgy/) )

```js
//emit 'Hello' and 'Goodbye'
const source = Rx.Observable.of('Hello', 'Goodbye');
//example with promise
const examplePromise = val => new Promise(resolve => resolve(`${val} World!`));
//result of first param passed to second param selector function before being  returned
const example = source.concatMap(val => examplePromise(val), result => `${result} w/ selector!`);
//output: 'Example w/ Selector: 'Hello w/ Selector', Example w/ Selector: 'Goodbye w/ Selector'
const subscribe = example.subscribe(val => console.log('Example w/ Selector:', val));
```


### Additional Resources
* [concatMap](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-concatMap) :newspaper: - Official docs

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/concatMap.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/concatMap.ts)
