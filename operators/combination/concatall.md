# concatAll

#### signature: `concatAll(): Observable`

## Collect observables and subscribe to next when previous completes.

---

:warning: Be wary of
[backpressure](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/backpressure.md)
when the source emits at a faster pace than inner observables complete!

:bulb: In many cases you can use [concatMap](../transformation/concatmap.md) as
a single operator instead!

---

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

(
[example tests](https://github.com/btroncone/learn-rxjs/blob/master/operators/specs/combination/concatall-spec.ts)
)

##### Example 1: concatAll with observable

( [StackBlitz](https://stackblitz.com/edit/typescript-yxntdx?file=index.ts) |
[jsBin](http://jsbin.com/nakinenuva/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/8dfuf2y6/) )

```js
import { map, concatAll } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { interval } from 'rxjs/observable/interval';

//emit a value every 2 seconds
const source = interval(2000);
const example = source.pipe(
  //for demonstration, add 10 to and return as observable
  map(val => of(val + 10)),
  //merge values from inner observable
  concatAll()
);
//output: 'Example with Basic Observable 10', 'Example with Basic Observable 11'...
const subscribe = example.subscribe(val =>
  console.log('Example with Basic Observable:', val)
);
```

##### Example 2: concatAll with promise

( [StackBlitz](https://stackblitz.com/edit/typescript-4o4fu7?file=index.ts) |
[jsBin](http://jsbin.com/bekegeyopu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/w7kp7qLs/) )

```js
import { map, concatAll } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';

//create and resolve basic promise
const samplePromise = val => new Promise(resolve => resolve(val));
//emit a value every 2 seconds
const source = interval(2000);

const example = source.pipe(
  map(val => samplePromise(val)),
  //merge values from resolved promise
  concatAll()
);
//output: 'Example with Promise 0', 'Example with Promise 1'...
const subscribe = example.subscribe(val =>
  console.log('Example with Promise:', val)
);
```

##### Example 3: Delay while inner observables complete

( [StackBlitz](https://stackblitz.com/edit/typescript-ad2emh?file=index.ts) |
[jsBin](http://jsbin.com/pojolatile/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/8230ucbg/) )

```js
import { take, concatAll } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { of } from 'rxjs/observable/of';

const obs1 = interval(1000).pipe(take(5));
const obs2 = interval(500).pipe(take(2));
const obs3 = interval(2000).pipe(take(1));
//emit three observables
const source = of(obs1, obs2, obs3);
//subscribe to each inner observable in order when previous completes
const example = source.pipe(concatAll());
/*
  output: 0,1,2,3,4,0,1,0
  How it works...
  Subscribes to each inner observable and emit values, when complete subscribe to next
  obs1: 0,1,2,3,4 (complete)
  obs2: 0,1 (complete)
  obs3: 0 (complete)
*/

const subscribe = example.subscribe(val => console.log(val));
```

### Additional Resources

* [concatAll](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-concatAll)
  :newspaper: - Official docs
* [Flatten a higher order observable with concatAll in RxJS](https://egghead.io/lessons/rxjs-flatten-a-higher-order-observable-with-concatall-in-rxjs?course=use-higher-order-observables-in-rxjs-effectively)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/concatAll.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/concatAll.ts)
