# distinct

#### signature: `distinct(keySelector?, flushes?): Observable`

## Emits items emitted that are distinct based on any previously emitted item.

[![Ultimate RxJS](https://ultimatecourses.com/static/banners/banner-rxjs.svg 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: distinct without selector

(
[StackBlitz](https://stackblitz.com/edit/rxjs-distinct-example-wphfch?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { of } from 'rxjs';
import { distinct } from 'rxjs/operators';

of(1, 2, 3, 4, 5, 1, 2, 3, 4, 5)
  .pipe(distinct())
  // OUTPUT: 1,2,3,4,5
  .subscribe(console.log);
```

##### Example 2: distinct with key selector

(
[StackBlitz](https://stackblitz.com/edit/rxjs-distinct-example?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { from } from 'rxjs';
import { distinct } from 'rxjs/operators';

const obj1 = { id: 3, name: 'name 1' };
const obj2 = { id: 4, name: 'name 2' };
const obj3 = { id: 3, name: 'name 3' };
const vals = [obj1, obj2, obj3];

from(vals)
  .pipe(distinct(e => e.id))
  .subscribe(console.log);

/*
OUTPUT:
{id: 3, name: "name 1"}
{id: 4, name: "name 2"}
 */
```

### Additional Resources

- [distinct](https://rxjs.dev/api/operators/distinct) 📰 - Official docs

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/distinct.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/distinct.ts)
