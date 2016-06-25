# ignoreElements
###signature: `ignoreElements(): Observable`
*The gist: Ignore everything but complete and error...*

([demo](http://jsbin.com/luyufeviqu/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-ignoreElements))
```js
//emit value every 100ms
const source = Rx.Observable.interval(100);
//ignore everything but complete
const example = source
  .take(5)
  .ignoreElements();
//output: "COMPLETE!"
const subscribe = example.subscribe(
  val => console.log(`NEXT: ${val}`),
  val => console.log(`ERROR: ${val}`),
  () => console.log('COMPLETE!')
);
//ignore everything but error
const error = source
  .flatMap(val => {
    if(val === 4){
      return Rx.Observable.throw(`ERROR AT ${val}`);
    }
    return Rx.Observable.of(val);
  })
  .ignoreElements();
//output: "ERROR: ERROR AT 4"
const subscribeTwo = error.subscribe(
  val => console.log(`NEXT: ${val}`),
  val => console.log(`ERROR: ${val}`),
  () => console.log('SECOND COMPLETE!')
);
```