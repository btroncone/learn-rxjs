# Dinosaur Game (Chrome's offline game)

_By [adamlubek](https://github.com/adamlubek)_

This recipe demonstrates simplified clone of Chrome's (offline mode) Dinosaur Game implemented in RxJS.

[![Ultimate RxJS](https://ultimatecourses.com/static/banners/banner-rxjs.svg 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Example Code

( [StackBlitz](https://stackblitz.com/edit/rxjs-chrome-dinosaur-game?file=index.ts)
)

#### index.ts

```ts
import {
  rx,
  map,
  interval,
  scan,
  fromEvent,
  startWith,
  combineLatestWith,
  merge,
  takeWhile,
} from 'rxjs';
import { GameState } from './interfaces';
import { Game } from './game';
import { Painter } from './painter';

const keyDowns$ = rx(
  fromEvent<KeyboardEvent>(document, 'keydown'),
  map((e: KeyboardEvent) => e.key)
);

const keyUps$ = rx(
  fromEvent<KeyboardEvent>(document, 'keyup'),
  map((e: KeyboardEvent) => e.type)
);

const keys$ = rx(merge(keyDowns$, keyUps$), startWith(''));

const stateUpdater$ = scan(
  (
    gameState: GameState,
    [gameLoopIteration, keyboardKey]: [number, string]
  ) => (
    gameState.updateGame(gameLoopIteration, keyboardKey),
    Painter.Paint(gameState),
    gameState
  ),
  new Game()
);
const gameLoop$ = interval(60);

rx(
  gameLoop$,
  combineLatestWith(keys$),
  stateUpdater$,
  takeWhile((gameState: GameState) => gameState.lives > 0)
).subscribe();

```
#### game.ts

```js
import { GameState, Obstacle } from './interfaces';

export class Game implements GameState {
  lives = 3;
  height = 0;
  score = 0;
  private jumping = false;
  private falling = false;
  obstacles = new Array<Obstacle>();

  updateGame = (gameLoopIteration: number, keyboardKey: string) => {
    this.handleJumping(keyboardKey);
    this.addObstacle(gameLoopIteration);
    this.updateObstacles();
    this.collide();
  };

  private setJumpingAndFallingWhen = (
    condition: boolean,
    jumping: boolean,
    falling: boolean
  ) => (condition ? ((this.jumping = jumping), (this.falling = falling)) : {});

  private handleJumping = (key: string) => (
    this.setJumpingAndFallingWhen(
      key === 'ArrowUp' && !this.jumping && !this.falling,
      true,
      false
    ),
    this.falling ? (this.height -= 1) : {},
    this.setJumpingAndFallingWhen(this.height > 5, false, true),
    this.jumping ? (this.height += 1) : {},
    this.setJumpingAndFallingWhen(this.height <= 0, false, false)
  );

  private getRandomInt = (): number => Math.floor(Math.random() * 50);

  private addObstacle = (gameLoopIteration: number) => {
    this.obstacles.length < 2 && (gameLoopIteration & this.getRandomInt()) === 0
      ? this.obstacles.push({ x: 20 })
      : {};
  };

  private obstaclesPresent = () => this.obstacles.length > 0;

  private updateObstacles = () => (
    this.obstacles.forEach((e: Obstacle) => (e.x -= 1)),
    this.obstaclesPresent() && this.obstacles[0].x < 0
      ? (this.obstacles.shift(), (this.score += 1))
      : {}
  );

  private collide = () =>
    this.obstaclesPresent() && this.obstacles[0].x === 0 && this.height === 0
      ? (this.lives -= 1)
      : {};
}
```

#### painter.ts

```js
import { GameState } from './interfaces';

export class Painter {
  private static PAINTING_ADJUSTMENT = 10;

  static Paint(gameState: GameState) {
    this.html().innerHTML = '';
    this.paintInfo(gameState.lives, gameState.score);
    gameState.obstacles.forEach((e) => this.paintObstacle(e.x));
    this.paintPlayer(gameState.height * this.PAINTING_ADJUSTMENT);
  }

  private static html = () => document.getElementsByTagName('body')[0];

  private static paintInfo = (lives: number, score: number) =>
    (this.html().innerHTML += `<h3>LIVES: ${lives} , SCORE: ${score}</h3>`);

  private static paintObstacle = (x: number) =>
    (this.html().innerHTML += `<p style='top: 100px;left: ${
      15 + x * this.PAINTING_ADJUSTMENT
    }px'>x</p>`);

  private static paintPlayer = (y: number) =>
    (this.html().innerHTML += `<p style='top: ${100 - y}px;left: 10px'>Y</p>`);
}

```

#### interfaces.ts

```js
export interface Obstacle {
  x: number;
}

export interface GameState {
  lives: number;
  height: number;
  score: number;
  obstacles: Array<Obstacle>;

  updateGame: (gameLoopIteration: number, keyboardKey: string) => void;
}
```

### Operators Used

- [fromEvent](../operators/creation/fromevent.md)
- [interval](../operators/creation/interval.md)
- [map](../operators/transformation/map.md)
- [merge](../operators/combination/merge.md)
- [scan](../operators/transformation/scan.md)
- [startWith](../operators/combination/startwith.md)
- [takeWhile](../operators/filtering/takewhile.md)
