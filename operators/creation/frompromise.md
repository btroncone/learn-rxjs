# fromPromise

#### signature: `fromPromise(promise: Promise, scheduler: Scheduler): Observable`

## Create observable from promise, emitting result.

---

:bulb: Flattening operators can generally accept promises without wrapping!

:bulb: You could also use [Observable.from](from.md) for the same result!

---

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Converting promise to observable and catching errors

( [jsBin](http://jsbin.com/cokivecima/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/upy6nr6n/) )

```js
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { mergeMap, catchError } from 'rxjs/operators';

//example promise that will resolve or reject based on input
const myPromise = willReject => {
  return new Promise((resolve, reject) => {
    if (willReject) {
      reject('Rejected!');
    }
    resolve('Resolved!');
  });
};
//emit true, then false
const source = of(true, false);
const example = source.pipe(
  mergeMap(val =>
    fromPromise(myPromise(val)).pipe(
      //catch and gracefully handle rejections
      catchError(error => of(`Error: ${error}`))
    )
  )
);
//output: 'Error: Rejected!', 'Resolved!'
const subscribe = example.subscribe(val => console.log(val));
```

### Additional Resources

* [fromPromise](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-fromPromise)
  :newspaper: - Official docs
* [Creation operators: from, fromArray, fromPromise](https://egghead.io/lessons/rxjs-creation-operators-from-fromarray-frompromise?course=rxjs-beyond-the-basics-creating-observables-from-scratch)
  :video_camera: :dollar: - André Staltz
* [fromPromise - Guide](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/promises.md)

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/fromPromise.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/fromPromise.ts)
