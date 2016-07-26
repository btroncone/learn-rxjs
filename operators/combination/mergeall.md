# mergeAll
####signature: `mergeAll(concurrent: number): Observable`

### Description

###### TL;DR: Emit values from observables or promises emitted from source

*Description coming soon...*

> :bulb: Tip: In many cases you can use [mergeMap](../transformation/mergemap.md) as a single operator instead!

### Examples

( [example tests](https://github.com/btroncone/learn-rxjs/blob/master/operators/specs/combination/mergeall-spec.ts) )

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


### Additional Resources
* [mergeAll](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeAll) :newspaper: - Official docs

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/mergeAll.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/mergeAll.ts)