# delayWhen

#### signature: `delayWhen(selector: Function, sequence: Observable): Observable`

## Delay emitted values determined by provided function.

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Delay based on observable

( [jsBin](http://jsbin.com/topohekuje/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/b057mxkL/) )

```js
import { interval } 'rxjs/observable/interval';
import { timer } 'rxjs/observable/timer';
import { delayWhen } from 'rxjs/operators';

//emit value every second
const message = interval(1000);
//emit value after five seconds
const delayForFiveSeconds = () => timer(5000);
//after 5 seconds, start emitting delayed interval values
const delayWhenExample = message.pipe(delayWhen(delayForFiveSeconds));
//log values, delayed for 5 seconds
//ex. output: 5s....1...2...3
const subscribe = delayWhenExample.subscribe(val => console.log(val));
```

### Additional Resources

* [delayWhen](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-delayWhen)
  :newspaper: - Official docs
* [Transformation operator: delay and delayWhen](https://egghead.io/lessons/rxjs-transformation-operators-delay-and-delaywhen?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/delayWhen.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/delayWhen.ts)
