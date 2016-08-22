# withLatestFrom
####signature: `withLatestFrom(other: Observable, project: Function): Observable`

### Description

###### TL;DR: When source emits, also get last value emitted from another observable

The **withLatestFrom** operator emits an array, including the source emission and latest value from the provided observable.
No values will be emitted until the observable provided to **withLatestFrom** has emitted atleast one value. 

---
:bulb:  If you want the last emission any time a variable number of observables emits, try [combinelatest](combinelatest.md)!

---

### Examples

##### Example 1: Latest value from quicker second source

( [jsBin](http://jsbin.com/fitekeseru/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/9c3pfgpk/) )

```js
//emit every 5s
const source = Rx.Observable.interval(5000);
//emit every 1s
const secondSource = Rx.Observable.interval(1000);
const example = source
  .withLatestFrom(secondSource)
  .map(([first, second]) => {
    return `First Source (5s): ${first} Second Source (1s): ${second}`;
  });
/*
  "First Source (5s): 0 Second Source (1s): 4"
  "First Source (5s): 1 Second Source (1s): 9"
  "First Source (5s): 2 Second Source (1s): 14"
  ...
*/
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Slower second source

( [jsBin](http://jsbin.com/vujekucuxa/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/bywLL579/) )

```js
//emit every 5s
const source = Rx.Observable.interval(5000);
//emit every 1s
const secondSource = Rx.Observable.interval(1000);
//withLatestFrom slower than source
const example = secondSource
  //both sources must emit at least 1 value (5s) before emitting
  .withLatestFrom(source)
  .map(([first, second]) => {
    return `Source (1s): ${first} Latest From (5s): ${second}`;
  });
/*
  "Source (1s): 4 Latest From (5s): 0"
  "Source (1s): 5 Latest From (5s): 0"
  "Source (1s): 6 Latest From (5s): 0"
  ...
*/
const subscribe = example.subscribe(val => console.log(val));
```


### Additional Resources
* [withLatestFrom](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-withLatestFrom) :newspaper: - Official docs
* [Combination operator: withLatestFrom](https://egghead.io/lessons/rxjs-combination-operator-withlatestfrom?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/withLatestFrom.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/withLatestFrom.ts)
