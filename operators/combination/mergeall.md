# mergeAll

#### signature: `mergeAll(concurrent: number): Observable`

## Collect and subscribe to all observables.

---

:bulb: In many cases you can use [mergeMap](../transformation/mergemap.md) as a
single operator instead!

---

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

(
[example tests](https://github.com/btroncone/learn-rxjs/blob/master/operators/specs/combination/mergeall-spec.ts)
)

##### Example 1: mergeAll with promises

( [StackBlitz](https://stackblitz.com/edit/typescript-w2kazd?file=index.ts) |
[jsBin](http://jsbin.com/worecuhiba/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/0sc4nsxa/) )

```js
import { map, mergeAll } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

const myPromise = val =>
  new Promise(resolve => setTimeout(() => resolve(`Result: ${val}`), 2000));
//emit 1,2,3
const source = of(1, 2, 3);

const example = source.pipe(
  //map each value to promise
  map(val => myPromise(val)),
  //emit result from source
  mergeAll()
);

/*
  output:
  "Result: 1"
  "Result: 2"
  "Result: 3"
*/
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: mergeAll with _concurrent_ parameter

( [StackBlitz](https://stackblitz.com/edit/typescript-qbxs2y?file=index.ts) |
[jsFiddle](https://jsfiddle.net/zra3zxhs/) )

```js
import { take, map, delay, mergeAll } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';

const source = interval(500).pipe(take(5));

/*
  interval is emitting a value every 0.5s.  This value is then being mapped to interval that
  is delayed for 1.0s.  The mergeAll operator takes an optional argument that determines how
  many inner observables to subscribe to at a time.  The rest of the observables are stored
  in a backlog waiting to be subscribe.
*/
const example = source
  .pipe(map(val => source.pipe(delay(1000), take(3))), mergeAll(2))
  .subscribe(val => console.log(val));
/*
  The subscription is completed once the operator emits all values.
*/
```

### Additional Resources

* [mergeAll](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeAll)
  :newspaper: - Official docs
* [Flatten a higher order observable with mergeAll in RxJS](https://egghead.io/lessons/rxjs-flatten-a-higher-order-observable-with-mergeall-in-rxjs?course=use-higher-order-observables-in-rxjs-effectively)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/mergeAll.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/mergeAll.ts)
