# zip
####signature: `zip(observables: *): Observable`

### Description

###### TL;DR: After all observables emit, emit values as an array

The **zip** operator will subscribe to all inner observables and wait for all to emit a value.  Once that occurs, the operator will emits an array with all the values emitted.  This will continues until at least one observable completes, allowing the operator itself to completes.  Note, there is a backlog of values from the the faster observables.  This is because the values are grouped into their emission index. The first emitted values will always go into the first array, the second emitted values will always go into the second array.

> :bulb:  Combined with [interval](../creation/interval) or [timer](../creation/timer.md), zip can also be used to time output from another source!

### Examples

##### Example 1: zip multiple observables emitting at alternate intervals

( [jsBin](http://jsbin.com/lireyisira/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/ton462sg/) )

```js
const sourceOne = Rx.Observable.of('Hello');
const sourceTwo = Rx.Observable.of('World!');
const sourceThree = Rx.Observable.of('Goodbye');
const sourceFour = Rx.Observable.of('World!');
//wait until all observables have emitted a value then emit all as an array
const example = Rx.Observable
  .zip(
    sourceOne,
    sourceTwo.delay(1000),
    sourceThree.delay(2000),
    sourceFour.delay(3000)
  );
//output: ["Hello", "World!", "Goodbye", "World!"]
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: zip when 1 observable completes

( [jsBin](http://jsbin.com/fisitatesa/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/oamyk3xr/) )

```js
//emit every 1s
const interval = Rx.Observable.interval(1000);
//when one observable completes no more values will be emitted
const example = Rx.Observable
  .zip(
    interval,
    interval.take(2)
  );
//output: [0,0]...[1,1]
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 3: zip with a backlog

( [jsFiddle](https://jsfiddle.net/yjxdot8a/) )

```js
console.clear();

const interval = Rx.Observable.interval(500);
const fromArray = Rx.Observable.from(['a','b','c']);

/*
  fromArray will emit all 3 values immediately, but each will be grouped up
  into their respected array and wait for values from interval to be emitted.
  First emission at 0.5s: [1, 'a']
  Second emission at 1.0s: [2, 'b']
  Third emission at 1.5s: [3, 'c']
*/
const subscribe = Rx.Observable
  .zip(interval, fromArray)
  .subscribe(val => console.log(val));
/*
  Although interval could continue to emit, it won't because the third emission
  marks the completion of fromArray, allowing zip to emits a completion.
*/
```

### Additional Resources
* [zip](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-zip) :newspaper: - Official docs
* [Combination operator: zip](https://egghead.io/lessons/rxjs-combination-operator-zip?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/zip.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/zip.ts)
