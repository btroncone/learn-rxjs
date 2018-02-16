# pairwise

#### signature: `pairwise(): Observable<Array>`

## Emit the previous and current values as an array.

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1:

( [jsBin](http://jsbin.com/keteyahido/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/8va47bq3/) )

```js
import { pairwise, take } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';


//Returns: [0,1], [1,2], [2,3], [3,4], [4,5]
interval(1000).pipe(
    pairwise(),
    take(5)
  )
  .subscribe(console.log);
```

### Additional Resources

* [pairwise](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-pairwise)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/pairwise.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/pairwise.ts)
