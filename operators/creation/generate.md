# generate

#### signature: `generate<T, S>(initialStateOrOptions: S | GenerateOptions<T, S>, condition?: ConditionFunc<S>, iterate?: IterateFunc<S>, resultSelectorOrObservable?: (ResultFunc<S, T>) | SchedulerLike, scheduler?: SchedulerLike): Observable<T>`

## Generates an observable sequence by running a state-driven loop producing the sequence's elements, using the specified scheduler to send out observer messages.

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/angular"><img src="https://ultimatecourses.com/assets/img/banners/ultimate-angular-leader.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Generate

(
[StackBlitz](https://stackblitz.com/edit/rxjs-generate?file=index.ts&devtoolsheight=100) )

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
[StackBlitz](https://stackblitz.com/edit/rxjs-generate-result-selector?file=index.ts&devtoolsheight=100) )

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

### Additional Resources

- [generate](https://rxjs-dev.firebaseapp.com/api/index/function/generate)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/generate.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/generate.ts)
