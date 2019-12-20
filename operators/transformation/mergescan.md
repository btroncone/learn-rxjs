# mergeScan

#### signature: `mergeScan(accumulator: (acc, value, index: number) => ObservableInput, seed, concurrent: number = Number.POSITIVE_INFINITY): OperatorFunction`

## Accumulate value over time via merged observables.

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs?ref=4"><img src="https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Accumulate total duration mouse held down over time

(
[StackBlitz](https://stackblitz.com/edit/typescript-gzaak8?file=index.ts&devtoolsheight=50)
)

```js
// RxJS v6+
import { fromEvent, interval } from 'rxjs';
import { mergeScan, take, takeUntil, map, scan } from 'rxjs/operators';

// reference
const durationElem = document.getElementById('duration');

// streams
const mouseDown$ = fromEvent(document, 'mousedown');
const mouseUp$ = fromEvent(document, 'mouseup');

// accumulate time mouse held down over time
mouseDown$
  .pipe(
    mergeScan((acc, curr) => {
      return interval(1000).pipe(
        scan((a, _) => ++a, 0),
        map((val: any) => val + acc),
        takeUntil(mouseUp$)
      );
    }, 0)
    // output: 1s...2s...3s...4s...
  )
  .subscribe(val => (durationElem.innerHTML = `${val}s`));
```

### Additional Resources

- [pluck](https://rxjs-dev.firebaseapp.com/api/operators/mergeScan)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/mergeScan.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/mergeScan.ts)
