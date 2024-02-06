# iif

#### signature: `iif(condition: () => boolean, trueResult: SubscribableOrPromise = EMPTY, falseResult: SubscribableOrPromise = EMPTY): Observable`

## Subscribe to first or second observable based on a condition

[![Ultimate RxJS](https://ultimatecourses.com/static/banners/banner-rxjs.svg 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: simple iif

(
[Stackblitz](https://stackblitz.com/edit/rxjs-iif?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { iif, of, interval } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

const r$ = of('R');
const x$ = of('X');

interval(1000)
  .pipe(mergeMap(v => iif(() => v % 4 === 0, r$, x$)))
  .subscribe(console.log);

// output: R, X, X, X, R, X, X, X, etc...
```

##### Example 2: iif with mouse moves

(
[Stackblitz](https://stackblitz.com/edit/rxjs-iif-mousemoves?file=index.ts?file=index.ts&devtoolsheight=50)
)

```js
// RxJS v6+
import { fromEvent, iif, of } from 'rxjs';
import { mergeMap, map, throttleTime, filter } from 'rxjs/operators';

const r$ = of(`I'm saying R!!`);
const x$ = of(`X's always win!!`);

fromEvent(document, 'mousemove')
  .pipe(
    throttleTime(50),
    filter((move: MouseEvent) => move.clientY < 210),
    map((move: MouseEvent) => move.clientY),
    mergeMap(yCoord => iif(() => yCoord < 110, r$, x$))
  )
  .subscribe(console.log);
```

##### Example 3: iif with default

(
[Stackblitz](https://stackblitz.com/edit/rxjs-iif-pqmw2f?file=index.ts?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { fromEvent, iif, of, interval, pipe } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

interval(1000)
  .pipe(
    mergeMap(v =>
      iif(
        () => !!(v % 2),
        of(v)
        // if not supplied defaults to EMPTY
      )
    )
    // output: 1,3,5...
  )
  .subscribe(console.log);
```

### Related Recipes

- [Swipe To Refresh](/recipes/swipe-to-refresh.md)

### Additional Resources

- [iif](https://rxjs.dev/api/index/function/iif) 📰 - Official docs

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/iif.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/iif.ts)
