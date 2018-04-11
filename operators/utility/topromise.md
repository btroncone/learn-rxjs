# toPromise

#### signature: `toPromise() : Promise`

## Convert observable to promise.

<div class="ua-ad"><div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div></div>

### Examples

##### Example 1: Basic Promise

( [jsBin](http://jsbin.com/favoqecixi/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/thykc9up/) )

```js
import { of } from 'rxjs/observable/of';
import { toPromise, delay } from 'rxjs/operators';

//return basic observable
const sample = val => of(val).pipe(delay(5000));
//convert basic observable to promise
const example = sample('First Example')
  .pipe(toPromise())
  //output: 'First Example'
  .then(result => {
    console.log('From Promise:', result);
  });
```

##### Example 2: Using Promise.all

( [jsBin](http://jsbin.com/hutiyicaco/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/xzu6u7hs/) )

```js
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';

//return basic observable
const sample = val => of(val).pipe(delay(5000));
/*
  convert each to promise and use Promise.all
  to wait for all to resolve
  (you should probably use forkJoin and no 'toPromise' instead!)
*/
const example = () => {
  return Promise.all([
    sample('Promise 1').pipe(toPromise()),
    sample('Promise 2').pipe(toPromise())
  ]);
};
//output: ["Promise 1", "Promise 2"]
example().then(val => {
  console.log('Promise.all Result:', val);
});
```

### Additional Resources

* [toPromise](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/topromise.md)
  :newspaper: - Official Docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/toPromise.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/toPromise.ts)
