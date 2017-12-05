# delay

#### signature: `delay(delay: number | Date, scheduler: Scheduler): Observable`

## Delay emitted values by given time.

### Examples

##### Example 1: Delay for increasing durations

( [jsBin](http://jsbin.com/zebatixije/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/1kxtzcu6/) )

```js
//emit one item
const example = Rx.Observable.of(null);
//delay output of each by an extra second
const message = Rx.Observable.merge(
  example.mapTo('Hello'),
  example.mapTo('World!').delay(1000),
  example.mapTo('Goodbye').delay(2000),
  example.mapTo('World!').delay(3000)
);
//output: 'Hello'...'World!'...'Goodbye'...'World!'
const subscribe = message.subscribe(val => console.log(val));
```

### Additional Resources

* [delay](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-delay)
  :newspaper: - Official docs
* [Transformation operator: delay and delayWhen](https://egghead.io/lessons/rxjs-transformation-operators-delay-and-delaywhen?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/operator/delay.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/delay.ts)
