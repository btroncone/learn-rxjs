# throw

#### signature: `throw(error: any, scheduler: Scheduler): Observable`

## Emit error on subscription.

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs"><img src="https://ultimatecourses.com/assets/img/banners/rxjs-banner-desktop.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Throw error on subscription

(
[StackBlitz](https://stackblitz.com/edit/typescript-5d3stz?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/punubequju/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/mks82xqz/) )

```js
// RxJS v6+
import { throwError } from 'rxjs';

//emits an error with specified value on subscription
const source = throwError('This is an error!');
//output: 'Error: This is an error!'
const subscribe = source.subscribe({
  next: val => console.log(val),
  complete: () => console.log('Complete!'),
  error: val => console.log(`Error: ${val}`)
});
```

### Related Examples

- [Throwing after 3 retries](../error_handling/retrywhen.md)

### Additional Resources

- [throw](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-throw)
  :newspaper: - Official docs
- [Creation operators: empty, never, and throw](https://egghead.io/lessons/rxjs-creation-operators-empty-never-throw?course=rxjs-beyond-the-basics-creating-observables-from-scratch)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/throwError.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/throwError.ts)
