# pairwise
####signature: `pairwise(): Observable<Array>`

## Pair the previous value and the current value and emit them in an array.

### Examples

##### Example 1:

( [jsFiddle](https://jsfiddle.net/ElHuy/s1a97n16/) )

```js
var interval = Rx.Observable.interval(1000);

//Returns: [0,1], [1,2], [2,3], [3,4], [4,5]
interval.pairwise()
	.take(5)
	.subscribe(console.log);
```

### Additional Resources
* [pairwise](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-pairwise) :newspaper: - Official docs

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/pairwise.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/pairwise.ts)
