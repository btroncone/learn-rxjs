# pluck
####signature: `pluck(properties: ...args): Observable`
*The gist: Pick out nested properties...*

( [jsBin](http://jsbin.com/netulokasu/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/qg6qfqLz/40/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-pluck) )
```js
const source = Rx.Observable.from([
  {name: 'Joe', age: 30},
  {name: 'Sarah', age:35}
]);
//grab names
const example = source.pluck('name');
//output: "Joe", "Sarah"
const subscribe = example.subscribe(val => console.log(val));

const sourceTwo = Rx.Observable.from([
  {name: 'Joe', age: 30, job: {title: 'Developer', language: 'JavaScript'}},
  //will return undefined when no job is found
  {name: 'Sarah', age:35}
]);
//grab title property under job
const exampleTwo = sourceTwo.pluck('job', 'title');
//output: "Developer" , undefined
const subscribeTwo = exampleTwo.subscribe(val => console.log(val));
```