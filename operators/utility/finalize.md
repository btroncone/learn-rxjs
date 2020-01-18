# finalize / finally

#### signature: `finalize(callback: () => void)`

## Call a function when observable completes or errors

### Examples

##### Example 1: Execute callback function when the observable completes

( [StackBlitz](https://stackblitz.com/edit/typescript-ohddud) )

```js
import { interval } from 'rxjs';
import { take, finalize } from 'rxjs/operators';

//emit value in sequence every 1 second
const source = interval(1000);
//output: 0,1,2,3,4,5....
const example = source.pipe(
  take(5), //take only the first 5 values
  finalize(() => console.log('Sequence complete')) // Execute when the observable completes
)
const subscribe = example.subscribe(val => console.log(val));
```

### Related Recipes

- [Battleship Game](../../recipes/battleship-game.md)
- [Car Racing Game](../../recipes/car-racing-game.md)
- [Click Ninja Game](../../recipes/click-ninja-game.md)
- [HTTP Polling](../../recipes/http-polling.md)
- [Mine Sweeper Game](../../recipes/mine-sweeper-game.md)
- [Swipe To Refresh](/recipes/swipe-to-refresh.md)
- [Tetris Game](../../recipes/tetris-game.md)

### Additional Resources

* [finalize](https://rxjs.dev/api/operators/finalize)
  📰 - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/finalize.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/finalize.ts)
