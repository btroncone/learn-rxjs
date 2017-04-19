# pairwise
#### signature: `pairwise(): Observable<Array>`

## Emit the previous and current values as an array.

### Examples

##### Example 1:

( [jsBin](http://jsbin.com/gumiyufaqi/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/8va47bq3/) )

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
