# catchError

#### signature: `catchError(project : function): Observable`

## Gracefully handle errors in an observable sequence.

---

:warning: Remember to return an observable from the catchError function!

---

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

(
[example tests](https://github.com/btroncone/learn-rxjs/blob/master/operators/specs/error_handling/catch-spec.ts)
)

##### Example 1: Catching error from observable

( [jsBin](http://jsbin.com/porevoxelu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/wk4oLLqc/) )

```js
import { _throw } from 'rxjs/observable/throw';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
//emit error
const source = _throw('This is an error!');
//gracefully handle error, returning observable with error message
const example = source.pipe(catchError(val => of(`I caught: ${val}`)));
//output: 'I caught: This is an error'
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Catching rejected promise

( [jsBin](http://jsbin.com/rusaxubanu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/sLq92gLv/) )

```js
import { timer } from 'rxjs/observable/timer';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

//create promise that immediately rejects
const myBadPromise = () =>
  new Promise((resolve, reject) => reject('Rejected!'));
//emit single value after 1 second
const source = timer(1000);
//catch rejected promise, returning observable containing error message
const example = source.pipe(
  mergeMap(_ =>
    fromPromise(myBadPromise()).pipe(
      catchError(error => of(`Bad Promise: ${error}`))
    )
  )
);
//output: 'Bad Promise: Rejected'
const subscribe = example.subscribe(val => console.log(val));
```

### Additional Resources

* [Error handling operator: catch](https://egghead.io/lessons/rxjs-error-handling-operator-catch?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/catchError.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/catchError.ts)
