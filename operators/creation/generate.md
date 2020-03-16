# generate

#### signature: `generate(initialStateOrOptions: GenerateOptions, condition?: ConditionFunc, iterate?: IterateFunc, resultSelectorOrObservable?: (ResultFunc) | SchedulerLike, scheduler?: SchedulerLike): Observable`

## Generates an observable sequence by running a state-driven loop producing the sequence's elements, using the specified scheduler to send out observer messages.

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1qq2-q-eVe-F_-d0eSvTyqaGRjpfLDdJz 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: Generate

(
[StackBlitz](https://stackblitz.com/edit/rxjs-generate?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { generate } from 'rxjs';

generate(
  2,
  x => x <= 8,
  x => x + 3
).subscribe(console.log);

/*
OUTPUT:
2
5
8
*/
```

##### Example 2: Generate with result selector

(
[StackBlitz](https://stackblitz.com/edit/rxjs-generate-result-selector?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { generate } from 'rxjs';

generate(
  2,
  x => x <= 38,
  x => x + 3,
  x => '.'.repeat(x)
).subscribe(console.log);

/*
OUTPUT:
..
.....
........
...........
..............
.................
....................
.......................
..........................
.............................
................................
...................................
......................................
*/
```

### Related Recipes

- [Breakout Game](../../recipes/breakout-game.md)
- [Memory Game](../../recipes/memory-game.md)

### Additional Resources

- [generate](https://rxjs.dev/api/index/function/generate) 📰 - Official docs

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/generate.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/generate.ts)
