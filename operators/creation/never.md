# never

#### signature: `never(): Observable`

## Create an observable that never emits anything.

### Why Use `never`

This operator is useful for when you want to test specific situation or composing it with other observables.  It does not throw any error, value, or completion.  Because of this, take extra care to dispose subscriptions properly as auto disposal cannot happen if no completion is emitted.

### Examples

##### Example 1: never preventing the rest of the observable from being concatenated.

([jsFiddle](https://jsfiddle.net/ElHuy/Lcqcrxx7/1/))

```js
const never$ = Rx.Observable.never();

const interval$ = Rx.Observable.interval(500);

const completeMessage$ = Rx.Observable.of('Completed!');

const example = Rx.Observable.concat(
    interval$.take(3),  // Emits 0,1,2 then emits complete.
    never$,             // Received completion notification from previous Observable but never emits anything.
    completeMessage$    // Never received completion notification from previous Observable.
  )
  .subscribe(console.log);
```

### Additional Resources

* [never](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-never)
  :newspaper: - Official docs
  
---

> :file_folder: Source Code:
> [ReactiveX - RxJS - NeverObservable.ts](https://github.com/ReactiveX/rxjs/blob/c3c56867eaf93f302ac7cd588034c7d8712f2834/src/internal/observable/NeverObservable.ts)
