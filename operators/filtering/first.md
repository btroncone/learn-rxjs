#first(predicate, resultSelector, defaultValue)

###TL;DR:
Emits the first value based on given argument(s).  Useful for specific filter scenario where you only want the first emitted value.

###first():Observable
The **first** operator is tasked with one simple and very specific purpose, emit the first value from the source.  Once that value is emitted, the observable completes.  This first value could be the first value from the source, or the first value from the source that pass the conditional testing provided by the predicate function.

###predicate:function
This `predicate` function is an optional argument that returns a boolean based on whatever conditional testing you want to do.  Now this is a powerful ability because you are able to select only the result you would like see.  Imagine a crowd of contestants guessing the number of jelly beans in the jar, you’re only interested in the contestants who guessed correctly and you want to know who the first to do so was.  If this conditional testing returns a false, the source observable would emit the next value to be tested.  This will continue to happen until a value passes the conditional testing.

###resultSelector:function
Once you have that emitted value, you can perform various action on it through the use of the optional `resultSelector` function.  This function provides you with the value and the index of what was emitted.  This index is the placement order of that value that has gone through the process.  This is useful for when you want to know how many value have failed before one passes the `predicate` function.

###defaultValue:R
If the observable completes with no value being emitted, due to the `predicate` function or otherwise, an optional `default` value can be provided to be emitted instead.  Without this value, an `EmptyError` would be thrown instead.

Overall, the first operator is very simple.  It does what you ask of it while providing you a lot of control over what should be done.  Think of it as a filter operator but only emits the first value.

:bulb: The counterpart to first is **last**. Who would have though?

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
