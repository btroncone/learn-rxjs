#last

#### signature: `last(predicate: function): Observable`

## Emit the last value emitted from source on completion, based on provided expression.

---

:bulb: The counterpart to last is [**first**](first.md)!

---

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Last value in sequence

( [jsBin](http://jsbin.com/pevaqeloki/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/b05r434a/) )

```js
import { from } from 'rxjs/observable/from';
import { last } 'rxjs/operators';

const source = from([1, 2, 3, 4, 5]);
//no arguments, emit last value
const example = source.pipe(last());
//output: "Last value: 5"
const subscribe = example.subscribe(val => console.log(`Last value: ${val}`));
```

##### Example 2: Last value to pass predicate

( [jsBin](http://jsbin.com/yagexuwari/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/pkx2btsh/) )

```js
import { from } from 'rxjs/observable/from';
import { last } 'rxjs/operators';

const source = from([1, 2, 3, 4, 5]);
//emit last even number
const exampleTwo = source.pipe(last(num => num % 2 === 0));
//output: "Last to pass test: 4"
const subscribeTwo = exampleTwo.subscribe(val =>
  console.log(`Last to pass test: ${val}`)
);
```

##### Example 3: Last with result selector

( [jsBin](http://jsbin.com/hobinukisu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/76247162/) )

```js
import { from } from 'rxjs/observable/from';
import { last } 'rxjs/operators';

const source = from([1, 2, 3, 4, 5]);
//supply an option projection function for the second parameter
const exampleTwo = source.pipe(
  last(
    v => v > 4,
    v => `The highest emitted number was ${v}`
  )
);
//output: 'The highest emitted number was 5'
const subscribeTwo = exampleTwo.subscribe(val => console.log(val));
```

##### Example 4: Last with default value

( [jsBin](http://jsbin.com/fudubebabi/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/L7fbx3vp/) )

```js
import { from } from 'rxjs/observable/from';
import { last } 'rxjs/operators';

const source = from([1, 2, 3, 4, 5]);
//no values will pass given predicate, emit default
const exampleTwo = source.pipe(last(v => v > 5, v => v, 'Nothing!'));
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
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/last.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/last.ts)
