# mapTo

#### signature: `mapTo(value: any): Observable`

## Map emissions to constant value.

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX "Ultimate RxJS")](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: Map every emission to string

(
[StackBlitz](https://stackblitz.com/edit/typescript-fipd7a?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/qujolenili/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/4ojq56ng/) )

```js
// RxJS v6+
import { interval } from 'rxjs';
import { mapTo } from 'rxjs/operators';

//emit value every two seconds
const source = interval(2000);
//map all emissions to one value
const example = source.pipe(mapTo('HELLO WORLD!'));
//output: 'HELLO WORLD!'...'HELLO WORLD!'...'HELLO WORLD!'...
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Mapping clicks to string

(
[StackBlitz](https://stackblitz.com/edit/typescript-btghci?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/xaheciwara/1/edit?js,console,output) |
[jsFiddle](https://jsfiddle.net/btroncone/52fqL4nn/) )

```js
// RxJS v6+
import { fromEvent } from 'rxjs';
import { mapTo } from 'rxjs/operators';

//emit every click on document
const source = fromEvent(document, 'click');
//map all emissions to one value
const example = source.pipe(mapTo('GOODBYE WORLD!'));
//output: (click)'GOODBYE WORLD!'...
const subscribe = example.subscribe(val => console.log(val));
```

### Related Recipes

- [HTTP Polling](../../recipes/http-polling.md)
- [Save Indicator]('../../recipes/save-indicator.md)
- [Smart Counter](../../recipes/smartcounter.md)
- [Stop Watch](../../recipes/stop-watch.md)

### Additional Resources

- [mapTo](https://rxjs.dev/api/operators/mapTo)
  📰 - Official docs
- [Changing behavior with mapTo](https://egghead.io/lessons/rxjs-changing-behavior-with-mapto?course=step-by-step-async-javascript-with-rxjs)
  🎥 💵 - John Linquist
- [Transformation operator: map and mapTo](https://egghead.io/lessons/rxjs-transformation-operator-map-and-mapto?course=rxjs-beyond-the-basics-operators-in-depth)
  🎥 💵 - André Staltz

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/mapTo.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/mapTo.ts)
