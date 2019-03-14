
# timeInterval

#### signature: `timeInterval(scheduler: *): Observable<TimeInterval<any>> | WebSocketSubject<T> | Observable<T>`

## Convert an Observable that emits items into one that emits indications of the amount of time elapsed between those emissions


<div class="ua-ad"><a href="https://ultimatecourses.com/?ref=76683_kee7y7vk"><img src="https://ultimatecourses.com/assets/img/banners/ultimate-angular-leader.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Time between mouse clicks

(
[StackBlitz](https://stackblitz.com/edit/rxjs-time-interval?file=index.ts&devtoolsheight=50) )

```js
// RxJS v6+
import { fromEvent } from 'rxjs';
import { timeInterval, tap } from 'rxjs/operators';

fromEvent(document, 'mousedown').pipe(
  timeInterval(),
  tap(console.log)
).subscribe(i =>
  document.body.innerText = `milliseconds since last click: ${i.interval}`
);

```

### Additional Resources

- [timeInterval](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-timeInterval)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/timeInterval.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/timeInterval.ts)
