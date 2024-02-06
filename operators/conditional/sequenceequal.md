# sequenceEqual

#### signature: `sequenceEqual(compareTo: Observable, comparor?: (a, b) => boolean): Observable`

## Compares emitted sequence to expected sequence for match

[![Ultimate RxJS](https://ultimatecourses.com/static/banners/banner-rxjs.svg 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: simple sequenceEqual

(
[Stackblitz](https://stackblitz.com/edit/rxjs-sequenceequal?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { of, from } from 'rxjs';
import { sequenceEqual, switchMap } from 'rxjs/operators';

const expectedSequence = from([4, 5, 6]);

of([1, 2, 3], [4, 5, 6], [7, 8, 9])
  .pipe(switchMap(arr => from(arr).pipe(sequenceEqual(expectedSequence))))
  .subscribe(console.log);

//output: false, true, false
```

##### Example 2: sequenceEqual with keyboard events

(
[Stackblitz](https://stackblitz.com/edit/rxjs-sequenceequal-buffercount?file=index.ts&devtoolsheight=50)
)

```js
// RxJS v6+
import { from, fromEvent } from 'rxjs';
import { sequenceEqual, map, bufferCount, mergeMap, tap } from 'rxjs/operators';

const expectedSequence = from(['q', 'w', 'e', 'r', 't', 'y']);
const setResult = text => (document.getElementById('result').innerText = text);

fromEvent(document, 'keydown')
  .pipe(
    map((e: KeyboardEvent) => e.key),
    tap(v => setResult(v)),
    bufferCount(6),
    mergeMap(keyDowns =>
      from(keyDowns).pipe(
        sequenceEqual(expectedSequence),
        tap(isItQwerty => setResult(isItQwerty ? 'WELL DONE!' : 'TYPE AGAIN!'))
      )
    )
  )
  .subscribe(e => console.log(`did you say qwerty? ${e}`));
```

### Related Recipes

- [Lockscreen](../../recipes/lockscreen.md)
- [Memory Game](../../recipes/memory-game.md)

### Additional Resources

- [sequenceEqual](https://rxjs.dev/api/operators/sequenceEqual) 📰 - Official
  docs

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/sequenceEqual.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/sequenceEqual.ts)
