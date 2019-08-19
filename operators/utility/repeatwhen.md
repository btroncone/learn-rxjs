# repeatWhen

#### signature: `repeatWhen(notifier: (notifications: Observable) => Observable): Observable`

## Repeat an observable on completion based on custom criteria.

---

:bulb: If you just want to repeat a specified number of times, try [retry](retry.md)!

---


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

- [repeatWhen](https://rxjs.dev/api/operators/repeatWhen)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/6.5.2/src/internal/operators/repeatWhen.ts](https://github.com/ReactiveX/rxjs/blob/6.5.2/src/internal/operators/repeatWhen.ts)
