# single

#### signature: `single(a: Function): Observable`

## Emit single item that passes expression.

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX "Ultimate RxJS")](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: Emit first number passing predicate

(
[StackBlitz](https://stackblitz.com/edit/typescript-qhynlr?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/solecibuza/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/26r5y90s/) )

```js
// RxJS v6+
import { from } from 'rxjs';
import { single } from 'rxjs/operators';

//emit (1,2,3,4,5)
const source = from([1, 2, 3, 4, 5]);
//emit one item that matches predicate
const example = source.pipe(single(val => val === 4));
//output: 4
const subscribe = example.subscribe(val => console.log(val));
```

### Additional Resources

- [single](https://rxjs.dev/api/operators/single)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/single.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/single.ts)
