# concatAll

#### signature: `concatAll(): Observable`

## Collect observables and subscribe to next when previous completes.

---

⚠ Be wary of
[backpressure](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/backpressure.md)
when the source emits at a faster pace than inner observables complete!

💡 In many cases you can use [concatMap](../transformation/concatmap.md) as a
single operator instead!

---

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

(
[example tests](https://github.com/btroncone/learn-rxjs/blob/master/operators/specs/combination/concatall-spec.ts)
)

##### Example 1: concatAll with observable

(
[StackBlitz](https://stackblitz.com/edit/typescript-zwtpc7?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/nakinenuva/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/8dfuf2y6/) )

```js
// RxJS v6+
import { map, concatAll } from 'rxjs/operators';
import { of, interval } from 'rxjs';

//emit a value every 2 seconds
const source = interval(2000);
const example = source.pipe(
  //for demonstration, add 10 to and return as observable
  map(val => of(val + 10)),
  //merge values from inner observable
  concatAll()
);
//output: 'Example with Basic Observable 10', 'Example with Basic Observable 11'...
const subscribe = example.subscribe(val =>
  console.log('Example with Basic Observable:', val)
);
```

##### Example 2: concatAll with promise

(
[StackBlitz](https://stackblitz.com/edit/typescript-3w4px3?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/bekegeyopu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/w7kp7qLs/) )

```js
// RxJS v6+
import { map, concatAll } from 'rxjs/operators';
import { interval } from 'rxjs';

//create and resolve basic promise
const samplePromise = val => new Promise(resolve => resolve(val));
//emit a value every 2 seconds
const source = interval(2000);

const example = source.pipe(
  map(val => samplePromise(val)),
  //merge values from resolved promise
  concatAll()
);
//output: 'Example with Promise 0', 'Example with Promise 1'...
const subscribe = example.subscribe(val =>
  console.log('Example with Promise:', val)
);
```

##### Example 3: Delay while inner observables complete

(
[StackBlitz](https://stackblitz.com/edit/typescript-ft3rbf?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/pojolatile/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/8230ucbg/) )

```js
// RxJS v6+
import { take, concatAll } from 'rxjs/operators';
import { interval, of } from 'rxjs/observable/interval';

const obs1 = interval(1000).pipe(take(5));
const obs2 = interval(500).pipe(take(2));
const obs3 = interval(2000).pipe(take(1));
//emit three observables
const source = of(obs1, obs2, obs3);
//subscribe to each inner observable in order when previous completes
const example = source.pipe(concatAll());
/*
  output: 0,1,2,3,4,0,1,0
  How it works...
  Subscribes to each inner observable and emit values, when complete subscribe to next
  obs1: 0,1,2,3,4 (complete)
  obs2: 0,1 (complete)
  obs3: 0 (complete)
*/

const subscribe = example.subscribe(val => console.log(val));
```

### Related Recipes

- [Progress Bar](../../recipes/progressbar.md)

### Additional Resources

- [concatAll](https://rxjs.dev/api/operators/concatAll) 📰 - Official
  docs
- [Flatten a higher order observable with concatAll in RxJS](https://egghead.io/lessons/rxjs-flatten-a-higher-order-observable-with-concatall-in-rxjs?course=use-higher-order-observables-in-rxjs-effectively)
  🎥 💵 - André Staltz

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/concatAll.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/concatAll.ts)
