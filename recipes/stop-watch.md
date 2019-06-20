# Stop Watch

_By [adamlubek](https://github.com/adamlubek)_

This recipe demonstrates RxJs implementation of Stop Watch, inspired by [RxJS Advanced Patterns – Operate Heavily Dynamic UI’s](https://www.youtube.com/watch?v=XKfhGntZROQ) talk by [@Michael_Hladky](https://twitter.com/michael_hladky)

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs"><img src="https://ultimatecourses.com/assets/img/banners/rxjs-banner-desktop.svg" style="width:100%;max-width:100%"></a></div>

### Example Code

( [StackBlitz](https://stackblitz.com/edit/rxjs-stop-watch?file=index.ts) )

#### index.ts

```js
// RxJS v6+
import { fromEvent, interval, merge, noop, NEVER } from 'rxjs';
import { map, mapTo, scan, startWith, switchMap, tap } from 'rxjs/operators';

interface State {
  count: boolean;
  countup: boolean;
  speed: number;
  value: number;
  increase: number;
}

const getElem = (id: string): HTMLElement => document.getElementById(id);
const getVal = (id: string): number => parseInt((getElem(id))['value']);
const fromClick = (id: string) => fromEvent(getElem(id), 'click');
const fromClickAndMapTo = (id: string, obj: {}) => fromClick(id).pipe(mapTo(obj));
const fromClickAndMap = (id: string, fn: (_) => {}) => fromClick(id).pipe(map(fn));
const setValue = (val: number) => getElem('counter').innerText = val.toString()

const events$ =
  merge(
    fromClickAndMapTo('start', { count: true }),
    fromClickAndMapTo('pause', { count: false }),
    fromClickAndMapTo('reset', { value: 0 }),
    fromClickAndMapTo('countup', { countup: true }),
    fromClickAndMapTo('countdown', { countup: false }),
    fromClickAndMap('setto', _ => ({ value: getVal('value') })),
    fromClickAndMap('setspeed', _ => ({ speed: getVal('speed') })),
    fromClickAndMap('setincrease', _ => ({ increase: getVal('increase') }))
  );

const stopWatch$ = events$.pipe(
  startWith({ count: false, speed: 1000, value: 0, countup: true, increase: 1 }),
  scan((state: State, curr): State => ({ ...state, ...curr }), {}),
  tap((state: State) => setValue(state.value)),
  switchMap((state: State) => state.count
    ? interval(state.speed)
      .pipe(
        tap(_ => state.value += state.countup ? state.increase : -state.increase),
        tap(_ => setValue(state.value))
      )
    : NEVER)
);

stopWatch$.subscribe();
```

#### index.html

```html
<style>
  input,
  #counter,
  #controls {
    text-align: center;
    margin: auto;
  }

  #counter {
    font-size: 50px;
  }

  #controls {
    width: 50%;
  }
</style>

<div id="counter">0</div>
<div id="controls">
  <fieldset>
    <legend>Setup</legend>
    <button id="start">start</button>
    <button id="pause">pause</button>
    <button id="reset">reset</button>
  </fieldset>
  <fieldset>
    <legend>Count</legend>
    <button id="countup">count up</button>
    <button id="countdown">count down</button>
  </fieldset>
  <fieldset>
    <legend>Set to</legend>
    <input id="value" value="0"></input>
    <br/>
    <button id="setto">set value</button>
  </fieldset>
  <fieldset>
    <legend>Speed</legend>
    <input id="speed" value="1000"></input>
    <br/>
    <button id="setspeed">set speed</button>
  </fieldset>
  <fieldset>
    <legend>Increase</legend>
    <input id="increase" value="1"></input>
    <br/>
    <button id="setincrease">set increase</button>
  </fieldset>
</div>
```

### Operators Used

- [fromEvent](../operators/creation/fromevent.md)
- [interval](../operators/creation/interval.md)
- [map](../operators/transformation/map.md)
- [mapTo](../operators/transformation/mapto.md)
- [merge](../operators/transformation/map.md)
- NEVER
- noop
- [scan](../operators/transformation/scan.md)
- [startWith](../operators/combination/startwith.md)
- [switchMap](../operators/transformation/switchmap.md)
- [tap](../operators/utility/do.md)
