# throttle

#### signature: `throttle(durationSelector: function(value): Observable | Promise): Observable`

## Emit value on the leading edge of an interval, but suppress new values until `durationSelector` has completed.

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Throttle for 2 seconds, based on second observable

( [jsBin](http://jsbin.com/wohefujipo/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/h8na4m0p/) )

```js
import { interval } from 'rxjs/observable/interval';
import { throttle } from 'rxjs/operators';

//emit value every 1 second
const source = interval(1000);
//throttle for 2 seconds, emit latest value
const example = source.pipe(throttle(val => interval(2000)));
//output: 0...3...6...9
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Throttle with promise

( [jsBin](http://jsbin.com/seyaguwunu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/w5Lbzz9f/) )

```js
import { interval } from 'rxjs/observable/interval';
import { throttle, map } from 'rxjs/operators';

//emit value every 1 second
const source = interval(1000);
//incrementally increase the time to resolve based on source
const promise = val =>
  new Promise(resolve =>
    setTimeout(() => resolve(`Resolved: ${val}`), val * 100)
  );
//when promise resolves emit item from source
const example = source
  .pipe(
    throttle(promise),
    map(val => `Throttled off Promise: ${val}`);
  );


const subscribe = example.subscribe(val => console.log(val));
```

### Additional Resources

* [throttle](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-throttle)
  :newspaper: - Official docs
* [Filtering operator: throttle and throttleTime](https://egghead.io/lessons/rxjs-filtering-operators-throttle-and-throttletime?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/throttle.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/throttle.ts)
