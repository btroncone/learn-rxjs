# Smart Counter

An interesting element on interfaces which involve dynamically updating numbers
is a smart counter, or odometer effect. Instead of jumping a number up and down,
quickly counting to the desired number can achieve a cool effect. An example of
a popular library that accomplishes this is
[odometer](https://github.com/HubSpot/odometer) by
[Hubspot](https://github.com/HubSpot). Let's see how we can accomplish something
similar with just a few lines of RxJS.

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs"><img src="https://ultimatecourses.com/assets/img/banners/rxjs-banner-desktop.svg" style="width:100%;max-width:100%"></a></div>

#### Vanilla JS

( [JSBin](http://jsbin.com/jojucaqiki/1/edit?js,output) |
[JSFiddle](https://jsfiddle.net/btroncone/au4sqvxu/) )

```js
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
// display
const input = document.getElementById('range');
const updateButton = document.getElementById('update');

const subscription = (function(currentNumber) {
  return fromEvent(updateButton, 'click').pipe(
    map(_ => parseInt(input.value)),
    switchMap(endRange => {
      return timer(0, 20).pipe(
        mapTo(positiveOrNegative(endRange, currentNumber)),
        startWith(currentNumber),
        scan((acc, curr) => acc + curr),
        takeWhile(takeUntilFunc(endRange, currentNumber));
      )
    }),
    tap(v => (currentNumber = v)),
    startWith(currentNumber)
  )
  .subscribe(updateHTML('display'));
})(0);
```

###### HTML

```html
<input id="range" type="number" />
<button id="update">Update</button>
<h3 id="display">0</h3>
```

We can easily take our vanilla smart counter and wrap it in any popular
component based UI library. Below is an example of an Angular smart counter
component which takes an `Input` of the updated end ranges and performs the
appropriate transition.

#### Angular Version

(
[StackBlitz](https://stackblitz.com/edit/angular-27anmw?embed=1&file=app/number-tracker.component.ts)
)

```js
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { timer } from 'rxjs/observable/timer';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs';
import { switchMap, startWith, scan, takeWhile, mapTo, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'number-tracker',
  template: `
    <h3> {{ (currentNumber$ | async) || 0 }}</h3>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberTrackerComponent {
  @Input()
  set end(endRange: number) {
    this._counterSub$.next(endRange);
  }
  @Input() countInterval = 20;
  public currentNumber$ = of(0);
  private _counterSub$ = new Subject();

  constructor() {
    this.currentNumber$ = this._counterSub$
      .pipe(
        withLatestFrom(this.currentNumber$),
        switchMap(([endRange, currentNumber]) => {
          return timer(0, this.countInterval).pipe(
            mapTo(this.positiveOrNegative(endRange, currentNumber)),
            startWith(currentNumber),
            scan((acc: number, curr: number) => acc + curr),
            takeWhile(this.isApproachingRange(endRange, currentNumber))
          )
        })
      );
  }

  private positiveOrNegative(endRange, currentNumber) {
    return endRange > currentNumber ? 1 : -1;
  }

  private isApproachingRange(endRange, currentNumber) {
    return endRange > currentNumber
      ? val => val <= endRange
      : val => val >= endRange;
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
