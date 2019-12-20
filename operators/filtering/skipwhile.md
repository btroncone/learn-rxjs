# skipWhile

#### signature: `skipWhile(predicate: Function): Observable`

## Skip emitted values from source until provided expression is false.

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs?ref=4"><img src="https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Skip while values below threshold

(
[StackBlitz](https://stackblitz.com/edit/typescript-p5kapz?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/bemikuleya/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/3ymfxb09/) )

```js
// RxJS v6+
import { interval } from 'rxjs';
import { skipWhile } from 'rxjs/operators';

//emit every 1s
const source = interval(1000);
//skip emitted values from source while value is less than 5
const example = source.pipe(skipWhile(val => val < 5));
//output: 5...6...7...8........
const subscribe = example.subscribe(val => console.log(val));
```

### Additional Resources

- [skipWhile](https://rxjs.dev/api/operators/skipWhile)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/skipWhile.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/skipWhile.ts)
