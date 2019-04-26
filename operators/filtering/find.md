# find

#### signature: `find(predicate: function)`

## Emit the first item that passes predicate, complete.

---

:bulb: If you always want the first item emitted, regardless of condition, try
[`first`](first.md)!

---

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/angular"><img src="https://ultimatecourses.com/assets/img/banners/ultimate-angular-leader.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Find click inside box, repeat when click occurs outside of box

( [StackBlitz](https://stackblitz.com/edit/rxjs-hd63we?file=index.ts))

```js
// RxJS v6+
import { fromEvent, interval } from 'rxjs';
import {
  find,
  repeatWhen,
  mapTo,
  startWith,
  tap,
  take,
  filter
} from 'rxjs/operators';

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

- [find](https://rxjs-dev.firebaseapp.com/api/operators/find) :newspaper: -
  Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/find.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/find.ts)
