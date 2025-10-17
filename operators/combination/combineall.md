# combineLatestAll

## Signature

```typescript
combineLatestAll<T>(): OperatorFunction<ObservableInput<T>, T[]>
```

Flattens a higher-order observable by applying [combineLatest](./combinelatest.md) when the outer observable completes.

---

💡 `combineLatestAll` is best used when you're working with a **higher-order observable** (an observable that emits other observables) and need to track the most recent values from each inner observable
💡 Unlike [`mergeAll`](./mergeall) which emits values as soon as any inner observable emits, `combineLatestAll` waits for **all inner observables to emit at least once** before producing output
💡 If you need only the final values when all observables complete (not ongoing updates), consider [`forkJoin`](../combination/forkjoin) instead

---

## Why use combineLatestAll?

Think of `combineLatestAll` as organizing a panel discussion where speakers join at different times. You can't start the broadcast until everyone has joined, but after that, whenever anyone speaks again, you broadcast the most recent statement from each panelist. That's exactly how `combineLatestAll` manages your observable streams.

This operator shines when you're dealing with **dynamic collections of observables**, or situations where you don't know upfront how many observables you'll have, but they're being emitted by a source stream. A practical example is when you [map a stream of events to interval observables](#example-1-mapping-to-inner-interval-observable) and want to monitor the latest value from each one simultaneously. It's particularly useful for scenarios like tracking multiple user sessions, monitoring real-time dashboard widgets that get added dynamically, or combining results from a variable number of API calls.

Keep in mind that `combineLatestAll` won't produce any values until two conditions are met: the outer observable must **complete** (signaling that no more inner observables will be emitted), and every inner observable must have **emitted at least once**. This "wait for everyone" behavior can be a gotcha if one of your inner observables never emits or never completes—your stream will remain silent.

In essence, `combineLatestAll` transforms a stream of streams into a single stream that keeps you updated with the latest snapshot from each member of your dynamic collection.

---

## Examples

### Example 1: Mapping to inner interval observable

([StackBlitz](https://stackblitz.com/edit/typescript-bzwkrl?file=index.ts))

```typescript
import { interval } from 'rxjs';
import { take, map, combineLatestAll } from 'rxjs/operators';

// Emit every 1s, take 2
const source$ = interval(1000).pipe(take(2));

// Map each emitted value from source to interval observable that takes 5 values
const example$ = source$.pipe(
  map(val =>
    interval(1000).pipe(
      map(i => `Result (${val}): ${i}`),
      take(5)
    )
  )
);

/*
  2 values from source will map to 2 (inner) interval observables that emit every 1s.
  combineLatestAll uses combineLatest strategy, emitting the last value from each
  whenever either observable emits a value
*/
example$
  .pipe(combineLatestAll())
  /*
    output:
    ["Result (0): 0", "Result (1): 0"]
    ["Result (0): 1", "Result (1): 0"]
    ["Result (0): 1", "Result (1): 1"]
    ["Result (0): 2", "Result (1): 1"]
    ["Result (0): 2", "Result (1): 2"]
    ["Result (0): 3", "Result (1): 2"]
    ["Result (0): 3", "Result (1): 3"]
    ["Result (0): 4", "Result (1): 3"]
    ["Result (0): 4", "Result (1): 4"]
  */
  .subscribe(console.log);
```

---

## Related Recipes

- [Smart Counter](../../recipes/smartcounter.md)
- [HTTP Polling](../../recipes/http-polling.md)

---

## Additional Resources

- [combineLatestAll](https://rxjs.dev/api/index/function/combineLatestAll) 📰 - Official docs
- [combineLatest](./combinelatest) - Learn about the underlying combination strategy

---

📁 **Source Code**: [https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/operators/combineLatestAll.ts](https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/operators/combineLatestAll.ts)