# takeUntil

####signature: ` takeUntil(notifier: Observable): Observable`
*The gist: Emit values until another observable emits...*

( [jsBin](http://jsbin.com/razojivezi/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/zbe9dzb9/) )

```js
//emit value every 1s
const source = Rx.Observable.interval(1000);
//after 5 seconds, emit value
const timer = Rx.Observable.timer(5000);
//when timer emits after 5s, complete source
const example = source.takeUntil(timer);
//output: 0,1,2,3
const subscribe = example.subscribe(val => console.log(val));

//is number even?
const isEven = val => val % 2 === 0;
//only allow values that are even
const evenSource = source.filter(isEven);
//keep a running total of the number of even numbers out
const evenNumberCount = evenSource
	.scan((acc, _) => acc + 1, 0);
//do not emit until 5 even numbers have been emitted
const fiveEvenNumbers = evenNumberCount.filter(val => val > 5);
  
const exampleTwo = evenSource
	//also give me the current even number count for display
  .withLatestFrom(evenNumberCount)
	.map(([val, count]) => `Even number (${count}) : ${val}`)
  //when five even numbers have been emitted, complete source observable
  .takeUntil(fiveEvenNumbers);
/*
	Even number (1) : 0,
    Even number (2) : 2
	Even number (3) : 4
	Even number (4) : 6
	Even number (5) : 8
*/
const subscribeTwo = exampleTwo.subscribe(val => console.log(val));
```

### How takeUntil works...
*Coming soon...*

### Additional Resources
* [takeUntil](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-takeUntil) :newspaper: - Official docs
* [Stopping a stream with takeUntil](https://egghead.io/lessons/rxjs-stopping-a-stream-with-takeuntil?course=step-by-step-async-javascript-with-rxjs) :video_camera: :dollar: - John Linquist
