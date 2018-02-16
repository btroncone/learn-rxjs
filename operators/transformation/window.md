# window

#### signature: `window(windowBoundaries: Observable): Observable`

## Observable of values for window of time.

### Examples

##### Example 1: Open window specified by inner observable

( [jsBin](http://jsbin.com/jituvajeri/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/rmgghg6d/) )

```js
import { timer } from 'rxjs/observable/timer';
import { window, scan, mergeAll } from 'rxjs/operators';

//emit immediately then every 1s
const source = timer(0, 1000);
const example = source.pipe(window(interval(3000)));
const count = example.pipe(scan((acc, curr) => acc + 1, 0));
/*
  "Window 1:"
  0
  1
  2
  "Window 2:"
  3
  4
  5
  ...
*/
const subscribe = count.subscribe(val => console.log(`Window ${val}:`));
const subscribeTwo = example
  .pipe(mergeAll())
  .subscribe(val => console.log(val));
```

### Additional Resources

* [window](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-window)
  :newspaper: - Official docs
* [Split an RxJS observable with window](https://egghead.io/lessons/rxjs-split-an-rxjs-observable-with-window?course=use-higher-order-observables-in-rxjs-effectively)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/window.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/window.ts)
