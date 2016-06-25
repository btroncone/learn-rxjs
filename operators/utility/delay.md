# delay
###signature: ` delay(delay: number | Date, scheduler: Scheduler): Observable`
*The gist: Delay output by specified time...*

([demo](http://jsbin.com/zebatixije/1/edit?js,console) | [ official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-delay))
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