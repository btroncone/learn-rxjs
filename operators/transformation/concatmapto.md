# concatMapTo
####signature: `concatMapTo(observable: Observable, resultSelector: function): Observable`
*The gist: When source emits, always subscribe to the same observable, merging together results when complete...*

( [jsBin](http://jsbin.com/caqiruqula/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/qg6qfqLz/33/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-concatMapTo) )

```js
//emit value every 2 seconds
const interval = Rx.Observable.interval(2000);
const message = Rx.Observable.of('Second(s) elapsed!');
//when interval emits, subscribe to message until complete, merge for result
const example = interval.concatMapTo(message, (time, msg) => `${time} ${msg}`);
//log values
//output: '0 Second(s) elapsed', '1 Second(s) elapsed'
const subscribe = example.subscribe(val => console.log(val));

//emit value every second for 5 seconds
const basicTimer = Rx.Observable.interval(1000).take(5);
/* 
  ***Be Careful***: In situations like this where the source emits at a faster pace
  than the inner observable completes, memory issues can arise.
  (interval emits every 1 second, basicTimer completes every 5)
*/
//basicTimer will complete after 5 seconds, emitting 0,1,2,3,4
const exampleTwo = interval
	.concatMapTo(basicTimer, 
  	(firstInterval, secondInterval) => `${firstInterval} ${secondInterval}`
   );
/*
  output: 0 0
          0 1
          0 2
          0 3
          0 4
          1 0
          1 1
          continued...
          
*/
const subscribeTwo = exampleTwo.subscribe(val => console.log(val));
```