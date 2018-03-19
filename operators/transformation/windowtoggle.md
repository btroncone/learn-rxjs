# windowToggle

#### signature: `windowToggle(openings: Observable, closingSelector: function(value): Observable): Observable`

## Collect and emit observable of values from source between opening and closing emission.

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Toggle window at increasing interval

( [StackBlitz](https://stackblitz.com/edit/typescript-t14gn2?file=index.ts) |
[jsBin](http://jsbin.com/xasofupuka/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/3xmmuzy4/) )

```js
import { interval } from 'rxjs/observable/interval';
import { timer } from 'rxjs/observable/timer';
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

* [windowToggle](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-windowToggle)
  :newspaper: - Official docs
* [Split an RxJS observable conditionally with windowToggle](https://egghead.io/lessons/rxjs-split-an-rxjs-observable-conditionally-with-windowtoggle?course=use-higher-order-observables-in-rxjs-effectively)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/windowToggle.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/windowToggle.ts)
