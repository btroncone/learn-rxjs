# Space Invaders Game

_By [adamlubek](https://github.com/adamlubek)_

This recipe demonstrates RxJS implementation of Space Invaders Game.

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs?ref=4"><img src="https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX" style="width:100%;max-width:100%"></a></div>

### Example Code

( [StackBlitz](https://stackblitz.com/edit/rxjs-space-invaders?file=index.ts) )

![Space
Invaders](https://drive.google.com/uc?export=view&id=1s3JUvMEKVDMroou92mCtGHr9-qu89KWL)

#### index.ts

```js
// RxJS v6+
import { fromEvent, interval } from 'rxjs';
import {
  map,
  scan,
  tap,
  startWith,
  withLatestFrom,
  takeUntil,
  repeat
} from 'rxjs/operators';
import { gameUpdate, initialState } from './game';
import { State, Input } from './interfaces';
import { paint } from './html-renderer';

const spaceInvaders$ = interval(100).pipe(
  withLatestFrom(
    fromEvent(document, 'keydown').pipe(
      startWith({ code: '' }),
      takeUntil(fromEvent(document, 'keyup')),
      repeat()
    )
  ),
  map(([intrvl, event]: [number, KeyboardEvent]): Input => ({
    dlta: intrvl,
    key: event.code
  })),
  scan(gameUpdate, initialState),
  tap(e => paint(e.game, e.playerLives, e.score, e.isGameOver))
);

spaceInvaders$.subscribe();
```

#### game.ts

```js
import { State, Input } from './interfaces';
import { empty, player, invader, shot, noOfInvadersRows } from './constants';

const gameObject = (x, y) => ({ x: x, y: y });
const gameSize = 20;
const clearGame = () =>
  Array(gameSize)
    .fill(empty)
    .map(e => Array(gameSize).fill(empty));

const createInvaders = () =>
  Array.from(Array(noOfInvadersRows).keys()).reduce(
    (invds, row) => [...invds, ...createRowOfInvaders(row)],
    []
  );
const createRowOfInvaders = row =>
  Array.from(Array(gameSize / 2).keys())
    .filter(e => (row % 2 === 0 ? e % 2 === 0 : e % 2 !== 0))
    .map(e => gameObject(row, e + 4));

const invadersDirection = (state: State): number =>
  state.invaders.length && state.invaders[0].y <= 0
    ? 1
    : state.invaders.length &&
      state.invaders[state.invaders.length - 1].y >= gameSize - 1
    ? -1
    : state.invadersDirY;

const drawGame = (state: State): number[][] => (
  keepShipWithinGame(state),
  (state.game = clearGame()),
  (state.game[state.game.length - 1][state.shipY] = player),
  state.invaders.forEach(i => (state.game[i.x][i.y] = invader)),
  state.invadersShoots.forEach(s => (state.game[s.x][s.y] = shot)),
  state.shoots.forEach(s => (state.game[s.x][s.y] = shot)),
  state.game
);

const addInvaderShoot = state =>
  (randomInvader => gameObject(randomInvader.x, randomInvader.y))(
    state.invaders[Math.floor(Math.random() * state.invaders.length)]
  );

const collision = (e1, e2) => e1.x === e2.x && e1.y === e2.y;
const filterOutCollisions = (c1: any[], c2: any[]): any[] =>
  c1.filter(e1 => !c2.find(e2 => collision(e1, e2)));
const updateScore = (state: State): number =>
  state.shoots.find(s => state.invaders.find(i => collision(s, i)))
    ? state.score + 1
    : state.score;

const updateState = (state: State): State => ({
  delta: state.delta,
  game: drawGame(state),
  shipY: state.shipY,
  playerLives: state.invadersShoots.some(
    e => e.x === gameSize - 1 && e.y === state.shipY
  )
    ? state.playerLives - 1
    : state.playerLives,
  isGameOver: state.playerLives <= 0,
  score: updateScore(state),
  invadersDirY: invadersDirection(state),
  invaders: !state.invaders.length
    ? createInvaders()
    : filterOutCollisions(state.invaders, state.shoots).map(i =>
        state.delta % 10 === 0
          ? gameObject(
              i.x + (state.delta % (state.shootFrequency + 10) === 0 ? 1 : 0),
              i.y + state.invadersDirY
            )
          : i
      ),
  invadersShoots:
    ((state.invadersShoots =
      state.delta % state.shootFrequency === 0
        ? [...state.invadersShoots, addInvaderShoot(state)]
        : state.invadersShoots),
    state.invadersShoots
      .filter(e => e.x < gameSize - 1)
      .map(e => gameObject(e.x + 1, e.y))),
  shoots: filterOutCollisions(state.shoots, state.invaders)
    .filter(e => e.x > 0)
    .map(e => gameObject(e.x - 1, e.y)),
  shootFrequency: !state.invaders.length
    ? state.shootFrequency - 5
    : state.shootFrequency
});

const keepShipWithinGame = (state: State): number => (
  (state.shipY = state.shipY < 0 ? 0 : state.shipY),
  (state.shipY = state.shipY >= gameSize - 1 ? gameSize - 1 : state.shipY)
);

const updateShipY = (state: State, input: Input): number =>
  input.key !== 'ArrowLeft' && input.key !== 'ArrowRight'
    ? state.shipY
    : (state.shipY -= input.key === 'ArrowLeft' ? 1 : -1);

const addShots = (state: State, input: Input) =>
  (state.shoots =
    input.key === 'Space'
      ? [...state.shoots, gameObject(gameSize - 2, state.shipY)]
      : state.shoots);

const isGameOver = (state: State): boolean =>
  state.playerLives <= 0 ||
  (state.invaders.length &&
    state.invaders[state.invaders.length - 1].x >= gameSize - 1);

export const initialState: State = {
  delta: 0,
  game: clearGame(),
  shipY: 10,
  playerLives: 3,
  isGameOver: false,
  score: 0,
  invadersDirY: 1,
  invaders: createInvaders(),
  invadersShoots: [],
  shoots: [],
  shootFrequency: 20
};

const processInput = (state: State, input: Input) => (
  updateShipY(state, input), addShots(state, input)
);
const whileNotGameOver = (state: State, input: Input) =>
  (state.delta = isGameOver(state) ? undefined : input.dlta);

export const gameUpdate = (state: State, input: Input): State => (
  whileNotGameOver(state, input), processInput(state, input), updateState(state)
);
```

#### constants.ts

```js
export const empty = 0;
export const player = 1;
export const invader = 2;
export const shot = 3;
export const noOfInvadersRows = 6;
```

#### interfaces.ts

```js
export interface State {
  delta: number;
  game: number[][];
  shipY: number;
  playerLives: number;
  isGameOver: boolean;
  score: number;
  invadersDirY: number;
  invaders: any[];
  invadersShoots: any[];
  shoots: any[];
  shootFrequency: number;
}

export interface Input {
  dlta: number;
  key: string;
}
```

#### html-renderer.ts

```js
import { empty, player, invader, shot } from './constants';

const createElem = col => {
  const elem = document.createElement('div');
  elem.classList.add('board');
  elem.style.display = 'inline-block';
  elem.style.marginLeft = '10px';
  elem.style.height = '6px';
  elem.style.width = '6px';
  elem.style['background-color'] =
    col === empty
      ? 'white'
      : col === player
      ? 'cornflowerblue'
      : col === invader
      ? 'gray'
      : 'silver';
  elem.style['border-radius'] = '90%';
  return elem;
};

export const paint = (
  game: number[][],
  playerLives: number,
  score: number,
  isGameOver: boolean
) => {
  document.body.innerHTML = '';
  document.body.innerHTML += `Score: ${score} Lives: ${playerLives}`;

  if (isGameOver) {
    document.body.innerHTML += ' GAME OVER!';
    return;
  }

  game.forEach(row => {
    const rowContainer = document.createElement('div');
    row.forEach(col => rowContainer.appendChild(createElem(col)));
    document.body.appendChild(rowContainer);
  });
};
```

### Operators Used

- [fromEvent](../operators/creation/fromevent.md)
- [interval](../operators/creation/interval.md)
- [map](../operators/transformation/map.md)
- [repeat](../operators/utility/repeat.md)
- [scan](../operators/transformation/scan.md)
- [startWith](../operators/combination/startwith.md)
- [takeUntil](../operators/filtering/takeuntil.md)
- [tap](../operators/utility/do.md)
- [withLatestFrom](../operators/combination/withlatestfrom.md)
