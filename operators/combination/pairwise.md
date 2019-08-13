# pairwise

#### signature: `pairwise(): Observable<Array>`

## Emit the previous and current values as an array.

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs"><img src="https://ultimatecourses.com/assets/img/banners/rxjs-banner-desktop.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1:

(
[StackBlitz](https://stackblitz.com/edit/typescript-tkuydr?file=index.ts&devtoolsheight=50)
| [jsBin](http://jsbin.com/keteyahido/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/8va47bq3/) )

```js
// RxJS v6+
import { pairwise, take } from 'rxjs/operators';
import { interval } from 'rxjs';

//Returns: [0,1], [1,2], [2,3], [3,4], [4,5]
interval(1000)
  .pipe(
    pairwise(),
    take(5)
  )
  .subscribe(console.log);
```

### Additional Resources

- [pairwise](https://rxjs.dev/api/operators/pairwise)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/pairwise.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/pairwise.ts)
