# sample

#### signature: `sample(sampler: Observable): Observable`

## Sample from source when provided observable emits.

<div class="ua-ad"><a href="https://ultimatecourses.com/?ref=76683_kee7y7vk"><img src="https://ultimatecourses.com/assets/img/banners/uc-leader.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Sample source every 2 seconds

(
[StackBlitz](https://stackblitz.com/edit/typescript-envpsp?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/gemebopifu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/8wsbuvjb/) )

```js
// RxJS v6+
import { interval } from 'rxjs';
import { sample } from 'rxjs/operators';

//emit value every 1s
const source = interval(1000);
//sample last emitted value from source every 2s
const example = source.pipe(sample(interval(2000)));
//output: 2..4..6..8..
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Sample source when interval emits

(
[StackBlitz](https://stackblitz.com/edit/typescript-sgat7t?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/cunicepube/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/b33kg9dn/) )

```js
// RxJS v6+
import { interval, zip, from } from 'rxjs';
import { sample } from 'rxjs/operators';

const source = zip(
  //emit 'Joe', 'Frank' and 'Bob' in sequence
  from(['Joe', 'Frank', 'Bob']),
  //emit value every 2s
  interval(2000)
);
//sample last emitted value from source every 2.5s
const example = source.pipe(sample(interval(2500)));
//output: ["Joe", 0]...["Frank", 1]...........
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 3: Distinguish between drag and click

From [Stack Overflow](https://stackoverflow.com/a/44865892/2774547) By
[Dorus](https://stackoverflow.com/users/402027/dorus)

(
[StackBlitz](https://stackblitz.com/edit/typescript-vk8p3e?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/riwipicilo/1/edit?html,js,console,output) |
[jsFiddle](https://jsfiddle.net/6yy6q0Lo/1/) )

```js
// RxJS v6+
import { fromEvent, merge } from 'rxjs';
import { sample, mapTo } from 'rxjs/operators';

const listener = merge(
  fromEvent(document, 'mousedown').pipe(mapTo(false)),
  fromEvent(document, 'mousemove').pipe(mapTo(true))
)
  .pipe(sample(fromEvent(document, 'mouseup')))
  .subscribe(isDragging => {
    console.log('Were you dragging?', isDragging);
  });
```

### Additional Resources

- [sample](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-sample)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/sample.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/sample.ts)
