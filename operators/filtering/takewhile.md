# takeWhile

####signature: `takeWhile(predicate: function(value, index): boolean): Observable`
*The gist: Emit values until one fails test...*

( [jsBin](http://jsbin.com/zanefaqexu/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/yakd4jgc/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-takeWhile) )

```js
//emit 1,2,3,4,5
const source = Rx.Observable.of(1,2,3,4,5);
//allow values until value from source is greater then 4, then complete
const example = source.takeWhile(val => val <= 4);
//output: 1,2,3,4
const subscribe = example.subscribe(val => console.log(val));
```

### How takeWhile works...
*Coming soon...*


### Additional Resources
* [Completing a stream with takeWhile](https://egghead.io/lessons/rxjs-completing-a-stream-with-takewhile?course=step-by-step-async-javascript-with-rxjs) :video_camera: :dollar: - John Linquist
