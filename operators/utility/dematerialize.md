# dematerialize
### signature: `dematerialize(): Observable`
*The gist: Turn notification objects into notification values...*

([demo](http://jsbin.com/vafedocibi/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-dematerialize))
```js
//emit next and error notifications
const source = Rx.Observable
  .from([
    Rx.Notification.createNext('SUCCESS!'),
    Rx.Notification.createError('ERROR!')   
  ])
  //turn notification objects into notification values
  .dematerialize();

//output: 'NEXT VALUE: SUCCESS' 'ERROR VALUE: 'ERROR!'
const subscription = source.subscribe({
  next: val => console.log(`NEXT VALUE: ${val}`),
  error: val => console.log(`ERROR VALUE: ${val}`)
});
```