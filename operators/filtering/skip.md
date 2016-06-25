# skip
###signature: `skip(the: Number): Observable`
*The gist: Skip a specified number of emitted items...*

([demo](http://jsbin.com/hacepudabi/1/edit?js,console) | [ official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-skip))
```js
//emit every 1s
const source = Rx.Observable.interval(1000);
//skip the first 5 emitted values
const example = source.skip(5);
//output: 5...6...7...8........
const subscribe = example.subscribe(val => console.log(val));
```