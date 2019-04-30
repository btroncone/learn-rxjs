# sequenceEqual

#### signature: `sequenceEqual(compareTo: Observable, comparor?: (a, b) => boolean): OperatorFunction`

## Compares all values of two observables in sequence using an optional comparor function and returns an observable of a single boolean value representing whether or not the two sequences are equal.

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs"><img src="https://ultimatecourses.com/assets/img/banners/rxjs-banner-desktop.svg" style="width:100%;max-width:100%"></a></div>

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

### Additional Resources

- [sequenceEqual](https://rxjs-dev.firebaseapp.com/api/operators/sequenceEqual)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/sequenceEqual.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/sequenceEqual.ts)
