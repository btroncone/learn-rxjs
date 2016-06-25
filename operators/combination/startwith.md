# startWith
###signature: `startWith(an: Values): Observable`
*The gist: Emit specified item first...*

([demo](http://jsbin.com/jeyakemume/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-startWith))
```js
//emit (1,2,3)
const source = Rx.Observable.of(1,2,3);
//start with 0
const example =  source.startWith(0);
//output: 0,1,2,3
const subscribe = example.subscribe(val => console.log(val));

//emit ('World!', 'Goodbye', 'World!')
const sourceTwo = Rx.Observable.of('World!', 'Goodbye', 'World!');
//start with 'Hello', concat current string to previous
const exampleTwo = sourceTwo
  .startWith('Hello')
  .scan((acc, curr) => `${acc} ${curr}`);
/*
  output:
  "Hello"
  "Hello World!"
  "Hello World! Goodbye"
  "Hello World! Goodbye World!"
*/
const subscribeTwo = exampleTwo.subscribe(val => console.log(val));
```