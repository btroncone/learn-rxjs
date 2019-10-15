# takeLast

#### signature: `takeLast(count: number): Observable`

## Emit the last n emitted values before completion

---

:bulb: If you want only the last emission from multiple observables, on
completion of multiple observables, try [forkJoin](../combination/forkjoin.md)!

---

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs"><img src="https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX" style="width:100%;max-width:100%"></a></div>

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

- [takeLast](https://rxjs-dev.firebaseapp.com/api/operators/takeLast)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/takeLast.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/takeLast.ts)
