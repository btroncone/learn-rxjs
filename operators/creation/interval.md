# interval

####signature: `interval(period: number, scheduler: Scheduler): Observable`
*The gist: Create an observable that emits numbers in sequence every supplied timeframe...*

( [jsBin](http://jsbin.com/vigohomabo/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/ukec2y4p/7/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-fromEvent) )

```js
//emit value in sequence every 1 second
const source = Rx.Observable.interval(1000);
//output: 0,1,2,3,4,5....
const subscribe = source.subscribe(val => console.log(val));
```

### How interval works...
*Coming soon...*


### Additional Resources
*Coming soon...*