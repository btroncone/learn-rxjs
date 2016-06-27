# sample
####signature: `sample(sampler: Observable): Observable`
*The gist: Sample from source when supplied observable emits...*

( [jsBin](http://jsbin.com/wifaqipuse/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/qg6qfqLz/20/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-sample) )

```js
//emit value every 1s
const source = Rx.Observable.interval(1000);
//sample last emitted value from source every 2s 
const example = source.sample(Rx.Observable.interval(2000));
//output: 2..4..6..8..
const subscribe = example.subscribe(val => console.log(val));

const sourceTwo = Rx.Observable.zip(
  //emit 'Joe', 'Frank' and 'Bob' in sequence
  Rx.Observable.from(['Joe', 'Frank', 'Bob']),
  //emit value every 2s
  Rx.Observable.interval(2000)
);
//sample last emitted value from source every 2.5s
const exampleTwo = sourceTwo.sample(Rx.Observable.interval(2500));
//output: ["Joe", 0]...["Frank", 1]...........
const subscribeTwo = exampleTwo.subscribe(val => console.log(val));
```