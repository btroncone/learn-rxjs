# distinct

#### signature: `distinct<T, K>(keySelector?: (value: T) => K, flushes?: Observable<any>): MonoTypeOperatorFunction<T>`

## Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from previous items.

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs"><img src="https://ultimatecourses.com/assets/img/banners/rxjs-banner-desktop.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1:

(
[StackBlitz](https://stackblitz.com/edit/rxjs-distinct-example?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { from } from "rxjs";
import { distinct } from "rxjs/operators";

const obj1 = { id: 3, name: "name 1" };
const obj2 = { id: 4, name: "name 2" };
const obj3 = { id: 3, name: "name 3" };
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

- [distinct](https://rxjs.dev/api/operators/distinct)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/distinct.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/distinct.ts)
