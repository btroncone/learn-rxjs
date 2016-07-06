# skipWhile
####signature: `skipWhile(predicate: Function): Observable`
*The gist: Skip emitted items from source until provided expression is false...*

( [jsBin](http://jsbin.com/bemikuleya/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/3ymfxb09/) )

```js
//emit every 1s
const source = Rx.Observable.interval(1000);
//skip emitted values from source while value is less than 5
const example = source.skipWhile(val => val < 5);
//output: 5...6...7...8........
const subscribe = example.subscribe(val => console.log(val));
```

### How skipWhile works...
*Coming soon...*


### Additional Resources
* [skipWhile](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-skipWhile) :newspaper: - Official docs