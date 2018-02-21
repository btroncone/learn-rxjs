# combineLatest

#### signature: `combineLatest(observables: ...Observable, project: function): Observable`

## When any observable emits a value, emit the latest value from each.

---

:bulb: This operator can be used as either a static or instance method!

:bulb: [combineAll](combineall.md) can be used to apply combineLatest to emitted
observables when a source completes!

---

### Why use `combineLatest`?

This operator is best used when you have multiple, long-lived observables that
rely on eachother for some calculation or determination. Basic examples of this
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

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

(
[example tests](https://github.com/btroncone/learn-rxjs/blob/master/operators/specs/combination/combinelatest-spec.ts)
)

##### Example 1: Combining observables emitting at 3 intervals

( [StackBlitz](https://stackblitz.com/edit/typescript-wmfmtv?file=index.ts) |
[jsBin](http://jsbin.com/tinumesuda/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/mygy9j86/69/) )

```js
import { timer } from 'rxjs/observable/timer';
import { combineLatest } from 'rxjs/observable/combineLatest';

//timerOne emits first value at 1s, then once every 4s
const timerOne = timer(1000, 4000);
//timerTwo emits first value at 2s, then once every 4s
const timerTwo = timer(2000, 4000);
//timerThree emits first value at 3s, then once every 4s
const timerThree = timer(3000, 4000);

//when one timer emits, emit the latest values from each timer as an array
const combined = combineLatest(timerOne, timerTwo, timerThree);

const subscribe = combined.subscribe(
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

( [StackBlitz](https://stackblitz.com/edit/typescript-fcmjfl?file=index.ts) |
[jsBin](http://jsbin.com/codotapula/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/uehasmb6/) )

```js
import { timer } from 'rxjs/observable/timer';
import { combineLatest } from 'rxjs/observable/combineLatest';

//timerOne emits first value at 1s, then once every 4s
const timerOne = timer(1000, 4000);
//timerTwo emits first value at 2s, then once every 4s
const timerTwo = timer(2000, 4000);
//timerThree emits first value at 3s, then once every 4s
const timerThree = timer(3000, 4000);

//combineLatest also takes an optional projection function
const combinedProject = combineLatest(
  timerOne,
  timerTwo,
  timerThree,
  (one, two, three) => {
    return `Timer One (Proj) Latest: ${one}, 
              Timer Two (Proj) Latest: ${two}, 
              Timer Three (Proj) Latest: ${three}`;
  }
);
//log values
const subscribe = combinedProject.subscribe(latestValuesProject =>
  console.log(latestValuesProject)
);
```

##### Example 3: Combining events from 2 buttons

( [StackBlitz](https://stackblitz.com/edit/typescript-sfbopd?file=index.ts) |
[jsBin](http://jsbin.com/buridepaxi/edit?html,js,output) |
[jsFiddle](https://jsfiddle.net/btroncone/9rsf6t9v/14/) )

```js
import { mapTo, startWith, scan, tap, map } from 'rxjs/operators';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { combineLatest } from 'rxjs/observable/combineLatest';

// helper function to set HTML
const setHtml = id => val => (document.getElementById(id).innerHTML = val);

const addOneClick$ = id =>
  fromEvent(document.getElementById(id), 'click').pipe(
    // map every click to 1
    mapTo(1),
    startWith(0),
    // keep a running total
    scan((acc, curr) => acc + curr),
    // set HTML for appropriate element
    tap(setHtml(`${id}Total`))
  );

const combineTotal$ = combineLatest(addOneClick$('red'), addOneClick$('black'))
  .pipe(map(([val1, val2]) => val1 + val2))
  .subscribe(setHtml('total'));
```

###### HTML

```html
<div>
  <button id='red'>Red</button>
  <button id='black'>Black</button>
</div>
<div>Red: <span id="redTotal"></span> </div>
<div>Black: <span id="blackTotal"></span> </div>
<div>Total: <span id="total"></span> </div>
```

### Additional Resources

* [combineLatest](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-combineLatest)
  :newspaper: - Official docs
* [Combining streams with combineLatest](https://egghead.io/lessons/rxjs-combining-streams-with-combinelatest?course=step-by-step-async-javascript-with-rxjs)
  :video_camera: :dollar: - John Linquist
* [Combination operator: combineLatest](https://egghead.io/lessons/rxjs-combination-operator-combinelatest?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/patching/operator/combineLatest.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/patching/operator/combineLatest.ts)
