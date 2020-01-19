# windowCount

#### signature: `windowCount(windowSize: number, startWindowEvery: number): Observable`

## Observable of values from source, emitted each time provided count is fulfilled.

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX "Ultimate RxJS")](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: Start new window every x items emitted

(
[StackBlitz](https://stackblitz.com/edit/typescript-kcxi8y?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/nezuvacexe/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/xjgbnqp5/) )

```js
// RxJS v6+
import { interval } from 'rxjs';
import { windowCount, mergeAll, tap } from 'rxjs/operators';

//emit every 1s
const source = interval(1000);
const example = source.pipe(
  //start new window every 4 emitted values
  windowCount(4),
  tap(_ => console.log('NEW WINDOW!'))
);

const subscribeTwo = example
  .pipe(
    //window emits nested observable
    mergeAll()
    /*
            output:
            "NEW WINDOW!"
            0
            1
            2
            3
            "NEW WINDOW!"
            4
            5
            6
            7
          */
  )
  .subscribe(val => console.log(val));
```

### Additional Resources

- [windowCount](https://rxjs.dev/api/operators/windowCount)
  📰 - Official docs

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/windowCount.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/windowCount.ts)
