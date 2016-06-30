# take

####signature: ` take(count: number): Observable`
*The gist: Emit only specified number of values...*

( [jsBin](http://jsbin.com/zeputevule/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/d3pn27dv/12/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-take) )

```js
//emit 1,2,3,4,5
const source = Rx.Observable.of(1,2,3,4,5);
//take the first emitted value then complete
const example = source.take(1);
//output: 1
const subscribe = example.subscribe(val => console.log(val));

//emit value every 1s
const interval = Rx.Observable.interval(1000);
//take the first 5 emitted values
const exampleTwo = interval.take(5);
//output: 0,1,2,3,4
const subscribeTwo = exampleTwo.subscribe(val => console.log(val));
```

### How take works...
*Coming soon...*


### Additional Resources
*Coming soon...*