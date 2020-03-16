# distinctUntilKeyChanged

#### signature: `distinctUntilKeyChanged(key, compare: fn): Observable`

## Only emit when the specified key value has changed

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1qq2-q-eVe-F_-d0eSvTyqaGRjpfLDdJz 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: Compare based on key

(
[StackBlitz](https://stackblitz.com/edit/typescript-hzta27?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { from } from 'rxjs';
import { distinctUntilKeyChanged } from 'rxjs/operators';

// only output distinct values, based on the last emitted value
const source$ = from([
  { name: 'Brian' },
  { name: 'Joe' },
  { name: 'Joe' },
  { name: 'Sue' }
]);

source$
  // custom compare based on name property
  .pipe(distinctUntilKeyChanged('name'))
  // output: { name: 'Brian }, { name: 'Joe' }, { name: 'Sue' }
  .subscribe(console.log);
```

##### Example 2: Keyboard events

(
[StackBlitz](https://stackblitz.com/edit/rxjs-distinctuntilkeychanged?file=index.ts&devtoolsheight=50)
)

```js
// RxJS v6+
import { fromEvent } from 'rxjs';
import { distinctUntilKeyChanged, pluck } from 'rxjs/operators';

const keys$ = fromEvent(document, 'keyup').pipe(
  distinctUntilKeyChanged < KeyboardEvent > 'code',
  pluck('key')
);

keys$.subscribe(console.log);
```

### Additional Resources

- [distinctUntilKeyChanged](https://rxjs.dev/api/operators/distinctUntilKeyChanged)
  📰 - Official docs

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/distinctUntilKeyChanged.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/distinctUntilKeyChanged.ts)
