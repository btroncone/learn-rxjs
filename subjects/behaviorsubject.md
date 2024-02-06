# BehaviorSubject

## Requires an initial value and emits the current value to new subscribers

---

💡 If you want the last emitted value(s) on subscription, but do not need to
supply a seed value, check out [ReplaySubject](replaysubject.md) instead!

---

### Why use `BehaviorSubject`?

This specialized subject is ideal when you want to maintain and provide a "current value" to subscribers. Think of it as a scoreboard in a basketball game. Even if you join watching in the middle of the game, you'll still see the current score. Similarly, when a new observer subscribes to a `BehaviorSubject`, it immediately receives the current value (or the last value that was emitted).

It's important to remember that a **`BehaviorSubject` requires an initial value upon instantiation**. This is where it differs from a regular [`Subject`](subject.md) which doesn't have an initial value. Picture a newly installed scoreboard – with `BehaviorSubject`, you set a starting score, say 0-0. With a regular [`Subject`](subject.md), the board remains blank until a point is scored. Subscribers (early or late) of a normal [`Subject`](subject.md) will not receive
 emissions until the `Subject` emits a value.

Contrasting with [`ReplaySubject`](replaysubject.md), while both provide historical values, [`ReplaySubject`](replaysubject.md) can relay multiple previous values, not just the last one. If the basketball scoreboard could show the last five scores in the match sequence, that'd be akin to [`ReplaySubject`](replaysubject.md). [`ReplaySubject`](replaysubject.md) also does not receive an initial seed value.

In conclusion, if you need to ensure subscribers always get the latest value upon subscription, or you have an initial seed value, `BehaviorSubject` is your pick. If you need more historical emissions, consider [`ReplaySubject`](replaysubject.md). And if you don't need any history at all, a simple [`Subject`](subject.md) might be what you're looking for.

[![Ultimate RxJS](https://ultimatecourses.com/static/banners/banner-rxjs.svg 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: Simple BehaviorSubject

(
[Stackblitz](https://stackblitz.com/edit/rxjs-behaviorsubject-simpleexample?file=index.ts?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { BehaviorSubject } from 'rxjs';

const subject = new BehaviorSubject(123);

// two new subscribers will get initial value => output: 123, 123
subject.subscribe(console.log);
subject.subscribe(console.log);

// two subscribers will get new value => output: 456, 456
subject.next(456);

// new subscriber will get latest value (456) => output: 456
subject.subscribe(console.log);

// all three subscribers will get new value => output: 789, 789, 789
subject.next(789);

// output: 123, 123, 456, 456, 456, 789, 789, 789
```

##### Example 2: BehaviorSubject with new subscribers created on mouse clicks

(
[Stackblitz](https://stackblitz.com/edit/rxjs-behaviorsubject-mouseclicks?file=index.ts)
)

```js
// RxJS v6+
import { BehaviorSubject, fromEvent, interval, merge } from 'rxjs';
import { map, tap, mergeMap } from 'rxjs/operators';

const setElementText = (elemId, text) =>
  (document.getElementById(elemId).innerText = text.toString());
const addHtmlElement = coords =>
  (document.body.innerHTML += `
  <div 
    id=${coords.id}
    style="
      position: absolute;
      height: 30px;
      width: 30px;
      text-align: center;
      top: ${coords.y}px;
      left: ${coords.x}px;
      background: silver;
      border-radius: 80%;"
    >
  </div>`);

const subject = new BehaviorSubject(0);

const click$ = fromEvent(document, 'click').pipe(
  map((e: MouseEvent) => ({
    x: e.clientX,
    y: e.clientY,
    id: Math.random()
  })),
  tap(addHtmlElement),
  mergeMap(coords => subject.pipe(tap(v => setElementText(coords.id, v))))
);

const interval$ = interval(1000).pipe(
  tap(v => subject.next(v)),
  tap(v => setElementText('intervalValue', v))
);

merge(click$, interval$).subscribe();
```

### Related Recipes

- [Alphabet Invasion Game](../recipes/alphabet-invasion-game.md)
- [Battleship Game](../recipes/battleship-game.md)
- [Car Racing Game](../recipes/car-racing-game.md)

### Additional Resources

- [BehaviorSubject](https://rxjs-dev.firebaseapp.com/api/index/class/BehaviorSubject)
  📰 - Official docs
- [BehaviorSubject](https://indepth.dev/reference/rxjs/subjects/behavior-subject) - In Depth Dev Reference

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/BehaviorSubject.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/BehaviorSubject.ts)
