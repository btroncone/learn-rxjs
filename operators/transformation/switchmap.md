# switchMap
####signature: `switchMap(a: Observable): Observable`
*The gist: When source emits, switch to and emit values emitted from latest inner observable*

( [jsBin](http://jsbin.com/decinatisu/1/edit?js,console,output) | [jsFiddle](https://jsfiddle.net/qg6qfqLz/42/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-switchMap) )

```js
//emit immediately, then every 5s
const source = Rx.Observable.timer(0, 5000);
//switch to new inner observable when source emits, emit items that are emitted
const example = source.switchMap(() => Rx.Observable.interval(500));
//output: 0,1,2,3,4,5,6,7,8,9...0,1,2,3,4,5,6,7,8
const subscribe = example.subscribe(val => console.log(val));

//emit every click
const sourceTwo = Rx.Observable.fromEvent(document, 'click');
//if another click comes within 3s, message will not be emitted
const exampleTwo = sourceTwo.switchMap(val => Rx.Observable.interval(3000).mapTo('Hello, I made it!'));
//(click)...3s...'Hello I made it!'...(click)...2s(click)...
const subscribeTwo = exampleTwo.subscribe(val => console.log(val));
```

### How switchMap works...
*Coming soon...*


### Additional Resources
* [Starting a stream with switchMap](https://egghead.io/lessons/rxjs-starting-a-stream-with-switchmap?course=step-by-step-async-javascript-with-rxjs) :video_camera: :dollar: - John Linquist