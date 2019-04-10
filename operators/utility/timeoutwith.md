# timeoutWith

#### signature: `timeoutWith<T, R>(due: number | Date, withObservable: ObservableInput<R>, scheduler: SchedulerLike = async): OperatorFunction<T, T | R>`

## Subscribe to second Observable if no emission occurs in given time span.

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/angular"><img src="https://ultimatecourses.com/assets/img/banners/ultimate-angular-leader.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Timeout after 1 second

(
[StackBlitz](https://stackblitz.com/edit/rxjs-timeoutwith?file=index.ts&devtoolsheight=100) )

```js
// RxJS v6+
import { of } from 'rxjs';
import { timeoutWith, delay, concatMap } from 'rxjs/operators';

const fakeRequest = delayTime => of('!response!').pipe(delay(delayTime));
const requestTimeoutLogger = of('logging request timeout');
const timeoutThreshold = 1000;

of(timeoutThreshold + 1, timeoutThreshold - 1, timeoutThreshold + 3)
  .pipe(
    concatMap(e => fakeRequest(e)
      .pipe(timeoutWith(timeoutThreshold, requestTimeoutLogger))
    )
  ).subscribe(console.log);

/*
  OUTPUT:
    logging request timeout
    !response!
    logging request timeout
*/
```

### Additional Resources

- [timeoutWith](https://rxjs-dev.firebaseapp.com/api/operators/timeoutWith)
  :newspaper: - Official Docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/timeoutWith.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/timeoutWith.ts)
