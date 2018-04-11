# defaultIfEmpty

#### signature: `defaultIfEmpty(defaultValue: any): Observable`

## Emit given value if nothing is emitted before completion.

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Default for empty value

(
[Stackblitz](https://stackblitz.com/edit/typescript-9eg1us?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/yawumoqatu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/8ex96cov/) )

```js
import { defaultIfEmpty } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

//emit 'Observable.of() Empty!' when empty, else any values from source
const exampleOne = of().pipe(defaultIfEmpty('Observable.of() Empty!'));
//output: 'Observable.of() Empty!'
const subscribe = exampleOne.subscribe(val => console.log(val));
```

##### Example 2: Default for Observable.empty

(
[Stackblitz](https://stackblitz.com/edit/typescript-wxh3yr?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/kojafuvesu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/3edw828p/) )

```js
import { defaultIfEmpty } from 'rxjs/operators';
import { empty } from 'rxjs/observable/empty';

//emit 'Observable.empty()!' when empty, else any values from source
const example = empty().pipe(defaultIfEmpty('Observable.empty()!'));
//output: 'Observable.empty()!'
const subscribe = example.subscribe(val => console.log(val));
```

### Additional Resources

* [defaultIfEmpty](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-defaultIfEmpty)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/defaultIfEmpty.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/defaultIfEmpty.ts)
