# partition

#### signature: `partition(predicate: function: boolean, thisArg: any): [Observable, Observable]`

## Split one observable into two based on provided predicate.

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Split even and odd numbers

( [StackBlitz](https://stackblitz.com/edit/typescript-kyndxr?file=index.ts) |
[jsBin](http://jsbin.com/hipehexaku/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/q0xo7gvv/) )

```js
import { from } from 'rxjs/observable/from';
import { partition, map } from 'rxjs/operators';

const source = from([1, 2, 3, 4, 5, 6]);
//first value is true, second false
const [evens, odds] = source.pipe(partition(val => val % 2 === 0));
/*
  Output:
  "Even: 2"
  "Even: 4"
  "Even: 6"
  "Odd: 1"
  "Odd: 3"
  "Odd: 5"
*/
const subscribe = merge(
  evens.pipe(map(val => `Even: ${val}`)),
  odds.pipe(map(val => `Odd: ${val}`))
).subscribe(val => console.log(val));
```

##### Example 2: Split success and errors

( [StackBlitz](https://stackblitz.com/edit/typescript-hiqolh?file=index.ts) |
[jsBin](http://jsbin.com/kukuguhuri/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/fe246u5p/) )

```js
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';
import { map, partition, catchError } from 'rxjs/operators';

const source = from([1, 2, 3, 4, 5, 6]);
//if greater than 3 throw
const example = source.pipe(
  map(val => {
    if (val > 3) {
      throw `${val} greater than 3!`;
    }
    return { success: val };
  }),
  catchError(val => of({ error: val }))
);
//split on success or error
const [success, error] = example.pipe(partition(res => res.success));
/*
  Output:
  "Success! 1"
  "Success! 2"
  "Success! 3"
  "Error! 4 greater than 3!"
*/
const subscribe = merge(
  success.pipe(map(val => `Success! ${val.success}`)),
  error.pipe(map(val => `Error! ${val.error}`))
).subscribe(val => console.log(val));
```

### Additional Resources

* [partition](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-partition)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/patching/operator/partition.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/patching/operator/partition.ts)
