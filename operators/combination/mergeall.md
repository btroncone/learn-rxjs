# mergeAll

####signature: `mergeAll(concurrent: number): Observable`
*The gist: Emit values from any observable or promise emitted from source...*

( [jsBin](http://jsbin.com/worecuhiba/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/qg6qfqLz/66/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeAll) )

```js
const myPromise = val => new Promise(resolve => setTimeout(() => resolve(`Result: ${val}`), 2000))
//emit 1,2,3
const source = Rx.Observable.of(1,2,3);

const example = source
  //map each value to promise
  .map(val => myPromise(val))
  //emit result from source
  .mergeAll();

/*
  output:
  "Result: 1"
  "Result: 2"
  "Result: 3"
*/
const subscribe = example.subscribe(val => console.log(val));
```


### How mergeAll works...
*Coming soon...*


### Additional Resources
*Coming soon...*