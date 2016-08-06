# forkJoin
####signature: `forkJoin(...args, selector : function): Observable`

### Description

###### TL;DR: Output the last emitted item from each observable on completion

The **forkJoin** operator accepts a variable number of observables, subscribing to them simultaneously.  
Once all inner observables complete, the source observable emits an array containing the last emitted value from each inner observables.

> :bulb:  If you want corresponding emissions from multiple observables as they occur, try [zip](zip.md)!

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


### Additional Resources
* [forkJoin](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-forkJoin) :newspaper: - Official docs

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/observable/ForkJoinObservable.ts](https://github.com/ReactiveX/rxjs/blob/master/src/observable/ForkJoinObservable.ts)
