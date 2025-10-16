# auditTime

#### signature: `auditTime(duration: number, scheduler?: Scheduler): Observable`

## Ignore for given time then emit most recent value

### Why use `auditTime`

When you are interested in ignoring a source observable for a given amount of time, you can use `auditTime`. A possible use case is to only emit certain events (i.e. mouse clicks) at a maximum rate per second. After the specified duration has passed, the timer is disabled and the most recent source value is emitted on the output Observable, and this process repeats for the next source value.

---

💡 If you want the timer to reset whenever a new event occurs on the source observable, you can use [debounceTime](debouncetime.md)

---

### Examples

##### Example 1: Emit clicks at a rate of at most one click per second

( [stackBlitz](https://stackblitz.com/edit/typescript-skykxw) )

```js
import { fromEvent } from 'rxjs';
import { auditTime } from 'rxjs/operators';

// Create observable that emits click events
const source = fromEvent(document, 'click');
// Emit clicks at a rate of at most one click per second
const example = source.pipe(auditTime(1000))
// Output (example): '(1s) --- Clicked --- (1s) --- Clicked' 
const subscribe = example.subscribe(val => console.log('Clicked'));
```

### Additional Resources

* [auditTime](https://rxjs.dev/api/operators/auditTime)
  📰 - Official docs
* [auditTime](https://indepth.dev/reference/rxjs/operators/audit-time) - In Depth Dev Reference
* [Time based operators comparison](../../concepts/time-based-operators-comparison.md)

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/operators/auditTime.ts](https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/operators/auditTime.ts)
