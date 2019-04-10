# switchMapTo

#### signature: `switchMapTo(innerObservable: Observable, resultSelector: function(outerValue, innerValue, outerIndex, innerIndex): any): Observable`

## Map to same inner observable, complete previous inner observable.

---

:bulb: If you need to consider the emitted value from the source, try
[`switchMap`](switchmap.md)!

---

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/angular"><img src="https://ultimatecourses.com/assets/img/banners/ultimate-angular-leader.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Restart countdown on click, until countdown completes one time

( [StackBlitz](https://stackblitz.com/edit/typescript-r97ngc?file=index.ts) )

```js
// RxJS v6+
import { interval, fromEvent } from 'rxjs';
import {
  switchMapTo,
  scan,
  startWith,
  takeWhile,
  finalize
} from 'rxjs/operators';

const COUNTDOWN_TIME = 10;

// reference
const countdownElem = document.getElementById('countdown');

// streams
const click$ = fromEvent(document, 'click');
const countdown$ = interval(1000).pipe(
  scan((acc, _) => --acc, COUNTDOWN_TIME),
  startWith(COUNTDOWN_TIME)
);

click$
  .pipe(
    switchMapTo(countdown$),
    takeWhile(val => val >= 0),
    finalize(() => (countdownElem.innerHTML = "We're done here!"))
  )
  .subscribe((val: any) => (countdownElem.innerHTML = val));
```

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/switchMapTo.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/switchMapTo.ts)
