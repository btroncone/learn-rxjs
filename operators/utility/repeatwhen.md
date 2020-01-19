# repeatWhen

#### signature: `repeatWhen(notifier: (notifications: Observable) => Observable): Observable`

## Repeat an observable on completion based on custom criteria.

---

💡 If you just want to repeat a specified number of times, try [retry](retry.md)!

---


[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX "Ultimate RxJS")](https://ultimatecourses.com/courses/rxjs?ref=4)

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
  📰 - Official docs

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/6.5.2/src/internal/operators/repeatWhen.ts](https://github.com/ReactiveX/rxjs/blob/6.5.2/src/internal/operators/repeatWhen.ts)
