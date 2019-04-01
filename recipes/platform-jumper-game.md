# Platform Jumper Game

_By [adamlubek](https://github.com/adamlubek)_

This recipe demonstrates RxJs implementation of Platform Jumper game.

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/angular"><img src="https://ultimatecourses.com/assets/img/banners/ultimate-angular-leader.svg" style="width:100%;max-width:100%"></a></div>

### Example Code

(
[StackBlitz](https://stackblitz.com/edit/rxjs-platform-jumper?file=index.ts)
)

#### index.ts
```js
// RxJS v6+
import { interval, of, fromEvent, combineLatest } from 'rxjs';
import { scan, tap, startWith, pluck, switchMap, takeWhile } from 'rxjs/operators';
import { gameSize } from './constants';
import { render } from './html-renderer';
import { Player, Platform } from './interfaces';
import { updatePlayer, updatePlatforms, initialPlatforms, initialPlayer, handleCollisions, handleKeypresses } from './game';

const gameSpeed = 500;

const platforms$ = interval(gameSpeed)
  .pipe(
    scan<number, Platform[]>(updatePlatforms, initialPlatforms)
  );

const keys$ = (initialPlayer: Player) => fromEvent(document, 'keydown')
  .pipe(
    startWith({ key: '' }),
    pluck('key'),
    scan<string, Player>(
      (plyr: Player, key: string) => handleKeypresses(plyr, key),
      initialPlayer
    )
  );

const player$ = of(initialPlayer())
  .pipe(
    switchMap(p => combineLatest(interval(gameSpeed / 4), keys$(p))
      .pipe(
        scan<[number, Player], Player>((_, [__, player]) => updatePlayer(player))
      )),
  );

combineLatest(player$, platforms$)
  .pipe(
    scan<[Player, Platform[]], [Player, Platform[]]>(
      (_, [player, platforms]) => handleCollisions([player, platforms])),
    tap(render),
    takeWhile(([player, platforms]) => player.lives > 0)
  )
  .subscribe()
```

#### game.ts
```js
import { Player, Platform } from './interfaces';
import { gameSize } from './constants';

const newPlatform = (x, y): Platform => ({ x, y, scored: false });
const newPlayer = (x, y, jumpValue, score, lives): Player =>
  ({ x, y, jumpValue, canJump: false, score: score, lives: lives });
const startingY = 4;
export const initialPlayer = (): Player => newPlayer(0, startingY, 0, 0, 3);
export const initialPlatforms = [newPlatform(gameSize / 2, startingY)];

const random = y => {
  let min = Math.ceil(y - 4);
  let max = Math.floor(y + 4);
  min = min < 0 ? 0 : min;
  max = max > gameSize - 1 ? gameSize - 1 : max;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const updatePlatforms = (platforms: Platform[]): Platform[] =>
  (
    platforms[platforms.length - 1].x > gameSize / 5
      ? platforms.push(newPlatform(1, random(platforms[platforms.length - 1].y)))
      : () => { },
    platforms
      .filter(e => e.x < gameSize - 1)
      .map(e => newPlatform(e.x + 1, e.y))
  );

export const handleKeypresses = (player: Player, key: string) => key === 'ArrowRight'
  ? newPlayer(player.x, player.y + (player.y < (gameSize - 1) ? 1 : 0), player.jumpValue, player.score, player.lives)
  : key === 'ArrowLeft'
    ? newPlayer(player.x, player.y - (player.y > 0 ? 1 : 0), player.jumpValue, player.score, player.lives)
    : key === 'ArrowUp'
      ? newPlayer(player.x, player.y, (player.x === gameSize - 1 || player.canJump) ? 6 : 0, player.score, player.lives)
      : player;

export const updatePlayer = (player: Player): Player =>
  (
    player.jumpValue -= player.jumpValue > 0 ? 1 : 0,
    player.x -= player.x - 3 > 0 ? player.jumpValue : 0,
    player.x += player.x < gameSize - 1 ? 1 : 0,
    player.x === gameSize - 1 ? (player.lives -= 1, player.x = 1) : () => { },
    player
  );

const handleCollidingPlatform = (collidingPlatform: Platform, player: Player) => {
  if (player.canJump) {
    return;
  }

  if (!collidingPlatform) {
    player.canJump = false;
    return;
  }

  if (!collidingPlatform.scored) {
    player.score += 1;
  }
  collidingPlatform.scored = true;

  player.canJump = true;
}

export const handleCollisions = ([player, platforms]: [Player, Platform[]]): [Player, Platform[]] =>
  (
    handleCollidingPlatform(platforms.find(p => p.x - 1 === player.x && p.y === player.y), player),
    player.x = player.canJump
      ? (collidingPlatforms =>
        collidingPlatforms.length
          ? (platform => platform.x - 1)(collidingPlatforms[collidingPlatforms.length - 1])
          : player.x)
        (platforms.filter(p => p.y === player.y && p.x >= player.x))
      : (player.x),
    [player, platforms]
  );
```

#### interfaces.ts
```js
export interface Player {
  x: number;
  y: number;
  jumpValue: number;
  canJump: boolean;
  score: number;
  lives: number;
}

export interface Platform {
  x: number;
  y: number;
  scored: boolean;
}
```

#### constants.ts
```js
export const gameSize = 20;
```

#### html-renderer.ts
```js
import { gameSize } from './constants';
import { Player, Platform } from './interfaces';

export const render = ([player, platforms]: [Player, Platform[]]) => {
  document.body.innerHTML = `Lives: ${player.lives} Score: ${player.score} </br>`;

  const game = Array(gameSize).fill(0).map(_ => Array(gameSize).fill(0));
  game[player.x][player.y] = '*';
  platforms.forEach(p => game[p.x][p.y] = '_');

  game.forEach(r => {
    r.forEach(c => document.body.innerHTML += c === 0 ? '...' : c);
    document.body.innerHTML += '<br/>';
  });
}
```

### Operators Used

- [combineLatest](../operators/combination/combinelatest.md)
- [fromEvent](../operators/creation/fromevent.md)
- [interval](../operators/creation/interval.md)
- [of](../operators/creation/of.md)
- [pluck](../operators/transformation/pluck.md)
- [scan](../operators/transformation/scan.md)
- [startWith](../operators/combination/startwith.md)
- [switchMap](../operators/transformation/switchmap.md)
- [takeWhile](../operators/filtering/takewhile.md)
- [tap](../operators/utility/do.md)
