# windowTime

#### signature: `windowTime(windowTimeSpan: number, windowCreationInterval: number, scheduler: Scheduler): Observable`

## Observable of values collected from source for each provided time span.



### Examples

##### Example 1: Open new window every specified duration

(
[StackBlitz](https://stackblitz.com/edit/typescript-hkrjsc?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/mifayacoqo/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/g04b3qeb/) )

```js
// RxJS v6+
import { timer } from 'rxjs';
import { windowTime, tap, mergeAll } from 'rxjs/operators';

//emit immediately then every 1s
const source = timer(0, 1000);
const example = source.pipe(
  //start new window every 3s
  windowTime(3000),
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
            "NEW WINDOW!"
            3
            4
            5
          */
  )
  .subscribe(val => console.log(val));
```

### Additional Resources

- [windowTime](https://rxjs.dev/api/operators/windowTime) 📰 - Official docs

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/operators/windowTime.ts](https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/operators/windowTime.ts)
