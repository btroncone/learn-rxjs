# mergeMap
#### signature: `mergeMap(project: function: Observable, resultSelector: function: any, concurrent: number): Observable`
*The gist: Map values from source to inner observable, flatten output...*

*You could also: `map -> mergeAll`*

( [jsBin](http://jsbin.com/haxobidino/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/qg6qfqLz/38/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMap) )

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

### How mergeMap works...
1. [Operator subscribes to source observable](https://github.com/ReactiveX/rxjs/blob/master/src/operator/mergeMap.ts#L81-L84).
2. [Project function is invoked with received value](https://github.com/ReactiveX/rxjs/blob/master/src/operator/mergeMap.ts#L118).
3. The [result is passed to utility function]((https://github.com/ReactiveX/rxjs/blob/master/src/operator/mergeMap.ts#L124-L129)), where different action is taken dependant on return type of project function.
  1. **If Observable** - [The inner observable is subscribed to]((https://github.com/ReactiveX/rxjs/blob/master/src/util/subscribeToResult.ts#L27-L35), with [emitted values delivered to subscriber](https://github.com/ReactiveX/rxjs/blob/master/src/operator/mergeMap.ts#L138-L146).
  2. **If Array**  - [The array is iterated over](https://github.com/ReactiveX/rxjs/blob/master/src/util/subscribeToResult.ts#L37-L43), with each value delivered to subscriber](https://github.com/ReactiveX/rxjs/blob/master/src/operator/mergeMap.ts#L138-L146).
  3. **If Promise** - [`.then` is called on the promise]((https://github.com/ReactiveX/rxjs/blob/master/src/util/subscribeToResult.ts#L44-L53), with the [result being delivered to subscriber](https://github.com/ReactiveX/rxjs/blob/master/src/operator/mergeMap.ts#L138-L146).


### Additional Resources
* [map vs flatMap](https://egghead.io/lessons/rxjs-rxjs-map-vs-flatmap) :video_camera: - Ben Lesh
* [Async requests and responses in RxJS](https://egghead.io/lessons/rxjs-04-reactive-programming-async-requests-and-responses-in-rxjs) :video_camera: :dollar: - André Staltz