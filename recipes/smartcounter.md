# Smart Counter

An interesting element on interfaces which involve dynamically updating numbers
is a smart counter, or odometer effect. Instead of jumping a number up and down,
quickly counting to the desired number can achieve a cool effect. An example of
a popular library that accomplishes this is
[odometer](https://github.com/HubSpot/odometer) by
[Hubspot](https://github.com/HubSpot). Let's see how we can accomplish something
similar with just a few lines of RxJS.

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1qq2-q-eVe-F_-d0eSvTyqaGRjpfLDdJz 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

#### Vanilla JS

( [StackBlitz](https://stackblitz.com/edit/rxjs-m2zsud) )

![Smart Counter](https://drive.google.com/uc?export=view&id=1cG8huWWfsqSe8jLed_NmLrENnF0QyhfZ)

```js
import { timer, fromEvent, merge } from 'rxjs';
import {
  switchMap,
  startWith,
  scan,
  takeWhile,
  takeUntil,
  filter,
  mapTo,
  map,
  tap,
  pluck
} from 'rxjs/operators';

let currentNumber = 0;

// elems
const input: any = document.getElementById('range');

// utility functions
const takeUntilFunc = (endRange, currentNumber) => {
  return endRange > currentNumber
    ? val => val <= endRange
    : val => val >= endRange;
};
const positiveOrNegative = (endRange, currentNumber) => {
  return endRange > currentNumber ? 1 : -1;
};
const updateHTML = id => val => (document.getElementById(id).innerHTML = val);

// streams
const enter$ = fromEvent(input, 'keyup').pipe(
  pluck('code'),
  filter(code => code === 'Enter')
);

enter$
  .pipe(
    map(() => parseInt(input.value)),
    switchMap(endRange => {
      return timer(0, 20).pipe(
        mapTo(positiveOrNegative(endRange, currentNumber)),
        startWith(currentNumber),
        scan((acc, curr) => acc + curr),
        takeWhile(takeUntilFunc(endRange, currentNumber))
      );
    }),
    tap(v => (currentNumber = v)),
    startWith(currentNumber)
  )
  .subscribe(updateHTML('display'));
```

###### HTML

```html
<div class="container">
  <input id="range" type="number" />
  <h1 id="display"></h1>
</div>
```

We can easily take our vanilla smart counter and wrap it in any popular
component based UI library. Below is an example of an Angular smart counter
component which takes an `Input` of the updated end ranges and performs the
appropriate transition.

#### Angular Version

(
[StackBlitz](https://stackblitz.com/edit/angular-gcnqlq?file=app%2Fnumber-tracker.component.ts)
)

```js
import { Component, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { timer } from 'rxjs/observable/timer';
import { switchMap, startWith, scan, takeWhile, takeUntil, mapTo } from 'rxjs/operators';

@Component({
  selector: 'number-tracker',
  template: `
    <h3> {{ currentNumber }}</h3>
  `
})
export class NumberTrackerComponent implements OnDestroy {
  @Input()
  set end(endRange: number) {
    this._counterSub$.next(endRange);
  }
  @Input() countInterval = 20;
  public currentNumber = 0;
  private _counterSub$ = new Subject();
  private _onDestroy$ = new Subject();

  constructor() {
    this._counterSub$
      .pipe(
        switchMap(endRange => {
          return timer(0, this.countInterval).pipe(
            mapTo(this.positiveOrNegative(endRange, this.currentNumber)),
            startWith(this.currentNumber),
            scan((acc: number, curr: number) => acc + curr),
            takeWhile(this.isApproachingRange(endRange, this.currentNumber))
          )
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe((val: number) => this.currentNumber = val);
  }

  private positiveOrNegative(endRange, currentNumber) {
    return endRange > currentNumber ? 1 : -1;
  }

  private isApproachingRange(endRange, currentNumber) {
    return endRange > currentNumber
      ? val => val <= endRange
      : val => val >= endRange;
  }

  ngOnDestroy() {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
}
```

###### HTML

```html
<p>
  <input
    type="number"
    (keyup.enter)="counterNumber = vanillaInput.value"
    #vanillaInput
  />
  <button (click)="counterNumber = vanillaInput.value">
    Update number
  </button>
</p>
<number-tracker [end]="counterNumber"></number-tracker>
```

### Operators Used

- [fromEvent](../operators/creation/fromevent.md)
- [map](../operators/transformation/map.md)
- [mapTo](../operators/transformation/mapto.md)
- [scan](../operators/transformation/scan.md)
- [startWith](../operators/combination/startwith.md)
- [switchMap](../operators/transformation/switchmap.md)
- [takeWhile](../operators/filtering/takewhile.md)
