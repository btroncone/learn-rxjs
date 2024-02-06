# takeLast

#### signature: `takeLast(count: number): Observable`

## Emit the last n emitted values before completion

---

💡 If you want only the last emission from multiple observables, on completion
of multiple observables, try [forkJoin](../combination/forkjoin.md)!

---

[![Ultimate RxJS](https://ultimatecourses.com/static/banners/banner-rxjs.svg 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: take the last 2 emitted values before completion

(
[StackBlitz](https://stackblitz.com/edit/typescript-zss7oo?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { of } from 'rxjs';
import { takeLast } from 'rxjs/operators';

const source = of('Ignore', 'Ignore', 'Hello', 'World!');
// take the last 2 emitted values
const example = source.pipe(takeLast(2));
// Hello, World!
const subscribe = example.subscribe(val => console.log(val));
```

### Additional Resources

- [takeLast](https://rxjs-dev.firebaseapp.com/api/operators/takeLast) 📰 -
  Official docs

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/takeLast.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/takeLast.ts)
