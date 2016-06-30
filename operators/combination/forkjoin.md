# forkJoin

####signature: `forkJoin(...args, selector : function): Observable`
*The gist: Get the last emitted item from each observable on completion...*

( [jsBin](http://jsbin.com/nicaricacu/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/d3pn27dv/3/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-forkJoin) )

```js
const myPromise = () => new Promise(resolve => setTimeout(() => resolve('Promise Resolved!'), 5000))

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
    myPromise()
);
//output: ["Hello", "World", 0, 1, "Promise Resolved!"]
const subscribe = example.subscribe(val => console.log(val));
```

### How forkJoin works...
*Coming soon...*


### Additional Resources
*Coming soon...*