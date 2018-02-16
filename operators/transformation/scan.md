# scan

#### signature: `scan(accumulator: function, seed: any): Observable`

## Reduce over time.

---

:bulb: This operator is the core for many RxJS based
[Redux](http://redux.js.org) implementations!

---

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Sum over time

( [jsBin](http://jsbin.com/kozidakose/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/d2g2a2c6/) )

```js
import { Subject } from 'rxjs/Subject';
import { startWith, scan } from 'rxjs/operators';

const subject = new Subject();
//basic scan example, sum over time starting with zero
const example = subject.pipe(startWith(0), scan((acc, curr) => acc + curr));
//log accumulated values
const subscribe = example.subscribe(val =>
  console.log('Accumulated total:', val)
);
//next values into subject, adding to the current sum
subject.next(1); //1
subject.next(2); //3
subject.next(3); //6
```

##### Example 2: Accumulating an object

( [jsBin](http://jsbin.com/fusunoguqu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/36rbu38b/) )

```js
import { Subject } from 'rxjs/Subject';
import { scan } from 'rxjs/operators';

const subject = new Subject();
//scan example building an object over time
const example = subject.pipe(
  scan((acc, curr) => Object.assign({}, acc, curr), {})
);
//log accumulated values
const subscribe = example.subscribe(val =>
  console.log('Accumulated object:', val)
);
//next values into subject, adding properties to object
subject.next({ name: 'Joe' }); // {name: 'Joe'}
subject.next({ age: 30 }); // {name: 'Joe', age: 30}
subject.next({ favoriteLanguage: 'JavaScript' }); // {name: 'Joe', age: 30, favoriteLanguage: 'JavaScript'}
```

##### Example 3: Emitting random values from the accumulated array.

( [jsBin](http://jsbin.com/mudolideqo/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/afjgf4tz/) )

```js
import { interval } from 'rxjs/observable/interval';
import { scan, map, distinctUntilChanged } from 'rxjs/operators';

// Accumulate values in an array, emit random values from this array.
const scanObs = interval(1000)
  .pipe(
    scan((a, c) => a.concat(c), []),
    map(r => r[Math.floor(Math.random() * r.length)]),
    distinctUntilChanged()
  )
  .subscribe(console.log);
```

### Related Recipes

* [Smart Counter](../../recipes/smartcounter.md)

### Additional Resources

* [scan](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-scan)
  :newspaper: - Official docs
* [Aggregating streams with reduce and scan using RxJS](https://egghead.io/lessons/rxjs-aggregating-streams-with-reduce-and-scan-using-rxjs)
  :video_camera: - Ben Lesh
* [Updating data with scan](https://egghead.io/lessons/rxjs-updating-data-with-scan?course=step-by-step-async-javascript-with-rxjs)
  :video_camera: :dollar: - John Linquist
* [Transformation operator: scan](https://egghead.io/lessons/rxjs-transformation-operator-scan?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/scan.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/scan.ts)
