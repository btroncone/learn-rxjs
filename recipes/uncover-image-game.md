# Uncover Image Game

_By [adamlubek](https://github.com/adamlubek)_

This recipe demonstrates RxJS implementation of Uncover Image Game.



### Example Code

( [StackBlitz](https://stackblitz.com/edit/rxjs-uncover-image?file=index.ts) )

#### index.ts

```js
// RxJS v6+
import { interval } from 'rxjs';
import { finalize, scan, takeWhile, tap, withLatestFrom } from 'rxjs/operators';
import { keyboardEvents$ } from './keyboard';
import { initialGame, updateGame, isGameOn } from './game';
import { paintGame, paintGameOver } from './html-renderer';

interval(15)
  .pipe(
    withLatestFrom(keyboardEvents$),
    scan(updateGame, initialGame),
    tap(paintGame),
    takeWhile(isGameOn),
    finalize(paintGameOver)
  )
  .subscribe();
```

#### game.ts

```js
import { noop } from 'rxjs';
import { Enemy, State, Move } from './interfaces';
import { size } from './constants';
import { newPlayerFrom, movePlayer } from './player';
import { newEnemiesFrom } from './enemy';

const intersect = (state: State): State => (
  state.moves.some((m: Move) =>
    state.enemies.some(e => m.x === e.x && m.y === e.y)
  )
    ? ((state.player.lives -= 1),
      (state.player.x = 0),
      (state.player.y = 0),
      (state.moves = []))
    : noop,
  state
);

const initialGame: State = {
  player: { x: 0, y: 0, lives: 3 },
  enemies: [
    { x: 10, y: 10, moveDuration: 0, dirX: 1, dirY: 1 },
    { x: 50, y: 50, moveDuration: 0, dirX: -1, dirY: 1 }
  ],
  key: '',
  moves: [],
  corners: []
};

const updateGame = (state: State, [_, key]: [number, string]): State => (
  (state.enemies = newEnemiesFrom(state)),
  (state.player = newPlayerFrom(state, key)),
  (state = intersect(state)),
  (state = movePlayer(state, key)),
  (state.key = key),
  state
);

const isGameOn = (state: State): boolean => state.player.lives > 0;

export { initialGame, updateGame, isGameOn };
```

#### player.ts

```js
import { noop } from 'rxjs';
import { Player, State, Move } from './interfaces';
import { size } from './constants';
import { keyToDirection } from './keyboard';

const up = 'ArrowUp';
const down = 'ArrowDown';
const left = 'ArrowLeft';
const right = 'ArrowRight';

const newPlayerFrom = (state: State, key: string): Player => (
  (state.player.x += keyToDirection(key, down, up)),
  (state.player.y += keyToDirection(key, right, left)),
  state.player.x < 0 ? (state.player.x = 0) : noop,
  state.player.x > size ? (state.player.x = size) : noop,
  state.player.y < 0 ? (state.player.y = 0) : noop,
  state.player.y > size ? (state.player.y = size) : noop,
  state.player
);

const getEnclosedArea = (state: State): Move[] =>
  state.moves.length <= 1
    ? []
    : [
        ...state.moves
          .slice(
            state.moves.findIndex(
              e => e.x === state.player.x && e.y === state.player.y
            )
          )
          .filter(e => e.dirChange),
        state.moves.pop()
      ];

const movePlayer = (state: State, key: string): State => (
  state.moves.some(e => e.x === state.player.x && e.y === state.player.y)
    ? ((state.corners = getEnclosedArea(state)), (state.moves = []))
    : state.moves.push({
        x: state.player.x,
        y: state.player.y,
        dirChange: state.key !== key
      }),
  state
);

export { newPlayerFrom, movePlayer };
```

#### enemy.ts

```js
import { noop } from 'rxjs';
import { Enemy, State } from './interfaces';
import { size } from './constants';

const newEnemiesFrom = (state: State): Enemy[] => (
  state.enemies.forEach(
    e => (
      e.x <= 0 || e.x > size ? (e.dirX *= -1) : noop,
      e.y <= 0 || e.y > size ? (e.dirY *= -1) : noop,
      (e.x += e.dirX),
      (e.y += e.dirY),
      (e.moveDuration += 1),
      e.moveDuration > 100
        ? ((e.dirX = Math.random() > 0.5 ? 1 : -1),
          (e.dirY = Math.random() > 0.5 ? 1 : -1),
          (e.moveDuration = 0))
        : noop
    )
  ),
  state.enemies
);

export { newEnemiesFrom };
```

#### keyboard.ts

```js
import { fromEvent } from 'rxjs';
import { pluck, startWith } from 'rxjs/operators';

const positionChangeUnit = 2;

export const keyboardEvents$ = fromEvent(document, 'keydown').pipe(
  pluck < KeyboardEvent,
  string > 'code',
  startWith('')
);

export const keyToDirection = (
  key: string,
  key1: string,
  key2: string
): number =>
  key === key1 ? positionChangeUnit : key === key2 ? -positionChangeUnit : 0;
```

#### interfaces.ts

```js
interface GameObject {
  x: number;
  y: number;
}

interface Player extends GameObject {
  lives: number;
}

interface Enemy extends GameObject {
  moveDuration: number;
  dirX: number;
  dirY: number;
}

interface Move extends GameObject {
  dirChange: boolean;
}

interface State {
  player: Player;
  enemies: Enemy[];
  key: string;
  moves: Move[];
  corners: Move[];
}

export { GameObject, Player, Enemy, State };
```

#### constants.ts

```js
const size = 200;

export { size };
```

#### html-renderer.ts

```js
import { State, GameObject } from './interfaces';

const clearPlayerPath = _ =>
  document
    .querySelectorAll('circle')
    .forEach(e => document.querySelector('#svg_container').removeChild(e));

const addCircleColored = (color: string) => (e: GameObject) => {
  const circle = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  );
  circle.setAttribute('cx', e.y);
  circle.setAttribute('cy', e.x);
  circle.setAttribute('r', '2');
  circle.setAttribute('stroke', color);
  circle.setAttribute('strokeWidth', '1');
  document.querySelector('#svg_container').appendChild(circle);
};

const addPlayerPath = (state: State) =>
  state.moves.forEach(addCircleColored('gray'));
const addEnemy = (state: State) =>
  state.enemies.forEach(addCircleColored('red'));

const addHoles = (state: State) => {
  if (!state.corners.length) {
    return;
  }

  const createPathFromCorners = (a, c) =>
    (a += `${a.endsWith('Z') ? 'M' : 'L'} ${c.y} ${c.x} ${
      c.dirChange ? '' : 'Z'
    }`);
  const newPath =
    `M${state.corners[0].y} ${state.corners[0].x}` +
    state.corners.reduce(createPathFromCorners, '');
  const maskPath = document.querySelector('#mask_path');

  const currentPath = maskPath.getAttribute('d');
  const path = newPath + ' ' + currentPath;

  maskPath.setAttribute('d', path);
};

const paintInfo = (text: string) =>
  (document.querySelector('#info').innerHTML = text);
const paintLives = (state: State) => paintInfo(`lives: ${state.player.lives}`);

const updateSvgPath = (state: State) =>
  [clearPlayerPath, addPlayerPath, addEnemy, addHoles, paintLives].forEach(fn =>
    fn(state)
  );

const paintGame = updateSvgPath;
const paintGameOver = () => paintInfo('Game Over !!!');

export { paintGame, paintGameOver };
```

#### index.html

```html
<div id="info"></div>
<svg width="200" height="200" id="svg_container">
  <style>
    .rxjs {
      font: 95px serif;
      fill: purple;
    }
  </style>
  <defs>
    <mask id="Mask" maskContentUnits="">
      <rect width="200" height="200" fill="white" opacity="1" />
      <path id="mask_path" />
    </mask>
  </defs>
  <text x="10" y="120" class="rxjs">RxJs</text>
  <rect width="200" height="200" mask="url(#Mask)" />
</svg>
<div>Use arrows to uncover image!!!</div>
```

### Operators Used

- [finalize](../operators/utility/finalize.md)
- [fromEvent](../operators/creation/fromevent.md)
- [interval](../operators/creation/interval.md)
- [pluck](../operators/transformation/pluck.md)
- [scan](../operators/transformation/scan.md)
- [startWith](../operators/combination/startwith.md)
- [takeWhile](../operators/filtering/takewhile.md)
- [tap](../operators/utility/do.md)
- [withLatestFrom](../operators/combination/withlatestfrom.md)
