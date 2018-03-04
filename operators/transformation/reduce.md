# reduce

#### signature: `reduce(accumulator: function, seed: any): Observable`

## Reduces the values from source observable to a single value that's emitted when the source completes.

:bulb: Just like
[`Array.prototype.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce?v=a)

:bulb: If you need the current accumulated value on each emission, try
[scan](scan.md)!

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Sum a stream of numbers

( [StackBlitz](https://stackblitz.com/edit/typescript-bbmye7?file=index.ts) |
[jsBin](http://jsbin.com/dakuneneho/edit?js,console) |
[jsFiddle](https://jsfiddle.net/f8fw7yka/) )

```js
import { of } from 'rxjs/observable/of';
import { reduce } from 'rxjs/operators';

const source = of(1, 2, 3, 4);
const example = source.pipe(reduce((acc, val) => acc + val));
//output: Sum: 10'
const subscribe = example.subscribe(val => console.log('Sum:', val));
```

### Additional Resources

* [reduce](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-reduce)
  :newspaper: - Official docs
* [Scan() vs reduce() | RxJS TUTORIAL](https://www.youtube.com/watch?v=myEeo2rZc3g)
  :video_camera: - Academind

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/patching/operator/reduce.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/patching/operator/reduce.ts)
