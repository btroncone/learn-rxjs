# merge
####signature: `merge(input: Observable): Observable`

### Description

###### TL;DR: Merge outputs from multiple observables into a single source

The **merge** operator accepts a variable number of observables, subscribing to each and emitting values as each emits. 

---
:bulb:  This operator can be used as either a static or instance method!

:bulb:  If order not throughput is a primary concern, try [concat](concat.md) instead!

---

### Examples

##### Example 1: merging multiple observables, static method

( [jsBin](http://jsbin.com/conufujapi/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/qvq9dscu/) )

```js
//emit every 2.5 seconds
const first = Rx.Observable.interval(2500);
//emit every 2 seconds
const second = Rx.Observable.interval(2000);
//emit every 1.5 seconds
const third = Rx.Observable.interval(1500);
//emit every 1 second
const fourth = Rx.Observable.interval(1000);

//emit outputs from one observable
const example = Rx.Observable.merge(
  first.mapTo('FIRST!'),
  second.mapTo('SECOND!'),
  third.mapTo('THIRD'),
  fourth.mapTo('FOURTH')
);
//output: "FOURTH", "THIRD", "SECOND!", "FOURTH", "FIRST!", "THIRD", "FOURTH"
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: merge 2 observables, instance method

( [jsBin](http://jsbin.com/wuwujokaqu/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/me5ofcr0/) )

```js
//emit every 2.5 seconds
const first = Rx.Observable.interval(2500);
//emit every 1 second
const second = Rx.Observable.interval(1000);
//used as instance method
const example = first.merge(second);
//output: 0,1,0,2....
const subscribe = example.subscribe(val => console.log(val));
```


### Additional Resources
* [merge](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-merge) :newspaper: - Official docs
* [Handling multiple streams with merge](https://egghead.io/lessons/rxjs-handling-multiple-streams-with-merge?course=step-by-step-async-javascript-with-rxjs) :video_camera: :dollar: - John Linquist
* [Sharing network requests with merge](https://egghead.io/lessons/rxjs-reactive-programming-sharing-network-requests-with-rxjs-merge?course=introduction-to-reactive-programming) :video_camera: :dollar: - André Staltz
* [Combination operator: merge](https://egghead.io/lessons/rxjs-combination-operator-merge?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/merge.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/merge.ts)
