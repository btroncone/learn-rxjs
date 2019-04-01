# switchMap

#### signature: `switchMap(project: function: Observable, resultSelector: function(outerValue, innerValue, outerIndex, innerIndex): any): Observable`

## Map to observable, complete previous inner observable, emit values.

---

:bulb: If you would like more than one inner subscription to be maintained, try
[`mergeMap`](mergemap.md)!

:bulb: This operator is generally considered a safer default to
[`mergeMap`](mergemap.md)!

:bulb: This operator can cancel in-flight network requests!

---

### Why use `switchMap`?

The main difference between `switchMap` and other flattening operators is the
cancelling effect. On each emission the previous inner observable (the result of
the function you supplied) is cancelled and the new observable is subscribed.
You can remember this by the phrase **switch to a new observable**.

This works perfectly for scenarios like
[typeaheads](https://angular-2-training-book.rangle.io/handout/http/search_with_switchmap.html)
where you are no longer concerned with the response of the previous request when
a new input arrives. This also is a safe option in situations where a long lived
inner observable could cause memory leaks, for instance if you used
[mergeMap](mergemap.md) with an interval and forgot to properly dispose of inner
subscriptions. Remember, `switchMap` maintains only one inner subscription at a
time, this can be seen clearly in the
[first example](#example-1-restart-interval-every-5-seconds).

Be careful though, you probably want to avoid `switchMap` in scenarios where
every request needs to complete, think writes to a database. `switchMap` could
cancel a request if the source emits quickly enough. In these scenarios
[mergeMap](mergemap.md) is the correct option.

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/angular"><img src="https://ultimatecourses.com/assets/img/banners/ultimate-angular-leader.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Restart interval every 5 seconds

(
[StackBlitz](https://stackblitz.com/edit/typescript-eb62ap?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/birepuveya/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/6pz981gd/) )

```js
// RxJS v6+
import { timer, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

//emit immediately, then every 5s
const source = timer(0, 5000);
//switch to new inner observable when source emits, emit items that are emitted
const example = source.pipe(switchMap(() => interval(500)));
//output: 0,1,2,3,4,5,6,7,8,9...0,1,2,3,4,5,6,7,8
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Reset on every click

(
[StackBlitz](https://stackblitz.com/edit/typescript-s4pvix?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/zoruboxogo/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/y11v8aqz/) )

```js
// RxJS v6+
import { interval, fromEvent } from 'rxjs';
import { switchMap, mapTo } from 'rxjs/operators';

//emit every click
const source = fromEvent(document, 'click');
//if another click comes within 3s, message will not be emitted
const example = source.pipe(
  switchMap(val => interval(3000).pipe(mapTo('Hello, I made it!')))
);
//(click)...3s...'Hello I made it!'...(click)...2s(click)...
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 3: Using a `resultSelector` function

(
[StackBlitz](https://stackblitz.com/edit/typescript-bmibzi?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/qobapubeze/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/nqfu534y/) )

```js
// RxJS v6+
import { timer, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

//emit immediately, then every 5s
const source = timer(0, 5000);
//switch to new inner observable when source emits, invoke project function and emit values
const example = source.pipe(
  switchMap(
    _ => interval(2000),
    (outerValue, innerValue, outerIndex, innerIndex) => ({
      outerValue,
      innerValue,
      outerIndex,
      innerIndex
    })
  )
);
/*
	Output:
	{outerValue: 0, innerValue: 0, outerIndex: 0, innerIndex: 0}
	{outerValue: 0, innerValue: 1, outerIndex: 0, innerIndex: 1}
	{outerValue: 1, innerValue: 0, outerIndex: 1, innerIndex: 0}
	{outerValue: 1, innerValue: 1, outerIndex: 1, innerIndex: 1}
*/
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 4: Countdown timer with switchMap

( [StackBlitz](https://stackblitz.com/edit/typescript-ivdebg?file=index.ts) )

```js
// RxJS v6+
import { interval, fromEvent, merge, empty } from 'rxjs';
import { switchMap, scan, takeWhile, startWith, mapTo } from 'rxjs/operators';

const countdownSeconds = 10;
const setHTML = id => val => (document.getElementById(id).innerHTML = val);
const pauseButton = document.getElementById('pause');
const resumeButton = document.getElementById('resume');
const interval$ = interval(1000).pipe(mapTo(-1));

const pause$ = fromEvent(pauseButton, 'click').pipe(mapTo(false));
const resume$ = fromEvent(resumeButton, 'click').pipe(mapTo(true));

const timer$ = merge(pause$, resume$)
  .pipe(
    startWith(true),
    switchMap(val => (val ? interval$ : empty())),
    scan((acc, curr) => (curr ? curr + acc : acc), countdownSeconds),
    takeWhile(v => v >= 0)
  )
  .subscribe(setHTML('remaining'));
```

###### HTML

```html
<h4>
Time remaining: <span id="remaining"></span>
</h4>
<button id="pause">
Pause Timer
</button>
<button id="resume">
Resume Timer
</button>
```

### Related Recipes

- [Alphabet Invasion Game](../../recipes/alphabet-invasion-game.md)
- [Catch The Dot Game](../../recipes/catch-the-dot-game.md)
- [HTTP Polling](../../recipes/http-polling.md)
- [Lockscreen](../../recipes/lockscreen.md)
- [Mine Sweeper Game](../../recipes/mine-sweeper-game.md)
- [Platform Jumper Game](../../recipes/platform-jumper-game.md)
- [Progress Bar](../../recipes/progressbar.md)
- [Smart Counter](../../recipes/smartcounter.md)
- [Type Ahead](../../recipes/type-ahead.md)

### Additional Resources

- [switchMap](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-switchMap)
  :newspaper: - Official docs
- [Avoiding switchMap-Related Bugs](https://blog.angularindepth.com/switchmap-bugs-b6de69155524) -
  Nicholas Jamieson
- [Starting a stream with switchMap](https://egghead.io/lessons/rxjs-starting-a-stream-with-switchmap?course=step-by-step-async-javascript-with-rxjs)
  :video_camera: :dollar: - John Linquist
- [Use RxJS switchMap to map and flatten higher order observables](https://egghead.io/lessons/rxjs-use-rxjs-switchmap-to-map-and-flatten-higher-order-observables?course=use-higher-order-observables-in-rxjs-effectively)
  :video_camera: :dollar: - André Staltz
- [Use switchMap as a safe default to flatten observables in RxJS](https://egghead.io/lessons/rxjs-use-switchmap-as-a-safe-default-to-flatten-observables-in-rxjs?course=use-higher-order-observables-in-rxjs-effectively)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/switchMap.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/switchMap.ts)
