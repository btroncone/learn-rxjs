# throw

#### signature: `throw(error: any, scheduler: Scheduler): Observable`

## Emit error on subscription.

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Throw error on subscription

( [jsBin](http://jsbin.com/punubequju/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/mks82xqz/) )

```js
import { _throw } from 'rxjs/observable/throw';

//emits an error with specified value on subscription
const source = _throw('This is an error!');
//output: 'Error: This is an error!'
const subscribe = source.subscribe({
  next: val => console.log(val),
  complete: () => console.log('Complete!'),
  error: val => console.log(`Error: ${val}`)
});
```

### Related Examples

* [Throwing after 3 retries](../error_handling/retrywhen.md)

### Additional Resources

* [throw](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-throw)
  :newspaper: - Official docs
* [Creation operators: empty, never, and throw](https://egghead.io/lessons/rxjs-creation-operators-empty-never-throw?course=rxjs-beyond-the-basics-creating-observables-from-scratch)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/throwError.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/throwError.ts)
