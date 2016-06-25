# windowCount
####signature: `windowCount(windowSize: number, startWindowEvery: number): Observable`
*The gist: Observable of values from source, emitted each time count is fulfilled*

( [jsBin](http://jsbin.com/nezuvacexe/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/qg6qfqLz/44/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-windowCount) )
```js
//emit every 1s
const source = Rx.Observable.interval(1000);
const example = source
    //start new window every 4 emitted values
    .windowCount(4)
    .do(() => console.log('NEW WINDOW!'))

const subscribeTwo = example 
  //window emits nested observable
  .mergeAll()
/*
  output:
  "NEW WINDOW!"
  0
  1
  2
  3
  "NEW WINDOW!"
  4
  5
  6
  7 
*/
  .subscribe(val => console.log(val));
```