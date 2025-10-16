# timeInterval

#### signature: `timeInterval(scheduler: *): Observable<TimeInterval<any>> | WebSocketSubject<T> | Observable<T>`

## Convert an Observable that emits items into one that emits indications of the amount of time elapsed between those emissions



### Examples

##### Example 1: Time between mouse clicks

(
[StackBlitz](https://stackblitz.com/edit/rxjs-time-interval?file=index.ts&devtoolsheight=50)
)

```js
// RxJS v6+
import { fromEvent } from 'rxjs';
import { timeInterval, tap } from 'rxjs/operators';

fromEvent(document, 'mousedown')
  .pipe(timeInterval(), tap(console.log))
  .subscribe(
    i =>
      (document.body.innerText = `milliseconds since last click: ${i.interval}`)
  );
```

### Related Recipes

- [Click Ninja Game](../../recipes/click-ninja-game.md)

### Additional Resources

- [timeInterval](https://rxjs.dev/api/operators/timeInterval) 📰 - Official docs

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/operators/timeInterval.ts](https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/operators/timeInterval.ts)
