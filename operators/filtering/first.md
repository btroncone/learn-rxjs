# first
####signature: `first(predicate: function, select: function)`

### Description

###### TL;DR: Emit the first value, or the first to pass condition

The **first** operator will emit the first value from the source, or, if supplied, the first value
to pass the given predicate expression. When a single value is emitted the observable will complete.

A projection function can also be supplied as the second parameter to the **first** operator. This function will 
receieve the emitted value and index of said value. For instance, if the third emitted
value was the first to pass the predicate expression the index value will be 2.

### Examples

##### Example 1: First value from sequence

( [jsBin](http://jsbin.com/kayenuxoma/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/uncey4v9/) )

```js
const source = Rx.Observable.from([1,2,3,4,5]);
//no arguments, emit first value
const example = source.first();
//output: "First value: 1"
const subscribe = example.subscribe(val => console.log(`First value: ${val}`));
```

##### Example 2: First value to pass predicate

( [jsBin](http://jsbin.com/pujowawovu/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/pt36r8cu/) )

```js
const source = Rx.Observable.from([1,2,3,4,5]);
//emit first item to pass test
const example = source.first(num => num === 5);
//output: "First to pass test: 5"
const subscribe = example.subscribe(val => console.log(`First to pass test: ${val}`));
```

##### Example 3: Using optional projection function

( [jsBin](http://jsbin.com/qijekijaja/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/qosu0cx6/) )

```js
const source = Rx.Observable.from([1,2,3,4,5]);
//using optional projection function
const example = source.first(num => num % 2 === 0, 
                                    (result, index) => `First even: ${result} is at index: ${index}`);
//output: "First even: 2 at index: 1"
const subscribe = example.subscribe(val => console.log(val));
```


### Additional Resources
* [first](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-first) :newspaper: - Official docs
* [Filtering operator: take, first, skip](https://egghead.io/lessons/rxjs-filtering-operators-take-first-skip?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/first.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/first.ts)