# retryWhen

#### signature: `retryWhen(receives: (errors: Observable) => Observable, the: scheduler): Observable`

## Retry an observable sequence on error based on custom criteria.

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Trigger retry after specified duration

( [jsBin](http://jsbin.com/miduqexalo/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/49mkhsyr/) )

```js
import { timer } from 'rxjs/observable/timer';
import { interval } from 'rxjs/observable/interval';
import { map, tap, retryWhen, delayWhen } from 'rxjs/operators';

//emit value every 1s
const source = interval(1000);
const example = source.pipe(
  map(val => {
    if (val > 5) {
      //error will be picked up by retryWhen
      throw val;
    }
    return val;
  }),
  retryWhen(errors =>
    errors.pipe(
      //log error message
      tap(val => console.log(`Value ${val} was too high!`)),
      //restart in 5 seconds
      delayWhen(val => timer(val * 1000))
    )
  )
);
/*
  output:
  0
  1
  2
  3
  4
  5
  "Value 6 was too high!"
  --Wait 5 seconds then repeat
*/
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Customizable retry with increased duration

(
[StackBlitz](https://stackblitz.com/edit/angular-cwnknr?file=app%2Frxjs-utils.ts)
)

_Credit to [Maxim Koretskyi](https://twitter.com/maxim_koretskyi) for the
optimization_

```js
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { timer } from 'rxjs/observable/timer';
import { mergeMap, finalize } from 'rxjs/operators';

export const genericRetryStrategy = ({
  maxRetryAttempts = 3,
  scalingDuration = 1000,
  excludedStatusCodes = []
}: {
  maxRetryAttempts?: number,
  scalingDuration?: number,
  excludedStatusCodes?: number[]
} = {}) => (attempts: Observable<any>) => {
  return attempts.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1;
      // if maximum number of retries have been met
      // or response is a status code we don't wish to retry, throw error
      if (
        retryAttempt > maxRetryAttempts ||
        excludedStatusCodes.find(e => e === error.status)
      ) {
        return _throw(error);
      }
      console.log(
        `Attempt ${retryAttempt}: retrying in ${retryAttempt *
          scalingDuration}ms`
      );
      // retry after 1s, 2s, etc...
      return timer(retryAttempt * scalingDuration);
    }),
    finalize(() => console.log('We are done!'))
  );
};
```

```js
import { Component, OnInit } from '@angular/core';
import { catchError, retryWhen  } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { genericRetryStrategy } from './rxjs-utils';
import { AppService } from './app.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  constructor(private _appService: AppService) {}

  ngOnInit() {
    this._appService
      .getData(500)
      .pipe(
        retryWhen(genericRetryStrategy()),
        catchError(error => of(error))
      )
      .subscribe(console.log);

    // excluding status code, delay for logging clarity
    setTimeout(() => {
    this._appService
      .getData(500)
      .pipe(
        retryWhen(genericRetryStrategy({
          scalingDuration: 2000,
          excludedStatusCodes: [500]
        })),
        catchError(error => of(error))
      )
      .subscribe(e => console.log('Exluded code:', e.status));

    }, 8000);
  }
}
```

### Additional Resources

* [retryWhen](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-retryWhen)
  :newspaper: - Official docs
* [Error handling operator: retry and retryWhen](https://egghead.io/lessons/rxjs-error-handling-operator-retry-and-retrywhen?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/patching/operator/retryWhen.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/patching/operator/retryWhen.ts)
