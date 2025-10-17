# catchError

## signature: `catchError(project: (err: any, caught: Observable<T>) => ObservableInput<any>): Observable`

### Gracefully handle errors in an observable sequence.

---

💡 Need to retry a failed operation? Check out [**retry**](./retry.md) or [**retryWhen**](./retrywhen.md)!

💡 For resource cleanup regardless of error, use [**finalize**](../utility/finalize.md)!

⚠ Remember to return an observable from the catchError function!

---

## Why use catchError?

Think of `catchError` as your observable's safety net. When your stream encounters an error, whether from a failed HTTP request, unexpected data, or any other issue, `catchError` gives you a chance to recover gracefully instead of letting your entire observable sequence crash and burn. It's the difference between your app showing a friendly "Something went wrong" message versus a blank screen.

What makes `catchError` particularly valuable is its flexibility in how you respond to errors. You can provide [fallback data from a cache](#example-1-catching-error-from-observable), you can [transform errors into user-friendly messages](#example-2-catching-rejected-promise), or you can even decide to retry the operation (though [`retry`](./retry.md) is usually better for that). The key insight is understanding *where* you place `catchError` in your operator chain. Put it at the outer level and your entire stream ends when an error occurs, but place it inside operators like `switchMap` and [only that inner operation fails while your stream continues](#example-3-catching-errors-comparison-when-using-switchmapmergemapconcatmapexhaustmap).

In essence, `catchError` keeps your reactive applications resilient by ensuring that errors are handled on your terms, not left to crash your user experience.

---

## Examples

### Example 1: Catching error from observable

( [StackBlitz](https://stackblitz.com/edit/typescript-auc2u2?file=index.ts&devtoolsheight=100) )

```js
// RxJS v6+
import { throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// emit error
const source = throwError('This is an error!');

// gracefully handle error, returning observable with error message
const example = source.pipe(
  catchError(val => of(`I caught: ${val}`))
);

// output: 'I caught: This is an error'
const subscribe = example.subscribe(val => console.log(val));
```

### Example 2: Catching rejected promise

( [StackBlitz](https://stackblitz.com/edit/typescript-nte3xs?file=index.ts&devtoolsheight=100) )

```js
// RxJS v6+
import { timer, from, of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

// create promise that immediately rejects
const myBadPromise = () =>
  new Promise((resolve, reject) => reject('Rejected!'));

// emit single value after 1 second
const source = timer(1000);

// catch rejected promise, returning observable containing error message
const example = source.pipe(
  mergeMap(_ =>
    from(myBadPromise()).pipe(
      catchError(error => of(`Bad Promise: ${error}`))
    )
  )
);

// output: 'Bad Promise: Rejected'
const subscribe = example.subscribe(val => console.log(val));
```

### Example 3: Catching errors comparison when using switchMap/mergeMap/concatMap/exhaustMap

( [StackBlitz](https://stackblitz.com/edit/rxjs-catcherror-withmapoperators?file=index.ts&devtoolsheight=80) )

```js
// RxJS v6+
import { throwError, fromEvent, of } from 'rxjs';
import {
  catchError,
  tap,
  switchMap,
  mergeMap,
  concatMap,
  exhaustMap
} from 'rxjs/operators';

// simulate an API call that throws an error
const fakeRequest$ = of().pipe(
  tap(_ => console.log('fakeRequest')),
  throwError
);

/*
 * Placement of catchError MATTERS!
 *
 * When catchError is placed INSIDE the switchMap, only the inner
 * observable errors out and the outer stream continues.
 * You can keep clicking and making new requests.
 */
const iWillContinueListening$ = fromEvent(
  document.getElementById('continued'),
  'click'
).pipe(
  switchMap(_ => 
    fakeRequest$.pipe(
      catchError(_ => of('keep on clicking!!!'))
    )
  )
);

/*
 * When catchError is placed at the OUTER level, after switchMap,
 * the entire stream errors out and terminates.
 * After the first click, the stream is dead and won't respond to more clicks.
 */
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

### Example 4: Providing fallback data on HTTP error

( [StackBlitz](https://stackblitz.com/edit/typescript-n9llq6e3?file=index.ts) )

```js
// RxJS v6+
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// attempt to fetch user data from API
const userData$ = ajax.getJSON('https://api.example.com/user/123').pipe(
  map(response => response.data),
  // if the request fails, provide cached or default data
  catchError(error => {
    console.error('Failed to fetch user, using cached data', error);
    return of({ 
      id: 123, 
      name: 'Cached User', 
      status: 'offline' 
    });
  })
);

// user always gets data, even if the API is down
userData$.subscribe(user => console.log('User:', user));
```

---

## Related Recipes

- [Smart Counter](../../recipes/smartcounter.md)
- [HTTP Polling](../../recipes/http-polling.md)

---

## Additional Resources

- [catchError](https://rxjs.dev/api/operators/catchError) 📰 - Official docs
- [Error handling operator: catch](https://egghead.io/lessons/rxjs-error-handling-operator-catch?course=rxjs-beyond-the-basics-operators-in-depth) 🎥 💵 - André Staltz
- [Error Handling in RxJS](https://blog.angular-university.io/rxjs-error-handling/) 📰 - Angular University

---

📁 **Source Code:** [https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/operators/catchError.ts](https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/operators/catchError.ts)