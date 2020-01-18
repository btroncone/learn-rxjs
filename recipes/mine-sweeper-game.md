# Mine Sweeper Game

_By [adamlubek](https://github.com/adamlubek)_

This recipe demonstrates RxJS implementation of Mine Sweeper Game.

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX "Ultimate RxJS")](https://ultimatecourses.com/courses/rxjs?ref=4)

### Example Code

( [StackBlitz](https://stackblitz.com/edit/rxjs-minesweeper?file=index.ts) )

![Mine Sweeper](https://drive.google.com/uc?export=view&id=18_2_QWnk5ImRT_dGaglKMvtWKa4xwC6B)

#### index.ts

```js
// RxJS v6+
import { fromEvent, of } from 'rxjs';
import {
  map,
  tap,
  filter,
  pluck,
  switchMap,
  takeWhile,
  finalize
} from 'rxjs/operators';
import { renderMinefield, renderScore, renderGameOver } from './html-renderer';
import { size, mine } from './constants';
import { addMines, addMarks } from './mines';

const mines$ = of(
  Array(size)
    .fill(0)
    .map(e => Array(size).fill(0))
).pipe(
  map(addMines),
  map(addMarks),
  tap(renderMinefield)
);

const click$ = mines =>
  fromEvent(document, 'click').pipe(
    map(({ clientX, clientY }: MouseEvent) =>
      document.elementFromPoint(clientX, clientY)
    ),
    filter(elem => elem.id !== ''),
    tap(elem =>
      (val => (
        renderScore(val === mine || elem.innerHTML !== '_' ? 0 : val),
        (elem.innerHTML = val)
      ))(mines[elem.id[0]][elem.id[1]])
    ),
    pluck('id'),
    takeWhile(([x, y]) => mines[x][y] !== mine),
    finalize(renderGameOver)
  );

mines$.pipe(switchMap(click$)).subscribe();
```

#### mines.ts

```js
import { size, mine } from './constants';

const randomNumber = () => Math.floor(Math.random() * Math.floor(size));

export const addMines = arr => {
  for (let i = 0; i < size / 2; i++) {
    arr[randomNumber()][randomNumber()] = mine;
  }

  return arr;
};

const mark = (arr, x, y) =>
  arr[x] !== undefined && arr[x][y] !== undefined
    ? (arr[x][y] += arr[x][y] === mine ? 0 : 1)
    : () => {};

export const addMarks = arr => {
  for (let ri = 0; ri < size; ri++) {
    for (let ci = 0; ci < size; ci++) {
      if (arr[ri][ci] === mine) {
        mark(arr, ri - 1, ci + 1);
        mark(arr, ri - 1, ci);
        mark(arr, ri - 1, ci - 1);
        mark(arr, ri, ci + 1);
        mark(arr, ri, ci - 1);
        mark(arr, ri + 1, ci + 1);
        mark(arr, ri + 1, ci);
        mark(arr, ri + 1, ci - 1);
      }
    }
  }
  return arr;
};
```

#### constants.ts

```js
export const mine = 9;
export const size = 10;
```

#### html-renderer.ts

```js
export const renderMinefield = arr =>
  arr.forEach((r, ri) =>
    (elem =>
      r.forEach(
        (c, ci) =>
          (col => (
            (col.innerText = '_'),
            (col.id = `${ri}${ci}`),
            elem.appendChild(document.createTextNode('\u00A0\u00A0')),
            elem.appendChild(col)
          ))(document.createElement('span')),
        document.body.appendChild(elem)
      ))(document.createElement('div'))
  );

export const renderScore = val =>
  (scoreElem => (scoreElem.innerText = parseInt(scoreElem.innerText) + val))(
    document.getElementById('score')
  );

export const renderGameOver = () =>
  (document.body.innerHTML += '<br/>GAME OVER');

const addElem = decorator =>
  (elem => (decorator(elem), document.body.appendChild(elem)))(
    document.createElement('span')
  );

addElem(elem => (elem.innerText = 'Score: '));
addElem(elem => ((elem.id = 'score'), (elem.innerText = '0')));
```

### Operators Used

- [filter](../operators/filtering/filter.md)
- [finalize](../operators/utility/finalize.md)
- [fromEvent](../operators/creation/fromevent.md)
- [map](../operators/transformation/map.md)
- [of](../operators/creation/of.md)
- [pluck](../operators/transformation/pluck.md)
- [switchMap](../operators/transformation/switchmap.md)
- [takeWhile](../operators/filtering/takewhile.md)
- [tap](../operators/utility/do.md)
