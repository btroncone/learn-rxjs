# combineAll

#### signature: `combineAll(project: function): Observable`

## When source observable completes use [combineLatest](combinelatest.md) with collected observables.



### Examples

(
[example tests](https://github.com/btroncone/learn-rxjs/blob/master/operators/specs/combination/combineall-spec.ts)
)

##### Example 1: Mapping to inner interval observable

(
[StackBlitz](https://stackblitz.com/edit/typescript-bzwkrl?file=index.ts&devtoolsheight=100)
)

```js
import { take, map, combineAll } from 'rxjs/operators';
import { interval } from 'rxjs';

// emit every 1s, take 2
const source$ = interval(1000).pipe(take(2));
// map each emitted value from source to interval observable that takes 5 values
const example$ = source$.pipe(
  map(val =>
    interval(1000).pipe(
      map(i => `Result (${val}): ${i}`),
      take(5)
    )
  )
);
/*
  2 values from source will map to 2 (inner) interval observables that emit every 1s.
  combineAll uses combineLatest strategy, emitting the last value from each
  whenever either observable emits a value
*/
example$
  .pipe(combineAll())
  /*
  output:
  ["Result (0): 0", "Result (1): 0"]
  ["Result (0): 1", "Result (1): 0"]
  ["Result (0): 1", "Result (1): 1"]
  ["Result (0): 2", "Result (1): 1"]
  ["Result (0): 2", "Result (1): 2"]
  ["Result (0): 3", "Result (1): 2"]
  ["Result (0): 3", "Result (1): 3"]
  ["Result (0): 4", "Result (1): 3"]
  ["Result (0): 4", "Result (1): 4"]
*/
  .subscribe(console.log);
```

### Additional Resources

- [combineAll](https://rxjs.dev/api/operators/combineAll) 📰 - Official docs

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/combineAll.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/combineAll.ts)
