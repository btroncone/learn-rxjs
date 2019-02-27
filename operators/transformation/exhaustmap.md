# exhaustMap

#### signature: `exhaustMap(project: function, resultSelector: function): Observable`

## Map to inner observable, ignore other values until that observable completes.

<div class="ua-ad"><a href="https://ultimatecourses.com/?ref=76683_kee7y7vk"><img src="https://ultimatecourses.com/assets/img/banners/ultimate-angular-leader.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: exhaustMap with interval

( [Stackblitz](https://stackblitz.com/edit/typescript-3qydhn?file=index.ts&devtoolsheight=100) |
[jsBin](http://jsbin.com/woposeqobo/1/edit?js,console) |
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

( [Stackblitz](https://stackblitz.com/edit/typescript-vxussb?file=index.ts&devtoolsheight=100) |
[jsBin](http://jsbin.com/fizuduzuti/1/edit?js,console) |
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

* [exhaustMap](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-exhaustMap)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/exhaustMap.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/exhaustMap.ts)
