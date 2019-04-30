# Swipe To Refresh

_By [adamlubek](https://github.com/adamlubek)_

This recipe demonstrates RxJs implementation of swipe to refresh functionality.
Inspired by [@BenLesh](https://twitter.com/BenLesh) RxJs talks.

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs"><img src="https://ultimatecourses.com/assets/img/banners/rxjs-banner-desktop.svg" style="width:100%;max-width:100%"></a></div>

### Example Code

(
[StackBlitz](https://stackblitz.com/edit/rxjs-refresh?file=index.ts&devtoolsheight=40)
)

#### index.ts

```js
// RxJS v6+
import { fromEvent, iif, of, pipe } from 'rxjs';
import {
  finalize,
  mergeMap,
  takeUntil,
  takeWhile,
  repeat,
  map,
  tap,
  exhaustMap,
  delay
} from 'rxjs/operators';

const setRefreshPos = y =>
  (document.getElementById('refresh').style.top = `${y}px`);
const resetRefresh = () => setRefreshPos(10);
const setData = data => (document.getElementById('data').innerText = data);

const fakeRequest = () =>
  of(new Date().toUTCString()).pipe(
    tap(_ => console.log('request')),
    delay(1000)
  );

const takeUntilMouseUpOrRefresh$ = pipe(
  takeUntil(fromEvent(document, 'mouseup')),
  takeWhile(y => y < 110)
);
const moveDot = y => of(y).pipe(tap(setRefreshPos));
const refresh$ = of({}).pipe(
  tap(resetRefresh),
  tap(e => setData('...refreshing...')),
  exhaustMap(_ => fakeRequest()),
  tap(setData)
);

fromEvent(document, 'mousedown')
  .pipe(
    mergeMap(_ => fromEvent(document, 'mousemove')),
    map((e: MouseEvent) => e.clientY),
    takeUntilMouseUpOrRefresh$,
    finalize(resetRefresh),
    exhaustMap(y => iif(() => y < 100, moveDot(y), refresh$)),
    finalize(() => console.log('end')),
    repeat()
  )
  .subscribe();
```

##### html

```
<style>
  #refresh {
    position: absolute;
    width: 20px;
    height: 20px;
    background: grey;
    border-radius: 50%;
    left: 50%;
  }

  #point {
    position: absolute;
    width: 10px;
    height: 10px;
    background: lightgrey;
    border-radius: 50%;
    left: 51%;
    top: 105px;
  }

  #data {
    position: absolute;
    top: 150px;
  }
</style>

<div id='refresh'></div>
<div id='point'></div>
<div id='data'>Swipe gray dot down to get latest date/time</div>
```

### Operators Used

- [delay](../operators/utility/delay.md)
- [exhaustMap](../operators/transformation/exhaustmap.md)
- [finalize](../operators/utility/finalize.md)
- [fromEvent](../operators/creation/fromevent.md)
- [iif](../operators/conditional/iif.md)
- [map](../operators/transformation/map.md)
- [mergeMap](../operators/transformation/mergemap.md)
- [of](../operators/creation/of.md)
- [repeat](../operators/utility/repeat.md)
- [takeUntil](../operators/filtering/takeuntil.md)
- [takeWhile](../operators/filtering/takewhile.md)
- [tap](../operators/utility/do.md)
