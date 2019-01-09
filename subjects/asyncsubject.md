# AsyncSubject

## A variant of Subject that only emits a value when it completes. It will emit its latest value to all its observers on completion.

<div class="ua-ad"><a href="https://ultimatecourses.com/?ref=76683_kee7y7vk"><img src="https://ultimatecourses.com/assets/img/banners/uc-leader.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: simple AsyncSubject

(
[Stackblitz](https://stackblitz.com/edit/rxjs-asyncsubject?file=index.ts&devtoolsheight=100) )

```js
// RxJS v6+
import { AsyncSubject } from 'rxjs';

const sub = new AsyncSubject();

sub.asObservable().subscribe(console.log);

sub.next(123); //nothing logged

sub.asObservable().subscribe(console.log);

sub.next(456); //nothing logged
sub.complete(); //456, 456 logged by both subscribers
```

### Additional Resources

- [AsyncSubject](https://rxjs-dev.firebaseapp.com/api/index/class/AsyncSubject)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/AsyncSubject.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/AsyncSubject.ts)
