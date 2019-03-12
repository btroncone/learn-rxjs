# Tank Battle Game

_By [adamlubek](https://github.com/adamlubek)_

This recipe demonstrates RxJs implementation of Tank Battle like game.

<div class="ua-ad"><a href="https://ultimatecourses.com/?ref=76683_kee7y7vk"><img src="https://ultimatecourses.com/assets/img/banners/ultimate-angular-leader.svg" style="width:100%;max-width:100%"></a></div>

### Example Code

(
[StackBlitz](https://stackblitz.com/edit/rxjs-tank-battle?file=index.ts)
)

#### index.ts
```js
// RxJS v6+
import { fromEvent, combineLatest, interval } from 'rxjs';
import { scan, tap, startWith } from 'rxjs/operators';
import { gameSize, down, up, right, left, p1Color, p2Color } from './constants';
import { State } from './interfaces';
import { updatePlayer, addShots, updateShots, checkCollisions, initialState } from './game';
import { paint } from './html-renderer';

combineLatest(
  interval(100),
  fromEvent(document, 'keydown').pipe(startWith({ key: '' }))
).pipe(
  scan<[number, KeyboardEvent], State>((state, [_, event]) => (
    updatePlayer(state.players[0], event.key, 'w', 's', 'a', 'd'),
    updatePlayer(state.players[1], event.key, 'i', 'k', 'j', 'l'),
    addShots(state, event.key),
    state.shots = updateShots(state.shots),
    checkCollisions(state),
    state),
    initialState
  ),
  tap(paint)
).subscribe();
```

#### game.ts
```js
import { gameSize, down, up, right, left, p1Color, p2Color, p1Shot, p2Shot } from './constants';
import { GameObject, State } from './interfaces';

const gameObject = (x, y, g, c): GameObject => ({ x, y, g, s: 0, c: c });
const noop = (): void => { };

export const updatePlayer = (p: GameObject, key: string, u, d, l, r): GameObject => (
  (key === d
    ? (p.x += p.x < gameSize - 1 ? 1 : 0, p.g = down)
    : key === u
      ? (p.x += p.x > 0 ? -1 : 0, p.g = up)
      : noop),
  (key === r
    ? (p.y += p.y < gameSize - 1 ? 1 : 0, p.g = right)
    : key === l
      ? (p.y += p.y > 0 ? -1 : 0, p.g = left)
      : noop),
  p);

export const addShot = (player: GameObject): GameObject =>
  ({ x: player.x, y: player.y, g: player.g });

export const addShots = (state: State, key: string): void =>
  state.shots.push(
    key === p1Shot
      ? addShot(state.players[0])
      : key === p2Shot
        ? addShot(state.players[1])
        : []);

export const updateShots = (shots: GameObject[]): GameObject[] => shots
  .filter(s =>
    s.x > 0
    && s.x < gameSize - 1
    && s.y > 0
    && s.y < gameSize)
  .map(s => (
    s.g === down
      ? s.x += 1
      : s.g === up
        ? s.x += -1
        : s.g === right
          ? s.y += 1
          : s.g === left
            ? s.y += -1
            : () => { }, s));

export const initialState: State = {
  players: [
    gameObject(1, 1, right, p1Color),
    gameObject(gameSize - 2, gameSize - 2, left, p2Color)
  ],
  shots: []
};

export const checkCollisions = (state: State): void =>
  state.players.forEach((p, i) => {
    const collidingShotIndex = state.shots.findIndex(s => s.x === p.x && s.y === p.y);
    if (collidingShotIndex > -1) {
      if (i === 0) {
        state.players[1].s += 1;
      } else {
        state.players[0].s += 1;
      }
      state.shots.splice(collidingShotIndex, 1);
    }
  });
```

#### interfaces.ts
```js
export interface GameObject {
  x: number;
  y: number;
  g: string;
  s: number;
  c: string;
}

export interface State {
  players: GameObject[];
  shots: GameObject[];
}
```

#### constants.ts
```js
export const gameSize = 20;
export const up = '^';
export const down = 'v';
export const left = '<';
export const right = '>';
export const empty = 0;
export const p1Color = 'DarkViolet';
export const p2Color = 'CornflowerBlue';
export const p1Shot = 'c';
export const p2Shot = 'n';
```

#### html-renderer.ts
```js

import { gameSize, empty, p1Color, p2Color } from './constants';
import { State, GameObject } from './interfaces';

const createElem = (gameObject: GameObject) => {
  const elem = document.createElement('div');
  elem.style.display = 'inline-block';
  elem.style.marginLeft = '10px';
  elem.style.height = '6px';
  elem.style.width = '6px';
  elem.style.color = gameObject.c;
  elem.innerText = gameObject === empty ? ' ' : gameObject.g;

  return elem;
}

const paintPlayerScore = (score: number, color: string) => {
  const scoreElem = document.createElement('span');
  scoreElem.innerHTML = `P1: ${score} `;
  scoreElem.style.color = color;
  document.body.appendChild(scoreElem);
}

const paintScores = (state: State) => {
  document.body.innerHTML = 'Scores: ';
  paintPlayerScore(state.players[0].s, p1Color);
  paintPlayerScore(state.players[1].s, p2Color);
}

const painInfo = () => {
  document.body.innerHTML += 'This game requires 2 players :)';
  document.body.innerHTML += '<br/>';
  document.body.innerHTML += 'Player 1 controls: wsad, fire: c';
  document.body.innerHTML += '<br/>';
  document.body.innerHTML += 'Player 2 controls: ikjl, fire: n';
}

const emptyGame = () => Array(gameSize).fill(empty).map(_ => Array(gameSize).fill(empty));
const paintGame = (state: State) => {
  const game = emptyGame();
  state.players.forEach(p => game[p.x][p.y] = { g: p.g, c: p.c });
  state.shots.forEach(s => game[s.x][s.y] = { g: '*', c: 'black' });

  game.forEach(row => {
    const rowContainer = document.createElement('div');
    row.forEach(col => rowContainer.appendChild(createElem(col)));
    document.body.appendChild(rowContainer);
  });
}

export const paint = (state: State) => {
  paintScores(state);
  document.body.innerHTML += '<br/>';
  paintGame(state);
  painInfo();
}
```

### Operators Used

- [combineLatest](../operators/combination/combinelatest.md)
- [fromEvent](../operators/creation/fromevent.md)
- [interval](../operators/creation/interval.md)
- [scan](../operators/transformation/scan.md)
- [startWith](../operators/combination/startwith.md)
- [tap](../operators/utility/do.md)
