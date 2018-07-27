# takeWhile

#### signature: `takeWhile(predicate: function(value, index): boolean): Observable`

## Emit values until provided expression is false.

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Take values under limit

(
[StackBlitz](https://stackblitz.com/edit/typescript-af3hdf?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/zanefaqexu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/yakd4jgc/) )

```js
// RxJS v6+
import { of } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

//emit 1,2,3,4,5
const source = of(1, 2, 3, 4, 5);
//allow values until value from source is greater than 4, then complete
const example = source.pipe(takeWhile(val => val <= 4));
//output: 1,2,3,4
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Difference between takeWhile() and filter()

(
[StackBlitz](https://stackblitz.com/edit/typescript-roozza?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/yatoqurewi/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/r497jgw3/4/) )

```js
// RxJS v6+
import { of } from 'rxjs';
import { takeWhile, filter } from 'rxjs/operators';

// emit 3, 3, 3, 9, 1, 4, 5, 8, 96, 3, 66, 3, 3, 3
const source = of(3, 3, 3, 9, 1, 4, 5, 8, 96, 3, 66, 3, 3, 3);

// allow values until value from source equals 3, then complete
// output: [3, 3, 3]
source
  .pipe(takeWhile(it => it === 3))
  .subscribe(val => console.log('takeWhile', val));

// output: [3, 3, 3, 3, 3, 3, 3]
source
  .pipe(filter(it => it === 3))
  .subscribe(val => console.log('filter', val));
```

### Related Recipes

- [Smart Counter](../../recipes/smartcounter.md)

### Additional Resources

- [takeWhile](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-takeWhile)
  :newspaper: - Official docs
- [Completing a stream with takeWhile](https://egghead.io/lessons/rxjs-completing-a-stream-with-takewhile?course=step-by-step-async-javascript-with-rxjs)
  :video_camera: :dollar: - John Linquist

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/takeWhile.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/takeWhile.ts)
