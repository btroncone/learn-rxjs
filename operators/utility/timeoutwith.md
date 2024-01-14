# timeoutWith

#### signature: `timeoutWith(due: number | Date, withObservable: ObservableInput, scheduler: SchedulerLike = async): OperatorFunction`

## Subscribe to second Observable if no emission occurs in given time span.

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1qq2-q-eVe-F_-d0eSvTyqaGRjpfLDdJz 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: Timeout after 1 second

(
[StackBlitz](https://stackblitz.com/edit/rxjs-timeoutwith?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { of } from 'rxjs';
import { timeoutWith, delay, concatMap } from 'rxjs/operators';

const fakeRequest = delayTime => of('!response!').pipe(delay(delayTime));
const requestTimeoutLogger = of('logging request timeout');
const timeoutThreshold = 1000;

of(timeoutThreshold + 1, timeoutThreshold - 1, timeoutThreshold + 3)
  .pipe(
    concatMap(e =>
      fakeRequest(e).pipe(timeoutWith(timeoutThreshold, requestTimeoutLogger))
    )
  )
  .subscribe(console.log);

/*
  OUTPUT:
    logging request timeout
    !response!
    logging request timeout
*/
```

### Additional Resources

- [timeoutWith](https://rxjs-dev.firebaseapp.com/api/operators/timeoutWith) 📰 - Official Docs

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/7.8.1/src/internal/operators/timeoutWith.ts](https://github.com/ReactiveX/rxjs/blob/7.8.1/src/internal/operators/timeoutWith.ts)
