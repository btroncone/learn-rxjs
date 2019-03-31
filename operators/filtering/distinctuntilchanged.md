# distinctUntilChanged

#### signature: `distinctUntilChanged(compare: function): Observable`

## Only emit when the current value is different than the last.

---

:bulb: distinctUntilChanged uses `===` comparison by default, object references
must match!

---

<div class="ua-ad"><a href="https://ultimatecourses.com/"><img src="https://ultimatecourses.com/assets/img/banners/ultimate-angular-leader.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: distinctUntilChanged with basic values

(
[StackBlitz](https://stackblitz.com/edit/typescript-bsb8mw?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/qoyoxeheva/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/xc2vzct7/) )

```js
// RxJS v6+
import { from } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

//only output distinct values, based on the last emitted value
const myArrayWithDuplicatesInARow = from([1, 1, 2, 2, 3, 1, 2, 3]);

const distinctSub = myArrayWithDuplicatesInARow
  .pipe(distinctUntilChanged())
  //output: 1,2,3,1,2,3
  .subscribe(val => console.log('DISTINCT SUB:', val));

const nonDistinctSub = myArrayWithDuplicatesInARow
  //output: 1,1,2,2,3,1,2,3
  .subscribe(val => console.log('NON DISTINCT SUB:', val));
```

##### Example 2: distinctUntilChanged with objects

(
[StackBlitz](https://stackblitz.com/edit/typescript-moe7mh?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/mexocipave/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/t4ava5b4/) )

```js
// RxJS v6+
import { from } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

const sampleObject = { name: 'Test' };
//Objects must be same reference
const myArrayWithDuplicateObjects = from([
  sampleObject,
  sampleObject,
  sampleObject
]);
//only out distinct objects, based on last emitted value
const nonDistinctObjects = myArrayWithDuplicateObjects
  .pipe(distinctUntilChanged())
  //output: 'DISTINCT OBJECTS: {name: 'Test'}
  .subscribe(val => console.log('DISTINCT OBJECTS:', val));
```

### Related Recipes

- [Lockscreen](../../recipes/lockscreen.md)
- [Type Ahead](../../recipes/type-ahead.md)

### Additional Resources

- [distinctUntilChanged](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-distinctUntilChanged)
  :newspaper: - Official docs
- [Filtering operator: distinct and distinctUntilChanged](https://egghead.io/lessons/rxjs-filtering-operators-distinct-and-distinctuntilchanged?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/distinctUntilChanged.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/distinctUntilChanged.ts)
