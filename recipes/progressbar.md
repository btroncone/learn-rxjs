# Progress Bar

_By [@barryrowe](https://twitter.com/barryrowe)_

This recipe demonstrates the creation of an animated progress bar, simulating
the management of multiple requests, and updating overall progress as each
completes.

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs"><img src="https://ultimatecourses.com/assets/img/banners/rxjs-banner-desktop.svg" style="width:100%;max-width:100%"></a></div>

### Example Code

(
[StackBlitz](https://stackblitz.com/edit/rxjs-5-progress-bar-wxdxwe?file=index.ts&devtoolsheight=50)
)

![Progress Bar](https://drive.google.com/uc?export=view&id=18wsoRuVkjiQmhTDk8CgZo3BHTUTEyMqT)

```js
import './style.css';

import { Observable, of, empty, fromEvent, from } from 'rxjs';
import {
  delay,
  switchMapTo,
  concatAll,
  count,
  scan,
  withLatestFrom,
  share
} from 'rxjs/operators';

const requestOne = of('first').pipe(delay(500));
const requestTwo = of('second').pipe(delay(800));
const requestThree = of('third').pipe(delay(1100));
const requestFour = of('fourth').pipe(delay(1400));
const requestFive = of('fifth').pipe(delay(1700));

const loadButton = document.getElementById('load');
const progressBar = document.getElementById('progress');
const content = document.getElementById('data');

// update progress bar as requests complete
const updateProgress = progressRatio => {
  console.log('Progress Ratio: ', progressRatio);
  progressBar.style.width = 100 * progressRatio + '%';
  if (progressRatio === 1) {
    progressBar.className += ' finished';
  } else {
    progressBar.className = progressBar.className.replace(' finished', '');
  }
};
// simple helper to log updates
const updateContent = newContent => {
  content.innerHTML += newContent;
};

const displayData = data => {
  updateContent(`<div class="content-item">${data}</div>`);
};

// simulate 5 separate requests that complete at variable length
const observables: Array<Observable<string>> = [
  requestOne,
  requestTwo,
  requestThree,
  requestFour,
  requestFive
];

const array$ = from(observables);
const requests$ = array$.pipe(concatAll());
const clicks$ = fromEvent(loadButton, 'click');

const progress$ = clicks$.pipe(
  switchMapTo(requests$),
  share()
);

const count$ = array$.pipe(count());

const ratio$ = progress$.pipe(
  scan(current => current + 1, 0),
  withLatestFrom(count$, (current, count) => current / count)
);

clicks$.pipe(switchMapTo(ratio$)).subscribe(updateProgress);

progress$.subscribe(displayData);
```

##### html

```html
<div class="progress-container">
  <div class="progress" id="progress"></div>
</div>

<button id="load">
  Load Data
</button>

<div id="data"></div>
```

_Thanks to [@johnlinquist](https://twitter.com/johnlindquist) for the additional
help with example!_

### Operators Used

- [concatAll](../operators/combination/concatall.md)
- [delay](../operators/utility/delay.md)
- [fromEvent](../operators/creation/fromevent.md)
- [from](../operators/creation/from.md)
- [scan](../operators/transformation/scan.md)
- [share](../operators/multicasting/share.md)
- [switchMap](../operators/transformation/switchmap.md)
- [withLatestFrom](../operators/transformation/withlatestfrom.md)
