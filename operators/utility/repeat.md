# repeat

#### signature: `repeat(count: number): Observable`

## Repeats an observable on completion.

---

💡 Like [`retry`](../error_handling/retry.md) but for non error cases!

---

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1qq2-q-eVe-F_-d0eSvTyqaGRjpfLDdJz 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: Repeat 3 times

(
[StackBlitz](https://stackblitz.com/edit/rxjs-repeat-learnrxjs?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { repeat, delay } from 'rxjs/operators';
import { of } from 'rxjs';

const delayedThing = of('delayed value').pipe(delay(2000));

delayedThing
  .pipe(repeat(3))
  // delayed value...delayed value...delayed value
  .subscribe(console.log);
```

### Related Recipes

- [Click Ninja Game](../../recipes/click-ninja-game.md)
- [Lockscreen](../../recipes/lockscreen.md)
- [Space Invaders Game](/recipes/space-invaders-game.md)
- [Swipe To Refresh](/recipes/swipe-to-refresh.md)

### Additional Resources

- [repeat](https://rxjs.dev/api/operators/repeat) 📰 - Official docs

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/repeat.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/repeat.ts)
