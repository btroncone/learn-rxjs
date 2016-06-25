# groupBy
####signature: `groupBy(keySelector: Function, elementSelector: Function): Observable`
*The gist: Group into observables by given value...*

( [jsBin](http://jsbin.com/zibomoluru/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/qg6qfqLz/35/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-groupBy) )
```js
const people = [{name: 'Sue', age:25},{name: 'Joe', age: 30},{name: 'Frank', age: 25}, {name: 'Sarah', age: 35}];
//emit each person
const source = Rx.Observable.from(people);
//group by age
const example = source
  .groupBy(person => person.age)
  //return as array of each group
  .flatMap(group => group.reduce((acc, curr) => [...acc, ...curr], []))
/*
  output:
  [{age: 25, name: "Sue"},{age: 25, name: "Frank"}]
  [{age: 30, name: "Joe"}]
  [{age: 35, name: "Sarah"}]
*/
const subscribe = example.subscribe(val => console.log(val));
```