# concatMap

#### signature: `concatMap(project: function, resultSelector: function): Observable`

## Map values to inner observable, subscribe and emit in order.

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1qq2-q-eVe-F_-d0eSvTyqaGRjpfLDdJz 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: Demonstrating the difference between `concatMap` and [`mergeMap`](./mergemap.md)

(
[StackBlitz](https://stackblitz.com/edit/typescript-pkyxa1?file=index.ts&devtoolsheight=100)
)

💡 Note the difference between `concatMap` and [`mergeMap`](./mergemap.md).
Because `concatMap` does not subscribe to the next observable until the previous
completes, the value from the source delayed by 2000ms will be emitted first.
Contrast this with [`mergeMap`](./mergemap.md) which subscribes immediately to
inner observables, the observable with the lesser delay (1000ms) will emit,
followed by the observable which takes 2000ms to complete.

```js
// RxJS v6+
import { of } from 'rxjs';
import { concatMap, delay, mergeMap } from 'rxjs/operators';

//emit delay value
const source = of(2000, 1000);
// map value from source into inner observable, when complete emit result and move to next
const example = source.pipe(
  concatMap(val => of(`Delayed by: ${val}ms`).pipe(delay(val)))
);
//output: With concatMap: Delayed by: 2000ms, With concatMap: Delayed by: 1000ms
const subscribe = example.subscribe(val =>
  console.log(`With concatMap: ${val}`)
);

// showing the difference between concatMap and mergeMap
const mergeMapExample = source
  .pipe(
    // just so we can log this after the first example has run
    delay(5000),
    mergeMap(val => of(`Delayed by: ${val}ms`).pipe(delay(val)))
  )
  .subscribe(val => console.log(`With mergeMap: ${val}`));
```

##### Example 2: Map to promise

(
[StackBlitz](https://stackblitz.com/edit/typescript-rv9byk?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/celixodeba/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/Lym33L97//) )

```js
// RxJS v6+
import { of } from 'rxjs';
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

(
[StackBlitz](https://stackblitz.com/edit/typescript-2elzt7?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/vihacewozo/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/5sr5zzgy/) )

```js
// RxJS v6+
import { of } from 'rxjs';
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

### Additional Resources

- [concatMap](https://rxjs.dev/api/operators/concatMap) 📰 - Official docs
- [concatMap](https://indepth.dev/reference/rxjs/operators/concat-map) - In Depth Dev Reference
- [Use RxJS concatMap to map and concat higher order observables](https://egghead.io/lessons/rxjs-use-rxjs-concatmap-to-map-and-concat-high-order-observables?course=use-higher-order-observables-in-rxjs-effectively)
  🎥 💵 - André Staltz
- [Build your own concatMap operator](https://blog.strongbrew.io/build-the-operators-from-rxjs-from-scratch/?lectureId=concatMap#app)
  🎥 - Kwinten Pisman

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/concatMap.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/concatMap.ts)
