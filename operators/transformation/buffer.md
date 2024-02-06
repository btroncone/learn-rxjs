# buffer

#### signature: `buffer(closingNotifier: Observable): Observable`

## Collect output values until provided observable emits, emit as array.

### Why use `buffer`?
The buffer operator in RxJS stands out for its ability to accumulate emitted values into an array until a specified notifier emits. Think of it as a "collect and release" mechanism. This aligns well with use cases where you want to group events based on a certain condition, such as time or user actions.

Buffer shines in scenarios like batching multiple events together before processing, which can optimize performance and reduce workload. For example, when monitoring clicks on a web page, buffer can gather a series of clicks before sending them for analytics, rather than doing so individually.

However, keep in mind that buffer may not be the best fit when you require immediate processing of each emitted value. One way to think about this is "buffer is about batching". Remember, buffer is all about accumulating and releasing values based on specific triggers, making it a powerful tool for managing grouped events.

[![Ultimate RxJS](https://ultimatecourses.com/static/banners/banner-rxjs.svg 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: Using buffer to recognize double clicks

(
[StackBlitz](https://stackblitz.com/edit/typescript-x5zyn5?file=index.ts&devtoolsheight=50))

```js
// RxJS v6+
import { fromEvent } from 'rxjs';
import { buffer, filter, throttleTime } from 'rxjs/operators';

// streams
const clicks$ = fromEvent(document, 'click');

/*
Collect clicks that occur, after 250ms emit array of clicks
*/
clicks$
  .pipe(
    buffer(clicks$.pipe(throttleTime(250))),
    // if array is greater than 1, double click occured
    filter(clickArray => clickArray.length > 1)
  )
  .subscribe(() => console.log('Double Click!'));
```

##### Example 2: Buffer until document click

(
[StackBlitz](https://stackblitz.com/edit/typescript-nwp2cl?file=index.ts&devtoolsheight=50)
| [jsBin](http://jsbin.com/fazimarajo/edit?js,console,output) |
[jsFiddle](https://jsfiddle.net/btroncone/7451s67k/) )

```js
// RxJS v6+
import { interval, fromEvent } from 'rxjs';
import { buffer } from 'rxjs/operators';

//Create an observable that emits a value every second
const myInterval = interval(1000);
//Create an observable that emits every time document is clicked
const bufferBy = fromEvent(document, 'click');
/*
Collect all values emitted by our interval observable until we click document. This will cause the bufferBy Observable to emit a value, satisfying the buffer. Pass us all collected values since last buffer as an array.
*/
const myBufferedInterval = myInterval.pipe(buffer(bufferBy));
//Print values to console
//ex. output: [1,2,3] ... [4,5,6,7,8]
const subscribe = myBufferedInterval.subscribe(val =>
  console.log(' Buffered Values:', val)
);
```

### Related Recipes

- [Game Loop](../../recipes/gameloop.md)

### Additional Resources

- [buffer](https://rxjs-dev.firebaseapp.com/api/operators/buffer) 📰 - Official
  docs
- [buffer](https://indepth.dev/reference/rxjs/operators/buffer) - In Depth Dev Reference
- [Transformation operator: buffer](https://egghead.io/lessons/rxjs-transformation-operator-buffer?course=rxjs-beyond-the-basics-operators-in-depth)
  🎥 💵 - André Staltz

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/buffer.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/buffer.ts)
