# skipWhile
####signature: `skipWhile(predicate: Function): Observable`

## Skip emitted values from source until provided expression is false.

### Examples

##### Example 1: Skip while values below threshold

( [jsBin](http://jsbin.com/bemikuleya/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/3ymfxb09/) )

```js
//emit every 1s
const source = Rx.Observable.interval(1000);
//skip emitted values from source while value is less than 5
const example = source.skipWhile(val => val < 5);
//output: 5...6...7...8........
const subscribe = example.subscribe(val => console.log(val));
```


### Additional Resources
* [skipWhile](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-skipWhile) :newspaper: - Official docs

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/skipWhile.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/skipWhile.ts)
