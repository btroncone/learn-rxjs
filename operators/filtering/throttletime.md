# throttleTime

####signature: `throttleTime(duration: number, scheduler: Scheduler): Observable`
*The gist: Emit value only when specified duration has passed...*

( [jsBin](http://jsbin.com/vifezopeto/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/d3pn27dv/14/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-throttleTime) )

```js
//emit value every 1 second
const source = Rx.Observable.interval(1000);
//throttle for 5 seconds
const example = source.throttleTime(5000)
//output: 0...6...12
const subscribe = example.subscribe(val => console.log(val));

//merge observables that emit every 1s, immediately, and every 5s
const sourceTwo = Rx.Observable
	.merge(
		Rx.Observable.interval(1000).mapTo('1s interval'),
    Rx.Observable.of('Hello World'),
    Rx.Observable.interval(5000).mapTo('5s interval')
	);
 //throttle output to 5s
const exampleTwo = sourceTwo.throttleTime(5000);
/*
  'Hello World'
  0
  '5s interval'
  6
  '1s interval'
  12
  '1s interval'
*/
const subscribeTwo = exampleTwo.subscribe(val => console.log(val));
```


### How throttleTime works...
*Coming soon...*


### Additional Resources
*Coming soon...*