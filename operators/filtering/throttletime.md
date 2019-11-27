# throttleTime

#### signature: `throttleTime(duration: number, scheduler: Scheduler): Observable`

## Emit first value then ignore for specified duration

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs"><img src="https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Emit first value, ignore for 5s window

(
[StackBlitz](https://stackblitz.com/edit/typescript-en2zqe?file=index.ts&devtoolsheight=100) )

```js
// RxJS v6+
import { interval } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

// emit value every 1 second
const source = interval(1000);
/*
  emit the first value, then ignore for 5 seconds. repeat...
*/
const example = source.pipe(throttleTime(5000));
// output: 0...6...12
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Emit on trailing edge using config

(
[StackBlitz](https://stackblitz.com/edit/typescript-5rwl6i?file=index.ts&devtoolsheight=100) )

```js
// RxJS v6+
import { interval, asyncScheduler } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

const source = interval(1000);
/*
  emit the first value, then ignore for 5 seconds. repeat...
*/
const example = source.pipe(throttleTime(
  5000,
  asyncScheduler,
  { trailing: true }
));
// output: 5...11...17
const subscribe = example.subscribe(val => console.log(val));
```

### Related Recipes

- [Horizontal Scroll Indicator](../../recipes/horizontal-scroll-indicator.md)
- [Lockscreen](../../recipes/lockscreen.md)

### Additional Resources

- [throttleTime](https://rxjs.dev/api/operators/throttleTime)
  :newspaper: - Official docs
- [Filtering operator: throttle and throttleTime](https://egghead.io/lessons/rxjs-filtering-operators-throttle-and-throttletime?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz
- [Time based operators comparison](../../concepts/time-based-operators-comparison.md)

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/throttleTime.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/throttleTime.ts)
