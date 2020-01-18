# windowToggle

#### signature: `windowToggle(openings: Observable, closingSelector: function(value): Observable): Observable`

## Collect and emit observable of values from source between opening and closing emission.

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX "Ultimate RxJS")](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: Toggle window at increasing interval

(
[StackBlitz](https://stackblitz.com/edit/typescript-3nsyte?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/xasofupuka/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/3xmmuzy4/) )

```js
// RxJS v6+
import { timer, interval } from 'rxjs';
import { tap, windowToggle, mergeAll } from 'rxjs/operators';

//emit immediately then every 1s
const source = timer(0, 1000);
//toggle window on every 5
const toggle = interval(5000);
const example = source.pipe(
  //turn window on every 5s
  windowToggle(toggle, val => interval(val * 1000)),
  tap(_ => console.log('NEW WINDOW!'))
);

const subscribeTwo = example
  .pipe(
    //window emits nested observable
    mergeAll()
    /*
            output:
            "NEW WINDOW!"
            5
            "NEW WINDOW!"
            10
            11
            "NEW WINDOW!"
            15
            16
            "NEW WINDOW!"
            20
            21
            22
          */
  )
  .subscribe(val => console.log(val));
```

### Additional Resources

- [windowToggle](https://rxjs.dev/api/operators/windowToggle)
  :newspaper: - Official docs
- [Split an RxJS observable conditionally with windowToggle](https://egghead.io/lessons/rxjs-split-an-rxjs-observable-conditionally-with-windowtoggle?course=use-higher-order-observables-in-rxjs-effectively)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/windowToggle.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/windowToggle.ts)
