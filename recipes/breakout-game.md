# Breakout Game

_By [adamlubek](https://github.com/adamlubek)_

This recipe demonstrates an RxJS implementation of Breakout game.

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX "Ultimate RxJS")](https://ultimatecourses.com/courses/rxjs?ref=4)

### Example Code

( [StackBlitz](https://stackblitz.com/edit/rxjs-breakout?file=index.ts) )

![Breakout Game](https://drive.google.com/uc?export=view&id=1unsdGI5UBZu9ECjFtA4t_hLl4l7CRBSE)

#### index.ts

```js
// RxJS v6+
import { fromEvent, of, interval, combineLatest, generate, noop } from 'rxjs';
import { map, mergeMap, pluck, startWith, scan, toArray, takeWhile, tap } from 'rxjs/operators';
import { gameSize } from './constants';
import { Player, Ball, GameObject } from './interfaces';
import { render } from './html-renderer';

const createGameObject = (x, y) => ({ x, y });

const player$ = combineLatest(
  of({ ...createGameObject(gameSize - 2, (gameSize / 2) - 1), score: 0, lives: 3 }),
  fromEvent(document, 'keyup').pipe(startWith({ code: '' }), pluck('code'))
).pipe(
  map(([player, key]) => (
    key === 'ArrowLeft'
      ? player.y -= 1
      : key === 'ArrowRight'
        ? player.y += 1
        : noop
    , player)
  )
)

const ball$ = combineLatest(
  of({ ...createGameObject(gameSize / 2, (gameSize - 3)), dirX: 1, dirY: 1 }),
  interval(150)
).pipe(
  map(([ball, _]: [Ball, number]) => (
    ball.dirX *= ball.x > 0 ? 1 : -1,
    ball.dirY *= (ball.y > 0 && ball.y < gameSize - 1) ? 1 : -1,
    ball.x += 1 * ball.dirX,
    ball.y -= 1 * ball.dirY,
    ball)
  )
)

const bricks$ = generate(1, x => x < 8, x => x + 1)
  .pipe(
    mergeMap(r => generate(r % 2 === 0 ? 1 : 0, x => x < gameSize, x => x + 2)
      .pipe(map(c => createGameObject(r, c)))
    ),
    toArray()
  )

const processGameCollisions = (_, [player, ball, bricks]: [Player, Ball, GameObject[]])
  : [Player, Ball, GameObject[]] => (
    (collidingBrickIndex => collidingBrickIndex > -1
      ? (bricks.splice(collidingBrickIndex, 1), ball.dirX *= -1, player.score++)
      : noop
    )(bricks.findIndex(e => e.x === ball.x && e.y === ball.y)),
    ball.dirX *= player.x === ball.x && player.y === ball.y ? -1 : 1,
    ball.x > player.x ? (player.lives-- , ball.x = (gameSize / 2) - 3) : noop,
    [player, ball, bricks]
  )

combineLatest(player$, ball$, bricks$)
  .pipe(
    scan<[Player, Ball, GameObject[]], [Player, Ball, GameObject[]]>(processGameCollisions),
    tap(render),
    takeWhile(([player]: [Player, Ball, GameObject[]]) => player.lives > 0)
  ).subscribe()
```

#### interfaces.ts

```js
export interface GameObject {
  x: number;
  y: number;
}
export interface Player extends GameObject {
  score: number;
  lives: number;
}
export interface Ball extends GameObject {
  dirX: number;
  dirY: number;
}
```

#### constants.ts

```js
export const gameSize = 20;
```

#### html-renderer.ts

```js
import { gameSize } from './constants';
import { Player, Ball, GameObject } from './interfaces';

const empty = 0;
const plyer = 1;
const bll = 2;
const brick = 3;

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
      : col === plyer
      ? 'cornflowerblue'
      : col === bll
      ? 'gray'
      : 'silver';
  elem.style['border-radius'] = col === bll ? '100%' : '0%';
  return elem;
};

export const render = ([player, ball, bricks]: [
  Player,
  Ball,
  GameObject[]
]) => {
  const game = Array(gameSize)
    .fill(0)
    .map(e => Array(gameSize).fill(0));
  game[player.x][player.y] = plyer;
  game[ball.x][ball.y] = bll;
  bricks.forEach(b => (game[b.x][b.y] = brick));

  document.body.innerHTML = `Score: ${player.score} Lives: ${player.lives} <br/>`;
  game.forEach(r => {
    const rowContainer = document.createElement('div');
    r.forEach(c => rowContainer.appendChild(createElem(c)));
    document.body.appendChild(rowContainer);
  });
};
```

### Operators Used

- [combineLatest](../operators/combination/combinelatest.md)
- [fromEvent](../operators/creation/fromevent.md)
- [generate](../operators/creation/generate.md)
- [interval](../operators/creation/interval.md)
- [mergeMap](../operators/transformation/mergemap.md)
- [of](../operators/creation/of.md)
- [pluck](../operators/transformation/pluck.md)
- [scan](../operators/transformation/scan.md)
- [startWith](../operators/combination/startwith.md)
- [takeWhile](../operators/filtering/takewhile.md)
- [tap](../operators/utility/do.md)
- [toArray](../operators/transformation/toarray.md)
