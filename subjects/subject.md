# Subject

## A special type of Observable which shares a single execution path among observers

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1qq2-q-eVe-F_-d0eSvTyqaGRjpfLDdJz 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: simple Subject

(
[Stackblitz](https://stackblitz.com/edit/rxjs-subject-simple-example-j33czp?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { Subject } from 'rxjs';

const sub = new Subject();

sub.next(1);
sub.subscribe(x => {
  console.log('Subscriber A', x);
});
sub.next(2); // OUTPUT => Subscriber A 2
sub.subscribe(x => {
  console.log('Subscriber B', x);
});
sub.next(3); // OUTPUT => Subscriber A 3, Subscriber B 3 (logged from both subscribers)
```

### Related Recipes

- [Battleship Game](../recipes/battleship-game.md)
- [Lockscreen](../recipes/lockscreen.md)

### Additional Resources

- [Subject](https://rxjs-dev.firebaseapp.com/api/index/class/Subject) 📰 -
  Official docs
- [Subject](https://indepth.dev/reference/rxjs/subjects) - In Depth Dev Reference

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/Subject.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Subject.ts)
