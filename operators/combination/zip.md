# zip

#### signature: `zip(observables: *): Observable`

### Description

###### TL;DR: After all observables emit, emit values as an array

The **zip** operator will subscribe to all inner observables, waiting for each
to emit a value. Once this occurs, all values with the corresponding index will
be emitted. This will continue until at least one inner observable completes.

---

:bulb: Combined with [interval](../creation/interval) or
[timer](../creation/timer.md), zip can be used to time output from another
source!

---

<a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a>

### Examples

##### Example 1: zip multiple observables emitting at alternate intervals

( [jsBin](http://jsbin.com/lireyisira/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/ton462sg/) )

```js
import { delay } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { zip } from 'rxjs/observable/zip';

const sourceOne = of('Hello');
const sourceTwo = of('World!');
const sourceThree = of('Goodbye');
const sourceFour = of('World!');
//wait until all observables have emitted a value then emit all as an array
const example = zip(
  sourceOne,
  sourceTwo.pipe(delay(1000)),
  sourceThree.pipe(delay(2000)),
  sourceFour.pipe(delay(3000))
);
//output: ["Hello", "World!", "Goodbye", "World!"]
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: zip when 1 observable completes

( [jsBin](http://jsbin.com/fisitatesa/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/oamyk3xr/) )

```js
import { take } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { zip } from 'rxjs/observable/zip';

//emit every 1s
const source = interval(1000);
//when one observable completes no more values will be emitted
const example = zip(source, source.pipe(take(2)));
//output: [0,0]...[1,1]
const subscribe = example.subscribe(val => console.log(val));
```

### Additional Resources

* [zip](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-zip)
  :newspaper: - Official docs
* [Combination operator: zip](https://egghead.io/lessons/rxjs-combination-operator-zip?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/zip.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/zip.ts)
