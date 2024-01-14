# AsyncSubject

## Emits its last value on completion

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1qq2-q-eVe-F_-d0eSvTyqaGRjpfLDdJz 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: simple AsyncSubject

(
[Stackblitz](https://stackblitz.com/edit/rxjs-asyncsubject?file=index.ts&devtoolsheight=100)
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
```

### Additional Resources

- [AsyncSubject](https://rxjs-dev.firebaseapp.com/api/index/class/AsyncSubject) 📰 - Official docs
- [AsyncSubject](https://web.archive.org/web/20230925063933/https://indepth.dev/reference/rxjs/subjects/async-subject) - In Depth Dev Reference

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/AsyncSubject.ts](https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/AsyncSubject.ts)
