# combineLatest(observables, project)

### TL;DR:
Combines all given observables into one observable and emits the latest values of all observables when any emits.  This is useful in maintaining multiples observables you want to keep track of.

### Description
The `combineLatest` operator can hang off of an existing observable and accepts any number of observables in the form of `(obs1, obs2, obsEtc)`.  It then subscribes to each and emits an array of values once all observables emits at least one time.  `combineLatest` then continues to emit the latest values array as soon as any observable emits.  This operator can also takes an optional `project` function that allows you to dictate what the value being emitted should appear as.

:bulb:  This operator can be used as either a static or instance method!

:bulb:  [combineAll](combineall.md) can be used to apply combineLatest to emitted observables when a source completes!


### Arguments (optional)

### observable : Observable
You are free to include any number of `observable` which can be as low as zero or as high as you and your system can handle.  The `combineLatest` operator would subscribe to each and wait until all observables emit at least one value.  These values would be grouped together and emitted as a single value.  From this point on, the operator would group all latest values and emit the combined value every time an observable emits.  If any observable throws an error, the operator would do the same.  Once all observables completes, the `combineLatest` will do the same.

### project : function : Observable
The `project` function takes the values emitted and let you manipulate them as you pleased.  The function, itself, takes various arguments that represent the emitted values.  For example, `(one, two, three) => one + two + three;`  `one` represent the value from the first observable in the chain and so on so forth.  If you include less arguments than number of observables, the latters would be left out.


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
