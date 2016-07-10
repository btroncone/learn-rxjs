# skipUntil
####signature: `skipUntil(the: Observable): Observable`
*The gist: Skip emitted items from source until inner observable emits...*


### Examples

##### Example 1: Skip until observable emits

( [jsBin](http://jsbin.com/tapizososu/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/xLu8nf77/) )

```js
//emit every 1s
const source = Rx.Observable.interval(1000);
//skip emitted values from source until inner observable emits (6s)
const example = source.skipUntil(Rx.Observable.timer(6000));
//output: 5...6...7...8........
const subscribe = example.subscribe(val => console.log(val));
```

### Follow the Source Code
*Coming soon...*


### Additional Resources
* [skipUntil](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-skipUntil) :newspaper: - Official docs