# Tetris Game

_By [adamlubek](https://github.com/adamlubek)_

This recipe demonstrates RxJS implementation of Tetris game.

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs"><img src="https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX" style="width:100%;max-width:100%"></a></div>

### Example Code

( [StackBlitz](https://stackblitz.com/edit/rxjs-tetris?file=index.ts) )

![Tetris Game](https://drive.google.com/uc?export=view&id=1BjyB43WSHEU9rDbNN6uFeoYxIoEzJTZp)

#### index.ts

```js
// RxJS v6+
import { fromEvent, of, interval, combineLatest } from 'rxjs';
import { finalize, map, pluck, scan, startWith, takeWhile, tap } from 'rxjs/operators';
import { score, randomBrick, clearGame, initialState } from './game';
import { render, renderGameOver } from './html-renderer';
import { handleKeyPress, resetKey } from './keyboard';
import { collide } from './collision';
import { rotate } from './rotation';
import { brck } from './constants';
import { State, Key } from './interfaces';

const player$ = combineLatest(
  of(randomBrick()),
  of({ code: '' }),
  fromEvent(document, 'keyup').pipe(startWith({ code: undefined }), pluck('code'))
).pipe(
  map(([brick, key, keyCode]: [number[][], Key, string]) => (key.code = keyCode, [brick, key]))
);

const state$ = interval(1000)
  .pipe(
    scan<number, State>((state, _) => (state.x++ , state), initialState)
  );

const game$ = combineLatest(state$, player$)
  .pipe(
    scan<[State, [number[][], Key]], [State, [number[][], Key]]>(
      ([state, [brick, key]]) => (
        handleKeyPress(state, brick, key),
        brick = rotate(state, brick, key),
        brick = collide(state, brick),
        score(state),
        resetKey(key),
        [state, [brick, key]]
      )),
    tap(([state, [brick, key]]) => render(state, brick)),
    takeWhile(([state, [brick, key]]) => !state.game[1].some(c => c === brck)),
    finalize(renderGameOver)
  );
  
game$.subscribe();
```

#### game.ts

```js
import { gameSize, empty, brck } from './constants';
import { State } from './interfaces';

const bricks = [
  [[0, 0, 0], [1, 1, 1], [0, 0, 0]],
  [[1, 1, 1], [0, 1, 0], [0, 1, 0]],
  [[0, 1, 1], [0, 1, 0], [0, 1, 0]],
  [[1, 1, 0], [0, 1, 0], [0, 1, 0]],
  [[1, 1, 0], [1, 1, 0], [0, 0, 0]]
]

export const clearGame = () => Array(gameSize).fill(empty).map(e => Array(gameSize).fill(empty));
export const updatePosition = (position: number, column: number) => position === 0 ? column : position;
export const validGame = (game: number[][]) => game.map(r => r.filter((_, i) => i < gameSize));
export const validBrick = (brick: number[][]) => brick.filter(e => e.some(b => b === brck));
export const randomBrick = () => bricks[Math.floor(Math.random() * bricks.length)];

export const score = (state: State) => (scoreIndex => (
  scoreIndex > -1
    ? (
      state.score += 1,
      state.game.splice(scoreIndex, 1),
      state.game = [Array(gameSize).fill(empty), ...state.game]
    )
    : () => { }
))(state.game.findIndex(e => e.every(e => e === brck)));

export const initialState = {
  game: clearGame(),
  x: 0,
  y: 0,
  score: 0
};
```

#### collision.ts

```js
import { gameSize, brck, empty } from './constants';
import { validBrick, validGame, updatePosition, randomBrick } from './game';
import { State } from './interfaces';

const isGoingToLevelWithExistingBricks = (state: State, brick: number[][]) => {
  const gameHeight = state.game.findIndex(r => r.some(c => c === brck));
  const brickBottomX = state.x + brick.length - 1;
  return gameHeight > -1 && brickBottomX + 1 > gameHeight;
}

const areAnyBricksColliding = (state: State, brick: number[][]) =>
  validBrick(brick).some((r, i) => r.some((c, j) =>
    c === empty
      ? false
      : ((x, y) => state.game[x][y] === c)(i + state.x, j + state.y)
  ));

const collideBrick = (state: State, brick: number[][], isGoingToCollide: boolean) => {
  const xOffset = isGoingToCollide ? 1 : 0;
  validBrick(brick).forEach((r, i) => {
    r.forEach((c, j) =>
      state.game[i + state.x - xOffset][j + state.y] =
      updatePosition(state.game[i + state.x - xOffset][j + state.y], c)
    );
  });
  state.game = validGame(state.game);
  state.x = 0;
  state.y = (gameSize / 2) - 1;
}

export const collide = (state: State, brick: number[][]) => {
  const isGoingToCollide =
    isGoingToLevelWithExistingBricks(state, brick) &&
    areAnyBricksColliding(state, brick);

  const isOnBottom = state.x + validBrick(brick).length > gameSize - 1;

  if (isGoingToCollide || isOnBottom) {
    collideBrick(state, brick, isGoingToCollide);
    brick = randomBrick();
  }

  return brick;
}
```

#### rotation.ts

```js
import { gameSize, brickSize, empty } from './constants';
import { State, Key } from './interfaces';

const rightOffsetAfterRotation = (state: State, brick: number[][], rotatedBrick: number[][]) =>
  (state.y + rotatedBrick.length === gameSize + 1) && brick.every(e => e[2] === empty) ? 1 : 0;

const leftOffsetAfterRotation = (game: State) => game.y < 0 ? 1 : 0;

export const rotate = (state: State, brick: number[][], key: Key) =>
  key.code === 'ArrowUp'
    ? (rotatedBrick => (
      brick.forEach((r, i) => r.forEach((c, j) => rotatedBrick[j][brick[0].length - 1 - i] = c)),
      state.y -= rightOffsetAfterRotation(state, brick, rotatedBrick),
      state.y += leftOffsetAfterRotation(state),
      rotatedBrick
    ))(Array(brickSize).fill(empty).map(e => Array(brickSize).fill(empty)))
    : brick
```

#### keyboard.ts

```js
import { gameSize } from './constants';
import { State, Key } from './interfaces';

const xOffset = (brick: number[][], columnIndex: number) => brick.every(e => e[columnIndex] === 0) ? 1 : 0;

export const handleKeyPress = (state: State, brick: number[][], key: Key) => (
  state.x += key.code === 'ArrowDown'
    ? 1
    : 0,
  state.y += key.code === 'ArrowLeft' && state.y > 0 - xOffset(brick, 0)
    ? -1
    : key.code === 'ArrowRight' && state.y < gameSize - 3 + xOffset(brick, 2)
      ? 1
      : 0
);

export const resetKey = key => key.code = undefined;
```

#### html-renderer.ts

```js
import { brck } from './constants';
import { State } from './interfaces';
import { updatePosition, validGame, validBrick, clearGame } from './game';

const createElem = (column: number) => (elem =>
  (
    elem.style.display = 'inline-block',
    elem.style.marginLeft = '3px',
    elem.style.height = '6px',
    elem.style.width = '6px',
    elem.style['background-color'] = column === brck
      ? 'green'
      : 'aliceblue',
    elem
  ))(document.createElement('div'))

export const render = (state: State, brick: number[][]) => {
  const gameFrame = clearGame();

  state.game.forEach((r, i) => r.forEach((c, j) => gameFrame[i][j] = c));
  validBrick(brick).forEach((r, i) =>
    r.forEach((c, j) => gameFrame[i + state.x][j + state.y] =
      updatePosition(gameFrame[i + state.x][j + state.y], c)));

  document.body.innerHTML = `score: ${state.score} <br/>`;
  validGame(gameFrame).forEach(r => {
    const rowContainer = document.createElement('div');
    r.forEach(c => rowContainer.appendChild(createElem(c)));
    document.body.appendChild(rowContainer);
  });
}

export const renderGameOver = () => document.body.innerHTML += '<br/>GAME OVER!';
```

#### interfaces.ts

```js
export interface State {
  game: number[][];
  x: number;
  y: number;
  score: number;
}

export interface Key {
  code: string;
}
```

#### constants.ts

```js
export const gameSize = 10;
```

### Operators Used

- [combineLatest](../operators/combination/combinelatest.md)
- [finalize](../operators/utility/finalize.md)
- [fromEvent](../operators/creation/fromevent.md)
- [interval](../operators/creation/interval.md)
- [map](../operators/transformation/map.md)
- [of](../operators/creation/of.md)
- [pluck](../operators/transformation/pluck.md)
- [scan](../operators/transformation/scan.md)
- [startWith](../operators/combination/startwith.md)
- [takeWhile](../operators/filtering/takewhile.md)
- [tap](../operators/utility/do.md)
