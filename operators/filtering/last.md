#last(predicate, resultSelector, defaultValue)

### TL;DR:
Emits the last value based on given argument(s).  Useful for specific scenarios where only the last value, or last value to pass a provided predicate expression is needed.

### last : Observable
The **last** operator only purpose is to emit the last value received from the source.  Once that is emitted, the observable completes.  This value can be the last value from the source, or the last value from the source to pass the conditional testing described by the predicate function.  How the operator does this is by updating the `lastValue` variable until there is no value to update it with.

---

### Arguments

###predicate : function
The `predicate` function is an optional argument that returns a boolean based on the conditional testing you wish to perform.  In addition, the predicate function would update a variable named `lastValue` to match the value that passed the test.  This allows you to add specifications to the single emitted value. If the supplied predicate returns `false`, the value will be ignored and the next value will be tested. If returned `true`, the value will be assigned to `lastValue`. The observable will continues to emit values until there are no more to emit, at which point `lastValue` and `index` would be emitted and the observable would completes.

###resultSelector : function
When a value is emitted you can perform a specified projection through the use of the optional `resultSelector` function.  This function provides you with the value and the index of the value that was emitted.  This index is the placement order of that value, or in other words, the number of items to be emitted before the current value (starting with `0`).  This may be useful in situations where you wish to know how many values have failed before one passed the `predicate` function.

###defaultValue : any
If the observable completes with no value being emitted, due to the `predicate` function or otherwise, an optional `default` value can be supplied to be emitted instead.  Without this value, an `EmptyError` will be thrown.

Overall, the `last` operator is simple, though can be lengthy.  When a predicate function is supplied, the source would emit a value, this value would go through a conditional test, if the result is true, the value would be assigned to `lastValue`. This would continues until a complete is emitted by the source which signals for `lastValue` and the index to be emitted before everything completes.  This is lengthy because `lastValue` has to be reassigned everytime the observable emits a value that pass the conditional test.

:bulb: The counterpart to last is [**first**](first.md).


### Examples

##### Example 1: Last value in sequence

( [jsBin](http://jsbin.com/pevaqeloki/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/b05r434a/) )

```js
const source = Rx.Observable.from([1,2,3,4,5]);
//no arguments, emit last value
const example = source.last();
//output: "Last value: 5"
const subscribe = example.subscribe(val => console.log(`Last value: ${val}`));
```

##### Example 2: Last value to pass predicate

( [jsBin](http://jsbin.com/yagexuwari/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/pkx2btsh/) )

```js
const source = Rx.Observable.from([1,2,3,4,5]);
//emit last even number
const exampleTwo = source.last(num => num % 2 === 0);
//output: "Last to pass test: 4"
const subscribeTwo = exampleTwo.subscribe(val => console.log(`Last to pass test: ${val}`));
```


### Additional Resources
* [last](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-last) :newspaper: - Official docs
* [Filtering operator: takeLast, last](https://egghead.io/lessons/rxjs-filtering-operators-takelast-last?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/last.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/last.ts)
