# bufferTime

#### signature: `bufferTime(bufferTimeSpan: number, bufferCreationInterval: number, scheduler: Scheduler): Observable`

## Collect emitted values until provided time has passed, emit as array.

### Why use `bufferTime`?
The key distinction between `bufferTime` and other buffering operators lies in its time-based buffering approach. `bufferTime` accumulates values from the source observable in an array over a specified time duration before emitting the buffered array.

This operator is particularly well-suited for scenarios where you need to batch or throttle emissions from high-frequency observables, such as monitoring user interactions, tracking mouse movements, or dealing with rapidly updating data streams. `bufferTime` provides an efficient way to handle and process these emissions in a more manageable, time-based manner.

Remember, `bufferTime` allows you to manage data emissions effectively by collecting and emitting them in time-based batches, as illustrated in the first example. Be mindful of its implications, though, and choose the right operator according to your specific use case.

### Examples

##### Example 1: Buffer for 2 seconds

( [StackBlitz](https://stackblitz.com/edit/typescript-haqxd1?file=index.ts&devtoolsheight=50))

```js
// RxJS v6+
import { interval } from 'rxjs';
import { bufferTime } from 'rxjs/operators';

//Create an observable that emits a value every 500ms
const source = interval(500);
//After 2 seconds have passed, emit buffered values as an array
const example = source.pipe(bufferTime(2000));
//Print values to console
//ex. output [0,1,2]...[3,4,5,6]
const subscribe = example.subscribe(val =>
  console.log('Buffered with Time:', val)
);
```

##### Example 2: Multiple active buffers

( [StackBlitz](https://stackblitz.com/edit/typescript-9blquz?file=index.ts&devtoolsheight=100))

```js
// RxJS v6+
import { interval } from 'rxjs';
import { bufferTime } from 'rxjs/operators';

//Create an observable that emits a value every 500ms
const source = interval(500);
/*
bufferTime also takes second argument, when to start the next buffer (time in ms)
for instance, if we have a bufferTime of 2 seconds but second argument (bufferCreationInterval) of 1 second:
ex. output: [0,1,2]...[1,2,3,4,5]...[3,4,5,6,7]
*/
const example = source.pipe(bufferTime(2000, 1000));
//Print values to console
const subscribe = example.subscribe(val =>
  console.log('Start Buffer Every 1s:', val)
);
```

### Additional Resources

* [bufferTime](https://rxjs.dev/api/operators/bufferTime)
  📰 - Official docs
* [Time based operators comparison](../../concepts/time-based-operators-comparison.md)

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/operators/bufferTime.ts](https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/operators/bufferTime.ts)
