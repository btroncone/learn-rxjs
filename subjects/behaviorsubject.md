# BehaviorSubject

## Requires an initial value and emits the current value to new subscribers

---

:bulb: If you want the last emitted value(s) on subscription, but do not need to supply a seed value, check out [ReplaySubject](replaysubject.md) instead!

---

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX "Ultimate RxJS")](https://ultimatecourses.com/courses/rxjs?ref=4)


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
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/BehaviorSubject.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/BehaviorSubject.ts)
