# mergeAll

#### signature: `mergeAll(concurrent: number): Observable`

## Collect and subscribe to all observables.

---

💡 In many cases you can use [mergeMap](../transformation/mergemap.md) as a
single operator instead!

---

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX "Ultimate RxJS")](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

(
[example tests](https://github.com/btroncone/learn-rxjs/blob/master/operators/specs/combination/mergeall-spec.ts)
)

##### Example 1: mergeAll with promises

(
[StackBlitz](https://stackblitz.com/edit/typescript-y4ncvc?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/worecuhiba/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/0sc4nsxa/) )

```js
// RxJS v6+
import { map, mergeAll } from 'rxjs/operators';
import { of } from 'rxjs';

const myPromise = val =>
  new Promise(resolve => setTimeout(() => resolve(`Result: ${val}`), 2000));
//emit 1,2,3
const source = of(1, 2, 3);

const example = source.pipe(
  //map each value to promise
  map(val => myPromise(val)),
  //emit result from source
  mergeAll()
);

/*
  output:
  "Result: 1"
  "Result: 2"
  "Result: 3"
*/
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: mergeAll with _concurrent_ parameter

(
[StackBlitz](https://stackblitz.com/edit/typescript-xpaqjh?file=index.ts&devtoolsheight=100)
| [jsFiddle](https://jsfiddle.net/zra3zxhs/) )

```js
// RxJS v6+
import { take, map, delay, mergeAll } from 'rxjs/operators';
import { interval } from 'rxjs';

const source = interval(500).pipe(take(5));

/*
  interval is emitting a value every 0.5s.  This value is then being mapped to interval that
  is delayed for 1.0s.  The mergeAll operator takes an optional argument that determines how
  many inner observables to subscribe to at a time.  The rest of the observables are stored
  in a backlog waiting to be subscribe.
*/
const example = source
  .pipe(
    map(val =>
      source.pipe(
        delay(1000),
        take(3)
      )
    ),
    mergeAll(2)
  )
  .subscribe(val => console.log(val));
/*
  The subscription is completed once the operator emits all values.
*/
```

### Additional Resources

- [mergeAll](https://rxjs.dev/api/operators/mergeAll)
  📰 - Official docs
- [Flatten a higher order observable with mergeAll in RxJS](https://egghead.io/lessons/rxjs-flatten-a-higher-order-observable-with-mergeall-in-rxjs?course=use-higher-order-observables-in-rxjs-effectively)
  🎥 💵 - André Staltz

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/mergeAll.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/mergeAll.ts)
