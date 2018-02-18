# retryWhen

#### signature: `retryWhen(receives: (errors: Observable) => Observable, the: scheduler): Observable`

## Retry an observable sequence on error based on custom criteria.

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Trigger retry after specified duration

( [jsBin](http://jsbin.com/miduqexalo/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/49mkhsyr/) )

```js
import { timer } from 'rxjs/observable/timer';
import { interval } from 'rxjs/observable/interval';
import { map, tap, retryWhen, delayWhen } from 'rxjs/operators';

//emit value every 1s
const source = interval(1000);
const example = source.pipe(
  map(val => {
    if (val > 5) {
      //error will be picked up by retryWhen
      throw val;
    }
    return val;
  }),
  retryWhen(errors =>
    errors.pipe(
      //log error message
      tap(val => console.log(`Value ${val} was too high!`)),
      //restart in 5 seconds
      delayWhen(val => timer(val * 1000))
    )
  )
);
/*
  output:
  0
  1
  2
  3
  4
  5
  "Value 6 was too high!"
  --Wait 5 seconds then repeat
*/
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Increased duration between retries

( [jsBin](http://jsbin.com/nexuxoyifa/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/tLx1c3j6/2/) )

```js
import { interval } from 'rxjs/observable/interval';
import { of } from 'rxjs/observable/of';
import { range } from 'rxjs/observable/range';
import { timer } from 'rxjs/observable/timer';
import { map, catchError, retryWhen, zip, mergeMap } from 'rxjs/operators';

//emit value every 1s
const source = interval(1000);
const example = source.pipe(
  map(val => {
    if (val > 2) {
      //error will be picked up by retryWhen
      throw val;
    }
    return val;
  }),
  retryWhen(attempts => {
    return attempts.zip(range(1, 4)).mergeMap(([error, i]) => {
      if (i > 3) {
        return _throw(error);
      }
      console.log(`Wait ${i} seconds, then retry!`);
      return timer(i * 1000);
    });
  }),
  catchError(_ => of('Ouch, giving up!'));
)


const subscribe = example.subscribe(val => console.log(val));
```

### Additional Resources

* [retryWhen](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-retryWhen)
  :newspaper: - Official docs
* [Error handling operator: retry and retryWhen](https://egghead.io/lessons/rxjs-error-handling-operator-retry-and-retrywhen?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/patching/operator/retryWhen.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/patching/operator/retryWhen.ts)
