# concat
###signature: `concat(observables: ...*): Observable`
*The gist: Like the line at an ATM, the next transaction (subscription) won't start until the previous completes...*

([jsBin](http://jsbin.com/kenusofudu/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/qg6qfqLz/2/) | [ official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-concat))
```js
//emits 1,2,3
const sourceOne = Rx.Observable.of(1,2,3);
//emits 4,5,6
const sourceTwo = Rx.Observable.of(4,5,6);
//emit values from sourceOne, when complete, subscribe to sourceTwo
const concatSource = sourceOne.concat(sourceTwo);
//output: 1,2,3,4,5,6
const subscribe = concatSource.subscribe(val => console.log('Example 1: Basic concat:', val));

//delay 3 seconds then emit
const delayedSourceOne = sourceOne.delay(3000);
//sourceTwo waits on sourceOne to complete before subscribing
const concatDelayedSource = delayedSourceOne.concat(sourceTwo);
//output: 1,2,3,4,5,6
const subscribeDelayed = concatDelayedSource.subscribe(val => console.log('Example 2: Delayed source one:', val));

//when sourceOne never completes, the subsequent observables never run
const sourceOneNeverComplete = Rx.Observable
  .concat(
  	Rx.Observable.interval(1000),
  	Rx.Observable.of('This','Never','Runs')  
  )
  //for logging clarity
  .delay(5000)
//outputs: 1,2,3,4....
const subscribeNeverComplete = sourceOneNeverComplete.subscribe(val => console.log('Example 3: Source one never completes, second observable never runs:', val));
```