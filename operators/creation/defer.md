# defer

#### signature: `defer(observableFactory: function(): SubscribableOrPromise): Observable`

## Create an observable with given subscription function.

---

:bulb:
[`defer`](https://github.com/ReactiveX/rxjs/blob/ecc73d2a1564d0d3edffba90eec76510e509236c/src/internal/observable/iif.ts#L94-L100)
is used as part of the [`iif`](../conditional/iif.md) operator!

---

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/angular"><img src="https://ultimatecourses.com/assets/img/banners/ultimate-angular-leader.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Defer to get current date/time at the time of subscription

(
[StackBlitz](https://stackblitz.com/edit/rxjs-defer-example?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { defer, of, timer, merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const s1 = of(new Date()); //will capture current date time
const s2 = defer(() => of(new Date())); //will capture date time at the moment of subscription

console.log(new Date());

timer(2000)
  .pipe(switchMap(_ => merge(s1, s2)))
  .subscribe(console.log);

/*
OUTPUT => 
2019-02-10T12:38:30.000Z (currrent date/time from first console log)
2019-02-10T12:38:30.000Z (date/time in s1 console log, captured date/time at the moment of observable creation)
2019-02-10T12:38:32.000Z (date/time in s2 console log, captured date/time at the moment of subscription)
*/

/*//NOTE: 'traditional' js equivalent of timer code above is:
setTimeout(() => {
  s1.subscribe(console.log);
  s2.subscribe(console.log);
}, 2000);
*/
```

### Additional Resources

- [defer](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-defer)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/defer.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/defer.ts)
