# Lockscreen

_By [adamlubek](https://github.com/adamlubek)_

This recipe demonstrates RxJs implementation of lockscreen functionality (known for example from smartphones).

<div class="ua-ad"><a href="https://ultimatecourses.com/?ref=76683_kee7y7vk"><img src="https://ultimatecourses.com/assets/img/banners/uc-leader.svg" style="width:100%;max-width:100%"></a></div>

### Example Code

(
[StackBlitz](https://stackblitz.com/edit/rxjs-lockscreen?file=index.ts&devtoolsheight=30)
)

#### index.ts
```js
// RxJS v6+
import { from, fromEvent, Subject, merge } from 'rxjs';
import { switchMap, takeUntil, repeat, tap, map, throttleTime, distinctUntilChanged, filter, toArray, sequenceEqual } from 'rxjs/operators';
import { pads, resetPasswordPad, setResult, setTouched, updateCurrentPassword } from './dom-updater';

const sub = new Subject();
const expectedPasswordUpdate$ = fromEvent(document.getElementById('expectedPassword'), 'keyup')
  .pipe(
    map((e: any) => e.target.value),
    tap(pass => sub.next(pass.split('').map(e => parseInt(e))))
  );
let expectedPassword = [1, 2, 5, 2];
const expectedPassword$ = sub.pipe(tap((v: any) => expectedPassword = v));

const checkIfPasswordMatch = password => from(password).pipe(sequenceEqual(from(expectedPassword)));

const actualPassword$ = fromEvent(document, 'mousedown')
  .pipe(
    tap(resetPasswordPad),
    switchMap(_ => fromEvent(document, 'mousemove')),
    takeUntil(fromEvent(document, 'mouseup')),
    throttleTime(50),
    map(({ clientX, clientY }: MouseEvent) => ({ x: clientX, y: clientY })),
    map(v => pads.find(r =>
      v.x > r.left &&
      v.x < r.right &&
      v.y > r.top &&
      v.y < r.bottom)),
    map(v => v ? v.id : v),
    filter(v => v !== undefined),
    distinctUntilChanged(),
    tap(setTouched),
    tap(updateCurrentPassword),
    toArray(),
    switchMap(checkIfPasswordMatch),
    tap(setResult),
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

export const setTouched = v => {
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

export const updateCurrentPassword = v =>
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
- [repeat](../operators/utility/repeat.md)
- [sequenceEqual](../operators/conditional/sequenceequal.md)
- [Subject](../subjects/subject.md)
- [switchMap](../operators/transformation/switchmap.md)
- [takeUntil](../operators/filtering/takeuntil.md)
- [tap](../operators/utility/do.md)
- [throttleTime](../operators/filtering/throttletime.md)
- [toArray](../operators/transformation/toarray.md)
