# concatMap(project, resultSelector)

### TL;DR:
Maps the source's emitted values to new observales.  These inner observables are then flatten with `concatAll`.  They are then subscribed to once the previous completes and begin emission.

### Description
The `concatMap` operator takes the values emitted by the source observables and map it to a new observable using the project function.  The `project` function is the only required argument because `concatMap` will make an attempt to subscribe to to the newly mapped observable.  This inner observable will then begin emission.  Similar to `concatAll`, when new inner observables arrive, they are flatten and placed in a backlog until for the previous observable completes emission.  It is then subscribed to and begin emission itself.  This process will cotinues until all inner observables complete.  Once the last inner observables completes, `concatMap` will emits a complete.

Because the source observable continues to emit, the values are being mapped to new inner observables.  If the inners observables are not completed in a timely fashion, you will end up with a backlog of observables waiting to be subscribe to.  This could lead to overloading problems if the backlog gets too large.

:bulb: The reason it is called concat is becaue values emitted by an inner observable is concatted to the the previous.

:warning: If your source significantly outpace your inner observables, you might see some performance issues.

### Arguments

#### project: function(value: any, index: number): Observable
Accepts the value from the source observable and map that value to a new observable.  You have the freedom to do whatever you want within the function, the only caveat is that you must return an observable.  This operator will not work otherwise because `concatMap` will attempt to subscribe to this return value.

#### resultSelector: function(outerValue: any, innerValue: any, outerIndex: number, innerIndex: number): any
The `resultSelector` is an optional argument that takes four arguments and gives you access to the outer and inner values and indices of the emitted value.  This gives you a great deal of control over what you can do with the output.  When the inner observable emits a value, the `resultSelector` will identify the `(outerValue, innerValue, outerIndex, innerIndex)` of that value.  Outer refers to information from the source observable while inner refers to the current emitting inner observable.  This gives you great control and freedom over the emitted value.

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

( [jsBin](http://jsbin.com/celixodeba/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/Lym33L97//) )


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
