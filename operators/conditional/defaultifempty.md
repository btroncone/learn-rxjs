# defaultIfEmpty
###signature: `defaultIfEmpty(defaultValue: any): Observable`
*The gist: When observable is empty use given default, or null...*

([jsBin](http://jsbin.com/ricotitasu/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/qg6qfqLz/9/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-defaultIfEmpty))
```js
const empty = Rx.Observable.of();
//emit 'Observable.of() Empty!' when empty, else any values from source
const exampleOne = empty.defaultIfEmpty('Observable.of() Empty!');
//output: 'Observable.of() Empty!'
const subscribe = exampleOne.subscribe(val => console.log(val));

//empty observable
const emptyTwo = Rx.Observable.empty();
//emit 'Observable.empty()!' when empty, else any values from source
const exampleTwo = emptyTwo.defaultIfEmpty('Observable.empty()!');
//output: 'Observable.empty()!'
const subscribe = exampleTwo.subscribe(val => console.log(val));
```