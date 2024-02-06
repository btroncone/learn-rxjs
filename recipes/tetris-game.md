# Tetris Game

_By [adamlubek](https://github.com/adamlubek)_

This recipe demonstrates RxJS implementation of Tetris game.

[![Ultimate RxJS](https://ultimatecourses.com/static/banners/banner-rxjs.svg 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Example Code

( [StackBlitz](https://stackblitz.com/edit/rxjs-tetris?file=index.ts) )

![Tetris Game](https://drive.google.com/uc?export=view&id=1BjyB43WSHEU9rDbNN6uFeoYxIoEzJTZp)

#### index.ts

```js
// RxJS v6+
import { fromEvent, of, interval, combineLatest } from 'rxjs';
import {
  finalize,
  map,
  pluck,
  scan,
  startWith,
  takeWhile,
  tap
} from 'rxjs/operators';
import { score, randomBrick, clearGame, initialState } from './game';
import { render, renderGameOver } from './html-renderer';
import { handleKeyPress, resetKey } from './keyboard';
import { collide } from './collision';
import { rotate } from './rotation';
import { BRICK } from './constants';
import { State, Brick, Key } from './interfaces';

const player$ = combineLatest(
  of(randomBrick()),
  of({ code: '' }),
  fromEvent(document, 'keyup').pipe(
    startWith({ code: undefined }),
    pluck('code')
  )
).pipe(
  map(
    ([brick, key, keyCode]: [Brick, Key, string]) => (
      (key.code = keyCode), [brick, key]
    )
  )
);

const state$ = interval(1000).pipe(
  scan < number,
  State > ((state, _) => (state.x++, state), initialState)
);

const game$ = combineLatest(state$, player$).pipe(
  scan < [State, [Brick, Key]],
  [State, [Brick, Key]] >
    (([state, [brick, key]]) => (
      (state = handleKeyPress(state, brick, key)),
      (([newState, rotatedBrick]: [State, Brick]) => (
        (state = newState), (brick = rotatedBrick)
      ))(rotate(state, brick, key)),
      (([newState, collidedBrick]: [State, Brick]) => (
        (state = newState), (brick = collidedBrick)
      ))(collide(state, brick)),
      (state = score(state)),
      resetKey(key),
      [state, [brick, key]]
    )),
  tap(([state, [brick, key]]) => render(state, brick)),
  takeWhile(([state, [brick, key]]) => !state.game[1].some(c => c === BRICK)),
  finalize(renderGameOver)
);

game$.subscribe();
```

#### game.ts

```js
import { GAME_SIZE, EMPTY, BRICK } from './constants';
import { State } from './interfaces';

const bricks = [
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0]
  ],
  [
    [0, 1, 1],
    [0, 1, 0],
    [0, 1, 0]
  ],
  [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0]
  ],
  [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 0]
  ]
];

export const clearGame = () =>
  Array(GAME_SIZE)
    .fill(EMPTY)
    .map(e => Array(GAME_SIZE).fill(EMPTY));
export const updatePosition = (position: number, column: number) =>
  position === 0 ? column : position;
export const validGame = (game: number[][]) =>
  game.map(r => r.filter((_, i) => i < GAME_SIZE));
export const validBrick = (brick: number[][]) =>
  brick.filter(e => e.some(b => b === BRICK));
export const randomBrick = () =>
  bricks[Math.floor(Math.random() * bricks.length)];

export const score = (state: State): State =>
  (scoreIndex =>
    scoreIndex > -1
      ? ((state.score += 1),
        state.game.splice(scoreIndex, 1),
        (state.game = [Array(GAME_SIZE).fill(EMPTY), ...state.game]),
        state)
      : state)(state.game.findIndex(e => e.every(e => e === BRICK)));

export const initialState = {
  game: clearGame(),
  x: 0,
  y: 0,
  score: 0
};
```

#### collision.ts

```js
import { GAME_SIZE, BRICK, EMPTY } from './constants';
import { validBrick, validGame, updatePosition, randomBrick } from './game';
import { State, Brick } from './interfaces';

const isGoingToLevelWithExistingBricks = (
  state: State,
  brick: Brick
): boolean => {
  const gameHeight = state.game.findIndex(r => r.some(c => c === BRICK));
  const brickBottomX = state.x + brick.length - 1;
  return gameHeight > -1 && brickBottomX + 1 > gameHeight;
};

const areAnyBricksColliding = (state: State, brick: Brick): boolean =>
  validBrick(brick).some((r, i) =>
    r.some((c, j) =>
      c === EMPTY
        ? false
        : ((x, y) => state.game[x][y] === c)(i + state.x, j + state.y)
    )
  );

const collideBrick = (
  state: State,
  brick: Brick,
  isGoingToCollide: boolean
): State => {
  const xOffset = isGoingToCollide ? 1 : 0;
  validBrick(brick).forEach((r, i) => {
    r.forEach(
      (c, j) =>
        (state.game[i + state.x - xOffset][j + state.y] = updatePosition(
          state.game[i + state.x - xOffset][j + state.y],
          c
        ))
    );
  });
  state.game = validGame(state.game);
  state.x = 0;
  state.y = GAME_SIZE / 2 - 1;
  return state;
};

export const collide = (state: State, brick: Brick): [State, Brick] => {
  const isGoingToCollide =
    isGoingToLevelWithExistingBricks(state, brick) &&
    areAnyBricksColliding(state, brick);

  const isOnBottom = state.x + validBrick(brick).length > GAME_SIZE - 1;

  if (isGoingToCollide || isOnBottom) {
    state = collideBrick(state, brick, isGoingToCollide);
    brick = randomBrick();
  }

  return [state, brick];
};
```

#### rotation.ts

```js
import { GAME_SIZE, BRICK_SIZE, EMPTY } from './constants';
import { State, Brick, Key } from './interfaces';

const rightOffsetAfterRotation = (
  state: State,
  brick: Brick,
  rotatedBrick: Brick
) =>
  state.y + rotatedBrick.length === GAME_SIZE + 1 &&
  brick.every(e => e[2] === EMPTY)
    ? 1
    : 0;

const leftOffsetAfterRotation = (game: State) => (game.y < 0 ? 1 : 0);
const emptyBrick = (): Brick =>
  Array(BRICK_SIZE)
    .fill(EMPTY)
    .map(e => Array(BRICK_SIZE).fill(EMPTY));

const rotateBrick = (
  state: State,
  brick: Brick,
  rotatedBrick: Brick
): [State, Brick] => (
  brick.forEach((r, i) =>
    r.forEach((c, j) => (rotatedBrick[j][brick[0].length - 1 - i] = c))
  ),
  (state.y -= rightOffsetAfterRotation(state, brick, rotatedBrick)),
  (state.y += leftOffsetAfterRotation(state)),
  [state, rotatedBrick]
);

export const rotate = (state: State, brick: Brick, key: Key): [State, Brick] =>
  key.code === 'ArrowUp'
    ? rotateBrick(state, brick, emptyBrick())
    : [state, brick];
```

#### keyboard.ts

```js
import { GAME_SIZE } from './constants';
import { State, Brick, Key } from './interfaces';

const xOffset = (brick: Brick, columnIndex: number) =>
  brick.every(e => e[columnIndex] === 0) ? 1 : 0;

export const handleKeyPress = (state: State, brick: Brick, key: Key): State => (
  (state.x += key.code === 'ArrowDown' ? 1 : 0),
  (state.y +=
    key.code === 'ArrowLeft' && state.y > 0 - xOffset(brick, 0)
      ? -1
      : key.code === 'ArrowRight' && state.y < GAME_SIZE - 3 + xOffset(brick, 2)
      ? 1
      : 0),
  state
);

export const resetKey = key => (key.code = undefined);
```

#### html-renderer.ts

```js
import { BRICK } from './constants';
import { State, Brick } from './interfaces';
import { updatePosition, validGame, validBrick, clearGame } from './game';

const createElem = (column: number): HTMLElement =>
  (elem => (
    (elem.style.display = 'inline-block'),
    (elem.style.marginLeft = '3px'),
    (elem.style.height = '6px'),
    (elem.style.width = '6px'),
    (elem.style['background-color'] = column === BRICK ? 'green' : 'aliceblue'),
    elem
  ))(document.createElement('div'));

export const render = (state: State, brick: Brick): void => {
  const gameFrame = clearGame();

  state.game.forEach((r, i) => r.forEach((c, j) => (gameFrame[i][j] = c)));
  validBrick(brick).forEach((r, i) =>
    r.forEach(
      (c, j) =>
        (gameFrame[i + state.x][j + state.y] = updatePosition(
          gameFrame[i + state.x][j + state.y],
          c
        ))
    )
  );

  document.body.innerHTML = `score: ${state.score} <br/>`;
  validGame(gameFrame).forEach(r => {
    const rowContainer = document.createElement('div');
    r.forEach(c => rowContainer.appendChild(createElem(c)));
    document.body.appendChild(rowContainer);
  });
};

export const renderGameOver = () =>
  (document.body.innerHTML += '<br/>GAME OVER!');
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

export type Brick = number[][];
```

#### constants.ts

```js
export const GAME_SIZE = 10;
export const BRICK_SIZE = 3;
export const EMPTY = 0;
export const BRICK = 1;
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
