# timeoutWith

#### signature: `timeoutWith(due: number | Date, withObservable: ObservableInput<T>, scheduler?: Scheduler): Observable`

## Error if no value is emitted before specified duration, then subscribes to the second Observable

### Why Use `timeoutWhen`
This operator is similar to `timeout` where it would error if source observable does not emit within the stated time frame.  But instead of emitting an error notification, it subscribes to the observable required by the second parameter.  This is useful for when you want to take a second action instead of throwing an action and having to catch it.

### Examples

##### Example 1: Timeout after 2.5 seconds then subscribe to new Observable

([jsFiddle](https://jsfiddle.net/ElHuy/p9xqL6rx/))

```js
// simulate request
function makeRequest(timeToDelay) {
  return Rx.Observable.of('Request Complete!').delay(timeToDelay);
}

Rx.Observable.of(4000, 3000, 2000)
  .concatMap(duration =>
    makeRequest(duration)
      .timeoutWith(2500, Rx.Observable.of(`Request timed out after: ${duration}`))   
  )
  /*
  *  "Request timed out after: 4000"
  *  "Request timed out after: 3000"
  *  "Request Complete!"
  */
  .subscribe(console.log);
```

### Additional Resources

* [timeoutWith](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-timeoutWith)
  :newspaper: - Official Docs

---

> :file_folder: Source Code:
> [RxJS](https://github.com/ReactiveX/rxjs/blob/c3c56867eaf93f302ac7cd588034c7d8712f2834/src/internal/patching/operator/timeoutWith.ts)
