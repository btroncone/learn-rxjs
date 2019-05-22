# empty

#### signature: `empty(scheduler: Scheduler): Observable`

## Observable that immediately completes.

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs"><img src="https://ultimatecourses.com/assets/img/banners/rxjs-banner-desktop.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: empty immediately completes

(
[StackBlitz](https://stackblitz.com/edit/typescript-aqfpkq?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/rodubucaqa/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/bz71mzuy/) )

```js
// RxJS v6+
import { empty } from 'rxjs';

//output: 'Complete!'
const subscribe = empty().subscribe({
  next: () => console.log('Next'),
  complete: () => console.log('Complete!')
});
```

##### Example 2: `empty` with timer

(
[StackBlitz](https://stackblitz.com/edit/typescript-uujo8t?file=index.ts&devtoolsheight=50)
)

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
    // if timer is paused return empty observable
    switchMap(val => (val ? interval$ : empty())),
    scan((acc, curr) => (curr ? curr + acc : acc), countdownSeconds),
    takeWhile(v => v >= 0)
  )
  .subscribe(setHTML('remaining'));
```

### Related Recipes

- [Memory Game](../../recipes/memory-game.md)

### Additional Resources

- [empty](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-empty)
  :newspaper: - Official docs
- [Creation operators: empty, never, and throw](https://egghead.io/lessons/rxjs-creation-operators-empty-never-throw?course=rxjs-beyond-the-basics-creating-observables-from-scratch)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/EmptyObservable.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/EmptyObservable.ts)
