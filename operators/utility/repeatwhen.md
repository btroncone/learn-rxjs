# repeatWhen

#### signature: `repeatWhen<T>(notifier: (notifications: Observable<any>) => Observable<any>): MonoTypeOperatorFunction<T>`

## Returns an Observable that mirrors the source Observable with the exception of a complete. If the source Observable calls complete, this method will emit to the Observable returned from notifier. If that Observable calls complete or error, then this method will call complete or error on the child subscription. Otherwise this method will resubscribe to the source Observable.

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs"><img src="https://ultimatecourses.com/assets/img/banners/rxjs-banner-desktop.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Repeat on interval

(
[StackBlitz](https://stackblitz.com/edit/rxjs-repeatwhen?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { of, interval } from 'rxjs'; 
import { repeatWhen, take } from 'rxjs/operators';

const repeatInterval$ = interval(1000).pipe(take(5));
const source$ = of('hey!').pipe(repeatWhen(_ => repeatInterval$));

source$.subscribe(console.log);

/*
OUTPUT:
hey!
hey!
hey!
hey!
hey!
hey!
*/
```

### Additional Resources

- [repeatWhen](https://rxjs-dev.firebaseapp.com/api/operators/repeatWhen)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/6.5.2/src/internal/operators/repeatWhen.ts#L12-L45](https://github.com/ReactiveX/rxjs/blob/6.5.2/src/internal/operators/repeatWhen.ts#L12-L45)
