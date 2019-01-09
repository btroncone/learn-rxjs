# Subject

##  A Subject is a special type of Observable that allows values to be multicasted to many Observables. Subjects are like EventEmitters.

<div class="ua-ad"><a href="https://ultimatecourses.com/?ref=76683_kee7y7vk"><img src="https://ultimatecourses.com/assets/img/banners/uc-leader.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: simple Subject

(
[Stackblitz](https://stackblitz.com/edit/rxjs-subject-simple-example?file=index.ts&devtoolsheight=100) )

```js
// RxJS v6+
import { Subject } from 'rxjs';

const sub = new Subject();

sub.next(1);
sub.asObservable().subscribe(console.log);
sub.next(2); // OUTPUT => 2
sub.asObservable().subscribe(console.log);
sub.next(3); // OUTPUT => 3,3 (logged from both subscribers)
```

### Additional Resources

- [Subject](https://rxjs-dev.firebaseapp.com/api/index/class/Subject)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/Subject.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Subject.ts)