# iif

#### signature: `iif<T, F>(condition: () => boolean, trueResult: SubscribableOrPromise<T> = EMPTY, falseResult: SubscribableOrPromise<F> = EMPTY): Observable<T | F>`

## Decides at subscription time which Observable will actually be subscribed.

<div class="ua-ad"><a href="https://ultimatecourses.com/?ref=76683_kee7y7vk"><img src="https://ultimatecourses.com/assets/img/banners/ultimate-angular-leader.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: simple iif

(
[Stackblitz](https://stackblitz.com/edit/rxjs-iif?file=index.ts&devtoolsheight=100) )

```js
// RxJS v6+
import { iif, of, interval } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

const r$ = of('R');
const x$ = of('X');

interval(1000).pipe(
  mergeMap(v =>
    iif(
      () => v % 4 === 0,
      r$,
      x$
    ))
).subscribe(console.log);

//output: R, X, X, X, R, X, X, X, etc...

```

##### Example 2: iif with mouse moves

(
[Stackblitz](https://stackblitz.com/edit/rxjs-iif-mousemoves?file=index.ts?file=index.ts&devtoolsheight=50) )

```js
// RxJS v6+
import { fromEvent, iif, of } from 'rxjs';
import { mergeMap, map, throttleTime, filter } from 'rxjs/operators';

const r$ = of(`I'm saying R!!`);
const x$ = of(`X's always win!!`);

fromEvent(document, 'mousemove').pipe(
  throttleTime(50),
  filter((move: MouseEvent) => move.clientY < 210),
  map((move: MouseEvent) => move.clientY),
  mergeMap(yCoord =>
    iif(
      () => yCoord < 110,
      r$,
      x$
    ))
).subscribe(console.log);

```

### Additional Resources

- [iif](https://rxjs-dev.firebaseapp.com/api/index/function/iif)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/iif.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/iif.ts)
