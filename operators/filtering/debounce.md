# debounce
###signature: `debounce(durationSelector: function): Observable`
*The gist: Throw away all emitted values that take less then the specified time (based on selector function) between output...*

([demo](http://jsbin.com/cofofizopo/1/edit?js,console) | [ official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-debounce))
```js
//emit four strings
const example = Rx.Observable.of('WAIT','ONE','SECOND','Last will display');
/*
    Only emit values after a second has passed between the last emission, 
    throw away all other values
*/
const debouncedExample = example.debounce(() => Rx.Observable.timer(1000));
/*
    In this example, all values but the last will be omitted
    output: 'Last will display'
*/
const subscribe = debouncedExample.subscribe(val => console.log(val));

//emit value every 1 second, ex. 0...1...2
const interval = Rx.Observable.interval(1000);
//raise the debounce time by 200ms each second
const debouncedInterval = interval.debounce(val => Rx.Observable.timer(val * 200))
/*
  After 5 seconds, debounce time will be greater than interval time,
  all future values will be thrown away
  output: 0...1...2...3...4......(debounce time over 1s, no values emitted)
*/
const subscribeTwo = debouncedInterval.subscribe(val => console.log(`Example Two: ${val}`));
```