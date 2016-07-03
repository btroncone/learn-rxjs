# throttle

####signature: `throttle(durationSelector: function(value): Observable | Promise): Observable`
*The gist: Emit value only when specified duration, returned from provided function, has passed...*

( [jsBin](http://jsbin.com/tajayovide/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/d3pn27dv/13/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-throttle) )

```js
//emit value every 1 second
const source = Rx.Observable.interval(1000);
//throttle for 2 seconds, emit latest value
const example = source.throttle(val => Rx.Observable.interval(2000));
//output: 0...3...6...9
const subscribe = example.subscribe(val => console.log(val));

//incrementally increase the time to resolve based on source
const promise = val => new Promise(resolve => setTimeout(() => resolve(`Resolved: ${val}`), val * 100));
//when promise resolves emit item from source
const exampleTwo = source
	.throttle(promise)
  .map(val => `Throttled off Promise: ${val}`);

const subscribeTwo = exampleTwo.subscribe(val => console.log(val));
```
### How throttle works...
*Coming soon...*


### Additional Resources
* [Filtering operator: throttle and throttleTime](https://egghead.io/lessons/rxjs-filtering-operators-throttle-and-throttletime?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz
