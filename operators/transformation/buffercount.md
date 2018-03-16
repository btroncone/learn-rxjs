# bufferCount

#### signature: `bufferCount(bufferSize: number, startBufferEvery: number = null): Observable`

## Collect emitted values until provided number is fulfilled, emit as array.

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Collect buffer and emit after specified number of values

( [StackBlitz](https://stackblitz.com/edit/typescript-8qxfpn?file=index.ts) |
[jsBin](http://jsbin.com/suveqaromu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/ky9myc5b/) )

```js
import { interval } from 'rxjs/observable/interval';
import { bufferCount } from 'rxjs/operators';

//Create an observable that emits a value every second
const source = interval(1000);
//After three values are emitted, pass on as an array of buffered values
const bufferThree = source.pipe(bufferCount(3));
//Print values to console
//ex. output [0,1,2]...[3,4,5]
const subscribe = bufferThree.subscribe(val =>
  console.log('Buffered Values:', val)
);
```

##### Example 2: Overlapping buffers

( [StackBlitz](https://stackblitz.com/edit/typescript-1otlmo?file=index.ts) |
[jsBin](http://jsbin.com/kiloxiraya/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/3c67qcz1/) )

```js
import { interval } from 'rxjs/observable/interval';
import { bufferCount } from 'rxjs/operators';

//Create an observable that emits a value every second
const source = interval(1000);
/*
bufferCount also takes second argument, when to start the next buffer
for instance, if we have a bufferCount of 3 but second argument (startBufferEvery) of 1:
1st interval value:
buffer 1: [0]
2nd interval value:
buffer 1: [0,1]
buffer 2: [1]
3rd interval value:
buffer 1: [0,1,2] Buffer of 3, emit buffer
buffer 2: [1,2]
buffer 3: [2]
4th interval value:
buffer 2: [1,2,3] Buffer of 3, emit buffer
buffer 3: [2, 3]
buffer 4: [3]
*/
const bufferEveryOne = source.pipe(bufferCount(3, 1));
//Print values to console
const subscribe = bufferEveryOne.subscribe(val =>
  console.log('Start Buffer Every 1:', val)
);
```

### Additional Resources

* [bufferCount](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-bufferCount)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/patching/operator/bufferCount.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/patching/operator/bufferCount.ts)
