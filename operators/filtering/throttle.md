# throttle
####signature: `throttle(durationSelector: function(value): Observable | Promise): Observable`
*The gist: Emit value only when specified duration, returned from provided function, has passed...*

### Examples

##### Example 1: Throttle for 2 seconds, based on second observable

( [jsBin](http://jsbin.com/wohefujipo/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/h8na4m0p/) )

```js
//emit value every 1 second
const source = Rx.Observable.interval(1000);
//throttle for 2 seconds, emit latest value
const example = source.throttle(val => Rx.Observable.interval(2000));
//output: 0...3...6...9
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Throttle with promise

( [jsBin](http://jsbin.com/seyaguwunu/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/w5Lbzz9f/) )

```js
//emit value every 1 second
const source = Rx.Observable.interval(1000);
//incrementally increase the time to resolve based on source
const promise = val => new Promise(resolve => setTimeout(() => resolve(`Resolved: ${val}`), val * 100));
//when promise resolves emit item from source
const example = source
	.throttle(promise)
  .map(val => `Throttled off Promise: ${val}`);

const subscribe = example.subscribe(val => console.log(val));
```


### Additional Resources
* [throttle](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-throttle) :newspaper: - Official docs
* [Filtering operator: throttle and throttleTime](https://egghead.io/lessons/rxjs-filtering-operators-throttle-and-throttletime?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz


> :file_folder: [https://github.com/ReactiveX/rxjs/blob/master/src/operator/throttle.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/throttle.ts)