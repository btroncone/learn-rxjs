# catch / catchError

#### signature: `catchError(project : function): Observable`

## Gracefully handle errors in an observable sequence.

---

:warning: Remember to return an observable from the catchError function!

---

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs"><img src="https://ultimatecourses.com/assets/img/banners/rxjs-banner-desktop.svg" style="width:100%;max-width:100%"></a></div>

### Examples

(
[example tests](https://github.com/btroncone/learn-rxjs/blob/master/operators/specs/error_handling/catch-spec.ts)
)

##### Example 1: Catching error from observable

(
[StackBlitz](https://stackblitz.com/edit/typescript-auc2u2?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/porevoxelu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/wk4oLLqc/) )

```js
// RxJS v6+
import { throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
//emit error
const source = throwError('This is an error!');
//gracefully handle error, returning observable with error message
const example = source.pipe(catchError(val => of(`I caught: ${val}`)));
//output: 'I caught: This is an error'
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Catching rejected promise

(
[StackBlitz](https://stackblitz.com/edit/typescript-nte3xs?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/rusaxubanu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/sLq92gLv/) )

```js
// RxJS v6+
import { timer, from, of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

//create promise that immediately rejects
const myBadPromise = () =>
  new Promise((resolve, reject) => reject('Rejected!'));
//emit single value after 1 second
const source = timer(1000);
//catch rejected promise, returning observable containing error message
const example = source.pipe(
  mergeMap(_ =>
    from(myBadPromise()).pipe(catchError(error => of(`Bad Promise: ${error}`)))
  )
);
//output: 'Bad Promise: Rejected'
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 3: Catching errors comparison when using switchMap/mergeMap/concatMap/exhaustMap

(
[StackBlitz](https://stackblitz.com/edit/rxjs-catcherror-withmapoperators?file=index.ts&devtoolsheight=80)
)

```js
// switchMap in example below can be replaced with mergeMap/concatMap/exhaustMap, the same behaviour applies
import { throwError, fromEvent, of } from 'rxjs';
import {
  catchError,
  tap,
  switchMap,
  mergeMap,
  concatMap,
  exhaustMap
} from 'rxjs/operators';

const fakeRequest$ = of().pipe(
  tap(_ => console.log('fakeRequest')),
  throwError
);

const iWillContinueListening$ = fromEvent(
  document.getElementById('continued'),
  'click'
).pipe(
  switchMap(_ => fakeRequest$.pipe(catchError(_ => of('keep on clicking!!!'))))
);

const iWillStopListening$ = fromEvent(
  document.getElementById('stopped'),
  'click'
).pipe(
  switchMap(_ => fakeRequest$),
  catchError(_ => of('no more requests!!!'))
);

iWillContinueListening$.subscribe(console.log);
iWillStopListening$.subscribe(console.log);
```

### Additional Resources

- [catchError](https://rxjs.dev/api/operators/catchError)
  :newspaper: - Official docs
- [Error handling operator: catch](https://egghead.io/lessons/rxjs-error-handling-operator-catch?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/catchError.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/catchError.ts)
