#switchMap(project, resultSelector)

### TL;DR:
Switch to the observable returned from the project function on each emission from source observable. Emit values emitted from inner observable. Previous inner observables are unsubscribed on each emission from source.

### Description
The `switchMap` operator subscribes to observable returned from the `project` function, emitting all values emitted from this *inner* observable. Each time the source emits a new value the previous inner observable is unsubscribed. Unlike [`mergeMap`](mergemap.md), only one inner subscription is maintained at a time.

An optional `resultSelector` function can also be supplied as a second parameter. If provided, the function is invoked with the last emitted value of the source observable, inner observable, and the current index (count of emissions) of the inner and outer observable.

:bulb: This operator can cancel in-flight network requests!

### Arguments

#### [project : function(value: any, index: number): Observable](#example-1-restart-interval-every-5-seconds)
Invoked with the emitted value from the source observable, returning a new observable.  If a previous inner subscription exists, it will be unsubscribed after this function is invoked, with a new subscription created with the returned observable. 

#### resultSelector? : function(outerValue: any, innerValue: any, outerIndex: number, innerIndex: number): any
The `resultSelector` is invoked with four values, the last emitted value from the source observable, the currently emitted value from the inner observable, and the index, or emission count for each of these observables. Because a new subscription is created on each emission from the source, the `innerIndex` will be reset each time a switch to a new observable occurs, on source emission.  If a `resultSelector` function is provided, the result of this function will be emitted to subscribers of the `switchMap` operator.

### Walkthrough


### Examples

##### Example 1: Restart interval every 5 seconds

( [jsBin](http://jsbin.com/birepuveya/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/6pz981gd/) )

```js
//emit immediately, then every 5s
const source = Rx.Observable.timer(0, 5000);
//switch to new inner observable when source emits, emit items that are emitted
const example = source.switchMap(() => Rx.Observable.interval(500));
//output: 0,1,2,3,4,5,6,7,8,9...0,1,2,3,4,5,6,7,8
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Reset on every click

( [jsBin](http://jsbin.com/zoruboxogo/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/y11v8aqz/) )

```js
//emit every click
const source = Rx.Observable.fromEvent(document, 'click');
//if another click comes within 3s, message will not be emitted
const example = source.switchMap(val => Rx.Observable.interval(3000).mapTo('Hello, I made it!'));
//(click)...3s...'Hello I made it!'...(click)...2s(click)...
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 3: Using a `resultSelector` function

( [jsBin](http://jsbin.com/qobapubeze/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/nqfu534y/) )

```js
//emit immediately, then every 5s
const source = Rx.Observable.timer(0, 5000);
//switch to new inner observable when source emits, invoke project function and emit values
const example = source.switchMap(() => Rx.Observable.interval(2000), (outerValue, innerValue, outerIndex, innerIndex) => ({outerValue, innerValue, outerIndex, innerIndex}));
/*
	Output:
	{outerValue: 0, innerValue: 0, outerIndex: 0, innerIndex: 0}
	{outerValue: 0, innerValue: 1, outerIndex: 0, innerIndex: 1}
	{outerValue: 1, innerValue: 0, outerIndex: 1, innerIndex: 0}
	{outerValue: 1, innerValue: 1, outerIndex: 1, innerIndex: 1}
*/
const subscribe = example.subscribe(val => console.log(val));
```

### Additional Resources
* [switchMap](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-switchMap) :newspaper: - Official docs
* [Starting a stream with switchMap](https://egghead.io/lessons/rxjs-starting-a-stream-with-switchmap?course=step-by-step-async-javascript-with-rxjs) :video_camera: :dollar: - John Linquist

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/switchMap.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/switchMap.ts)
