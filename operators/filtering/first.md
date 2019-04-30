# first

#### signature: `first(predicate: function, select: function)`

## Emit the first value or first to pass provided expression.

---

:bulb: The counterpart to first is [**last**](last.md)!

---

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs"><img src="https://ultimatecourses.com/assets/img/banners/rxjs-banner-desktop.svg" style="width:100%;max-width:100%"></a></div>

### Examples

(
[example tests](https://github.com/btroncone/learn-rxjs/blob/master/operators/specs/filtering/first-spec.ts)
)

##### Example 1: First value from sequence

(
[StackBlitz](https://stackblitz.com/edit/typescript-t8hseq?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/kayenuxoma/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/uncey4v9/) )

```js
// RxJS v6+
import { from } from 'rxjs';
import { first } from 'rxjs/operators';

const source = from([1, 2, 3, 4, 5]);
//no arguments, emit first value
const example = source.pipe(first());
//output: "First value: 1"
const subscribe = example.subscribe(val => console.log(`First value: ${val}`));
```

##### Example 2: First value to pass predicate

(
[StackBlitz](https://stackblitz.com/edit/typescript-bw5byu?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/pujowawovu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/pt36r8cu/) )

```js
// RxJS v6+
import { from } from 'rxjs';
import { first } from 'rxjs/operators';

const source = from([1, 2, 3, 4, 5]);
//emit first item to pass test
const example = source.pipe(first(num => num === 5));
//output: "First to pass test: 5"
const subscribe = example.subscribe(val =>
  console.log(`First to pass test: ${val}`)
);
```

##### Example 3: Utilizing default value

(
[StackBlitz](https://stackblitz.com/edit/typescript-2pkzpv?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/qoganeleqa/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/owx2jdg1/3/) )

```js
// RxJS v6+
import { from } from 'rxjs';
import { first } from 'rxjs/operators';

const source = from([1, 2, 3, 4, 5]);
//no value will pass, emit default
const example = source.pipe(first(val => val > 5, 'Nothing'));
//output: 'Nothing'
const subscribe = example.subscribe(val => console.log(val));
```

### Additional Resources

- [first](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-first)
  :newspaper: - Official docs
- [Filtering operator: take, first, skip](https://egghead.io/lessons/rxjs-filtering-operators-take-first-skip?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/first.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/first.ts)
