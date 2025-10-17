# tap / do

#### signature: `tap(nextOrObserver: function, error: function, complete: function): Observable`

## Transparently perform actions or side-effects, such as logging.

---

💡 If you are using and old version of RxJS, `tap` used to be known as `do`!

---

### Why use `tap`?

Think of `tap` as a surveillance camera in a shopping mall. It doesn't interfere with the shoppers (values) moving around but merely observes and records their actions. This operator is best for side effects: actions you want to take in response to values in an observable, without affecting the values themselves.

One of the superpowers of `tap` is its utility in debugging. **When things aren't going as planned with your observable**, instead of tearing apart your chain or inserting numerous logs, simply sprinkle in some `tap` operators. It's like adding checkpoints in a video game, helping you swiftly pinpoint issues without disrupting the main flow.

However, a word of caution: **remember that `tap` is solely for side effects**. If you find yourself tempted to modify data within a `tap`, it's generally best to resist. That's not its purpose, and you're better off with [`map`](../transformation/map.md) or other transformational operators in these cases.

Lastly, it's best to ensure that the side effects you introduce via `tap` are not critical to the main logic of your observable chain, keeping them non-intrusive and harmless.



### Examples

##### Example 1: Logging with tap

(
[StackBlitz](https://stackblitz.com/edit/typescript-cd2gjp?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/jimazuriva/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/qtyakorq/) )

```js
// RxJS v6+
import { of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

const source = of(1, 2, 3, 4, 5);
// transparently log values from source with 'tap'
const example = source.pipe(
  tap(val => console.log(`BEFORE MAP: ${val}`)),
  map(val => val + 10),
  tap(val => console.log(`AFTER MAP: ${val}`))
);

//'tap' does not transform values
//output: 11...12...13...14...15
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Using tap with object

(
[StackBlitz](https://stackblitz.com/edit/typescript-3xykpb?file=index.ts&devtoolsheight=100))

```js
// RxJS v6+
import { of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

const source = of(1, 2, 3, 4, 5);

// tap also accepts an object map to log next, error, and complete
const example = source
  .pipe(
    map(val => val + 10),
    tap({
      next: val => {
        // on next 11, etc.
        console.log('on next', val);
      },
      error: error => {
        console.log('on error', error.message);
      },
      complete: () => console.log('on complete')
    })
  )
  // output: 11, 12, 13, 14, 15
  .subscribe(val => console.log(val));
```

### Related Recipes

- [Battleship Game](../../recipes/battleship-game.md)
- [Breakout Game](../../recipes/breakout-game.md)
- [Car Racing Game](../../recipes/car-racing-game.md)
- [Catch The Dot Game](../../recipes/catch-the-dot-game.md)
- [Click Ninja Game](../../recipes/click-ninja-game.md)
- [Flappy Bird Game](../../recipes/flappy-bird-game.md)
- [Horizontal Scroll Indicator](../../recipes/horizontal-scroll-indicator.md)
- [Lockscreen](../../recipes/lockscreen.md)
- [Memory Game](../../recipes/memory-game.md)
- [Mine Sweeper Game](../../recipes/mine-sweeper-game.md)
- [Platform Jumper Game](../../recipes/platform-jumper-game.md)
- [Save Indicator](../../recipes/save-indicator.md)
- [Space Invaders Game](/recipes/space-invaders-game.md)
- [Stop Watch](../../recipes/stop-watch.md)
- [Swipe To Refresh](/recipes/swipe-to-refresh.md)
- [Tank Battle Game](../../recipes/tank-battle-game.md)
- [Tetris Game](../../recipes/tetris-game.md)
- [Type Ahead](../../recipes/type-ahead.md)
- [Uncover Image Game](../../recipes/uncover-image-game.md)

### Additional Resources

- [tap](https://rxjs.dev/api/operators/tap) 📰 - Official docs
- [Logging a stream with do](https://egghead.io/lessons/rxjs-logging-a-stream-with-do?course=step-by-step-async-javascript-with-rxjs)
  🎥 💵 - John Linquist
- [Utility operator: do](https://egghead.io/lessons/rxjs-utility-operator-do?course=rxjs-beyond-the-basics-operators-in-depth)
  🎥 💵 - André Staltz


---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/operators/tap.ts](https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/operators/tap.ts)
