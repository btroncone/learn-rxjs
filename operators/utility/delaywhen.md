# delayWhen
####signature: `delayWhen(selector: Function, sequence: Observable): Observable`
*The gist: Delay output by specified time, determined by provided function...*

( [jsBin](http://jsbin.com/topohekuje/edit?js,console) | [jsFiddle](https://jsfiddle.net/qg6qfqLz/49/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-delayWhen) )

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