# delay

#### signature: `delay(delay: number | Date, scheduler: Scheduler): Observable`

## Delay emitted values by given time.

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Delay for increasing durations

(
[StackBlitz](https://stackblitz.com/edit/typescript-gc7gct?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/zebatixije/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/1kxtzcu6/) )

```js
// RxJS v6+
import { of, merge } from 'rxjs';
import { mapTo, delay } from 'rxjs/operators';

//emit one item
const example = of(null);
//delay output of each by an extra second
const message = merge(
  example.pipe(mapTo('Hello')),
  example.pipe(
    mapTo('World!'),
    delay(1000)
  ),
  example.pipe(
    mapTo('Goodbye'),
    delay(2000)
  ),
  example.pipe(
    mapTo('World!'),
    delay(3000)
  )
);
//output: 'Hello'...'World!'...'Goodbye'...'World!'
const subscribe = message.subscribe(val => console.log(val));
```

### Related Recipes

- [Progress Bar](../../recipes/progressbar.md)

### Additional Resources

- [delay](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-delay)
  :newspaper: - Official docs
- [Transformation operator: delay and delayWhen](https://egghead.io/lessons/rxjs-transformation-operators-delay-and-delaywhen?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/delay.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/delay.ts)
