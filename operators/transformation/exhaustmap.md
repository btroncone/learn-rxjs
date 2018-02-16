# exhaustMap

#### signature: `exhaustMap(project: function, resultSelector: function): Observable`

## Map to inner observable, ignore other values until that observable completes.

<a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a>

### Examples

##### Example 1: exhaustMap with interval

( [jsBin](http://jsbin.com/woposeqobo/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/9ovzapp9/) )

```js
import { interval } from 'rxjs/observable/interval';
import { merge } from 'rxjs/observable/merge';
import { delay, take, exhaustMap } from 'rxjs/operators';

const interval = interval(1000);
const delayedInterval = interval.pipe(delay(10), take(4));

const exhaustSub = merge(
  // delay 10ms, then start interval emitting 4 values
  delayedInterval,
  // emit immediately
  of(true)
)
  .pipe(exhaustMap(_ => interval.pipe(take(5))))
  /*
     *  The first emitted value (of(true)) will be mapped
     *  to an interval observable emitting 1 value every
     *  second, completing after 5.
     *  Because the emissions from the delayed interval
     *  fall while this observable is still active they will be ignored.
     *
     *  Contrast this with concatMap which would queue,
     *  switchMap which would switch to a new inner observable each emission,
     *  and mergeMap which would maintain a new subscription for each emitted value.
     */
  // output: 0, 1, 2, 3, 4
  .subscribe(val => console.log(val));
```

##### Example 2: Another exhaustMap with interval

( [jsBin](http://jsbin.com/fizuduzuti/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/5ck8yg5k/3/) )

```js
import { interval } from 'rxjs/observable/interval';
import { exhaustMap, tap } from 'rxjs/operators';

const firstInterval = interval(1000).pipe(take(10));
const secondInterval = interval(1000).pipe(take(2));

const exhaustSub = firstInterval
  .pipe(
    tap(i => console.log(`Emission of first interval: ${i}`)),
    exhaustMap(f => secondInterval)
  )
  /*
    When we subscribed to the first interval, it starts to emit a values (startinng 0).
    This value is mapped to the second interval which then begins to emit (starting 0).  
    While the second interval is active, values from the first interval are ignored.
    We can see this when firstInterval emits number 3,6, and so on...

      Output:
      Emission of first interval: 0
      0
      1
      Emission of first interval: 3
      0
      1
      Emission of first interval: 6
      0
      1
      Emission of first interval: 9
      0
      1
  */
  .subscribe(s => console.log(s));
```

### Additional Resources

* [exhaustMap](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-exhaustMap)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/exhaustMap.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/exhaustMap.ts)
