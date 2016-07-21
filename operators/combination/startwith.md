# startWith
####signature: `startWith(an: Values): Observable`

### Description

###### TL;DR: Emit specified item first

The **startWith** operator allows you to begin with a specified value before emitting the source value.

### Examples

##### Example 1: startWith on number sequence

( [jsBin](http://jsbin.com/lezuravizu/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/e8dn3ggp/) )

```js
//emit (1,2,3)
const source = Rx.Observable.of(1,2,3);
//start with 0
const example =  source.startWith(0);
//output: 0,1,2,3
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: startWith for initial scan value

( [jsBin](http://jsbin.com/gemevuzoha/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/54r3g83e/) )

```js
//emit ('World!', 'Goodbye', 'World!')
const source = Rx.Observable.of('World!', 'Goodbye', 'World!');
//start with 'Hello', concat current string to previous
const example = source
  .startWith('Hello')
  .scan((acc, curr) => `${acc} ${curr}`);
/*
  output:
  "Hello"
  "Hello World!"
  "Hello World! Goodbye"
  "Hello World! Goodbye World!"
*/
const subscribe = example.subscribe(val => console.log(val));
```


### Additional Resources
* [startWith](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-startWith) :newspaper: - Official docs
* [Displaying initial data with startWith](https://egghead.io/lessons/rxjs-displaying-initial-data-with-startwith?course=step-by-step-async-javascript-with-rxjs) :video_camera: :dollar: - John Linquist
* [Clear data while loading with startWith](https://egghead.io/lessons/rxjs-reactive-programming-clear-data-while-loading-with-rxjs-startwith?course=introduction-to-reactive-programming) :video_camera: :dollar: - André Staltz
* [Combination operator: concat, startWith](https://egghead.io/lessons/rxjs-combination-operators-concat-startwith?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz


---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/startWith.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/startWith.ts)