# reduce
#### signature: `reduce(accumulator: function, seed: any): Observable`

## Reduces the values from source observable to a single value that's emitted when the source completes.

:bulb: Just like [`Array.prototype.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce?v=a)

:bulb: If you need the current accumulated value on each emission, try [scan](scan.md)!

### Examples

##### Example 1: Sum a stream of numbers

( [jsBin](http://jsbin.com/dakuneneho/edit?js,console) | [jsFiddle](https://jsfiddle.net/f8fw7yka/) )

```js
const source = Rx.Observable.of(1, 2, 3, 4);
const example = source.reduce((acc,val) => acc + val);
//output: Sum: 10'
const subscribe = example.subscribe(val => console.log('Sum:', val));
```

### Additional Resources
* [reduce](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-reduce) :newspaper: - Official docs
* [Scan() vs reduce() | RxJS TUTORIAL](https://www.youtube.com/watch?v=myEeo2rZc3g) :video_camera: - Academind

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/reduce.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/reduce.ts)
