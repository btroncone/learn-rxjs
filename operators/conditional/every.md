# every

#### signature: `every(predicate: function, thisArg: any): Observable`

## If all values pass predicate before completion emit true, else false.

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/angular"><img src="https://ultimatecourses.com/assets/img/banners/ultimate-angular-leader.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Some values false

(
[Stackblitz](https://stackblitz.com/edit/typescript-299d7s?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/cibijotase/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/1b46tsm7/) )

```js
// RxJS v6+
import { every } from 'rxjs/operators';
import { of } from 'rxjs';

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
[Stackblitz](https://stackblitz.com/edit/typescript-ztrzqe?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/yuxefiviko/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/x34nLmcj/) )

```js
// RxJS v6+
import { every } from 'rxjs/operators';
import { of } from 'rxjs';

//emit 5 values
const allEvens = of(2, 4, 6, 8, 10);
const example = allEvens.pipe(
  //is every value even?
  every(val => val % 2 === 0)
);
//output: true
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 3: Values arriving over time and completing stream prematurely due to every returning false

(
[Stackblitz](https://stackblitz.com/edit/rxjs-every-example?file=index.ts&devtoolsheight=100) )

```js
// RxJS v6+
console.clear();
import { concat, of } from 'rxjs';
import { every, delay, tap } from 'rxjs/operators';

const log = console.log;
const returnCode = request => Number.isInteger(request)
  ? 200
  : 400;
const fakeRequest = request => of({ code: returnCode(request) })
  .pipe(
    tap(_ => log(request)),
    delay(1000)
  );

const apiCalls$ = concat(
  fakeRequest(1),
  fakeRequest("invalid payload"),
  fakeRequest(2) //this won't execute as every will return false for previous line
).pipe(
  every(e => e.code === 200),
  tap(e => log(`all request successful: ${e}`))
);

apiCalls$.subscribe();
```

### Additional Resources

- [every](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-every)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/every.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/every.ts)
