# concatMapTo

#### signature: `concatMapTo(observable: Observable, resultSelector: function): Observable`

## Subscribe to provided observable when previous completes, emit values.

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/angular"><img src="https://ultimatecourses.com/assets/img/banners/ultimate-angular-leader.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Map to basic observable (simulating request)

( [StackBlitz](https://stackblitz.com/edit/typescript-fkkh6c?file=index.ts&devtoolsheight=50) )

```js
// RxJS v6+
import { of, interval } from 'rxjs';
import { concatMapTo, delay, take } from 'rxjs/operators';

//emit value every 2 seconds
const sampleInterval = interval(500).pipe(take(5));
const fakeRequest = of('Network request complete').pipe(delay(3000));
//wait for first to complete before next is subscribed
const example = sampleInterval.pipe(concatMapTo(fakeRequest));
//result
//output: Network request complete...3s...Network request complete'
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Using projection with `concatMap`

( [StackBlitz](https://stackblitz.com/edit/typescript-8kcfm1?file=index.ts&devtoolsheight=100) |
[jsBin](http://jsbin.com/fogefebisu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/s19wtscb/) )

```js
// RxJS v6+
import { interval } from 'rxjs';
import { concatMapTo, take } from 'rxjs/operators';
//emit value every 2 seconds
const interval$ = interval(2000);
//emit value every second for 5 seconds
const source = interval(1000).pipe(take(5));
/*
  ***Be Careful***: In situations like this where the source emits at a faster pace
  than the inner observable completes, memory issues can arise.
  (interval emits every 1 second, basicTimer completes every 5)
*/
// basicTimer will complete after 5 seconds, emitting 0,1,2,3,4
const example = interval$.pipe(
  concatMapTo(
    source,
    (firstInterval, secondInterval) => `${firstInterval} ${secondInterval}`
  )
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
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/concatMapTo.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/concatMapTo.ts)
