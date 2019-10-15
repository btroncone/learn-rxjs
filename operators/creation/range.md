# range

#### signature: `range(start: number, count: number, scheduler: Scheduler): Observable`

## Emit numbers in provided range in sequence.

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs"><img src="https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Emit range 1-10

(
[StackBlitz](https://stackblitz.com/edit/typescript-r5zrww?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/yalefomage/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/cfvfgwn9/) )

```js
// RxJS v6+
import { range } from 'rxjs';

//emit 1-10 in sequence
const source = range(1, 10);
//output: 1,2,3,4,5,6,7,8,9,10
const example = source.subscribe(val => console.log(val));
```

### Additional Resources

- [range](https://rxjs.dev/api/index/function/range)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/range.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/range.ts)
