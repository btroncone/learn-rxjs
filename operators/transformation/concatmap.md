# concatMap
###signature: `concatMap(project: function, resultSelector: function): Observable`
*The gist: Map values from source to inner observable, subscribe and emit inner observable values in order...*

*You could also: `map -> concatAll`*

([jsBin](http://jsbin.com/dekadarube/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/qg6qfqLz/32/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-concatMap))
```js
//emit 'Hello' and 'Goodbye'
const source = Rx.Observable.of('Hello', 'Goodbye');
// map value from source into inner observable, when complete emit result and move to next
const exampleOne = source.concatMap(val => Rx.Observable.of(`${val} World!`));
//output: 'Example One: 'Hello World', Example One: 'Goodbye World'
const subscribe = exampleOne
  .subscribe(val => console.log('Example One:', val));

//example with promise
const examplePromise = val => new Promise(resolve => resolve(`${val} World!`));
// map value from source into inner observable, when complete emit result and move to next
const exampleTwo = source.concatMap(val => examplePromise(val))
//output: 'Example w/ Promise: 'Hello World', Example w/ Promise: 'Goodbye World'
const subscribeTwo = exampleTwo
  //delay for logging clarity
  .delay(1000)
  .subscribe(val => console.log('Example w/ Promise:', val));

//result of first param passed to second param selector function before being  returned
const exampleWithSelector = source.concatMap(val => examplePromise(val), result => `${result} w/ selector!`);
//output: 'Example w/ Selector: 'Hello w/ Selector', Example w/ Selector: 'Goodbye w/ Selector'
const subscribeThree = exampleWithSelector
  //delay for logging clarity
  .delay(2000)
  .subscribe(val => console.log('Example w/ Selector:', val));
```