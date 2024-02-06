# share

#### signature: `share(): Observable`

## Share source among multiple subscribers.

---

💡 share is like [multicast](multicast.md) with a Subject and refCount!

---

[![Ultimate RxJS](https://ultimatecourses.com/static/banners/banner-rxjs.svg 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: Multiple subscribers sharing source

(
[StackBlitz](https://stackblitz.com/edit/typescript-dlaa1p?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/jobiyomari/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/Lmesxxaq/) )

```js
// RxJS v6+
import { timer } from 'rxjs';
import { tap, mapTo, share } from 'rxjs/operators';

//emit value in 1s
const source = timer(1000);
//log side effect, emit result
const example = source.pipe(
  tap(() => console.log('***SIDE EFFECT***')),
  mapTo('***RESULT***')
);

/*
  ***NOT SHARED, SIDE EFFECT WILL BE EXECUTED TWICE***
  output:
  "***SIDE EFFECT***"
  "***RESULT***"
  "***SIDE EFFECT***"
  "***RESULT***"
*/
const subscribe = example.subscribe(val => console.log(val));
const subscribeTwo = example.subscribe(val => console.log(val));

//share observable among subscribers
const sharedExample = example.pipe(share());
/*
  ***SHARED, SIDE EFFECT EXECUTED ONCE***
  output:
  "***SIDE EFFECT***"
  "***RESULT***"
  "***RESULT***"
*/
const subscribeThree = sharedExample.subscribe(val => console.log(val));
const subscribeFour = sharedExample.subscribe(val => console.log(val));
```

### Related Recipes

- [Progress Bar](../../recipes/progressbar.md)
- [Game Loop](../../recipes/gameloop.md)
- [Save Indicator](../../recipes/save-indicator.md)

### Additional Resources

- [share](https://rxjs.dev/api/operators/share) 📰 - Official docs
- [Sharing streams with share](https://egghead.io/lessons/rxjs-sharing-streams-with-share?course=step-by-step-async-javascript-with-rxjs)
  🎥 💵 - John Linquist

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/share.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/share.ts)
