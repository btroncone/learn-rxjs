# throw

####signature: `throw(error: any, scheduler: Scheduler): Observable`
*The gist: Emits error...*

( [jsBin](http://jsbin.com/punubequju/1/edit?js,console) | [jsFiddle]() | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-throw) )

```js
//emits an error with specified value on subscription
const source = Rx.Observable.throw('This is an error!');
//output: 'Error: This is an error!'
const subscribe = source.subscribe({
  next: val => console.log(val),
  complete: () => console.log('Complete!'),
  error: val => console.log(`Error: ${val}`)
});
```

### How throw works...
*Coming soon...*


### Additional Resources
*Coming soon...*