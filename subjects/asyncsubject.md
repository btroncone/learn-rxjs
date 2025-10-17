# AsyncSubject

## Emits its last value on completion



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

- [AsyncSubject](https://rxjs-dev.firebaseapp.com/api/index/class/AsyncSubject)
  📰 - Official docs

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/AsyncSubject.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/AsyncSubject.ts)
