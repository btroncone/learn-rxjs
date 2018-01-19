# timeout

#### signature: `timeout(due: number, scheduler: Scheduler): Observable`

## Error if no value is emitted before specified duration

### Examples

##### Example 1: Timeout after 2.5 seconds

( [jsBin](http://jsbin.com/gonakiniho/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/nr4e1ofy/1/) )

```js
// simulate request
function makeRequest(timeToDelay) {
  return Rx.Observable.of('Request Complete!').delay(timeToDelay);
}

Rx.Observable.of(4000, 3000, 2000)
  .concatMap(duration =>
    makeRequest(duration)
      .timeout(2500)
      .catch(error => Rx.Observable.of(`Request timed out after: ${duration}`))
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
