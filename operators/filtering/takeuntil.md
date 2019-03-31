# takeUntil

#### signature: `takeUntil(notifier: Observable): Observable`

## Emit values until provided observable emits.

---

:bulb: If you only need a specific number of values, try [take](take.md)!

---

<div class="ua-ad"><a href="https://ultimatecourses.com/"><img src="https://ultimatecourses.com/assets/img/banners/ultimate-angular-leader.svg" style="width:100%;max-width:100%"></a></div>

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
[StackBlitz](https://stackblitz.com/edit/rxjs-ug2ezf?file=index.ts&devtoolsheight=50) )

```js
// RxJS v6+
import { fromEvent } from 'rxjs';
import { takeUntil, mergeMap, map } from 'rxjs/operators';

const mousedown$ = fromEvent(document, 'mousedown')
const mouseup$ = fromEvent(document, 'mouseup');
const mousemove$ = fromEvent(document, 'mousemove');

// after mousedown, take position until mouse up
mousedown$.pipe(
  mergeMap(_ => {
    return mousemove$.pipe(
      map((e: any) => ({
        x: e.clientX,
        y: e.clientY
      })),
      // complete inner observable on mouseup event
      takeUntil(mouseup$)
    )
  })
)
.subscribe(console.log);
```

### Related Recipes

- [Lockscreen](../../recipes/lockscreen.md)
- [Space Invaders Game](/recipes/space-invaders-game.md)
- [Swipe To Refresh](/recipes/swipe-to-refresh.md)

### Additional Resources

- [takeUntil](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-takeUntil)
  :newspaper: - Official docs

* [Avoiding takeUntil leaks](https://blog.angularindepth.com/rxjs-avoiding-takeuntil-leaks-fb5182d047ef) -
  Angular in Depth
* [Stopping a stream with takeUntil](https://egghead.io/lessons/rxjs-stopping-a-stream-with-takeuntil?course=step-by-step-async-javascript-with-rxjs)
  :video_camera: :dollar: - John Linquist

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/takeUntil.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/takeUntil.ts)
