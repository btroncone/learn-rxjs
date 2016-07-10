# skip
####signature: `skip(the: Number): Observable`
*The gist: Skip a specified number of emitted items...*


### Examples

##### Example 1: Skipping values before emission

( [jsBin](http://jsbin.com/hacepudabi/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/ar1eqbya/) )

```js
//emit every 1s
const source = Rx.Observable.interval(1000);
//skip the first 5 emitted values
const example = source.skip(5);
//output: 5...6...7...8........
const subscribe = example.subscribe(val => console.log(val));
```

### Follow the source code...
1. [Operator subscribes to source observable](https://github.com/ReactiveX/rxjs/blob/master/src/operator/skip.ts#L29)
2. [Internal count of emissions from source is kept](https://github.com/ReactiveX/rxjs/blob/master/src/operator/skip.ts#L39)
3. **IF** - [The count of emitted values from source is greater then supplied count, emit values to subscriber](https://github.com/ReactiveX/rxjs/blob/master/src/operator/skip.ts#L46-L48)


### Additional Resources
* [skip](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-skip) :newspaper: - Official docs
* [Filtering operator: take, first, skip](https://egghead.io/lessons/rxjs-filtering-operators-take-first-skip?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz