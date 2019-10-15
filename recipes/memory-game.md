# Memory Game

_By [adamlubek](https://github.com/adamlubek)_

This recipe demonstrates an RxJS game to train your memory.

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs"><img src="https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX" style="width:100%;max-width:100%"></a></div>

### Example Code

( [StackBlitz](https://stackblitz.com/edit/rxjs-memory-game?file=index.ts) )

![Memory Game](https://drive.google.com/uc?export=view&id=1IsizNEcko-aKcyb54ZuMis-gHs9UR9Ei)

#### index.ts

```js
// RxJS v6+
import { EMPTY, from, fromEvent, generate, interval, merge, noop } from 'rxjs';
import {
  map,
  pluck,
  scan,
  sequenceEqual,
  switchMap,
  take,
  tap
} from 'rxjs/operators';

const random = (): number => Math.floor(Math.random() * Math.floor(8));
const setInfo = (text: string) =>
  (document.getElementById('info').innerHTML = text);
const displayLevelChange = () =>
  document
    .querySelectorAll('.child')
    .forEach((c: HTMLElement) => (c.style.background = 'gray'));

const checkIfGameOver$ = (randomSequence: number[]) => (
  userSequence: number[]
) =>
  from(userSequence).pipe(
    sequenceEqual(from(randomSequence)),
    tap(match =>
      !match && userSequence.length === randomSequence.length
        ? setInfo('GAME OVER!')
        : noop
    )
  );

const takePlayerInput$ = (randomSequence: number[]) => _ =>
  fromEvent(document, 'click').pipe(
    take(randomSequence.length),
    scan(
      (acc: number[], curr: MouseEvent) => [
        ...acc,
        parseInt(curr.target['id'])
      ],
      []
    ),
    switchMap(checkIfGameOver$(randomSequence)),
    switchMap(result =>
      result
        ? (displayLevelChange(), memoryGame$(randomSequence.length + 1))
        : EMPTY
    )
  );

const showSequenceToMemorize$ = (memorySize: number) => (
  randomSequence: number[]
) =>
  interval(1000).pipe(
    tap(i =>
      setInfo(i === memorySize - 1 ? `YOUR TURN` : `${memorySize - i} elements`)
    ),
    take(randomSequence.length),
    map(index => randomSequence[index]),
    tap(value => document.getElementById(`${value}`).click()),
    switchMap(takePlayerInput$(randomSequence))
  );

const memoryGame$ = memorySize =>
  generate(1, x => x <= memorySize, x => x + 1).pipe(
    scan((acc: number[], _: number): number[] => [...acc, random() + 1], []),
    switchMap(showSequenceToMemorize$(memorySize))
  );

const elementClick$ = (event: string, color: string) =>
  fromEvent(document.querySelectorAll('.child'), event).pipe(
    pluck('srcElement'),
    tap((e: HTMLElement) => (e.style.background = color))
  );

const clicks$ = merge(
  elementClick$('click', 'lightgray'),
  elementClick$('transitionend', 'white')
);

const game$ = merge(clicks$, memoryGame$(2));

game$.subscribe();
```

#### index.html

```html
<style>
  .parent {
    border-spacing: 5px;
    width: 50%;
    padding: 0.5em;
  }

  .parent.perspective {
    perspective: 50em;
  }

  .child {
    margin: 0.5em;
    max-width: 2em;
    min-width: 2em;
    height: 2.8em;
    padding: 0.5em;
    display: table-cell;
    border: 1px solid rgba(0, 0, 0, 0.5);
  }

  .parent.perspective .child {
    transform: rotateX(40deg);
    transition: all 0.3s ease-in;
  }
</style>

<div id="info">Train Your Memory!</div>
<div id="grid" class="grid parent perspective">
  <div>
    <div class="child" id="1"></div>
    <div class="child" id="2"></div>
    <div class="child" id="3"></div>
  </div>
  <div>
    <div class="child" id="4"></div>
    <div class="child" id="5"></div>
    <div class="child" id="6"></div>
  </div>
  <div>
    <div class="child" id="7"></div>
    <div class="child" id="8"></div>
    <div class="child" id="9"></div>
  </div>
</div>
```

### Operators Used

- [empty](../operators/creation/empty.md)
- [from](../operators/creation/from.md)
- [fromEvent](../operators/creation/fromevent.md)
- [generate](../operators/creation/generate.md)
- [interval](../operators/creation/interval.md)
- [map](../operators/transformation/map.md)
- [merge](../operators/combination/merge.md)
- noop
- [pluck](../operators/transformation/pluck.md)
- [scan](../operators/transformation/scan.md)
- [sequenceEqual](../operators/conditional/sequenceequal.md)
- [switchMap](../operators/transformation/switchmap.md)
- [take](../operators/filtering/take.md)
- [tap](../operators/utility/do.md)
