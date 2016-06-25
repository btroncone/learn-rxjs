# every
###signature: `every(predicate: function, thisArg: any): Observable`
*The gist: Does every emitted item pass a condition?...*

([demo](http://jsbin.com/mafacebuwu/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-every))
```js
//emit 5 values
const source = Rx.Observable.of(1,2,3,4,5);
const example = source
  //is every value even?
  .every(val => val % 2 === 0)
//output: false
const subscribe = example.subscribe(val => console.log(val));
//emit 5 values
const allEvens = Rx.Observable.of(2,4,6,8,10);
const exampleTwo = allEvens
  //is every value even?
  .every(val => val % 2 === 0);
//output: true
const subscribeTwo = exampleTwo.subscribe(val => console.log(val));
```