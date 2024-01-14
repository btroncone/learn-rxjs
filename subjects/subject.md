# Subject

## A special type of Observable which shares a single execution path among observers

### Why use `Subject`?

`Subject` in RxJS acts as a bridge between the observer and the observable world. Imagine it as a microphone on a stage: you can shout into it (emit values) and those sitting in the audience (observers) can hear it loud and clear. The uniqueness of a `Subject` is its capability to multicast, i.e., it can emit values to multiple listeners.

A real-world example of this is like a radio show: one broadcast can be listened to by multiple listeners at once.

However, there's an array of "microphones" in the RxJS universe, and here's where the other "specialized" Subject types come in: 

- **[`BehaviorSubject`](behaviorsubject.md)**: Imagine going to a movie late and asking your friend, "Hey, what just happened?" and they fill you in. `BehaviorSubject` is similar: when you subscribe, it will give you the latest value that was emitted before you tuned in, and then you continue getting updates. So, if you need that "previous context," this is your pick. `BehaviorSubject` also require a seed value.

- **[`ReplaySubject`](replaysubject.md)**: Think of this as a DVR for your TV. It records, say, the last 5 shows, and you can replay those whenever you switch on your TV. `ReplaySubject` can keep a buffer of emitted values, and when you subscribe, it will "replay" those values for you, ensuring you don't miss out on what was broadcasted earlier. 

In contrast, a simple `Subject` doesn't offer these playback features. If you join late, you've missed it, akin to a live concert. You only hear what's played after you've arrived.

In summary, choose `Subject` for standard multicasting needs. Opt for `BehaviorSubject` when the latest value or seed value is critical, and `ReplaySubject` when you want to ensure a history of values is available for late subscribers.

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

- [Subject](https://rxjs-dev.firebaseapp.com/api/index/class/Subject) 📰 - Official docs
- [Subject](https://web.archive.org/web/20230601111248/https://indepth.dev/reference/rxjs/subjects) - In Depth Dev Reference

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/Subject.ts](https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/Subject.ts)
