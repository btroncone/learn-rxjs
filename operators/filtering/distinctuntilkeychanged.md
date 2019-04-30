# distinctUntilKeyChanged

#### signature: `distinctUntilKeyChanged(key, compare: fn): Observable`

## Only emit when the specified key value has changed

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs"><img src="https://ultimatecourses.com/assets/img/banners/rxjs-banner-desktop.svg" style="width:100%;max-width:100%"></a></div>

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

### Additional Resources

- [distinctUntilKeyChanged](https://rxjs.dev/api/operators/distinctUntilKeyChanged)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/distinctUntilKeyChanged.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/distinctUntilKeyChanged.ts)
