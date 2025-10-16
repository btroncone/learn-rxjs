# delayWhen

#### signature: `delayWhen(selector: Function, sequence: Observable): Observable`

## Delay emitted values determined by provided function.



### Examples

##### Example 1: Delay based on observable

(
[StackBlitz](https://stackblitz.com/edit/typescript-5yzn8g?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/topohekuje/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/b057mxkL/) )

```js
// RxJS v6+
import { interval, timer } from 'rxjs';
import { delayWhen } from 'rxjs/operators';

//emit value every second
const message = interval(1000);
//emit value after five seconds
const delayForFiveSeconds = () => timer(5000);
//after 5 seconds, start emitting delayed interval values
const delayWhenExample = message.pipe(delayWhen(delayForFiveSeconds));
//log values, delayed for 5 seconds
//ex. output: 5s....1...2...3
const subscribe = delayWhenExample.subscribe(val => console.log(val));
```

### Additional Resources

- [delayWhen](https://rxjs.dev/api/operators/delayWhen) 📰 - Official docs
- [delayWhen](https://indepth.dev/reference/rxjs/operators/delay-when) - In Depth Dev Reference
- [Transformation operator: delay and delayWhen](https://egghead.io/lessons/rxjs-transformation-operators-delay-and-delaywhen?course=rxjs-beyond-the-basics-operators-in-depth)
  🎥 💵 - André Staltz

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/operators/delayWhen.ts](https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/operators/delayWhen.ts)
