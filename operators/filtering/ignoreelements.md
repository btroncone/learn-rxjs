# ignoreElements

#### signature: `ignoreElements(): Observable`

## Ignore everything but complete and error.

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs"><img src="https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Ignore all elements from source

(
[StackBlitz](https://stackblitz.com/edit/typescript-jpjcpg?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/yiyefelubi/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/59scjqss/) )

```js
// RxJS v6+
import { interval } from 'rxjs';
import { take, ignoreElements } from 'rxjs/operators';

//emit value every 100ms
const source = interval(100);
//ignore everything but complete
const example = source.pipe(
  take(5),
  ignoreElements()
);
//output: "COMPLETE!"
const subscribe = example.subscribe(
  val => console.log(`NEXT: ${val}`),
  val => console.log(`ERROR: ${val}`),
  () => console.log('COMPLETE!')
);
```

##### Example 2: Only displaying error

(
[StackBlitz](https://stackblitz.com/edit/typescript-3yxv9z?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/gogonawuze/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/srcwdgw6/) )

```js
// RxJS v6+
import { interval, throwError, of } from 'rxjs';
import { mergeMap, ignoreElements } from 'rxjs/operators';

//emit value every 100ms
const source = interval(100);
//ignore everything but error
const error = source.pipe(
  mergeMap(val => {
    if (val === 4) {
      return throwError(`ERROR AT ${val}`);
    }
    return of(val);
  }),
  ignoreElements()
);
//output: "ERROR: ERROR AT 4"
const subscribe = error.subscribe(
  val => console.log(`NEXT: ${val}`),
  val => console.log(`ERROR: ${val}`),
  () => console.log('SECOND COMPLETE!')
);
```

### Additional Resources

- [ignoreElements](https://rxjs.dev/api/operators/ignoreElements)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/ignoreElements.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/ignoreElements.ts)
