# throttleTime

#### signature: `throttleTime(duration: number, scheduler: Scheduler): Observable`

## Emit latest value when specified duration has passed.

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Receive latest value every 5 seconds

( [jsBin](http://jsbin.com/koqujayizo/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/4zysLc3y/) )

```js
import { interval } from 'rxjs/observable/interval';
import { throttleTime } 'rxjs/operators';

//emit value every 1 second
const source = interval(1000);
/*
  throttle for five seconds
  last value emitted before throttle ends will be emitted from source
*/
const example = source.pipe(throttleTime(5000));
//output: 0...6...12
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Throttle merged observable

( [jsBin](http://jsbin.com/takipadaza/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/xhd1zy3m/) )

```js
import { interval } from 'rxjs/observable/interval';
import { merge } from 'rxjs/observable/merge';
import { throttleTime, ignoreElements } from 'rxjs/operators';

const source = merge(
  //emit every .75 seconds
  interval(750),
  //emit every 1 second
  interval(1000)
);
//throttle in middle of emitted values
const example = source.pipe(throttleTime(1200));
//output: 0...1...4...4...8...7
const subscribe = example.subscribe(val => console.log(val));
```

### Additional Resources

* [throttleTime](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-throttleTime)
  :newspaper: - Official docs
* [Filtering operator: throttle and throttleTime](https://egghead.io/lessons/rxjs-filtering-operators-throttle-and-throttletime?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/patching/operator/throttleTime.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/patching/operator/throttleTime.ts)
