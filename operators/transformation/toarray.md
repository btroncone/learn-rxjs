# toArray

#### signature: `toArray(): OperatorFunction`

## Collects all source emissions and emits them as an array when the source completes.

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX "Ultimate RxJS")](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: get values emitted by interval as an array when interval completes

(
[StackBlitz](https://stackblitz.com/edit/rxjs-toarray?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { interval } from 'rxjs';
import { toArray, take } from 'rxjs/operators';

interval(100)
  .pipe(
    take(10),
    toArray()
  )
  .subscribe(console.log);

// output: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### Related Recipes

- [Breakout Game](../../recipes/breakout-game.md)
- [Lockscreen](../../recipes/lockscreen.md)

### Additional Resources

- [toArray](https://rxjs.dev/api/operators/toArray)
  📰 - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/toArray.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/toArray.ts)
