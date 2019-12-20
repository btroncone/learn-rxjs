# repeat

#### signature: `repeat(count: number): Observable`

## Repeats an observable on completion.

---

:bulb: Like [`retry`](../error_handling/retry.md) but for non error cases!

---

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs?ref=4"><img src="https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX" style="width:100%;max-width:100%"></a></div>

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

- [repeat](https://rxjs.dev/api/operators/repeat)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/repeat.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/repeat.ts)
