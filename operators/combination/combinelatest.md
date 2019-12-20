# combineLatest

#### signature: `combineLatest(observables: ...Observable, project: function): Observable`

## When any observable emits a value, emit the last emitted value from each.

---

:bulb: [combineAll](combineall.md) can be used to apply combineLatest to emitted
observables when a source completes!

---

### Why use `combineLatest`?

This operator is best used when you have multiple, long-lived observables that
rely on each other for some calculation or determination. Basic examples of this
can be seen in [example three](#example-3-combining-events-from-2-buttons),
where events from multiple buttons are being combined to produce a count of each
and an overall total, or a
[calculation of BMI](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-combineLatest)
from the RxJS documentation.

Be aware that **`combineLatest` will not emit an initial value until each
observable emits at least one value**. This is the same behavior as
[`withLatestFrom`](withlatestfrom.md) and can be a _gotcha_ as there will be no
output and no error but one (or more) of your inner observables is likely not
functioning as intended, or a subscription is late.

Lastly, if you are working with observables that only emit one value, or you
only require the last value of each before completion, [`forkJoin`](forkjoin.md)
is likely a better option.

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs?ref=4"><img src="https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Combining observables emitting at 3 intervals

(
[StackBlitz](https://stackblitz.com/edit/typescript-vadvm2?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { timer, combineLatest } from 'rxjs';

// timerOne emits first value at 1s, then once every 4s
const timerOne$ = timer(1000, 4000);
// timerTwo emits first value at 2s, then once every 4s
const timerTwo$ = timer(2000, 4000);
// timerThree emits first value at 3s, then once every 4s
const timerThree$ = timer(3000, 4000);

// when one timer emits, emit the latest values from each timer as an array
combineLatest(timerOne$, timerTwo$, timerThree$).subscribe(
  ([timerValOne, timerValTwo, timerValThree]) => {
    /*
  	Example:
    timerOne first tick: 'Timer One Latest: 1, Timer Two Latest:0, Timer Three Latest: 0
    timerTwo first tick: 'Timer One Latest: 1, Timer Two Latest:1, Timer Three Latest: 0
    timerThree first tick: 'Timer One Latest: 1, Timer Two Latest:1, Timer Three Latest: 1
  */
    console.log(
      `Timer One Latest: ${timerValOne},
     Timer Two Latest: ${timerValTwo},
     Timer Three Latest: ${timerValThree}`
    );
  }
);
```

##### Example 2: combineLatest with projection function

(
[StackBlitz](https://stackblitz.com/edit/typescript-prtbvd?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { timer, combineLatest } from 'rxjs';

const timerOne$ = timer(1000, 4000);
const timerTwo$ = timer(2000, 4000);
const timerThree$ = timer(3000, 4000);

combineLatest(
  timerOne$,
  timerTwo$,
  timerThree$,
  // combineLatest also takes an optional projection function
  (one, two, three) => {
    return `Timer One (Proj) Latest: ${one}, 
              Timer Two (Proj) Latest: ${two}, 
              Timer Three (Proj) Latest: ${three}`;
  }
).subscribe(console.log);
```

##### Example 3: Combining events from 2 buttons

(
[StackBlitz](https://stackblitz.com/edit/typescript-ihcxud?file=index.ts&devtoolsheight=50)
)

```js
// RxJS v6+
import { fromEvent, combineLatest } from 'rxjs';
import { mapTo, startWith, scan, tap, map } from 'rxjs/operators';

// elem refs
const redTotal = document.getElementById('red-total');
const blackTotal = document.getElementById('black-total');
const total = document.getElementById('total');

const addOneClick$ = id =>
  fromEvent(document.getElementById(id), 'click').pipe(
    // map every click to 1
    mapTo(1),
    // keep a running total
    scan((acc, curr) => acc + curr, 0),
    startWith(0)
  );

combineLatest(addOneClick$('red'), addOneClick$('black')).subscribe(
  ([red, black]: any) => {
    redTotal.innerHTML = red;
    blackTotal.innerHTML = black;
    total.innerHTML = red + black;
  }
);
```

###### HTML

```html
<div>
  <button id="red">Red</button>
  <button id="black">Black</button>
</div>
<div>Red: <span id="red-total"></span></div>
<div>Black: <span id="black-total"></span></div>
<div>Total: <span id="total"></span></div>
```

### Related Recipes

- [Alphabet Invasion Game](../../recipes/alphabet-invasion-game.md)
- [Breakout Game](../../recipes/breakout-game.md)
- [Car Racing Game](../../recipes/car-racing-game.md)
- [Flappy Bird Game](../../recipes/flappy-bird-game.md)
- [Platform Jumper Game](../../recipes/platform-jumper-game.md)
- [Tank Battle Game](../../recipes/tank-battle-game.md)
- [Tetris Game](../../recipes/tetris-game.md)

### Additional Resources

- [combineLatest](https://rxjs.dev/api/index/function/combineLatest)
  :newspaper: - Official docs
- [Combining streams with combineLatest](https://egghead.io/lessons/rxjs-combining-streams-with-combinelatest?course=step-by-step-async-javascript-with-rxjs)
  :video_camera: :dollar: - John Linquist
- [Combination operator: combineLatest](https://egghead.io/lessons/rxjs-combination-operator-combinelatest?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz
- [Build your own combineLatest operator](https://blog.strongbrew.io/build-the-operators-from-rxjs-from-scratch/?lectureId=combineLatest#app)
  :video_camera: - Kwinten Pisman

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/combineLatest.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/combineLatest.ts)
