# throttleTime

####signature: `throttleTime(duration: number, scheduler: Scheduler): Observable`
*The gist: Emit latest value when specified duration has passed...*


### Examples

##### Example 1: Receieve latest value every 5 seconds

( [jsBin](http://jsbin.com/koqujayizo/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/4zysLc3y/) )

```js
//emit value every 1 second
const source = Rx.Observable.interval(1000);
/*
  throttle for five seconds
  last value emitted before throttle ends will be emitted from source
*/
const example = source
  .throttleTime(5000);
//output: 0...6...12
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Throttle merged observable

( [jsBin](http://jsbin.com/juqinaqika/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/xhd1zy3m/) )

```js
//merge observables that emit every 1s, immediately, and every 5s
const source = Rx.Observable
	.merge(
        //emit every 2.25 seconds
		    Rx.Observable.interval(2250),
        //emit every 3 seconds
        Rx.Observable.interval(3000)
	);
//throttle for 5 seconds
const example = source.throttleTime(1500);
//output: 0...1...2...2...4...5...6...5
const subscribe = example.subscribe(val => console.log(val));
```

### How throttleTime works...
*Coming soon...*


### Additional Resources
* [throttleTime](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-throttleTime) :newspaper: - Official docs
* [Filtering operator: throttle and throttleTime](https://egghead.io/lessons/rxjs-filtering-operators-throttle-and-throttletime?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz
