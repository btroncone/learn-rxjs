# ignoreElements

#### signature: `ignoreElements(): Observable`

## Ignore everything but complete and error.

<a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a>

### Examples

##### Example 1: Ignore all elements from source

( [jsBin](http://jsbin.com/yiyefelubi/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/59scjqss/) )

```js
import { interval } from 'rxjs/observable/interval';
import { take, ignoreElements } from 'rxjs/operators';

//emit value every 100ms
const source = interval(100);
//ignore everything but complete
const example = source.pipe(take(5), ignoreElements());
//output: "COMPLETE!"
const subscribe = example.subscribe(
  val => console.log(`NEXT: ${val}`),
  val => console.log(`ERROR: ${val}`),
  () => console.log('COMPLETE!')
);
```

##### Example 2: Only displaying error

( [jsBin](http://jsbin.com/gogonawuze/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/srcwdgw6/) )

```js
import { interval } from 'rxjs/observable/interval';
import { _throw } from 'rxjs/observable/throw';
import { of } from 'rxjs/observable/of';
import { mergeMap, ignoreElements } from 'rxjs/operators';

//emit value every 100ms
const source = interval(100);
//ignore everything but error
const error = source.pipe(
  mergeMap(val => {
    if (val === 4) {
      return _throw(`ERROR AT ${val}`);
    }
    return of(val);
  }),
  ignoreElements()
);
//output: "ERROR: ERROR AT 4"
const subscribe = error.subscribe(
  val => console.log(`NEXT: ${val}`),
  val => console.log(`ERROR: ${val}`),
  () => console.log('SECOND COMPLETE!')
);
```

### Additional Resources

* [ignoreElements](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-ignoreElements)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/ignoreElements.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/ignoreElements.ts)
