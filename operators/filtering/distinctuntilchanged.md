# distinctUntilChanged

#### signature: `distinctUntilChanged(compare: function): Observable`

## Only emit when the current value is different than the last.

---

:bulb: distinctUntilChanged uses `===` comparison by default, object references
must match!

:bulb: If you want to compare based on an object property, you can use
[`distinctUntilKeyChanged`](distinctuntilkeychanged.md) instead!

---

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs?ref=4"><img src="https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: distinctUntilChanged with basic values

(
[StackBlitz](https://stackblitz.com/edit/typescript-bsb8mw?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { from } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

// only output distinct values, based on the last emitted value
const source$ = from([1, 1, 2, 2, 3, 3]);

source$
  .pipe(distinctUntilChanged())
  // output: 1,2,3
  .subscribe(console.log);
```

##### Example 2: distinctUntilChanged with objects

(
[StackBlitz](https://stackblitz.com/edit/typescript-moe7mh?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { from } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

const sampleObject = { name: 'Test' };

//Objects must be same reference
const source$ = from([sampleObject, sampleObject, sampleObject]);

// only emit distinct objects, based on last emitted value
source$
  .pipe(distinctUntilChanged())
  // output: {name: 'Test'}
  .subscribe(console.log);
```

##### Example 3: Using custom comparer function

(
[StackBlitz](https://stackblitz.com/edit/typescript-hzta27?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { from } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

// only output distinct values, based on the last emitted value
const source$ = from([
  { name: 'Brian' },
  { name: 'Joe' },
  { name: 'Joe' },
  { name: 'Sue' }
]);

source$
  // custom compare for name
  .pipe(distinctUntilChanged((prev, curr) => prev.name === curr.name))
  // output: { name: 'Brian }, { name: 'Joe' }, { name: 'Sue' }
  .subscribe(console.log);
```

### Related Recipes

- [Lockscreen](../../recipes/lockscreen.md)
- [Save Indicator]('../../recipes/save-indicator.md)
- [Type Ahead](../../recipes/type-ahead.md)

### Additional Resources

- [distinctUntilChanged](https://rxjs.dev/api/operators/distinctUntilChanged)
  :newspaper: - Official docs
- [Filtering operator: distinct and distinctUntilChanged](https://egghead.io/lessons/rxjs-filtering-operators-distinct-and-distinctuntilchanged?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/distinctUntilChanged.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/distinctUntilChanged.ts)
