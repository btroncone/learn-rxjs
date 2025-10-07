# Battleship Game

_By [adamlubek](https://github.com/adamlubek)_

This recipe demonstrates an RxJS implementation of Battleship Game where you
play against the computer.



### Example Code

( [StackBlitz](https://stackblitz.com/edit/rxjs-battleships?file=index.ts) )

![Battleship Game](https://drive.google.com/uc?export=view&id=1WawRG9DbBILOgmuHTulFXsWbxwC8lrX4)

#### index.ts

```js
// RxJS v6+
import { concat, merge } from 'rxjs';
import { switchMap, takeWhile, finalize } from 'rxjs/operators';
import { NUMBER_OF_SHIP_PARTS } from './constants';
import { displayGameOver, paintBoards$ } from './html-renderer';
import { shots$, computerScore$, playerScore$, isNotGameOver } from './game';
import { setup$, emptyBoards$ } from './setup';
import { Boards } from './interfaces';

const game$ = emptyBoards$.pipe(
  paintBoards$,
  switchMap((boards: Boards) =>
    concat(setup$(boards), shots$(boards)).pipe(
      takeWhile(isNotGameOver),
      finalize(displayGameOver(computerScore$))
    )
  )
);

merge(game$, computerScore$, playerScore$).subscribe();
```

#### setup.ts

```js
import { concat, interval, of, fromEvent, pipe, noop } from 'rxjs';
import { filter, map, scan, take, tap } from 'rxjs/operators';
import {
  GAME_SIZE,
  NUMBER_OF_SHIP_PARTS,
  EMPTY,
  COMPUTER,
  PLAYER
} from './constants';
import {
  paintBoards$,
  computerScoreContainer,
  playerScoreContainer
} from './html-renderer';
import { random, validClicks$ } from './game';
import { Boards } from './interfaces';

const isThereEnoughSpaceForNextMove = (
  board: number[][],
  ship: number,
  x: number,
  y: number
) => {
  const row = [...board[x]];
  row[y] = ship;
  const col = board.map(r => r.filter((c, j) => j === y)[0]);
  col[x] = ship;

  const shipStartInCol = col.indexOf(ship);
  const shipEndInCol = col.lastIndexOf(ship);
  const shipStartInRow = row.indexOf(ship);
  const shipEndInRow = row.lastIndexOf(ship);

  const checkSpace = (arr, start, end) => {
    const startIndex = arr.lastIndexOf(
      (e, i) => e !== EMPTY && e !== ship && i < start
    );
    const endIndex = arr.findIndex(
      (e, i) => e !== EMPTY && e !== ship && i > end
    );
    const room = arr.slice(startIndex + 1, endIndex);
    return room.length >= ship;
  };

  return shipStartInCol !== shipEndInCol
    ? checkSpace(col, shipStartInCol, shipEndInCol)
    : shipStartInRow !== shipEndInRow
    ? checkSpace(row, shipStartInRow, shipEndInRow)
    : true;
};

const getTwoValidMoves = (row: number[], ship: number): [number, number] => [
  row.indexOf(ship) - 1,
  row.lastIndexOf(ship) + 1
];

const getValidMoves = (
  expectedPlayer: string,
  boards: Boards,
  ship: number,
  [name, x, y]
): any[] => {
  const board = boards[expectedPlayer];
  const rowIndex = board.findIndex(r => r.some(c => c === ship));
  if (!isThereEnoughSpaceForNextMove(board, ship, x, y)) {
    return [];
  }
  if (rowIndex >= 0) {
    const row = board[rowIndex];
    const colIndex = row.findIndex(e => e === ship);

    const isHorizontal =
      row[colIndex - 1] === ship || row[colIndex + 1] === ship;
    if (isHorizontal) {
      const [left, right] = getTwoValidMoves(row, ship);
      return [
        { x: rowIndex, y: left },
        { x: rowIndex, y: right }
      ];
    }

    const isVertical =
      (board[rowIndex - 1] ? board[rowIndex - 1][colIndex] === ship : false) ||
      (board[rowIndex + 1] ? board[rowIndex + 1][colIndex] === ship : false);
    if (isVertical) {
      const [up, down] = getTwoValidMoves(
        board.map(r => r.filter((c, j) => j === colIndex)[0]),
        ship
      );
      return [
        { x: up, y: colIndex },
        { x: down, y: colIndex }
      ];
    }

    return [
      { x: rowIndex, y: colIndex - 1 },
      { x: rowIndex, y: colIndex + 1 },
      { x: rowIndex - 1, y: colIndex },
      { x: rowIndex + 1, y: colIndex }
    ];
  }

  return [{ x: x, y: y }];
};

const isCellEmpty = (boards: Boards, [name, x, y]): boolean =>
  boards[name][x][y] === EMPTY;

const areSpacesAroundCellEmpty = (boards: Boards, [name, x, y]): boolean =>
  (board =>
    (board[x - 1] && board[x - 1][y] === EMPTY) ||
    (board[x + 1] && board[x + 1][y] === EMPTY) ||
    board[x][y - 1] === EMPTY ||
    board[x][y + 1] === EMPTY)(boards[name]);

const canMove = (
  expectedPlayer: string,
  boards: Boards,
  ship: number,
  [name, x, y]
): boolean => {
  if (!isCellEmpty(boards, [name, x, y]) || name !== expectedPlayer) {
    return false;
  }

  const validMoves = getValidMoves(expectedPlayer, boards, ship, [name, x, y]);
  const isValidMove = validMoves.some(e => e.x === x && e.y === y);

  return isValidMove;
};

const addShips$ = (player: string, boards: Boards) =>
  pipe(
    map((e: string) => e.split(',')),
    filter(e => e.length === 3),
    map(e => [e[0], parseInt(e[1]), parseInt(e[2])]),
    scan(
      (a, coords: any) => (
        (a.validMove =
          a.shipPartsLeft > 0
            ? canMove(player, boards, a.ship, coords)
            : isCellEmpty(boards, coords) &&
              (a.ship - 1 === 1 || areSpacesAroundCellEmpty(boards, coords))),
        a.validMove
          ? a.shipPartsLeft > 0
            ? (a.shipPartsLeft -= 1)
            : ((a.ship = a.ship - 1), (a.shipPartsLeft = a.ship - 1))
          : noop,
        (a.coords = coords),
        a
      ),
      { ship: 5, shipPartsLeft: 5, coords: [], validMove: true }
    ),
    filter(({ validMove }) => validMove),
    map(
      ({ ship, coords }) => (
        (boards[player][coords[1]][coords[2]] = ship), boards
      )
    ),
    paintBoards$,
    take(NUMBER_OF_SHIP_PARTS)
  );

const playerSetup$ = (boards: Boards) =>
  fromEvent(document, 'click').pipe(validClicks$, addShips$(PLAYER, boards));

const computerSetup$ = (boards: Boards) =>
  interval().pipe(
    tap(i => (i % 70 === 0 ? (playerScoreContainer.innerHTML += '.') : noop)),
    map(_ => `${COMPUTER}, ${random()}, ${random()}`),
    addShips$(COMPUTER, boards)
  );

const info$ = (container: HTMLElement, text: string) =>
  of({}).pipe(tap(_ => (container.innerHTML = text)));

const createBoard = () =>
  Array(GAME_SIZE)
    .fill(EMPTY)
    .map(_ => Array(GAME_SIZE).fill(EMPTY));

export const emptyBoards$ = of({
  [PLAYER]: createBoard(),
  [COMPUTER]: createBoard()
});

export const setup$ = (boards: Boards) =>
  concat(
    info$(computerScoreContainer, 'Setup your board!!!'),
    playerSetup$(boards),
    info$(playerScoreContainer, 'Computer setting up!!!'),
    computerSetup$(boards)
  );
```

#### game.ts

```js
import { fromEvent, pipe, noop, Subject, BehaviorSubject, merge } from 'rxjs';
import { repeatWhen, delay, filter, map, takeWhile, tap } from 'rxjs/operators';
import {
  GAME_SIZE,
  EMPTY,
  MISS,
  HIT,
  SHORTEST_SHIP,
  LONGEST_SHIP,
  PLAYER,
  COMPUTER,
  NUMBER_OF_SHIP_PARTS
} from './constants';
import { paintBoards, paintScores } from './html-renderer';
import { Boards, ComputerMove } from './interfaces';

export const random = () => Math.floor(Math.random() * Math.floor(GAME_SIZE));

export const validClicks$ = pipe(
  map((e: MouseEvent) => e.target['id']),
  filter(e => e)
);

const playerMove = new Subject();
const computerMove = new BehaviorSubject({ playerBoard: [], hits: {} });

const shot = (
  boards: Boards,
  player: string,
  x: number,
  y: number
): [number, number, boolean, number] =>
  ((boardValue): [number, number, boolean, number] => (
    (boards[player][x][y] = boardValue === EMPTY ? MISS : HIT),
    [x, y, boards[player][x][y] === HIT, boardValue]
  ))(boards[player][x][y]);

const isValidMove = (boards: Boards, player, x, y): boolean =>
  boards[player][x][y] !== HIT && boards[player][x][y] !== MISS;

const performShot$ = (
  boards: Boards,
  player: string,
  nextMove: (x, y, wasHit, boardValue) => void
) =>
  pipe(
    tap(([player, x, y]) =>
      !isValidMove(boards, player, x, y)
        ? nextMove(x, y, true, boards[player][x][y])
        : noop
    ),
    filter(([player, x, y]) => isValidMove(boards, player, x, y)),
    map(([_, x, y]) => shot(boards, player, x, y)),
    tap(
      ([x, y, wasHit, boardValue]) => (
        paintBoards(boards),
        nextMove(x, y, wasHit, boardValue),
        paintScores(computerScore$, playerScore$)
      )
    )
  );

const computerHits = (
  playerBoard: number[][],
  x: number,
  y: number,
  wasHit: boolean,
  boardValue: number
): ComputerMove => {
  if ([EMPTY, HIT, MISS].some(e => e === boardValue)) {
    return computerMove.value;
  }
  if (!computerMove.value.hits[boardValue]) {
    computerMove.value.hits[boardValue] = [];
  }
  computerMove.value.hits[boardValue].push({ x, y });
  computerMove.value.playerBoard = playerBoard;

  return computerMove.value;
};

const nextComputerMove = (): [string, number, number] => {
  const hits = computerMove.value.hits;
  const shipToPursue = Object.keys(hits).find(
    e => hits[e].length !== parseInt(e)
  );
  if (!shipToPursue) {
    return [PLAYER, random(), random()];
  }

  const playerBoard = computerMove.value.playerBoard;
  const shipHits = hits[shipToPursue];
  if (shipHits.length === 1) {
    const hit = shipHits[0];

    const shotCandidates = [
      [hit.x, hit.y - 1],
      [hit.x, hit.y + 1],
      [hit.x - 1, hit.y],
      [hit.x + 1, hit.y]
    ].filter(
      ([x, y]) =>
        playerBoard[x] &&
        playerBoard[x][y] !== undefined &&
        playerBoard[x][y] !== MISS &&
        playerBoard[x][y] !== HIT
    );

    return [PLAYER, shotCandidates[0][0], shotCandidates[0][1]];
  }

  const getOrderedHits = key =>
    (orderedHits => [orderedHits[0], orderedHits[orderedHits.length - 1]])(
      shipHits.sort((h1, h2) => (h1[key] > h2[key] ? 1 : -1))
    );
  const isHorizontal = shipHits.every(e => e.x === shipHits[0].x);

  if (isHorizontal) {
    const [min, max] = getOrderedHits('y');
    return [
      PLAYER,
      min.x,
      playerBoard[min.x][min.y - 1] !== undefined &&
      playerBoard[min.x][min.y - 1] !== HIT &&
      playerBoard[min.x][min.y - 1] !== MISS
        ? min.y - 1
        : max.y + 1
    ];
  }

  const [min, max] = getOrderedHits('x');
  return [
    PLAYER,
    playerBoard[min.x - 1] !== undefined &&
    playerBoard[min.x - 1][min.y] !== HIT &&
    playerBoard[min.x - 1][min.y] !== MISS
      ? min.x - 1
      : max.x + 1,
    min.y
  ];
};

const initialScore = () => ({
  score: 0,
  ships: { 5: 5, 4: 4, 3: 3, 2: 2, 1: 1 }
});
export const playerScore$ = new BehaviorSubject(initialScore());
export const computerScore$ = new BehaviorSubject(initialScore());
export const isNotGameOver = _ =>
  computerScore$.value.score < NUMBER_OF_SHIP_PARTS &&
  playerScore$.value.score < NUMBER_OF_SHIP_PARTS;

const scoreChange = (subject: BehaviorSubject<any>, boardValue: number) =>
  boardValue >= SHORTEST_SHIP && boardValue <= LONGEST_SHIP
    ? ((subject.value.ships[boardValue] -= 1),
      subject.next({
        score: subject.value.score + 1,
        ships: subject.value.ships
      }))
    : noop;

const computerShot$ = (boards: Boards) =>
  computerMove.pipe(
    delay(200),
    map(_ => nextComputerMove()),
    performShot$(boards, PLAYER, (x, y, wasHit, boardValue) =>
      wasHit
        ? (scoreChange(computerScore$, boardValue),
          computerMove.next(
            computerHits(boards[PLAYER], x, y, wasHit, boardValue)
          ))
        : playerMove.next()
    )
  );

const playerShot$ = (boards: Boards) =>
  fromEvent(document, 'click').pipe(
    validClicks$,
    map((click: string) => click.split(',')),
    filter(([player]) => player === COMPUTER),
    performShot$(boards, COMPUTER, (x, y, wasHit, boardValue) =>
      wasHit
        ? scoreChange(playerScore$, boardValue)
        : computerMove.next(computerMove.value)
    ),
    takeWhile(([x, y, wasHit]) => wasHit),
    repeatWhen(_ => playerMove)
  );

export const shots$ = (boards: Boards) =>
  merge(playerShot$(boards), computerShot$(boards));
```

#### html-renderer.ts

```js
import { BehaviorSubject, pipe } from "rxjs";
import { tap } from "rxjs/operators";
import {
  NUMBER_OF_SHIP_PARTS,
  EMPTY,
  MISS,
  HIT,
  PLAYER,
  COMPUTER
} from "./constants";
import { Boards } from "./interfaces";

const byId = (id: string): HTMLElement => document.getElementById(id);
export const computerScoreContainer = byId("computer_score");
export const playerScoreContainer = byId("player_score");

const playerCells = (cell: number): string | number =>
  cell !== EMPTY ? (cell === MISS ? "o" : cell === HIT ? "x" : cell) : "_";
const computerCells = (cell: number): string | number =>
  cell === HIT || cell === MISS ? (cell === MISS ? "o" : "x") : "_";

export const paintBoard = (
  container: HTMLElement,
  playerName: string,
  board: number[][]
) => (
  (container.innerHTML = ""),
  board.forEach((r, i) =>
    r.forEach(
      (c, j) =>
        (container.innerHTML += `
    <div id=${playerName},${i},${j}
    style='float:left; margin-left: 5px'>
    ${playerName === PLAYER ? playerCells(c) : computerCells(c)}
    </div>`),
      (container.innerHTML += "<br/>")
    )
  ),
  (container.innerHTML += "<br/><br/>")
);

export const paintShipsInfo = (scoreSubject: BehaviorSubject<any>) =>
  Object.keys(scoreSubject.value.ships).reduce(
    (a, c) => ((a += `<b>${c} </b>: ${scoreSubject.value.ships[c]} | `), a),
    ""
  );

export const paintScores = (
  computerScore: BehaviorSubject<any>,
  playerScore: BehaviorSubject<any>
) =>
  ((c: HTMLElement, p: HTMLElement) => (
    (c.innerHTML = ""),
    (c.innerHTML += "Computer score: " + computerScore.value.score + "<br/>"),
    paintShipsInfo(computerScore),
    (c.innerHTML += "Ships: " + paintShipsInfo(computerScore)),
    (p.innerHTML = ""),
    (p.innerHTML += "Player score: " + playerScore.value.score + "<br/>"),
    (p.innerHTML += "Ships: " + paintShipsInfo(playerScore))
  ))(computerScoreContainer, playerScoreContainer);

export const paintBoards = (boards: Boards) => (
  paintBoard(byId("player_board"), PLAYER, boards[PLAYER]),
  paintBoard(byId("computer_board"), COMPUTER, boards[COMPUTER])
);

export const paintBoards$ = pipe<any, any>(tap(paintBoards));

export const displayGameOver = (computerScore: BehaviorSubject<any>) => () => {
  const gameOverText = `GAME OVER,
          ${
            computerScore.value.score === NUMBER_OF_SHIP_PARTS
              ? "Computer"
              : "Player"
          }
           won`;
  playerScoreContainer.innerHTML = gameOverText;
  computerScoreContainer.innerHTML = gameOverText;
};
```

#### interfaces.ts

```js
export interface Boards {
  player: [string, number[][]];
  computer: [string, number[][]];
}

export interface ComputerMove {
  playerBoard: number[];
  hits: {};
}
```

#### constants.ts

```js
export const GAME_SIZE = 12;
export const NUMBER_OF_SHIP_PARTS = 15;
export const EMPTY = 0;
export const MISS = 8;
export const HIT = 9;
export const SHORTEST_SHIP = 1;
export const LONGEST_SHIP = 5;
export const PLAYER = 'p';
export const COMPUTER = 'c';
```

### Operators Used

- [concat](../operators/combination/concat.md)
- [delay](../operators/utility/delay.md)
- [filter](../operators/filtering/filter.md)
- [finalize](../operators/utility/finalize.md)
- [fromEvent](../operators/creation/fromevent.md)
- [interval](../operators/creation/interval.md)
- [map](../operators/transformation/map.md)
- [merge](../operators/combination/merge.md)
- [of](../operators/creation/of.md)
- repeatWhen
- [scan](../operators/transformation/scan.md)
- [switchMap](../operators/transformation/switchmap.md)
- [take](../operators/filtering/take.md)
- [takeWhile](../operators/filtering/takewhile.md)
- [tap](../operators/utility/do.md)

### Subjects Used

- [BehaviorSubject](../subjects/behaviorsubject.md)
- [Subject](../subjects/subject.md)
