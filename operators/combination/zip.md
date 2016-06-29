# zip
####signature: `zip(observables: *): Observable`
*The gist: After all observables emit, emit values as an array...*

( [jsBin](http://jsbin.com/torusemimi/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/qg6qfqLz/8/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-zip) )

```js
const sourceOne = Rx.Observable.of('Hello');
const sourceTwo = Rx.Observable.of('World!');
const sourceThree = Rx.Observable.of('Goodbye');
const sourceFour = Rx.Observable.of('World!');
//wait until all observables have emitted a value then emit all as an array
const example = Rx.Observable
  .zip(
    sourceOne,
    sourceTwo.delay(1000),
    sourceThree.delay(2000),
    sourceFour.delay(3000)
  );
//output: ["Hello", "World!", "Goodbye", "World!"]
const subscribe = example.subscribe(val => console.log(val));

//emit every 1s
const interval = Rx.Observable.interval(1000);
//when one observable completes no more values will be emitted
const exampleTwo = Rx.Observable
  .zip(
    interval,
    interval.take(2)
  );
//output: [0,0]...[1,1]
const subscribe = exampleTwo.subscribe(val => console.log(val));
```

### How zip works...
*Coming soon...*


### Additional Resources
*Coming soon...*