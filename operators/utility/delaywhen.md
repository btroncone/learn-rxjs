# delayWhen
####signature: `delayWhen(selector: Function, sequence: Observable): Observable`
*The gist: Delay output by specified time, determined by provided function...*


### Examples

##### Example 1: Delay based on observable

( [jsBin](http://jsbin.com/topohekuje/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/b057mxkL/) )

```js
//emit value every second
const message = Rx.Observable.interval(1000);
//emit value after five seconds
const delayForFiveSeconds = () => Rx.Observable.timer(5000);
//after 5 seconds, start emitting delayed interval values
const delayWhenExample = message.delayWhen(delayForFiveSeconds);
//log values, delayed for 5 seconds
//ex. output: 5s....1...2...3
const subscribe = delayWhenExample.subscribe(val => console.log(val));
```


### Additional Resources
* [delayWhen](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-delayWhen) :newspaper: - Official docs
* [Transformation operator: delay and delayWhen](https://egghead.io/lessons/rxjs-transformation-operators-delay-and-delaywhen?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz


> :file_folder: [https://github.com/ReactiveX/rxjs/blob/master/src/operator/delayWhen.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/delayWhen.ts)