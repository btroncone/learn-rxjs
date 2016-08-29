#first(predicate, resultSelector, defaultValue)

### TL;DR:
Emits the first value based on given argument(s).  Useful for scenarios where you only need the first value, or first value to pass a provided predicate expression.

### Description
The `first` operator has one purpose, emit the first value receieved from the source.  Once this value is emitted, the observable completes.  The emitted value is either the first value from the source, or the first value from the source to pass the conditional test described by the provided predicate function. When a predicate function is supplied, you can think of `first` as a shorthand for `filter` and `take(1)`.

An optional `resultSelector` function and `default` value can also be supplied to the `first` operator. If a `resultSelector` function is supplied, this will be invoked with the corresponding `value` and `index`, with the result being emitted to the subscriber. If a `default` value is supplied, this will be emitted in situations where no values would be emitted, for instance, when no values pass the provided predicate before the source observable completes.

:bulb: The counterpart to first is [**last**](last.md)!

### Arguments (optional)

#### [predicate : function(value: any, index: number, source: Observable) : boolean](#example-2-first-value-to-pass-predicate)
The `predicate` function is an optional argument, returning a boolean based on the conditional testing you wish to perform.  In the context of `first`, this allows you to add specifications to the single emitted value. If the supplied predicate returns `false`, the value will be ignored and the next value will be tested. This will continue until the result of the predicate is `true`, at which point the value will be emitted and observable completed.

#### [resultSelector : function(value: any, index: number): R](#example-3-using-optional-projection-function)
When a value is emitted you can perform a specified projection through the use of the optional `resultSelector` function.  This function provides you with the value and the index of the value that was emitted.  This index is the placement order of that value, or in other words, the number of items to be emitted before the current value (starting with `0`).  This may be useful in situations where you wish to know how many values have failed before one passed the `predicate` function.

#### [defaultValue : any](#example-4-utilizing-default-value)
If the observable completes with no value being emitted, due to the `predicate` function or otherwise, an optional `default` value can be supplied to be emitted instead.  Without this value, an `EmptyError` will be thrown.

### Walkthrough
Suppose you had a source of random numbers, but you only wanted to emit the first number that surpassed a particular threshold. We can model that with first by supplying a predicate expression:

```js
const source = Rx.Observable.of(1,2,3,4,5,6);
const example = source.first(val => val > 4);
```

At this point you can think of `first` as a combination of `filter` and `take(1)`. What if we now wanted to display a message, stating a value has now surpassed our magic number `4`? The `first` operator accepts a projection function as a second argument:

```js
const source = Rx.Observable.of(1,2,3,4,5,6);
const example = source.first(
  val => val > 4, 
  (val, index) => `Emission ${index + 1}, value: ${val} was greater than 4!`
);
```

Now suppose we were unsure whether any value would pass this predicate expression. We can also supply a default value for the third and final (optional) parameter.

```js
//now no values are greater than 4
const source = Rx.Observable.of(1,2,3,4);
const example = source.first(
  val => val > 4, 
  (val, index) => `Emission ${index + 1}, value: ${val} was greater than 4!`,
  'Nothing Matched! :('
);
```

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

##### Example 4: Utilizing default value

( [jsBin](http://jsbin.com/qoganeleqa/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/owx2jdg1/3/) )

```js
const source = Rx.Observable.from([1,2,3,4,5]);
//no value will pass, emit default
const example = source.first(val => val > 5, val => `Value: ${val}`, 'Nothing');
//output: 'Nothing'
const subscribe = example.subscribe(val => console.log(val));
```


### Additional Resources
* [first](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-first) :newspaper: - Official docs
* [Filtering operator: take, first, skip](https://egghead.io/lessons/rxjs-filtering-operators-take-first-skip?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/first.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/first.ts)
