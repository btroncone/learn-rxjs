# withLatestFrom

#### signature: `withLatestFrom(other: Observable, project: Function): Observable`

## Also provide the last value from another observable.

---

:bulb: If you want the last emission any time a variable number of observables
emits, try [combinelatest](combinelatest.md)!

---

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Latest value from quicker second source

( [jsBin](http://jsbin.com/fitekeseru/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/9c3pfgpk/) )

```js
import { withLatestFrom, map } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';

//emit every 5s
const source = interval(5000);
//emit every 1s
const secondSource = interval(1000);
const example = source.pipe(
  withLatestFrom(secondSource),
  map(([first, second]) => {
    return `First Source (5s): ${first} Second Source (1s): ${second}`;
  })
);
/*
  "First Source (5s): 0 Second Source (1s): 4"
  "First Source (5s): 1 Second Source (1s): 9"
  "First Source (5s): 2 Second Source (1s): 14"
  ...
*/
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Slower second source

( [jsBin](http://jsbin.com/vujekucuxa/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/bywLL579/) )

```js
import { withLatestFrom, map } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';

//emit every 5s
const source = interval(5000);
//emit every 1s
const secondSource = interval(1000);
//withLatestFrom slower than source
const example = secondSource.pipe(
    //both sources must emit at least 1 value (5s) before emitting
    withLatestFrom(source),
    map(([first, second]) => {
      return `Source (1s): ${first} Latest From (5s): ${second}`;
    })
  );
/*
  "Source (1s): 4 Latest From (5s): 0"
  "Source (1s): 5 Latest From (5s): 0"
  "Source (1s): 6 Latest From (5s): 0"
  ...
*/
const subscribe = example.subscribe(val => console.log(val));
```

### Additional Resources

* [withLatestFrom](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-withLatestFrom)
  :newspaper: - Official docs
* [Combination operator: withLatestFrom](https://egghead.io/lessons/rxjs-combination-operator-withlatestfrom?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/patching/operator/withLatestFrom.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/patching/operator/withLatestFrom.ts)
