# windowWhen

#### signature: `windowWhen(closingSelector: function(): Observable): Observable`

## Close window at provided time frame emitting observable of collected values from source.

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX "Ultimate RxJS")](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: Open and close window at interval

(
[StackBlitz](https://stackblitz.com/edit/typescript-52tu8k?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/tuhaposemo/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/gnx9fb3h/) )

```js
// RxJS v6+
import { interval, timer } from 'rxjs';
import { windowWhen, tap, mergeAll } from 'rxjs/operators';

//emit immediately then every 1s
const source = timer(0, 1000);
const example = source.pipe(
  //close window every 5s and emit observable of collected values from source
  windowWhen(() => interval(5000)),
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
      4
      "NEW WINDOW!"
      5
      6
      7
      8
      9
    */
  )
  .subscribe(val => console.log(val));
```

### Additional Resources

- [windowWhen](https://rxjs.dev/api/operators/windowWhen)
  📰 - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/windowWhen.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/windowWhen.ts)
