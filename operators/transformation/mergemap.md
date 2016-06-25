# mergeMap
###signature: `mergeMap(project: function: Observable, resultSelector: function: any, concurrent: number): Observable`
*The gist: Map values from source to inner observable, flatten output...*

*You could also: `map -> mergeAll`*

([jsBin](http://jsbin.com/haxobidino/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/qg6qfqLz/38/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMap))
```js
//emit 'Hello'
const source = Rx.Observable.of('Hello');
//map to inner observable and flatten
const example = source.mergeMap(val => Rx.Observable.of(`${val} World!`));
//output: 'Hello World!'
const subscribe = example.subscribe(val => console.log(val));

//mergeMap also emits result of promise
const myPromise = val => new Promise(resolve => resolve(`${val} World From Promise!`));
//map to promise and emit result
const exampleTwo = source.mergeMap(val => myPromise(val));
//output: 'Hello World From Promise'
const subscribeTwo = exampleTwo.subscribe(val => console.log(val));
/*
  you can also supply a second argument which recieves the source value and emitted
  value of inner observable or promise
*/
const exampleThree = source
  .mergeMap(val => myPromise(val), 
    (valueFromSource, valueFromPromise) => {
      return `Source: ${valueFromSource}, Promise: ${valueFromPromise}`;
});
//output: "Source: Hello, Promise: Hello World From Promise!"
const subscribeThree = exampleThree.subscribe(val => console.log(val));
```