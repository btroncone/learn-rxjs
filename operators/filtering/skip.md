# skip

#### signature: `skip(the: Number): Observable`

## Skip the provided number of emitted values.

###Why use `skip`?
What skip allows you to do is to ignore the first however many emission from the source you want. The reasoning for the skip is entirely up to you. Perhaps you have an observable that always emit certain values at the beginning and you don't care for them. Perhaps those first few aren't needed and you don't want your observable to be noisy with unecessary emission. But at the end, you want to skip because you want to subscribe to your observable and are only interested in later portion of the emissions.

Think of it as a short hand of filtering the first handful of of indexes. `.filter((val, index) => index > 1)`

### Examples

##### Example 1: Skipping values before emission

( [jsBin](http://jsbin.com/hacepudabi/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/ar1eqbya/) )

```js
//emit every 1s
const source = Rx.Observable.interval(1000);
//skip the first 5 emitted values
const example = source.skip(5);
//output: 5...6...7...8........
const subscribe = example.subscribe(val => console.log(val));
```

#### Example 2: Short hand for a specific filter use case

([jsFiddle](https://jsfiddle.net/ElHuy/4jswLn3z/) )
```js
const numArrayObs = Rx.from([1,2,3,4,5,6,7,8,9,10]);

// 3,4,5...
const skipObs = numArrayObs
    .skip(2)
    .subscribe(console.log);

// 3,4,5...
const filterObs = numArrayObs
    .filter((val, index) => index > 1)
    .subscribe(console.log);

//Same output!
```

### Additional Resources

* [skip](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-skip)
  :newspaper: - Official docs
* [Filtering operator: take, first, skip](https://egghead.io/lessons/rxjs-filtering-operators-take-first-skip?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/operator/skip.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/skip.ts)
