#last

#### signature: `last(predicate: function): Observable`

## Emit the last value emitted from source on completion, based on provided expression.

---

:bulb: The counterpart to last is [**first**](first.md)!

---

### Examples

##### Example 1: Last value in sequence

( [jsBin](http://jsbin.com/pevaqeloki/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/b05r434a/) )

```js
const source = Rx.Observable.from([1, 2, 3, 4, 5]);
//no arguments, emit last value
const example = source.last();
//output: "Last value: 5"
const subscribe = example.subscribe(val => console.log(`Last value: ${val}`));
```

##### Example 2: Last value to pass predicate

( [jsBin](http://jsbin.com/yagexuwari/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/pkx2btsh/) )

```js
const source = Rx.Observable.from([1, 2, 3, 4, 5]);
//emit last even number
const exampleTwo = source.last(num => num % 2 === 0);
//output: "Last to pass test: 4"
const subscribeTwo = exampleTwo.subscribe(val =>
  console.log(`Last to pass test: ${val}`)
);
```

##### Example 3: Last with result selector

( [jsBin](http://jsbin.com/hobinukisu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/76247162/) )

```js
const source = Rx.Observable.from([1, 2, 3, 4, 5]);
//supply an option projection function for the second parameter
const exampleTwo = source.last(
  v => v > 4,
  v => `The highest emitted number was ${v}`
);
//output: 'The highest emitted number was 5'
const subscribeTwo = exampleTwo.subscribe(val => console.log(val));
```

##### Example 4: Last with default value

( [jsBin](http://jsbin.com/fudubebabi/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/L7fbx3vp/) )

```js
const source = Rx.Observable.from([1, 2, 3, 4, 5]);
//no values will pass given predicate, emit default
const exampleTwo = source.last(v => v > 5, v => v, 'Nothing!');
//output: 'Nothing!'
const subscribeTwo = exampleTwo.subscribe(val => console.log(val));
```

### Additional Resources

* [last](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-last)
  :newspaper: - Official docs
* [Filtering operator: takeLast, last](https://egghead.io/lessons/rxjs-filtering-operators-takelast-last?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/operator/last.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/last.ts)
