# every

#### signature: `every(predicate: function, thisArg: any): Observable`

## If all values pass predicate before completion emit true, else false.

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Some values false

(
[Stackblitz](https://stackblitz.com/edit/typescript-8pv2ag?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/cibijotase/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/1b46tsm7/) )

```js
import { every } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

//emit 5 values
const source = of(1, 2, 3, 4, 5);
const example = source.pipe(
  //is every value even?
  every(val => val % 2 === 0)
);
//output: false
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: All values true

(
[Stackblitz](https://stackblitz.com/edit/typescript-pzywh8?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/yuxefiviko/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/x34nLmcj/) )

```js
import { every } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

//emit 5 values
const allEvens = of(2, 4, 6, 8, 10);
const example = allEvens.pipe(
  //is every value even?
  every(val => val % 2 === 0)
);
//output: true
const subscribe = example.subscribe(val => console.log(val));
```

### Additional Resources

* [every](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-every)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/every.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/every.ts)
