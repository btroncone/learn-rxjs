# Flappy Bird Game

_By [adamlubek](https://github.com/adamlubek)_

This recipe demonstrates RxJs implementation of Flappy Bird like game.

[![Ultimate RxJS](https://ultimatecourses.com/static/banners/banner-rxjs.svg 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Example Code

( [StackBlitz](https://stackblitz.com/edit/rxjs-flappy-bird?file=index.ts) )

![Flappy Bird](https://drive.google.com/uc?export=view&id=1NcV8nce0NfvqghyBr0gxLoPm_Y4zjzXI)

#### index.ts

```js
// RxJS v6+
import { interval, merge, combineLatest, fromEvent } from 'rxjs';
import { tap, scan, takeWhile } from 'rxjs/operators';
import { paint } from './html-renderer';

const gamePipe = (x, y) => ({ x, y, checked: false });
const gameSize = 10;
const createPipes = y =>
  (random =>
    Array.from(Array(gameSize).keys())
      .map(e => gamePipe(e, y))
      .filter(e => e.x < random || e.x > random + 2))(
    Math.floor(Math.random() * Math.floor(gameSize))
  );

const gamePipes$ = interval(500).pipe(
  scan < any,
  any >
    (acc =>
      (acc.length < 2 ? [...acc, createPipes(gameSize)] : acc)
        .filter(c => c.some(e => e.y > 0))
        .map(cols => cols.map(e => gamePipe(e.x, e.y - 1))),
    [createPipes(gameSize / 2), createPipes(gameSize)])
);

const fly = xPos => (xPos > 0 ? (xPos -= 1) : xPos);
const fall = xPos => (xPos < gameSize - 1 ? (xPos += 1) : gameSize - 1);
const bird$ = merge(interval(300), fromEvent(document, 'keydown')).pipe(
  scan < any,
  any >
    ((xPos, curr) => (curr instanceof KeyboardEvent ? fly(xPos) : fall(xPos)),
    gameSize - 1)
);

const updateGame = (bird, pipes) =>
  (game => (
    pipes.forEach(col => col.forEach(v => (game[v.x][v.y] = 2))),
    (game[bird][0] = 1),
    game
  ))(
    Array(gameSize)
      .fill(0)
      .map(e => Array(gameSize).fill(0))
  );

const valueOnCollisionFor = pipes => ({
  when: predicate =>
    !pipes[0][0].checked && predicate ? ((pipes[0][0].checked = true), 1) : 0
});

combineLatest(bird$, gamePipes$)
  .pipe(
    scan < any,
    any >
      ((state, [bird, pipes]) => ({
        bird: bird,
        pipes: pipes,
        lives:
          state.lives -
          valueOnCollisionFor(pipes).when(
            pipes.some(c => c.some(c => c.y === 0 && c.x === bird))
          ),
        score:
          state.score + valueOnCollisionFor(pipes).when(pipes[0][0].y === 0)
      }),
      { lives: 3, score: 0, bird: 0, pipes: [] }),
    tap(state =>
      paint(updateGame(state.bird, state.pipes), state.lives, state.score)
    ),
    takeWhile(state => state.lives > 0)
  )
  .subscribe();
```

#### html-renderer.ts

```js
const createElem = col => {
  const elem = document.createElement('div');
  elem.classList.add('board');
  elem.style.display = 'inline-block';
  elem.style.marginLeft = '10px';
  elem.style.height = '6px';
  elem.style.width = '6px';
  elem.style['background-color'] =
    col === 0
      ? 'white'
      : col === 1
      ? 'cornflowerblue'
      : col === 2
      ? 'gray'
      : 'silver';
  elem.style['border-radius'] = '90%';
  return elem;
};

export const paint = (game: number[][], lives, score) => {
  document.body.innerHTML = `Lives: ${lives}, Score: ${score}`;

  game.forEach(row => {
    const rowContainer = document.createElement('div');
    row.forEach(col => rowContainer.appendChild(createElem(col)));
    document.body.appendChild(rowContainer);
  });
};
```

### Operators Used

- [combineLatest](../operators/combination/combinelatest.md)
- [fromEvent](../operators/creation/fromevent.md)
- [interval](../operators/creation/interval.md)
- [merge](../operators/combination/merge.md)
- [scan](../operators/transformation/scan.md)
- [takeWhile](../operators/filtering/takewhile.md)
- [tap](../operators/utility/do.md)
