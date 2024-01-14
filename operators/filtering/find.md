# find

#### signature: `find(predicate: function)`

## Emit the first item that passes predicate then complete.

---

💡 If you always want the first item emitted, regardless of condition, try
[`first()`](first.md)!

---

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1qq2-q-eVe-F_-d0eSvTyqaGRjpfLDdJz 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: Find click inside box, repeat when a click occurs outside of box

( [StackBlitz](https://stackblitz.com/edit/rxjs-hd63we?file=index.ts))

```js
// RxJS v6+
import { fromEvent } from 'rxjs';
import { find, repeatWhen, mapTo, startWith, filter } from 'rxjs/operators';

// elem ref
const status = document.getElementById('status');

// streams
const clicks$ = fromEvent(document, 'click');

clicks$
  .pipe(
    find((event: any) => event.target.id === 'box'),
    mapTo('Found!'),
    startWith('Find me!'),
    // reset when click outside box
    repeatWhen(() =>
      clicks$.pipe(filter((event: any) => event.target.id !== 'box'))
    )
  )
  .subscribe(message => (status.innerHTML = message));
```

### Additional Resources

- [find](https://rxjs.dev/api/operators/find) 📰 - Official docs

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/operators/find.ts](https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/operators/find.ts)
