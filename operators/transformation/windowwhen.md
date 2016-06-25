# windowWhen
###signature: `windowWhen(closingSelector: function(): Observable): Observable`
*The gist: Close window at specified time frame emitting observable of collected values from source, repeat...*

([demo](http://jsbin.com/tuhaposemo/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-windowWhen))
```js
//emit immediately then every 1s
const source = Rx.Observable.timer(0,1000);
const example = source
    //close window every 5s and emit observable of collected values from source
    .windowWhen((val) => Rx.Observable.interval(5000))
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
  4
  "NEW WINDOW!"
  5
  6
  7
  8
  9
*/
  .subscribe(val => console.log(val));
```