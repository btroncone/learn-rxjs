# single
###signature: `single(a: Function): Observable`
*The gist: Emit single item that matches condition...*

([jsBin](http://jsbin.com/solecibuza/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/qg6qfqLz/21/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-single))
```js
//emit (1,2,3,4,5)
const source = Rx.Observable.from([1,2,3,4,5]);
//emit one item that matches predicate
const example = source.single(val => val === 4);
//output: 4
const subscribe = example.subscribe(val => console.log(val));
```