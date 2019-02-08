# Catch The Dot Game

_By [adamlubek](https://github.com/adamlubek)_

This recipe shows usage of scan operator for state management in simple game

<div class="ua-ad"><a href="https://ultimatecourses.com/?ref=76683_kee7y7vk"><img src="https://ultimatecourses.com/assets/img/banners/ultimate-angular-leader.svg" style="width:100%;max-width:100%"></a></div>

### Example Code

(
[StackBlitz](https://stackblitz.com/edit/rxjs-catch-the-dot-game?file=index.ts)
)

#### index.ts
```js
// RxJS v6+
import { fromEvent, interval } from 'rxjs';
import { tap, scan, map, switchMap, takeWhile } from 'rxjs/operators';
import { dot, updatedDot, setTimerText, resetDotSize, moveDot } from './dom-updater';

interface State {
  score: number;
  intrvl: number;
}
const makeInterval = (val: State) => interval(val.intrvl).pipe(
  map(v => 5 - v),
  tap(setTimerText)
);
const gameState: State = { score: 0, intrvl: 500 };
const nextState = (acc: State) => ({
  score: acc.score += 1,
  intrvl: acc.score % 3 === 0 ? acc.intrvl -= 50 : acc.intrvl
});
const isNotGameOver = intervalValue => intervalValue >= 0;

const game$ = fromEvent(dot, 'mouseover')
  .pipe(
    tap(moveDot),
    scan<Event, State>(nextState, gameState),
    tap(state => updatedDot(state.score)),
    switchMap(makeInterval),
    tap(resetDotSize),
    takeWhile(isNotGameOver)
  );

game$.subscribe(
  n => { },
  e => { },
  () => setTimerText('ouch!')
);
```

#### dom-updater.ts
```js
const random = () => Math.random() * 300;
const elem = id => document.getElementById(id);
const setElementText = (elem, text) =>
  elem.innerText = text.toString();
const timer = elem('timer');
const setDotSize = size => {
  dot.style.height = `${size}px`;
  dot.style.width = `${size}px`;
}

export const dot = elem('dot');
export const updatedDot = score => {
  if (score % 3 === 0) {
    dot.style.backgroundColor =
      '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
  }
  setElementText(dot, score);
}
export const setTimerText = text => setElementText(timer, text);
export const moveDot = () => {
  setDotSize(5);
  dot.style.transform = `translate(${random()}px, ${random()}px)`;
}
export const resetDotSize = () => setDotSize(30);
```

##### html
```
<style>
  #dot {
    margin-top: 10px;
    height: 30px;
    width: 30px;
    background-color: lightgray;
    border-radius: 50%;
    transition: all 0.6s ease-in-out;
    text-align: center;
    color: white;
  }

  #timer {
    position: absolute;
    top: 150px;
    left: 150px;
    opacity: 0.1;
    font-size: 60px;
  }
</style>

<div id="timer"></div>
<div id="dot"></div>
```

- [fromEvent](../operators/creation/fromevent.md)
- [interval](../operators/creation/interval.md)
- [map](../operators/transformation/map.md)
- [scan](../operators/transformation/scan.md)
- [switchMap](../operators/transformation/switchmap.md)
- [takeWhile](../operators/filtering/takewhile.md)
- [tap](../operators/utility/do.md)
