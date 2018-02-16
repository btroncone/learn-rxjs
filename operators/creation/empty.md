# empty

#### signature: `empty(scheduler: Scheduler): Observable`

## Observable that immediately completes.

<a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a>

### Examples

##### Example 1: empty immediately completes

( [jsBin](http://jsbin.com/rodubucaqa/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/bz71mzuy/) )

```js
import { empty } from 'rxjs/observable/empty';

//Create observable that immediately completes
const example = empty();
//output: 'Complete!'
const subscribe = example.subscribe({
  next: () => console.log('Next'),
  complete: () => console.log('Complete!')
});
```

### Follow the Source Code

_Coming soon..._

### Additional Resources

* [empty](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-empty)
  :newspaper: - Official docs
* [Creation operators: empty, never, and throw](https://egghead.io/lessons/rxjs-creation-operators-empty-never-throw?course=rxjs-beyond-the-basics-creating-observables-from-scratch)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/EmptyObservable.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/EmptyObservable.ts)
