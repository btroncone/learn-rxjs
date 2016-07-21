# switchMap
####signature: `switchMap(a: Observable): Observable`

### Description

###### TL;DR: When source emits switch to new inner observable

The **switchMap** operator takes a project function and returns the source’s output as an observable after it has pass through 
the project function.  It then flatten the output using the **switch** operator and emits them.

> :bulb: Tip: switchMap can cancel in-flight network requests!

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