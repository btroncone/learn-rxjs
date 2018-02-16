# defaultIfEmpty

#### signature: `defaultIfEmpty(defaultValue: any): Observable`

## Emit given value if nothing is emitted before completion.

<a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a>

### Examples

##### Example 1: Default for empty value

( [jsBin](http://jsbin.com/yawumoqatu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/8ex96cov/) )

```js
import { defaultIfEmpty } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

const empty = of();
//emit 'Observable.of() Empty!' when empty, else any values from source
const exampleOne = empty.pipe(defaultIfEmpty('Observable.of() Empty!'));
//output: 'Observable.of() Empty!'
const subscribe = exampleOne.subscribe(val => console.log(val));
```

##### Example 2: Default for Observable.empty

( [jsBin](http://jsbin.com/kojafuvesu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/3edw828p/) )

```js
import { defaultIfEmpty } from 'rxjs/operators';
import { empty } from 'rxjs/observable/empty';

//empty observable
const empty = empty();
//emit 'Observable.empty()!' when empty, else any values from source
const example = empty.pipe(defaultIfEmpty('Observable.empty()!'));
//output: 'Observable.empty()!'
const subscribe = example.subscribe(val => console.log(val));
```

### Additional Resources

* [defaultIfEmpty](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-defaultIfEmpty)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/defaultIfEmpty.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/defaultIfEmpty.ts)
