# skipWhile

#### signature: `skipWhile(predicate: Function): Observable`

## Skip emitted values from source until provided expression is false.

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Skip while values below threshold

(
[StackBlitz](https://stackblitz.com/edit/typescript-p5kapz?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/bemikuleya/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/3ymfxb09/) )

```js
// RxJS v6+
import { interval } from 'rxjs';
import { skipWhile } from 'rxjs/operators';

//emit every 1s
const source = interval(1000);
//skip emitted values from source while value is less than 5
const example = source.pipe(skipWhile(val => val < 5));
//output: 5...6...7...8........
const subscribe = example.subscribe(val => console.log(val));
```

### Additional Resources

- [skipWhile](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-skipWhile)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/skipWhile.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/skipWhile.ts)
