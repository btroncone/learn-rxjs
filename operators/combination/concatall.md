# concatAll
####signature: `concatAll(): Observable`
*The gist: Concat for nested observables (observable of observables), subscribe to each when previous completes and merge emitted values...*

( [jsBin](http://jsbin.com/hayasoxoci/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/qg6qfqLz/3/) | [ official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-concatAll) )

```js
//emit a value every 2 seconds
const sourceOne = Rx.Observable.interval(2000);
const example = sourceOne
  //for demonstration, add 10 to and return as observable
  .map(val => Rx.Observable.of(val + 10))
  //merge values from inner observable
  .concatAll();
//output: 'Example with Basic Observable 0', 'Example with Basic Observable 2'...
const subscribe = example.subscribe(val => console.log('Example with Basic Observable:', val));

//create and resolve basic promise
const samplePromise = val => new Promise(resolve => resolve(val));
const exampleTwo = sourceOne
  .map(val => samplePromise(val))
  //merge values from resolved promise
  .concatAll();
//output: 'Example with Promise 0', 'Example with Promise 1'...
const subscribeTwo = exampleTwo.subscribe(val => console.log('Example with Promise:', val));
```

### How concatAll works...
*Coming soon...*


### Additional Resources
*Coming soon...*