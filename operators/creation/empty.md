# empty

####signature: `empty(scheduler: Scheduler): Observable`
*The gist: Emit observable that completes...*

( [jsBin](http://jsbin.com/rodubucaqa/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/ukec2y4p/5/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-empty) )

```js
//Create observable that immediately completes
const example = Rx.Observable.empty();
//output: 'Complete!'
const subscribe = example.subscribe({
  next: () => console.log('Next'),
  complete: () => console.log('Complete!')
});
```

### How empty works...
*Coming soon...*


### Additional Resources
*Coming soon...*