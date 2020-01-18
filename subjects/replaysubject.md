# ReplaySubject

## "Replays" or emits old values to new subscribers

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX "Ultimate RxJS")](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: simple ReplaySubject

(
[Stackblitz](https://stackblitz.com/edit/rxjs-replaysubject-simple-example?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { ReplaySubject } from 'rxjs';

const sub = new ReplaySubject(3);

sub.next(1);
sub.next(2);
sub.subscribe(console.log); // OUTPUT => 1,2
sub.next(3); // OUTPUT => 3
sub.next(4); // OUTPUT => 4
sub.subscribe(console.log); // OUTPUT => 2,3,4 (log of last 3 values from new subscriber)
sub.next(5); // OUTPUT => 5,5 (log from both subscribers)
```

### Additional Resources

- [ReplaySubject](https://rxjs-dev.firebaseapp.com/api/index/class/ReplaySubject)
  📰 - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/ReplaySubject.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/ReplaySubject.ts)
