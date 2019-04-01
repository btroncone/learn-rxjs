# concat

#### signature: `concat(observables: ...*): Observable`

## Subscribe to observables in order as previous completes, emit values.

---

:bulb: You can think of concat like a line at a ATM, the next transaction
(subscription) cannot start until the previous completes!

:bulb: This operator can be used as either a static or instance method!

:bulb: If throughput, not order, is a primary concern, try [merge](merge.md)
instead!

---

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/angular"><img src="https://ultimatecourses.com/assets/img/banners/ultimate-angular-leader.svg" style="width:100%;max-width:100%"></a></div>

### Examples

(
[example tests](https://github.com/btroncone/learn-rxjs/blob/master/operators/specs/combination/concat-spec.ts)
)

##### Example 1: concat 2 basic observables

(
[StackBlitz](https://stackblitz.com/edit/typescript-ec6wed?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/gegubutele/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/rxwnr3hh/) )

```js
// RxJS v6+
import { concat } from 'rxjs/operators';
import { of } from 'rxjs';

//emits 1,2,3
const sourceOne = of(1, 2, 3);
//emits 4,5,6
const sourceTwo = of(4, 5, 6);
//emit values from sourceOne, when complete, subscribe to sourceTwo
const example = sourceOne.pipe(concat(sourceTwo));
//output: 1,2,3,4,5,6
const subscribe = example.subscribe(val =>
  console.log('Example: Basic concat:', val)
);
```

##### Example 2: concat as static method

(
[StackBlitz](https://stackblitz.com/edit/typescript-ks8chl?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/xihagewune/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/5qdtvhu8/) )

```js
// RxJS v6+
import { of, concat } from 'rxjs';

//emits 1,2,3
const sourceOne = of(1, 2, 3);
//emits 4,5,6
const sourceTwo = of(4, 5, 6);

//used as static
const example = concat(sourceOne, sourceTwo);
//output: 1,2,3,4,5,6
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 3: concat with delayed source

(
[StackBlitz](https://stackblitz.com/edit/typescript-vsphry?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/nezonosubi/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/L2s49msx/) )

```js
// RxJS v6+
import { delay, concat } from 'rxjs/operators';
import { of } from 'rxjs';

//emits 1,2,3
const sourceOne = of(1, 2, 3);
//emits 4,5,6
const sourceTwo = of(4, 5, 6);

//delay 3 seconds then emit
const sourceThree = sourceOne.pipe(delay(3000));
//sourceTwo waits on sourceOne to complete before subscribing
const example = sourceThree.pipe(concat(sourceTwo));
//output: 1,2,3,4,5,6
const subscribe = example.subscribe(val =>
  console.log('Example: Delayed source one:', val)
);
```

##### Example 4: concat with source that does not complete

(
[StackBlitz](https://stackblitz.com/edit/typescript-njc2jw?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/vixajoxaze/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/4bhtb81u/) )

```js
// RxJS v6+
import { interval, of, concat } from 'rxjs';

//when source never completes, the subsequent observables never runs
const source = concat(interval(1000), of('This', 'Never', 'Runs'));
//outputs: 0,1,2,3,4....
const subscribe = source.subscribe(val =>
  console.log(
    'Example: Source never completes, second observable never runs:',
    val
  )
);
```

### Additional Resources

- [concat](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-concat)
  :newspaper: - Official docs
- [Combination operator: concat, startWith](https://egghead.io/lessons/rxjs-combination-operators-concat-startwith?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/concat.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/concat.ts)
