# throw

#### signature: `throw(error: any, scheduler: Scheduler): Observable`

## Emit error on subscription.

### Examples

##### Example 1: Throw error on subscription

( [jsBin](http://jsbin.com/punubequju/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/mks82xqz/) )

```js
//emits an error with specified value on subscription
const source = Rx.Observable.throw('This is an error!');
//output: 'Error: This is an error!'
const subscribe = source.subscribe({
  next: val => console.log(val),
  complete: () => console.log('Complete!'),
  error: val => console.log(`Error: ${val}`)
});
```

### Additional Resources

* [throw](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-throw)
  :newspaper: - Official docs
* [Creation operators: empty, never, and throw](https://egghead.io/lessons/rxjs-creation-operators-empty-never-throw?course=rxjs-beyond-the-basics-creating-observables-from-scratch)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/observable/ErrorObservable.ts](https://github.com/ReactiveX/rxjs/blob/master/src/observable/ErrorObservable.ts)
