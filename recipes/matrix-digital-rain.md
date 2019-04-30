# Matrix Digital Rain

_By [adamlubek](https://github.com/adamlubek)_

This recipe demonstrates RxJs implementation of Matrix Digital Rain.

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs"><img src="https://ultimatecourses.com/assets/img/banners/rxjs-banner-desktop.svg" style="width:100%;max-width:100%"></a></div>

### Example Code

( [StackBlitz](https://stackblitz.com/edit/rxjs-matrix?file=index.ts) )

#### index.ts

```js
// RxJS v6+
import { interval } from 'rxjs';
import { scan } from 'rxjs/operators';
import { render } from './html-renderer';
import { markForRemoval, updateDrops, updateMatrix } from './matrix';

interval(300)
  .pipe(
    scan<number, any[]>(matrix => (
      markForRemoval(matrix),
      updateDrops(matrix),
      updateMatrix(matrix)
    ), [])
  ).subscribe(render);
```

#### matrix.ts

```js
const drop = (x: number, y: number) => ({ x, y, d: [], remove: false });
const random = (max: number) => Math.floor(Math.random() * Math.floor(max));
const ranodmChar = () => String.fromCharCode(random(128));

export const markForRemoval = matrix =>
  matrix.forEach(
    drop => (drop.remove = drop.remove ? true : drop.d.length > 20)
  );
export const updateDrops = matrix =>
  matrix.forEach(
    drop =>
      (drop.d = drop.remove
        ? drop.d.slice(1).map(e => ranodmChar())
        : [ranodmChar(), ...drop.d.map(e => ranodmChar())])
  );
export const updateMatrix = matrix => [
  ...matrix,
  drop(random(window.innerHeight) / 4, random(window.innerWidth))
];
```

#### html-renderer.ts

```js
const createElem = drop => {
  const elem = document.createElement('div');
  elem.style.position = 'absolute';
  elem.style.marginTop = drop.x + 'px';
  elem.style.marginLeft = drop.y + 'px';
  elem.style.fontSize = '12px';
  elem.innerHTML = drop.d.reduce((acc, c) => (acc += '<br/>' + c), '');
  elem.style['color'] = `rgb(21, ${100 + drop.d.length * 10}, 21)`;
  return elem;
};

export const render = matrix => {
  document.body.innerHTML = '';
  const container = document.createElement('div');
  container.style.position = 'relative';
  matrix.forEach(m => container.appendChild(createElem(m)));
  document.body.appendChild(container);
};
```

### Operators Used

- [interval](../operators/creation/interval.md)
- [scan](../operators/transformation/scan.md)
