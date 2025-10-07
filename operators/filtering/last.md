#last

#### signature: `last(predicate: function): Observable`

## Emit the last value emitted from source on completion, based on provided expression.

---

💡 The counterpart to last is [**first**](first.md)!

---



### Examples

##### Example 1: Last value in sequence

(
[StackBlitz](https://stackblitz.com/edit/typescript-ma7knv?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/pevaqeloki/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/b05r434a/) )

```js
// RxJS v6+
import { from } from 'rxjs';
import { last } from 'rxjs/operators';

const source = from([1, 2, 3, 4, 5]);
//no arguments, emit last value
const example = source.pipe(last());
//output: "Last value: 5"
const subscribe = example.subscribe(val => console.log(`Last value: ${val}`));
```

##### Example 2: Last value to pass predicate

(
[StackBlitz](https://stackblitz.com/edit/typescript-tk42hj?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/yagexuwari/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/pkx2btsh/) )

```js
// RxJS v6+
import { from } from 'rxjs';
import { last } from 'rxjs/operators';

const source = from([1, 2, 3, 4, 5]);
//emit last even number
const exampleTwo = source.pipe(last(num => num % 2 === 0));
//output: "Last to pass test: 4"
const subscribeTwo = exampleTwo.subscribe(val =>
  console.log(`Last to pass test: ${val}`)
);
```

##### Example 3: Last with default value

(
[StackBlitz](https://stackblitz.com/edit/typescript-nrc1an?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/fudubebabi/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/L7fbx3vp/) )

```js
// RxJS v6+
import { from } from 'rxjs';
import { last } from 'rxjs/operators';

const source = from([1, 2, 3, 4, 5]);
//no values will pass given predicate, emit default
const exampleTwo = source.pipe(last(v => v > 5, 'Nothing!'));
//output: 'Nothing!'
const subscribeTwo = exampleTwo.subscribe(val => console.log(val));
```

### Additional Resources

- [last](https://rxjs.dev/api/operators/last) 📰 - Official docs
- [Filtering operator: takeLast, last](https://egghead.io/lessons/rxjs-filtering-operators-takelast-last?course=rxjs-beyond-the-basics-operators-in-depth)
  🎥 💵 - André Staltz

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/last.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/last.ts)
