# Click Ninja Game

_By [adamlubek](https://github.com/adamlubek)_

This recipe shows usage of time interval operator in a simple game

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX "Ultimate RxJS")](https://ultimatecourses.com/courses/rxjs?ref=4)

### Example Code

( [StackBlitz](https://stackblitz.com/edit/rxjs-click-ninja?file=index.ts) )

![Click Ninja Game](https://drive.google.com/uc?export=view&id=1VT8umN-jtaqBfcKtlCwZ3w805qe3bXWN)

#### index.ts

```js
// RxJS v6+
import { fromEvent, TimeInterval } from 'rxjs';
import { timeInterval, takeWhile, scan, tap, repeat, finalize } from 'rxjs/operators';
import { render, clear } from './html-renderer';

interface State {
  score: number;
  interval: number;
  threshold: number;
}

fromEvent(document, 'mousedown').pipe(
  timeInterval(),
  scan<TimeInterval<Event>, State>((state, timeInterval) => ({
    score: state.score + 1,
    interval: timeInterval.interval,
    threshold: state.threshold - 2
  }), { score: 0, interval: 0, threshold: 300 }),
  takeWhile((state: State) => state.interval < state.threshold),
  tap((state: State) => render(state.score, Math.floor(state.score / 10))),
  finalize(clear),
  repeat()
).subscribe();
```

#### html-renderer.ts

```js
const texts = {
  0: 'click, click',
  1: 'keep clicking',
  2: 'wow',
  3: 'not tired yet?!',
  4: 'click master!',
  5: 'inhuman!!!',
  6: 'ininhuman!!!'
};

const text = (score: number, level: number) => `${texts[level]} \n ${score}`;

export const render = (score: number, level: number) => {
  const id = 'level' + level;
  const element = document.getElementById(id);
  const innerText = text(score, level);
  if (element) {
    element.innerText = innerText;
  } else {
    const elem = document.createElement('div');
    elem.id = id;
    elem.style.zIndex = `${level}`;
    elem.style.position = 'absolute';
    elem.style.height = '150px';
    elem.style.width = '150px';
    elem.style.borderRadius = '10px';
    const position = level * 20;
    elem.style.top = position + 'px';
    elem.style.left = position + 'px';
    const col = 100 + position;
    elem.style.background = `rgb(0,${col},0)`;
    elem.style.color = 'white';
    elem.innerText = innerText;
    elem.style.textAlign = 'center';
    elem.style.verticalAlign = 'middle';
    elem.style.lineHeight = '90px';
    document.body.appendChild(elem);
  }
};

export const clear = () => (document.body.innerText = '');
```

##### html

```
<div>How fast can you click?!</div>
```

- [finalize](../operators/utility/finalize.md)
- [fromEvent](../operators/creation/fromevent.md)
- [repeat](../operators/utility/repeat.md)
- [scan](../operators/transformation/scan.md)
- [takeWhile](../operators/filtering/takewhile.md)
- [tap](../operators/utility/do.md)
- [timeInterval](../operators/utility/timeinterval.md)
