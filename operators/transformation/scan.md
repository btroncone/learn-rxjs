# scan
####signature: `scan(accumulator: function, seed: any): Observable`

### Description

###### TL;DR: Reduce over time

The **scan** operator applies a reducer function to values received from the source, emitting the current accumulator. 
You can think of scan as a reduce applied over time. If you only need a final value when the source observable has completed, reduce is also available.

> :bulb: Tip: scan is the core for many RxJS based [Redux](http://redux.js.org) implementations!

### Examples

##### Example 1: Sum over time

( [jsBin](http://jsbin.com/kozidakose/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/d2g2a2c6/) )

```js
const subject = new Rx.Subject();
//basic scan example, sum over time starting with zero
const example = subject
  .startWith(0)
  .scan((acc, curr) => acc + curr);
//log accumulated values
const subscribe = example.subscribe(val => console.log('Accumulated total:', val));
//next values into subject, adding to the current sum
subject.next(1); //1
subject.next(2); //3
subject.next(3); //6
```

### Examples

##### Example 2: Accumulating an object

( [jsBin](http://jsbin.com/fusunoguqu/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/36rbu38b/) )

```js
const subject = new Rx.Subject();
//scan example building an object over time
const example = subject.scan((acc, curr) => Object.assign({}, acc, curr), {});
//log accumulated values
const subscribe = example.subscribe(val => console.log('Accumulated object:', val));
//next values into subject, adding properties to object
subject.next({name: 'Joe'}); // {name: 'Joe'}
subject.next({age: 30}); // {name: 'Joe', age: 30}
subject.next({favoriteLanguage: 'JavaScript'}); // {name: 'Joe', age: 30, favoriteLanguage: 'JavaScript'}
```


### Additional Resources
* [scan](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-scan) :newspaper: - Official docs
* [Aggregating streams with reduce and scan using RxJS](https://egghead.io/lessons/rxjs-aggregating-streams-with-reduce-and-scan-using-rxjs) :video_camera: - Ben Lesh
* [Updating data with scan](https://egghead.io/lessons/rxjs-updating-data-with-scan?course=step-by-step-async-javascript-with-rxjs) :video_camera: :dollar: - John Linquist
* [Transformation operator: scan](https://egghead.io/lessons/rxjs-transformation-operator-scan?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/scan.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/scan.ts)
