# sample
####signature: `sample(sampler: Observable): Observable`

## Sample from source when provided observable emits.

### Examples

##### Example 1: Sample source every 2 seconds

( [jsBin](http://jsbin.com/gemebopifu/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/8wsbuvjb/) )

```js
//emit value every 1s
const source = Rx.Observable.interval(1000);
//sample last emitted value from source every 2s 
const example = source.sample(Rx.Observable.interval(2000));
//output: 2..4..6..8..
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Sample source when interval emits

( [jsBin](http://jsbin.com/cunicepube/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/b33kg9dn/) )

```js
const source = Rx.Observable.zip(
  //emit 'Joe', 'Frank' and 'Bob' in sequence
  Rx.Observable.from(['Joe', 'Frank', 'Bob']),
  //emit value every 2s
  Rx.Observable.interval(2000)
);
//sample last emitted value from source every 2.5s
const example = source.sample(Rx.Observable.interval(2500));
//output: ["Joe", 0]...["Frank", 1]...........
const subscribe = example.subscribe(val => console.log(val));
```


### Additional Resources
* [sample](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-sample) :newspaper: - Official docs

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/sample.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/sample.ts)
