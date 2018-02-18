# distinctUntilChanged

#### signature: `distinctUntilChanged(compare: function): Observable`

## Only emit when the current value is different than the last.

---

:bulb: distinctUntilChanged uses `===` comparison by default, object references
must match!

---

### Examples

##### Example 1: distinctUntilChanged with basic values

( [jsBin](http://jsbin.com/qoyoxeheva/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/xc2vzct7/) )

```js
import { from } from 'rxjs/observable/from';
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

( [jsBin](http://jsbin.com/mexocipave/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/t4ava5b4/) )

```js
import { from } from 'rxjs/observable/from';
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

### Additional Resources

* [distinctUntilChanged](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-distinctUntilChanged)
  :newspaper: - Official docs
* [Filtering operator: distinct and distinctUntilChanged](https://egghead.io/lessons/rxjs-filtering-operators-distinct-and-distinctuntilchanged?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/patching/operator/distinctUntilChanged.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/patching/operator/distinctUntilChanged.ts)
