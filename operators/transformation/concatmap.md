# concatMap

#### signature: `concatMap(project: function, resultSelector: function): Observable`

## Map values to inner observable, subscribe and emit in order.

<a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a>

### Examples

##### Example 1: Map to inner observable

( [jsBin](http://jsbin.com/powivemaxu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/y3yx666r/) )

```js
import { of } from 'rxjs/observable/of';
import { concatMap } from 'rxjs/operators';

//emit 'Hello' and 'Goodbye'
const source = of('Hello', 'Goodbye');
// map value from source into inner observable, when complete emit result and move to next
const example = source.pipe(concatMap(val => of(`${val} World!`)));
//output: 'Example One: 'Hello World', Example One: 'Goodbye World'
const subscribe = example.subscribe(val => console.log('Example One:', val));
```

##### Example 2: Map to promise

( [jsBin](http://jsbin.com/celixodeba/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/Lym33L97//) )

```js
import { of } from 'rxjs/observable/of';
import { concatMap } from 'rxjs/operators';

//emit 'Hello' and 'Goodbye'
const source = of('Hello', 'Goodbye');
//example with promise
const examplePromise = val => new Promise(resolve => resolve(`${val} World!`));
// map value from source into inner observable, when complete emit result and move to next
const example = source.pipe(concatMap(val => examplePromise(val)));
//output: 'Example w/ Promise: 'Hello World', Example w/ Promise: 'Goodbye World'
const subscribe = example.subscribe(val =>
  console.log('Example w/ Promise:', val)
);
```

##### Example 3: Supplying a projection function

( [jsBin](http://jsbin.com/vihacewozo/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/5sr5zzgy/) )

```js
import { of } from 'rxjs/observable/of';
import { concatMap } from 'rxjs/operators';

//emit 'Hello' and 'Goodbye'
const source = of('Hello', 'Goodbye');
//example with promise
const examplePromise = val => new Promise(resolve => resolve(`${val} World!`));
//result of first param passed to second param selector function before being  returned
const example = source.pipe(
  concatMap(
    val => examplePromise(val),
    result => `${result} w/ selector!`
  )
);
//output: 'Example w/ Selector: 'Hello w/ Selector', Example w/ Selector: 'Goodbye w/ Selector'
const subscribe = example.subscribe(val =>
  console.log('Example w/ Selector:', val)
);
```

##### Example 4: Illustrating difference between concatMap and mergeMap

( [jsBin](http://jsbin.com/kiwuvamafo/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/3xd74d89/) )

```js
import { of } from 'rxjs/observable/of';
import { buffer } from 'rxjs/operators';

const concatMapSub = of(2000, 1000)
  .pipe(
   concatMap(v => of(v).pipe(delay(v)))
  )
  // concatMap: 2000, concatMap: 1000
  .subscribe(v => console.log('concatMap:', v));

const mergeMapSub = of(2000, 1000)
  .pipe(
    mergeMap(v => of(v).pipe(delay(v)))
  )
  // mergeMap: 1000, mergeMap: 2000
  .subscribe(v => console.log('mergeMap:', v));
```

### Additional Resources

* [concatMap](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-concatMap)
  :newspaper: - Official docs
* [Use RxJS concatMap to map and concat higher order observables](https://egghead.io/lessons/rxjs-use-rxjs-concatmap-to-map-and-concat-high-order-observables?course=use-higher-order-observables-in-rxjs-effectively)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/concatMap.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/concatMap.ts)
