# window
###signature: `window(windowBoundaries: Observable): Observable`
*The gist: Observable of values for window of time*

([demo](http://jsbin.com/jituvajeri/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-window))
```js
//emit immediately then every 1s
const source = Rx.Observable.timer(0, 1000);
const example = source
  .window(Rx.Observable.interval(3000))
const count = example.scan((acc, curr) => acc + 1, 0)          
/*
  "Window 1:"
  0
  1
  2
  "Window 2:"
  3
  4
  5
  ...
*/
const subscribe = count.subscribe(val => console.log(`Window ${val}:`));
const subscribeTwo = example.mergeAll().subscribe(val => console.log(val));
```