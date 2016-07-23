# concat
####signature: `concat(observables: ...*): Observable`

### Description

###### TL;DR: Subscribe to observables in order as the previous completes, emit from source

The **concat** operator accepts a variable number of observables, subscribing to each in order as the previous completes. 
Emissions from each observable are emitted to subscriber as they occur. Concat can be used as either a static or instance method.

> :bulb: Tip: If throughput not order is a primary concern, try [merge](merge.md) instead!

### Examples


##### Example 1: concat 2 basic observables

( [jsBin](http://jsbin.com/gegubutele/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/rxwnr3hh/) )

```js
//emits 1,2,3
const sourceOne = Rx.Observable.of(1,2,3);
//emits 4,5,6
const sourceTwo = Rx.Observable.of(4,5,6);
//emit values from sourceOne, when complete, subscribe to sourceTwo
const example = sourceOne.concat(sourceTwo);
//output: 1,2,3,4,5,6
const subscribe = example.subscribe(val => console.log('Example: Basic concat:', val));
```

##### Example 2: concat as static method

( [jsBin](http://jsbin.com/xihagewune/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/5qdtvhu8/) )

```js
//emits 1,2,3
const sourceOne = Rx.Observable.of(1,2,3);
//emits 4,5,6
const sourceTwo = Rx.Observable.of(4,5,6);

//used as static
const example = Rx.Observable.concat(
	sourceOne,
  sourceTwo
);
//output: 1,2,3,4,5,6
const subscribe = example.subscribe(val => console.log('Example: static', val));
```

##### Example 3: concat with delayed source

( [jsBin](http://jsbin.com/nezonosubi/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/L2s49msx/) )

```js
//emits 1,2,3
const sourceOne = Rx.Observable.of(1,2,3);
//emits 4,5,6
const sourceTwo = Rx.Observable.of(4,5,6);

//delay 3 seconds then emit
const sourceThree = sourceOne.delay(3000);
//sourceTwo waits on sourceOne to complete before subscribing
const example = sourceThree.concat(sourceTwo);
//output: 1,2,3,4,5,6
const subscribe = example.subscribe(val => console.log('Example: Delayed source one:', val));
```

##### Example 4: concat with source that does not complete

( [jsBin](http://jsbin.com/vixajoxaze/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/4bhtb81u/) )

```js
//when source never completes, the subsequent observables never runs
const source = Rx.Observable
  .concat(
  	Rx.Observable.interval(1000),
  	Rx.Observable.of('This','Never','Runs')  
  )
//outputs: 1,2,3,4....
const subscribe = source.subscribe(val => console.log('Example: Source never completes, second observable never runs:', val));
```


### Additional Resources
* [concat](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-concat) :newspaper: - Official docs
* [Combination operator: concat, startWith](https://egghead.io/lessons/rxjs-combination-operators-concat-startwith?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/concat.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/concat.ts)
