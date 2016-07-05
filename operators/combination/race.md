# race
####signature: `race(): Observable`
*The gist: Take the first observable to emit...*

( [jsBin](http://jsbin.com/goqiwobeno/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/8jcmb1ec/) | [ official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-race) )

```js
//take the first observable to emit
const example = Rx.Observable.race(
  //emit every 1.5s
  Rx.Observable.interval(1500),
  //emit every 1s
  Rx.Observable.interval(1000).mapTo('1s won!'),
  //emit every 2s
  Rx.Observable.interval(2000),
  //emit every 2.5s
  Rx.Observable.interval(2500)
);
//output: "1s won!"..."1s won!"...etc
const subscribe = example.subscribe(val => console.log(val));
```

### How race works...
*Coming soon...*


### Additional Resources
*Coming soon...*