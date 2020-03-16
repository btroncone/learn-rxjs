# skip

#### signature: `skip(the: Number): Observable`

## Skip the provided number of emitted values.

### Why use `skip`?

Skip allows you to ignore the first x emissions from the source. Generally
`skip` is used when you have an observable that always emits certain values on
subscription that you wish to ignore. Perhaps those first few aren't needed or
you are subscribing to a `Replay` or `BehaviorSubject` and do not need to act on
the initial values. Reach for `skip` if you are only concerned about later
emissions.

You could mimic `skip` by using [`filter`](./filter.md) with indexes. Ex.
`.filter((val, index) => index > 1)`

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1qq2-q-eVe-F_-d0eSvTyqaGRjpfLDdJz 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: Skipping values before emission

(
[StackBlitz](https://stackblitz.com/edit/typescript-o5ydjf?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/hacepudabi/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/ar1eqbya/) )

```js
// RxJS v6+
import { interval } from 'rxjs';
import { skip } from 'rxjs/operators';

//emit every 1s
const source = interval(1000);
//skip the first 5 emitted values
const example = source.pipe(skip(5));
//output: 5...6...7...8........
const subscribe = example.subscribe(val => console.log(val));
```

#### Example 2: Short hand for a specific filter use case

(
[StackBlitz](https://stackblitz.com/edit/typescript-yl3ap1?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/judamurego/edit?js,console) |
[jsFiddle](https://jsfiddle.net/ElHuy/4jswLn3z/) )

```js
// RxJS v6+
import { from } from 'rxjs';
import { skip, filter } from 'rxjs/operators';

const numArrayObs = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// 3,4,5...
const skipObs = numArrayObs.pipe(skip(2)).subscribe(console.log);

// 3,4,5...
const filterObs = numArrayObs
  .pipe(filter((val, index) => index > 1))
  .subscribe(console.log);

//Same output!
```

### Additional Resources

- [skip](https://rxjs.dev/api/operators/skip) 📰 - Official docs
- [Filtering operator: take, first, skip](https://egghead.io/lessons/rxjs-filtering-operators-take-first-skip?course=rxjs-beyond-the-basics-operators-in-depth)
  🎥 💵 - André Staltz

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/skip.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/skip.ts)
