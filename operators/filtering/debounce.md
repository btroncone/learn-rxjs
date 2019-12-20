# debounce

#### signature: `debounce(durationSelector: function): Observable`

## Discard emitted values that take less than the specified time, based on selector function, between output.

---

:bulb: Though not as widely used as [debounceTime](debouncetime.md),
**debounce** is important when the debounce rate is variable!

---

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs?ref=4"><img src="https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Debounce on timer

(
[StackBlitz](https://stackblitz.com/edit/typescript-dzjbra?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/sorimeyoro/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/e5698yow/) )

```js
// RxJS v6+
import { of, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

//emit four strings
const example = of('WAIT', 'ONE', 'SECOND', 'Last will display');
/*
    Only emit values after a second has passed between the last emission,
    throw away all other values
*/
const debouncedExample = example.pipe(debounce(() => timer(1000)));
/*
    In this example, all values but the last will be omitted
    output: 'Last will display'
*/
const subscribe = debouncedExample.subscribe(val => console.log(val));
```

##### Example 2: Debounce at increasing interval

(
[StackBlitz](https://stackblitz.com/edit/typescript-qnfidr?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/sotaretese/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/6ab34nq6/) )

```js
// RxJS v6+
import { interval, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

//emit value every 1 second, ex. 0...1...2
const interval$ = interval(1000);
//raise the debounce time by 200ms each second
const debouncedInterval = interval$.pipe(debounce(val => timer(val * 200)));
/*
  After 5 seconds, debounce time will be greater than interval time,
  all future values will be thrown away
  output: 0...1...2...3...4......(debounce time over 1s, no values emitted)
*/
const subscribe = debouncedInterval.subscribe(val =>
  console.log(`Example Two: ${val}`)
);
```

### Additional Resources

- [debounce](https://rxjs.dev/api/operators/debounce)
  :newspaper: - Official docs
- [Transformation operator: debounce and debounceTime](https://egghead.io/lessons/rxjs-transformation-operators-debounce-and-debouncetime?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/debounce.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/debounce.ts)
