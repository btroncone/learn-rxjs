# pairwise

#### signature: `pairwise(): Observable<Array>`

## Emit the previous and current values as an array.

### Why use pairwise?
The pairwise operator is best suited when you need to compare or perform calculations between the current and previous values emitted by an observable. Real-world examples can be seen in scenarios like tracking mouse movement, where the previous and current positions are used to determine the direction or speed of the cursor, or in financial applications, where consecutive stock price updates are compared to calculate the change or percentage change.

Keep in mind that `pairwise` will not emit an initial value until the observable emits at least two values. This behavior can lead to confusion, as there will be no output and no error, but the observable might not be functioning as intended or is waiting for more values.

Lastly, if you're working with observables that emit multiple values but you only want to compare the last two emitted values, consider using the [bufferCount](../transformation/buffercount.md) operator with a buffer size of 2 and a start buffer count of 1 as an alternative approach.



### Examples

##### Example 1:

(
[StackBlitz](https://stackblitz.com/edit/typescript-tkuydr?file=index.ts&devtoolsheight=50)
| [jsBin](http://jsbin.com/keteyahido/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/8va47bq3/) )

```js
// RxJS v6+
import { pairwise, take } from 'rxjs/operators';
import { interval } from 'rxjs';

//Returns: [0,1], [1,2], [2,3], [3,4], [4,5]
interval(1000)
  .pipe(pairwise(), take(5))
  .subscribe(console.log);
```

### Additional Resources

- [pairwise](https://rxjs.dev/api/operators/pairwise) 📰 - Official docs

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/pairwise.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/pairwise.ts)
