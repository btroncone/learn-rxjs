#switchMap(project, resultSelector)

### TL;DR:
Maps values emitted by the source observable to new observables.  These observables are then flatten with `switch`, which would allows each observables to emit values until the sequential observable takes over.

### Description
The `switchMap` operator takes `switch` one step further.  It first takes a value emitted by the source and maps it to a new observable.  This observable will emits values until the source emit a new value.  This new value would then be mapped, and similar to `switch`, the previous observable will completes and the new one will starts emission.  The operator will continues to do so until the source completes.  The project function responsible for the mapping must return an observable for this to work.  That is because the operator will try to subscribe to the inner observables.  If there is none, we have a problem.

An optional `resultSelector` function can also be supplied to the operator. If provided, the function would grant you access to the values and indices of both the outter and inner observables.

:bulb: This operator can cancel in-flight network requests!

### Arguments

#### project : function(value: any, index: number): Observable
Accepts the value from the source observable and map that value to a new observable.  You have the freedom to do whatever you want within the function, the only caveat is that you must return an observable.  This operator will not work otherwise because `switchMap` will attempt to subscribe to this return value.

#### resultSelector : function(outerValue: any, innerValue: any, outerIndex: number, innerIndex: number): any
The `resultSelector` you see here is a bit different from others you might have seen before.  This one, in particular, have four arguments.  Two to track the outer index and value. Two to track the inner index and value.  When the inner observable emits a value, the `resultSelector` will identify the `(outerValue, innerValue, outerIndex, innerIndex)` of that value.  Outer refers to information from the source observable while inner refers to the current emitting inner observable.

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


### Additional Resources
* [switchMap](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-switchMap) :newspaper: - Official docs
* [Starting a stream with switchMap](https://egghead.io/lessons/rxjs-starting-a-stream-with-switchmap?course=step-by-step-async-javascript-with-rxjs) :video_camera: :dollar: - John Linquist

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/switchMap.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/switchMap.ts)
