# AsyncSubject

## Emits its last value on completion

## After completing, it sends the last value to all subscribers

[![Ultimate RxJS](https://ultimatecourses.com/static/banners/banner-rxjs.svg 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: simple AsyncSubject

(
[Stackblitz](https://stackblitz.com/edit/rxjs-asyncsubject-xyp8ku?file=index.ts)
)

```js
// RxJS v6+
import { AsyncSubject } from 'rxjs';

const sub = new AsyncSubject();

sub.subscribe(console.log);

sub.next(123); //nothing logged

sub.subscribe(console.log);

sub.next(456); //nothing logged
sub.complete(); //456, 456 logged by both subscribers

sub.subscribe(console.log); //456 logged one more time
```

### Additional Resources

- [AsyncSubject](https://rxjs-dev.firebaseapp.com/api/index/class/AsyncSubject)
  📰 - Official docs
- [AsyncSubject](https://indepth.dev/reference/rxjs/subjects/async-subject) - In Depth Dev Reference

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/AsyncSubject.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/AsyncSubject.ts)
