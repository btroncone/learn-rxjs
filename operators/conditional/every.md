# every
####signature: `every(predicate: function, thisArg: any): Observable`
*The gist: Does every emitted item pass a condition?...*


### Examples

##### Example 1: Some values false

( [jsBin](http://jsbin.com/cibijotase/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/1b46tsm7/) )

```js
//emit 5 values
const source = Rx.Observable.of(1,2,3,4,5);
const example = source
  //is every value even?
  .every(val => val % 2 === 0)
//output: false
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: All values true

( [jsBin](http://jsbin.com/yuxefiviko/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/x34nLmcj/) )

```js
//emit 5 values
const allEvens = Rx.Observable.of(2,4,6,8,10);
const example = allEvens
  //is every value even?
  .every(val => val % 2 === 0);
//output: true
const subscribe = example.subscribe(val => console.log(val));
```

### Follow the source code...
*Coming soon...*


### Additional Resources
* [every](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-every) :newspaper: - Official docs