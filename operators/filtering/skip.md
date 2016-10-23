# skip
####signature: `skip(the: Number): Observable`

## Skip the provided number of emitted values.

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


### Additional Resources
* [skip](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-skip) :newspaper: - Official docs
* [Filtering operator: take, first, skip](https://egghead.io/lessons/rxjs-filtering-operators-take-first-skip?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/skip.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/skip.ts)
