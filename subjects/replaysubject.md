# ReplaySubject

## "Replays" or emits old values to new subscribers

### Why use `ReplaySubject`?

This subject variation shines when you want subscribers to have access to previous values emitted, even if they subscribe after those values have been sent. Think of it as a Tivo or DVR for observables. Missed the start of the show? No worries! With a `ReplaySubject`, you can still catch up on what you missed.

For a real-world example, consider a chat application. When a user joins a chatroom, they might want to see the last few messages, not just new ones. A `ReplaySubject` can hold onto a specified number of the most recent messages and display them to the user when they join.

Now, how does it compare with `BehaviorSubject` or a plain `Subject`?

- **[`BehaviorSubject`](behaviorsubject.md)** always requires an initial value and only stores the most recent value. Subscribers will get that latest value upon subscription. It's like walking into a movie and only catching the most recent scene.

- **[`Subject`](subject.md)**, on the other hand, doesn't give new subscribers any previously emitted values. It’s the traditional live broadcast. If you're late, you miss out.

- **`ReplaySubject`** can remember more than just the last scene. Depending on how it's configured, it might replay the entire movie or just the last few scenes.

However, be cautious. `ReplaySubject` can potentially use more memory since it's storing multiple values. Ensure that you specify a limited buffer size if you're concerned about memory consumption.

In conclusion, if you want the ability to replay a series of previous emissions to new subscribers, `ReplaySubject` is your go-to. If you only care about the most recent emission (with an initial value), opt for `BehaviorSubject`. And if you want a basic, no-frills broadcasting mechanism where late subscribers miss prior emissions, stick with a plain `Subject`.



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

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/ReplaySubject.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/ReplaySubject.ts)
