# exhaustMap

#### signature: `exhaustMap(project: function, resultSelector: function): Observable`

## Map to inner observable, ignore other values until that observable completes.

### Why use `exhaustMap`?

Imagine you're at a coffee shop where each customer is allowed to place only one order at a time and must wait until that order is fully prepared before making another. If they try to order again while their coffee is still brewing, the barista simply ignores them. That's the essence of `exhaustMap`.

This operator is perfect for handling events that might be triggered multiple times in rapid succession but where only the initial trigger should be acted upon until it completes. A prime example would be ignoring clicks where a user might impatiently tap a 'Submit' button multiple times. Instead of sending multiple network requests, you'd ideally only want the first click to initiate the action and ignore subsequent clicks until the request is done.

Take note that **`exhaustMap` will ignore source values while the previous inner observable is still active**. This means that if the inner observable hasn't completed, any new values emitted from the source will be discarded without any mapping.

If you want to handle every single event, even if previous ones haven't completed, other operators like [`switchMap`](switchmap.md) or [`mergeMap`](mergemap.md) might be more appropriate. But when ensuring one task is exhausted before moving to the next, `exhaustMap` is your go-to choice.



### Examples

##### Example 1: exhaustMap with interval

(
[Stackblitz](https://stackblitz.com/edit/typescript-3qydhn?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/woposeqobo/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/9ovzapp9/) )

```js
// RxJS v6+
import { interval, merge, of } from 'rxjs';
import { delay, take, exhaustMap } from 'rxjs/operators';

const sourceInterval = interval(1000);
const delayedInterval = sourceInterval.pipe(delay(10), take(4));

const exhaustSub = merge(
  // delay 10ms, then start interval emitting 4 values
  delayedInterval,
  // emit immediately
  of(true)
)
  .pipe(exhaustMap(_ => sourceInterval.pipe(take(5))))
  /*
   *  The first emitted value (of(true)) will be mapped
   *  to an interval observable emitting 1 value every
   *  second, completing after 5.
   *  Because the emissions from the delayed interval
   *  fall while this observable is still active they will be ignored.
   *
   *  Contrast this with concatMap which would queue,
   *  switchMap which would switch to a new inner observable each emission,
   *  and mergeMap which would maintain a new subscription for each emitted value.
   */
  // output: 0, 1, 2, 3, 4
  .subscribe(val => console.log(val));
```

##### Example 2: Another exhaustMap with interval

(
[Stackblitz](https://stackblitz.com/edit/typescript-vxussb?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/fizuduzuti/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/5ck8yg5k/3/) )

```js
// RxJS v6+
import { interval } from 'rxjs';
import { exhaustMap, tap, take } from 'rxjs/operators';

const firstInterval = interval(1000).pipe(take(10));
const secondInterval = interval(1000).pipe(take(2));

const exhaustSub = firstInterval
  .pipe(
    exhaustMap(f => {
      console.log(`Emission Corrected of first interval: ${f}`);
      return secondInterval;
    })
  )
  /*
                When we subscribed to the first interval, it starts to emit a values (starting 0).
                This value is mapped to the second interval which then begins to emit (starting 0).  
                While the second interval is active, values from the first interval are ignored.
                We can see this when firstInterval emits number 3,6, and so on...

                  Output:
                  Emission of first interval: 0
                  0
                  1
                  Emission of first interval: 3
                  0
                  1
                  Emission of first interval: 6
                  0
                  1
                  Emission of first interval: 9
                  0
                  1
              */
  .subscribe(s => console.log(s));
```

### Related Recipes

- [Swipe To Refresh](/recipes/swipe-to-refresh.md)

### Outside Examples

##### `exhaustMap` for login effect in [@ngrx example app](https://github.com/ngrx/platform/tree/a9e522953832b09bb329bac4524637bc608c450a/example-app)

(
[Source](https://github.com/ngrx/platform/blob/a9e522953832b09bb329bac4524637bc608c450a/example-app/app/auth/effects/auth.effects.ts#L18-L30)
)

```js
@Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    map((action: Login) => action.payload),
    exhaustMap((auth: Authenticate) =>
      this.authService
        .login(auth)
        .pipe(
          map(user => new LoginSuccess({ user })),
          catchError(error => of(new LoginFailure(error)))
        )
    )
  );
```

### Additional Resources

- [exhaustMap](https://rxjs.dev/api/operators/exhaustMap) 📰 - Official docs
- [exhaustMap](https://indepth.dev/reference/rxjs/operators/exhaust-map) - In Depth Dev Reference

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/operators/exhaustMap.ts](https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/operators/exhaustMap.ts)
