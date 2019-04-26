# endWith

#### signature: `endWith(an: Values): Observable`

## Emit given value(s) on completion.

---

:bulb: If you want to start with a value instead, check out
[`startWith`](startWith.md)!

:bulb: If you want to perform an action on completion, but do not want to emit a
value, check out [`finalize`](../utility/finalize.md)!

---

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/angular"><img src="https://ultimatecourses.com/assets/img/banners/ultimate-angular-leader.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Basic `endWith` example

(
[StackBlitz](https://stackblitz.com/edit/typescript-gexe9u?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { endWith } from 'rxjs/operators';
import { of } from 'rxjs';

const source$ = of('Hello', 'Friend', 'Goodbye');

source$
  // emit on completion
  .pipe(endWith('Friend'))
  // 'Hello', 'Friend', 'Goodbye', 'Friend'
  .subscribe(console.log(val));
```

##### Example 2: endWith multiple values

(
[StackBlitz](https://stackblitz.com/edit/typescript-dyed7x?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { endWith } from 'rxjs/operators';
import { of } from 'rxjs';

const source$ = of('Hello', 'Friend');

source$
  // emit on completion
  .pipe(endWith('Goodbye', 'Friend'))
  // 'Hello', 'Friend', 'Goodbye', 'Friend'
  .subscribe(console.log(val));
```

##### Example 3: Comparison to [`finalize`](../utility/finalize.md)

(
[StackBlitz](https://stackblitz.com/edit/typescript-lkk1pj?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { endWith, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

const source$ = of('Hello', 'Friend');

source$
  // emit on completion
  .pipe(
    endWith('Goodbye', 'Friend'),
    // this function is invoked when unsubscribe methods are called
    finalize(() => console.log('Finally'))
  )
  // 'Hello', 'Friend', 'Goodbye', 'Friend'
  .subscribe(val => console.log(val));
// 'Finally'
```

### Additional Resources

- [endWith](https://rxjs-dev.firebaseapp.com/api/operators/endWith)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/endWith.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/endWith.ts)
