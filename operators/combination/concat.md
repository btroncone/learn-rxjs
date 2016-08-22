# concat
####signature: `concat(observables: ...*): Observable`

### Description

###### TL;DR: Subscribe to observables in order as the previous completes, emit from source

The **concat** operator accepts a variable number of observables, subscribing to each in order as the previous completes. 
Emissions from each observable are emitted to subscriber as they occur.

__*For example...*__

Suppose we had three requests to be initiated and order must be maintained. 
The first request should be completed successfully before the next is made, and so on.

```js
Observable.concat(
  request1, // <-- returns response1
  request2, // <-- returns response2
  request3  // <-- returns response3
)
```

Given the above case:
1. `request1` is initiated
  1. `request1` completes and `response1` is emitted
2. `request2` is initiated
  1. `request2` completes and `response2` is emitted
3. `request3` is initiated
  1. `request3` completes and `response3` is emitted

---
:bulb:  You can think of concat like a line at a ATM, the next transaction (subscription) cannot start until the previous completes!

:bulb:  This operator can be used as either a static or instance method!

:bulb:  If throughput not order is a primary concern, try [merge](merge.md) instead!

---

### Examples

( [example tests](https://github.com/btroncone/learn-rxjs/blob/master/operators/specs/combination/concat-spec.ts) )

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
