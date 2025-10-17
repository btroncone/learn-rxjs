# debounceTime

#### signature: `debounceTime(dueTime: number, scheduler: Scheduler): Observable`

## Discard emitted values that take less than the specified time between output

---

💡 This operator is popular in scenarios such as type-ahead where the rate of
user input must be controlled!

---

### Why use `debounceTime`?

Think of `debounceTime` like taking a pause in a conversation to let the other person finish their thought. This operator is incredibly handy when you're dealing with rapid sequences of events and only care about acting upon the last event after a specified duration.

A classic real-world application is in form inputs, particularly in search bars. Imagine you're typing into a search box. Instead of firing off an API call with every keystroke (which can be overwhelming and inefficient), you'd want to wait a bit after the user stops typing to ensure you're fetching data based on their complete thought. That "waiting a bit" is where `debounceTime` shines. For instance, by setting `debounceTime(300)`, the system will wait for 300 milliseconds after the last keystroke before it proceeds.

In Angular, when dealing with reactive forms, `debounceTime` is a lifesaver. By adding this operator to a form control's value changes observable, you can efficiently handle values only after users finish their input. Check out the below example:
```typescript
this.myFormControl.valueChanges.pipe(
  debounceTime(300)
).subscribe(value => {
  // handle the value after 300ms of inactivity
});
```




### Examples

##### Example 1: Debouncing based on time between input

(
[StackBlitz](https://stackblitz.com/edit/typescript-adheqt?file=index.ts&devtoolsheight=50)
)

```js
// RxJS v6+
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

// elem ref
const searchBox = document.getElementById('search');

// streams
const keyup$ = fromEvent(searchBox, 'keyup');

// wait .5s between keyups to emit current value
keyup$
  .pipe(
    map((i: any) => i.currentTarget.value),
    debounceTime(500)
  )
  .subscribe(console.log);
```

### Related Recipes

- [Save Indicator](../../recipes/save-indicator.md)
- [Type Ahead](../../recipes/type-ahead.md)

### Additional Resources

- [debounceTime](https://rxjs.dev/api/operators/debounceTime) 📰 - Official docs
- [Transformation operator: debounce and debounceTime](https://egghead.io/lessons/rxjs-transformation-operators-debounce-and-debouncetime?course=rxjs-beyond-the-basics-operators-in-depth)
  🎥 💵 - André Staltz
- [Time based operators comparison](../../concepts/time-based-operators-comparison.md)

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/operators/debounceTime.ts](https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/operators/debounceTime.ts)
