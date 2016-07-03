# merge
####signature: `merge(input: Observable): Observable`
*The gist: Squish outputs from multiple observables into a single source...*

( [jsBin](http://jsbin.com/wicubemece/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/qg6qfqLz/4/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-merge) )

```js
//emit every 2.5 seconds
const first = Rx.Observable.interval(2500);
//emit every 2 seconds
const second = Rx.Observable.interval(2000);
//emit every 1.5 seconds
const third = Rx.Observable.interval(1500);
//emit every 1 second
const fourth = Rx.Observable.interval(1000);

//emit outputs from one observable
const example = Rx.Observable.merge(
  first.mapTo('FIRST!'),
  second.mapTo('SECOND!'),
  third.mapTo('THIRD'),
  fourth.mapTo('FOURTH')
);
//output: "FOURTH", "THIRD", "SECOND!", "FOURTH", "FIRST!", "THIRD", "FOURTH"
const subscribe = example.subscribe(val => console.log(val));

//used as instance method
const exampleTwo = first.merge(fourth);
//output: 0,1,0,2....
const subscribeTwo = exampleTwo.subscribe(val => console.log(val));
```

### How merge works...
*Coming soon...*


### Additional Resources
* [Handling multiple streams with merge](https://egghead.io/lessons/rxjs-handling-multiple-streams-with-merge?course=step-by-step-async-javascript-with-rxjs) :video_camera: :dollar: - John Linquist
