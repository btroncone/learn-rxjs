# sample

#### signature: `sample(sampler: Observable): Observable`

## Sample from source when provided observable emits.

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Sample source every 2 seconds

( [jsBin](http://jsbin.com/gemebopifu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/8wsbuvjb/) )

```js
import { interval } from 'rxjs/observable/interval';
import { sample } 'rxjs/operators';

//emit value every 1s
const source = interval(1000);
//sample last emitted value from source every 2s
const example = source.sample.pipe(interval(2000));
//output: 2..4..6..8..
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Sample source when interval emits

( [jsBin](http://jsbin.com/cunicepube/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/b33kg9dn/) )

```js
import { interval } from 'rxjs/observable/interval';
import { zip } from 'rxjs/observable/zip';
import { from } from 'rxjs/observable/from';
import { sample } 'rxjs/operators';

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

( [jsBin](http://jsbin.com/riwipicilo/1/edit?html,js,console,output) |
[jsFiddle](https://jsfiddle.net/6yy6q0Lo/1/) )

```js
import { fromEvent } from 'rxjs/observable/interval';
import { sample, mapTo } 'rxjs/operators';

const listener = merge(
    fromEvent(element, 'mousedown').mapTo(false),
    fromEvent(element, 'mousemove').mapTo(true)
  )
  .pipe(sample(fromEvent(element, 'mouseup')))
  .subscribe(isDragging => {
    console.log('Were you dragging?', isDragging);
  })
```

### Additional Resources

* [sample](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-sample)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/sample.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/sample.ts)
