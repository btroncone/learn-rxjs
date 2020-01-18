# zip

#### signature: `zip(observables: *): Observable`

## After all observables emit, emit values as an array

---

:bulb: Combined with [interval](../creation/interval.md) or
[timer](../creation/timer.md), zip can be used to time output from another
source!

---

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX "Ultimate RxJS")](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: zip multiple observables emitting at alternate intervals

(
[StackBlitz](https://stackblitz.com/edit/typescript-5az27c?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/lireyisira/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/ton462sg/) )

```js
// RxJS v6+
import { delay } from 'rxjs/operators';
import { of, zip } from 'rxjs';

const sourceOne = of('Hello');
const sourceTwo = of('World!');
const sourceThree = of('Goodbye');
const sourceFour = of('World!');
//wait until all observables have emitted a value then emit all as an array
const example = zip(
  sourceOne,
  sourceTwo.pipe(delay(1000)),
  sourceThree.pipe(delay(2000)),
  sourceFour.pipe(delay(3000))
);
//output: ["Hello", "World!", "Goodbye", "World!"]
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: zip when 1 observable completes

(
[StackBlitz](https://stackblitz.com/edit/typescript-f4qgry?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/fisitatesa/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/oamyk3xr/) )

```js
// RxJS v6+
import { take } from 'rxjs/operators';
import { interval, zip } from 'rxjs';

//emit every 1s
const source = interval(1000);
//when one observable completes no more values will be emitted
const example = zip(source, source.pipe(take(2)));
//output: [0,0]...[1,1]
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 3: get X/Y coordinates of drag start/finish (mouse down/up)

(
[StackBlitz](https://stackblitz.com/edit/rxjs-zip-mousedownup-coordinates?file=index.ts&devtoolsheight=50)
)

```js
// RxJS v6+
import { fromEvent, zip } from 'rxjs';
import { map } from 'rxjs/operators';

const documentEvent = eventName =>
  fromEvent(document, eventName).pipe(
    map((e: MouseEvent) => ({ x: e.clientX, y: e.clientY }))
  );

zip(documentEvent('mousedown'), documentEvent('mouseup')).subscribe(e =>
  console.log(JSON.stringify(e))
);
```

##### Example 4: mouse click duration

(
[StackBlitz](https://stackblitz.com/edit/rxjs-zip-mouseclickduration?file=index.ts&devtoolsheight=50)
)

```js
// RxJS v6+
import { fromEvent, zip } from 'rxjs';
import { map } from 'rxjs/operators';

const eventTime = eventName =>
  fromEvent(document, eventName).pipe(map(() => new Date()));

const mouseClickDuration = zip(
  eventTime('mousedown'),
  eventTime('mouseup')
).pipe(map(([start, end]) => Math.abs(start.getTime() - end.getTime())));

mouseClickDuration.subscribe(console.log);
```

### Additional Resources

- [zip](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-zip)
  :newspaper: - Official docs
- [Combination operator: zip](https://egghead.io/lessons/rxjs-combination-operator-zip?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/zip.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/zip.ts)
