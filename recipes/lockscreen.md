# Lockscreen

_By [adamlubek](https://github.com/adamlubek)_

This recipe demonstrates RxJs implementation of lockscreen functionality (known for example from smartphones).

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/angular"><img src="https://ultimatecourses.com/assets/img/banners/ultimate-angular-leader.svg" style="width:100%;max-width:100%"></a></div>

### Example Code

(
[StackBlitz](https://stackblitz.com/edit/rxjs-lockscreen?file=index.ts&devtoolsheight=30)
)

#### index.ts
```js
/*
  Use mouse to 'swipe' across the lock pad (hold mouse button and swipe :) ).
  Pad will turn green if password is correct or red if password is incorrect.
  You can set password to whatever sequence you like.
*/
// RxJS v6+
import { from, fromEvent, Subject, merge, pipe } from 'rxjs';
import { switchMap, takeUntil, repeat, tap, map, throttleTime, distinctUntilChanged, filter, toArray, sequenceEqual, pluck } from 'rxjs/operators';
import { displaySelectedNumbersSoFar, markTouchedPad, pads, resetPasswordPad, setResult } from './dom-updater';

const sub = new Subject();
const expectedPasswordUpdate$ = fromEvent(document.getElementById('expectedPassword'), 'keyup')
  .pipe(
    map((e: any) => e.target.value),
    tap(pass => sub.next(pass.split('').map(e => parseInt(e))))
  );
let expectedPassword = [1, 2, 5, 2];
const expectedPassword$ = sub.pipe(tap((v: any) => expectedPassword = v));

const takeMouseSwipe = pipe(
  // take mouse moves
  switchMap(_ => fromEvent(document, 'mousemove')),
  // once mouse is up, we end swipe
  takeUntil(fromEvent(document, 'mouseup')),
  throttleTime(50)
);
const checkIfPasswordMatch = password => from(password).pipe(sequenceEqual(from(expectedPassword)));
const getXYCoordsOfMousePosition = ({ clientX, clientY }: MouseEvent) => ({ x: clientX, y: clientY });
const findSelectedPad = v => pads.find(r =>
  v.x > r.left &&
  v.x < r.right &&
  v.y > r.top &&
  v.y < r.bottom);
const getIdOfSelectedPad = pipe(
  filter(v => !!v),
  pluck('id'),
  distinctUntilChanged()
);

const actualPassword$ = fromEvent(document, 'mousedown')
  .pipe(
    // new stream so reset password pad and take swipe until mouse up
    tap(resetPasswordPad),
    takeMouseSwipe,
    // as we swipe, we mark pads as touchedand and display selected numbers
    map(getXYCoordsOfMousePosition),
    map(findSelectedPad),
    getIdOfSelectedPad,
    tap(markTouchedPad),
    tap(displaySelectedNumbersSoFar),
    // we need an array of numbers from current swipe which we can pass to checkIfPasswordMatch
    toArray(),
    // on mouse up (swipe end), switchMap to new stream to check if password match
    switchMap(checkIfPasswordMatch),
    tap(setResult),
    // takeUntil inside takeMouseSwipe terminated stream so we repeat from beginning (mousedown) 
    repeat()
  )

merge(
  expectedPassword$,
  expectedPasswordUpdate$,
  actualPassword$
).subscribe();
```

#### dom-updater.ts
```js

const createPadObject = (id, rectange) => ({
  id: id,
  left: rectange.left,
  right: rectange.right,
  top: rectange.top,
  bottom: rectange.bottom
});

const setResultText = text => document.getElementById('result').innerText = text;

const setPasswordPads = color => Array.from(document
  .querySelectorAll('.cell'))
  .forEach((v: HTMLElement) => v.style.background = color)

const getPad = id => document.getElementById(`c${id}`);

export const pads = Array
  .from({ length: 9 }, (_, n) => n + 1)
  .map(v => createPadObject(v, getPad(v).getBoundingClientRect()));

export const markTouchedPad = v => {
  const pad = getPad(v);
  pad.style.background = 'lightgrey';
  if (!pad.animate) return; //animate does not work in IE
  const animation: any = [
    { transform: 'scale(0.9)' },
    { transform: 'scale(1)' }
  ];
  const animationOptions = {
    duration: 300,
    iterations: 1
  };
  pad.animate(animation, animationOptions);
  document.getSelection().removeAllRanges();
};

export const setResult = result => {
  setPasswordPads(result ? 'MediumSeaGreen' : 'IndianRed');
  setResultText('Password ' + (result ? 'matches :)' : 'does not match :('));
}

export const displaySelectedNumbersSoFar = v =>
  document.getElementById('result').textContent += v;

export const resetPasswordPad = () => {
  setResultText('');
  setPasswordPads('gray');
}
```

##### html

```
<style>
  .grid {
    border-spacing: 2px;
  }
  .cell {
    width: 50px;
    height: 50px;
    background: grey;
    display: table-cell;
    border-radius: 50%;
    transform: scale(0.5);
    text-align: center;
    vertical-align: middle;
    color: white;
  }

  .pulse div {
    animation-name: pulse;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }

  @keyframes pulse {
    from { transform: scale(1); }
    50% { transform: scale(0.99); }
    to { transform: scale(1); }
  }
</style>

Expected Password:
<input id="expectedPassword" value="1252"/>
<hr/>
Password:
<div class="grid pulse">
  <div>
    <div class="cell" id="c1">1</div>
    <div class="cell" id="c2">2</div>
    <div class="cell" id="c3">3</div>
  </div>
  <div>
    <div class="cell" id="c4">4</div>
    <div class="cell" id="c5">5</div>
    <div class="cell" id="c6">6</div>
  </div>
  <div>
    <div class="cell" id="c7">7</div>
    <div class="cell" id="c8">8</div>
    <div class="cell" id="c9">9</div>
  </div>
</div>

<div id="result"></div>
```

### Operators Used

- [distinctUntilChanged](../operators/filtering/distinctuntilchanged.md)
- [filter](../operators/filtering/filter.md)
- [from](../operators/creation/from.md)
- [fromEvent](../operators/creation/fromevent.md)
- [map](../operators/transformation/map.md)
- [merge](../operators/combination/merge.md)
- [pluck](../operators/transformation/pluck.md)
- [repeat](../operators/utility/repeat.md)
- [sequenceEqual](../operators/conditional/sequenceequal.md)
- [Subject](../subjects/subject.md)
- [switchMap](../operators/transformation/switchmap.md)
- [takeUntil](../operators/filtering/takeuntil.md)
- [tap](../operators/utility/do.md)
- [throttleTime](../operators/filtering/throttletime.md)
- [toArray](../operators/transformation/toarray.md)
