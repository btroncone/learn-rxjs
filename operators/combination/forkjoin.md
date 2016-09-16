# forkJoin(sources, resultSelector)

### TL;DR:
Takes any number of observables and subscribes to them  at the same time.  Once these observables complete, an array with all latest values is emitted.

### Description
The `forkJoin` operator accepts a number of observables, subscribing to them simultaneously.  The operator then maintain all emissions within an array, updating them with each emit.  Once all inner observables completes, `forkJoin` would emits this array containing the latest values of all inner observable at their time of completion.

:bulb:  If you want corresponding emissions from multiple observables as they occur, try [zip](zip.md)!

### Arguments

#### [sources : Observable | Arrays | Promise | Iterable](#example-1-making-variable-number-of-requests)
The sources must be observables, arrays, promises, and iterarble objects.  `forkJoin` will take in any number of these arguments, separated by a comma, and subscribes to simultaneously.

#### [resultSelector : any](#example-2-forkJoin-with-resultSelector)
The `resultSelector` is invoked with the number of values that matches with the number of sources.  You are then free to control your output however you like.  If you include more arguments than sources, the remaining arguments would be undefined as they have no sources to map to.

### Examples

##### Example 1: Making variable number of requests

( [jsBin](http://jsbin.com/taziyomusa/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/5fj77920/) )

```js
const myPromise = val => new Promise(resolve => setTimeout(() => resolve(`Promise Resolved: ${val}`), 5000))

/*
  when all observables complete, give the last
  emitted value from each as an array
*/
const example = Rx.Observable.forkJoin(
  //emit 'Hello' immediately
  Rx.Observable.of('Hello'),
  //emit 'World' after 1 second
  Rx.Observable.of('World').delay(1000),
  //emit 0 after 1 second
  Rx.Observable.interval(1000).take(1),
  //emit 0...1 in 1 second interval
  Rx.Observable.interval(1000).take(2),
  //promise that resolves to 'Promise Resolved' after 5 seconds
  myPromise('RESULT')
);
//output: ["Hello", "World", 0, 1, "Promise Resolved: RESULT"]
const subscribe = example.subscribe(val => console.log(val));

//make 5 requests
const queue = Rx.Observable.of([1,2,3,4,5]);
//emit array of all 5 results
const exampleTwo = queue
  .mergeMap(q => Rx.Observable.forkJoin(...q.map(myPromise)));
/*
  output:
  [
   "Promise Resolved: 1", 
   "Promise Resolved: 2", 
   "Promise Resolved: 3", 
   "Promise Resolved: 4",    
   "Promise Resolved: 5"
  ]
*/
const subscribeTwo = exampleTwo.subscribe(val => console.log(val));
```

##### Example 2: `forkJoin` with resultSelector

( [jsFiddle](https://jsfiddle.net/mseak9d1/1/) )

```js
const myPromise = val => new Promise(resolve => setTimeout(() => resolve(`Promise Resolved: ${val}`), 5000))

const example = Rx.Observable.forkJoin(
  Rx.Observable.of('Hello'),
  Rx.Observable.of('World').delay(1000),
  Rx.Observable.interval(1000).take(1),
  Rx.Observable.interval(1000).take(2),
  myPromise('RESULT'),
  [1,2,3,4],
  (a,b,c,d,e,f,g) => `${a} ${b},
  secondInterval: ${d},
  whatIPromisedYou: ${e},
  notObservable: ${f},
  noMoreObservables: ${g}`
);
//Because we only have 6 observales, but provided 7 parameters, the last one does not know what to map to and result as an undefined. 
//Sources do not have to simply be observables, they can also be promises, arrays, and iterables.
//resultSelector helps us to use our values in various operations instead of having them emitted as a simple array.
const subscribe = example.subscribe(val => console.log(val));

```

### Additional Resources
* [forkJoin](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-forkJoin) :newspaper: - Official docs

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/observable/ForkJoinObservable.ts](https://github.com/ReactiveX/rxjs/blob/master/src/observable/ForkJoinObservable.ts)
