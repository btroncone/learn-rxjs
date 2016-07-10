# mergeAll
####signature: `mergeAll(concurrent: number): Observable`
*The gist: Emit values from any observable or promise emitted from source...*


### Examples

##### Example 1: mergeAll with promises

( [jsBin](http://jsbin.com/worecuhiba/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/0sc4nsxa/) )

```js
const myPromise = val => new Promise(resolve => setTimeout(() => resolve(`Result: ${val}`), 2000))
//emit 1,2,3
const source = Rx.Observable.of(1,2,3);

const example = source
  //map each value to promise
  .map(val => myPromise(val))
  //emit result from source
  .mergeAll();

/*
  output:
  "Result: 1"
  "Result: 2"
  "Result: 3"
*/
const subscribe = example.subscribe(val => console.log(val));
```


### Follow the Source Code
*Coming soon...*


### Additional Resources
* [mergeAll](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeAll) :newspaper: - Official docs