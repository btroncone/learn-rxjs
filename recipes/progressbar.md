# Progress Bar

_By [@barryrowe](https://twitter.com/barryrowe)_

This recipe demonstrates the creation of an animated progress bar, simulating
the management of multiple requests, and updating overall progress as each
completes. When all requests are complete the final result is emitted as an
array of results, utilizing the
[`bufferCount`](../operators/transformation/buffercount.md) operator.

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Example Code

(
[StackBlitz](https://stackblitz.com/edit/rxjs-5-progress-bar-zubdxz?file=index.ts)
)

```js
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { delay, concat, tap, switchMap, bufferCount } from 'rxjs/operators';

// simulate variable length requests
const requestOne: Observable<string> = of('first').pipe(delay(500));
const requestTwo: Observable<string> = of('second').pipe(delay(800));
const requestThree: Observable<string> = of('third').pipe(delay(1100));
const requestFour: Observable<string> = of('fourth').pipe(delay(1400));
const requestFive: Observable<string> = of('fifth').pipe(delay(1700));

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
// simulate 5 seperate requests that complete at variable length
const observables: Array<Observable<string>> = [
  requestOne,
  requestTwo,
  requestThree,
  requestFour,
  requestFive
];
let count: number = 0;

fromEvent(loadButton, 'click')
  .pipe(
    tap(_ => {
      count = 0;
      updateProgress(count);
    }),
    switchMap(_ => empty().pipe(concat(...observables))),
    tap(data => {
      count++;
      updateProgress(count / observables.length);
      updateContent(`<div class="content-item">${data}</div>`);
    }),
    // emit results as array on completion
    bufferCount(observables.length)
  )
  .subscribe(results => {
    console.log('ALL THE RESULTS: ', results);
  });
```

##### html

```html
<div class="progress-container">
  <div class="progress" id="progress"></div>
</div>

<button id="load">
Load Data
</button>

<div id="data">

</div>
```

### Operators Used

* [fromEvent](../operators/creation/fromevent.md)
* [switchMap](../operators/transformation/switchmap.md)
* [tap](../operators/utility/do.md)
* [bufferCount](../operators/transformation/buffercount.md)
