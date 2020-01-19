# throw

#### signature: `throw(error: any, scheduler: Scheduler): Observable`

## Emit error on subscription.

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX "Ultimate RxJS")](https://ultimatecourses.com/courses/rxjs?ref=4)

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

- [throw](https://rxjs.dev/api/index/function/throw)
  📰 - Official docs
- [Creation operators: empty, never, and throw](https://egghead.io/lessons/rxjs-creation-operators-empty-never-throw?course=rxjs-beyond-the-basics-creating-observables-from-scratch)
  🎥 💵 - André Staltz

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/throwError.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/throwError.ts)
