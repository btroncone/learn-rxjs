# timeout

#### signature: `timeout(due: number, scheduler: Scheduler): Observable`

## Error if no value is emitted before specified duration

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Timeout after 2.5 seconds

( [jsBin](http://jsbin.com/gonakiniho/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/nr4e1ofy/1/) )

```js
import { of } from 'rxjs/observable/of';
import { concatMap, timeout, catchError } from 'rxjs/operators';

// simulate request
function makeRequest(timeToDelay) {
  return of('Request Complete!').pipe(delay(timeToDelay));
}

of(4000, 3000, 2000)
  .pipe(
    concatMap(duration =>
      makeRequest(duration).pipe(
        timeout(2500),
        catchError(error => of(`Request timed out after: ${duration}`))
      )
    )
  )
  /*
    *  "Request timed out after: 4000"
    *  "Request timed out after: 3000"
    *  "Request Complete!"
    */
  .subscribe(val => console.log(val));
```

### Additional Resources

* [timeout](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/timeout.md)
  :newspaper: - Official Docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/timeout.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/timeout.ts)
