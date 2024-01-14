# takeUntil

#### signature: `takeUntil(notifier: Observable): Observable`

## Emit values until provided observable emits.

---

💡 If you only need a specific number of values, try [take](take.md)!

---

### Why use `takeUntil`?

Consider a day at your workplace: You're anticipating an important email, but you've decided that once the clock hits 5 pm, you're clocking out, regardless of whether you've received that email or not. In this RxJS analogy, the anticipation of the email is one observable, while the 5 pm clock-out time is another. The `takeUntil` operator ensures you're alert for the email's potential arrival, but the moment 5 pm arrives, you stop checking (unsubscribe).

In real-world applications, think of a scenario where you're monitoring server responses on a dashboard. However, you want this monitoring to cease once a specific "Stop Monitoring" button is clicked. That's where `takeUntil` shines.

In the context of Angular, `takeUntil` is particularly handy for auto-unsubscribing from observables when a component is destroyed. This is achieved by leveraging the `ngOnDestroy` lifecycle hook. You'd typically create a `Subject`, often named `destroy$`, and use it with `takeUntil`:

```typescript
private destroy$ = new Subject<void>();

observable$
  .pipe(takeUntil(this.destroy$))
  .subscribe(data => console.log(data));

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

With this setup, as soon as the `ngOnDestroy` method is called (when the component is about to be destroyed), the observables using `takeUntil` with the `destroy$` subject will automatically unsubscribe, ensuring that no unwanted memory leaks or unexpected behavior occurs.

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1qq2-q-eVe-F_-d0eSvTyqaGRjpfLDdJz 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: Take values until timer emits

(
[StackBlitz](https://stackblitz.com/edit/typescript-ujwjbg?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/yevuhukeja/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/zbe9dzb9/) )

```js
// RxJS v6+
import { interval, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

//emit value every 1s
const source = interval(1000);
//after 5 seconds, emit value
const timer$ = timer(5000);
//when timer emits after 5s, complete source
const example = source.pipe(takeUntil(timer$));
//output: 0,1,2,3
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Take the first 5 even numbers

(
[StackBlitz](https://stackblitz.com/edit/typescript-djhv7s?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/doquqecara/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/0dLeksLe/) )

```js
// RxJS v6+
import { interval } from 'rxjs/observable/interval';
import { takeUntil, filter, scan, map, withLatestFrom } from 'rxjs/operators';

//emit value every 1s
const source = interval(1000);
//is number even?
const isEven = val => val % 2 === 0;
//only allow values that are even
const evenSource = source.pipe(filter(isEven));
//keep a running total of the number of even numbers out
const evenNumberCount = evenSource.pipe(scan((acc, _) => acc + 1, 0));
//do not emit until 5 even numbers have been emitted
const fiveEvenNumbers = evenNumberCount.pipe(filter(val => val > 5));

const example = evenSource.pipe(
  //also give me the current even number count for display
  withLatestFrom(evenNumberCount),
  map(([val, count]) => `Even number (${count}) : ${val}`),
  //when five even numbers have been emitted, complete source observable
  takeUntil(fiveEvenNumbers)
);
/*
	Even number (1) : 0,
  Even number (2) : 2
	Even number (3) : 4
	Even number (4) : 6
	Even number (5) : 8
*/
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 3: Take mouse events on mouse down until mouse up

(
[StackBlitz](https://stackblitz.com/edit/rxjs-ug2ezf?file=index.ts&devtoolsheight=50)
)

```js
// RxJS v6+
import { fromEvent } from 'rxjs';
import { takeUntil, mergeMap, map } from 'rxjs/operators';

const mousedown$ = fromEvent(document, 'mousedown');
const mouseup$ = fromEvent(document, 'mouseup');
const mousemove$ = fromEvent(document, 'mousemove');

// after mousedown, take position until mouse up
mousedown$
  .pipe(
    mergeMap(_ => {
      return mousemove$.pipe(
        map((e: any) => ({
          x: e.clientX,
          y: e.clientY
        })),
        // complete inner observable on mouseup event
        takeUntil(mouseup$)
      );
    })
  )
  .subscribe(console.log);
```

### Related Recipes

- [Lockscreen](../../recipes/lockscreen.md)
- [Space Invaders Game](/recipes/space-invaders-game.md)
- [Swipe To Refresh](/recipes/swipe-to-refresh.md)

### Additional Resources

- [takeUntil](https://rxjs.dev/api/operators/takeUntil) 📰 - Official docs
- [takeUntil](https://web.archive.org/web/20230925063213/https://indepth.dev/reference/rxjs/operators/take-until) - In Depth Dev Reference
- [Avoiding takeUntil leaks](https://cartant.medium.com/rxjs-avoiding-takeuntil-leaks-fb5182d047ef) -
  Nicholas Jamieson
- [Stopping a stream with takeUntil](https://egghead.io/lessons/rxjs-stopping-a-stream-with-takeuntil?course=step-by-step-async-javascript-with-rxjs)
  🎥 💵 - John Linquist
- [Build your own takeUntil operator](https://github.com/KwintenP/rxjs-operators-from-scratch/blob/master/src/operators/takeUntil.ts)
  📁 - Kwinten Pisman

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/operators/takeUntil.ts](https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/operators/takeUntil.ts)
