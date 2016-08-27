#last(predicate, resultSelector, defaultValue)

### TL;DR:
Emits the last value emitted from source on completion, based on given argument(s).  Useful for scenarios where only the last value, or last value to pass a provided predicate expression is needed.

### [last : Observable](#last-value-in-sequence)
The **last** operator, by default, emits the last value received from the source upon completion.

---

### Arguments (optional)

###[predicate : function](#last-value-to-pass-predicate)
The `predicate` function is an optional argument that returns a boolean based on the conditional testing you wish to perform.  In addition, the predicate function would update a variable named `lastValue` to match the value that passed the test.  This allows you to add specifications to the single emitted value. If the supplied predicate returns `false`, the value will be ignored and the next value will be tested. If returned `true`, the value will be assigned to `lastValue`. Upon completion, `lastValue` and `index` would be emitted and the observable would completes.

###[resultSelector : function](#last-with-result-selector)
When a value is emitted you can perform a specified projection through the use of the optional `resultSelector` function.  This function is provided the value and index of the emitted item.  This index is the placement order of that value, or in other words, the number of items to be emitted before the current value (starting with `0`).

###[defaultValue : any](#last-with-default-value)
If the observable completes with no value being emitted, due to the `predicate` function or otherwise, an optional `default` value can be supplied to be emitted instead.  Without this value, an `EmptyError` will be thrown.

Overall, the `last` operator is simple. By default, when the source observable completes the last value emitted will be emitted. If a predicate expression is supplied, the last value to pass this predicate will be emitted on completion. If no values pass the given predicate, and a default value is supplied, that is emitted on completion. A projection function can also be supplied, which will receieve the value and it's index, emitting the result of that function when the source observable completes.

:bulb: The counterpart to last is [**first**](first.md)!


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

##### Example 3: Last with result selector

( [jsBin](http://jsbin.com/hobinukisu/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/76247162/) )

```js
const source = Rx.Observable.from([1,2,3,4,5]);
//supply an option projection function for the second parameter
const exampleTwo = source.last(v => v > 4, v => `The highest emitted number was ${v}`);
//output: 'The highest emitted number was 5'
const subscribeTwo = exampleTwo.subscribe(val => console.log(val));
```

##### Example 4: Last with default value

( [jsBin](http://jsbin.com/fudubebabi/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/L7fbx3vp/) )

```js
const source = Rx.Observable.from([1,2,3,4,5]);
//no values will pass given predicate, emit default
const exampleTwo = source.last(v => v > 5, v => v, 'Nothing!');
//output: 'Nothing!'
const subscribeTwo = exampleTwo.subscribe(val => console.log(val));
```


### Additional Resources
* [last](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-last) :newspaper: - Official docs
* [Filtering operator: takeLast, last](https://egghead.io/lessons/rxjs-filtering-operators-takelast-last?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/last.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/last.ts)
