# concatMapTo

#### signature: `concatMapTo(observable: Observable, resultSelector: function): Observable`

## Subscribe to provided observable when previous completes, emit values.

### Examples

##### Example 1: Map to basic observable

( [jsBin](http://jsbin.com/telovuhupa/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/La0bam0u/) )

```js
//emit value every 2 seconds
const interval = Rx.Observable.interval(2000);
const message = Rx.Observable.of('Second(s) elapsed!');
//when interval emits, subscribe to message until complete, merge for result
const example = interval.concatMapTo(message, (time, msg) => `${time} ${msg}`);
//log values
//output: '0 Second(s) elapsed', '1 Second(s) elapsed'
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Map to observable that emits at slower pace

( [jsBin](http://jsbin.com/fogefebisu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/s19wtscb/) )

```js
//emit value every 2 seconds
const interval = Rx.Observable.interval(2000);
//emit value every second for 5 seconds
const source = Rx.Observable.interval(1000).take(5);
/* 
  ***Be Careful***: In situations like this where the source emits at a faster pace
  than the inner observable completes, memory issues can arise.
  (interval emits every 1 second, basicTimer completes every 5)
*/
//basicTimer will complete after 5 seconds, emitting 0,1,2,3,4
const example = interval.concatMapTo(
  source,
  (firstInterval, secondInterval) => `${firstInterval} ${secondInterval}`
);
/*
  output: 0 0
          0 1
          0 2
          0 3
          0 4
          1 0
          1 1
          continued...
          
*/
const subscribe = example.subscribe(val => console.log(val));
```

### Additional Resources

* [concatMapTo](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-concatMapTo)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/operator/concatMapTo.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/concatMapTo.ts)
