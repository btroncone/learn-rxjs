# combineLatest(observables, project)

### TL;DR:
Combines given observables, emitting the last value of all observables when any emits.  This is useful when you need to perform some calculation or logic dependant on the values from multiple sources.

### Description
The `combineLatest` operator can be used as a static or instance method, accepting a variable number of observables.  It then subscribes to each observable, emitting an array of values when each observable has emitted at least one value. The `combineLatest` operator will continues to emit the last emitted value from each observable when any observable of the provided observables emits. The observable will complete when all inner observables complete.  

This operator can also take an optional `project` function, invoked with the latest value from each observable upon each emission. The result of this projection will then be emitted to the subscriber. 

:bulb:  This operator can be used as either a static or instance method!

:bulb:  [combineAll](combineall.md) can be used to apply combineLatest to emitted observables when a source completes!

### Arguments

### [observable(s) : Observable](#example-1-combining-observables-emitting-at-3-intervals)
`combineLatest` accepts a variable number of observables.  Each provided observable is subscribed to, waiting for all observables to emit at least one value.  These values are then grouped together in an array and emitted.  After each observable has emitted at least one value, any emission from any observable will cause `combineLatest` to emit the last value from each. 

### [project : function](#example-2-combinelatest-with-projection-function)
The `project` is invoked with a variable number of values, dependant on the number of observables provided to `combineLatest`. For example, `(one, two, three) => one + two + three;`  `one` represent the value from the first observable in the chain. The result of the `project` function is then emitted to the subscriber.

### Walkthrough
Suppose you have several inputs that rely on eachother to perform a calculation. When any stream emits a value the last value from each is required to take appropriate action.

```js
Observable.combineLatest(
  observable1,
  observable2,
  observable3
)
/*
  When any of the inner observables emit, supply latest from all three to calculate sum
*/
.map(([val1, val2, val3]) => val1 + val2 + val3) 
```

One way to perform this calculation would be to `map` to the appropriate result, as seen above. Another way would be to utilize the optional `project` function as the last parameter.

```js
Observable.combineLatest(
  observable1,
  observable2,
  observable3,
  (val1, val2, val3) => val1 + val2 + val3)
)
```

These two approaches will arrive at the same result, it's truly a matter of style preference.

### Examples

( [example tests](https://github.com/btroncone/learn-rxjs/blob/master/operators/specs/combination/combinelatest-spec.ts) )

#####Example 1: Combining observables emitting at 3 intervals
( [jsBin](http://jsbin.com/zupiqozaro/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/mygy9j86/) )

```js
//timerOne emits first value at 1s, then once every 4s
const timerOne = Rx.Observable.timer(1000, 4000);
//timerTwo emits first value at 2s, then once every 4s
const timerTwo = Rx.Observable.timer(2000, 4000)
//timerThree emits first value at 3s, then once every 4s
const timerThree = Rx.Observable.timer(3000, 4000)

//when one timer emits, emit the latest values from each timer as an array
const combined = Rx.Observable
.combineLatest(
    timerOne,
    timerTwo,
    timerThree
);

const subscribe = combined.subscribe(latestValues => {
	//grab latest emitted values for timers one, two, and three
	const [timerValOne, timerValTwo, timerValThree] = latestValues;
  /*
  	Example:
    timerOne first tick: 'Timer One Latest: 1, Timer Two Latest:0, Timer Three Latest: 0
    timerTwo first tick: 'Timer One Latest: 1, Timer Two Latest:1, Timer Three Latest: 0
    timerThree first tick: 'Timer One Latest: 1, Timer Two Latest:1, Timer Three Latest: 1
  */
  console.log(
    `Timer One Latest: ${timerValOne}, 
     Timer Two Latest: ${timerValTwo}, 
     Timer Three Latest: ${timerValThree}`
   );
});
```

##### Example 2: combineLatest with projection function

( [jsBin](http://jsbin.com/codotapula/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/uehasmb6/) )

```js
//timerOne emits first value at 1s, then once every 4s
const timerOne = Rx.Observable.timer(1000, 4000);
//timerTwo emits first value at 2s, then once every 4s
const timerTwo = Rx.Observable.timer(2000, 4000)
//timerThree emits first value at 3s, then once every 4s
const timerThree = Rx.Observable.timer(3000, 4000)

//combineLatest also takes an optional projection function
const combinedProject = Rx.Observable
.combineLatest(
    timerOne,
    timerTwo,
    timerThree,
    (one, two, three) => {
      return `Timer One (Proj) Latest: ${one}, 
              Timer Two (Proj) Latest: ${two}, 
              Timer Three (Proj) Latest: ${three}`
    }
);
//log values
const subscribe = combinedProject.subscribe(latestValuesProject => console.log(latestValuesProject));
```


### Additional Resources
* [combineLatest](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-combineLatest) :newspaper: - Official docs
* [Combining streams with combineLatest](https://egghead.io/lessons/rxjs-combining-streams-with-combinelatest?course=step-by-step-async-javascript-with-rxjs) :video_camera: :dollar: - John Linquist
* [Combination operator: combineLatest](https://egghead.io/lessons/rxjs-combination-operator-combinelatest?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/combineLatest.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/combineLatest.ts)
