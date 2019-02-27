# of / just

#### signature: `of(...values, scheduler: Scheduler): Observable`

## Emit variable amount of values in a sequence and then emits a complete notification.

### Examples

##### Example 1: Emitting a sequence of numbers

(
[StackBlitz](https://stackblitz.com/edit/typescript-kbpvmm?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/kodixitoji/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/f7b35ayz/) )

```js
// RxJS v6+
import { of } from 'rxjs';
//emits any number of provided values in sequence
const source = of(1, 2, 3, 4, 5);
//output: 1,2,3,4,5
const subscribe = source.subscribe(val => console.log(val));
```

##### Example 2: Emitting an object, array, and function

(
[StackBlitz](https://stackblitz.com/edit/typescript-m1jbw9?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/xevobujama/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/d9rng4dj/) )

```js
// RxJS v6+
import { of } from 'rxjs';
//emits values of any type
const source = of({ name: 'Brian' }, [1, 2, 3], function hello() {
  return 'Hello';
});
//output: {name: 'Brian}, [1,2,3], function hello() { return 'Hello' }
const subscribe = source.subscribe(val => console.log(val));
```

### Related Recipes

- [Swipe To Refresh](/recipes/swipe-to-refresh.md)
- [Type Ahead](../../recipes/type-ahead.md)

### Additional Resources

- [of](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-of)
  :newspaper: - Official docs
- [Creation operators: of](https://egghead.io/lessons/rxjs-creation-operator-of?course=rxjs-beyond-the-basics-creating-observables-from-scratch)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/of.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/of.ts)
