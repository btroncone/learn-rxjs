# single

#### signature: `single(a: Function): Observable`

## Emit single item that passes expression.

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Emit first number passing predicate

( [jsBin](http://jsbin.com/solecibuza/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/26r5y90s/) )

```js
import { from } from 'rxjs/observable/from';
import { single } from 'rxjs/operators';

//emit (1,2,3,4,5)
const source = from([1, 2, 3, 4, 5]);
//emit one item that matches predicate
const example = source.pipe(single(val => val === 4));
//output: 4
const subscribe = example.subscribe(val => console.log(val));
```

### Additional Resources

* [single](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-single)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/single.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/single.ts)
