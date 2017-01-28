# Smart Counter

[Description Coming Soon]

([JSBin](http://jsbin.com/desokepiju/1/edit?js,output)] | [JSFiddle](https://jsfiddle.net/btroncone/au4sqvxu/))
```ts
// utility functions
// utility functions
const takeUntilFunc = (endRange, currentNumber) => {
  return endRange > currentNumber
    ? val => val <= endRange
    : val => val >= endRange;
};

const positiveOrNegative = (endRange, currentNumber) => {
  return endRange > currentNumber ? 1 : -1;
};

const updateHTML = id => val => document.getElementById(id).innerHTML = val;
// display
const input = document.getElementById('range');
const updateButton = document.getElementById('update');

(function(currentNumber) {
  Rx.Observable
      .fromEvent(updateButton, 'click')
      .map(_ => parseInt(input.value))
      .switchMap(endRange => {
        return Rx.Observable.timer(0, 20)
            .mapTo(positiveOrNegative(endRange, currentNumber))
            .startWith(currentNumber)
            .scan((acc, curr) => acc + curr)
            // .delayWhen(//easing here)
            .takeWhile(takeUntilFunc(endRange, currentNumber))
      })
      .do(v => currentNumber = v)
      .startWith(currentNumber)
      .subscribe(updateHTML('display'));
}(0))

```

###### HTML
```html
<input id="range" type="number">
<button id="update">Update</button>
<h3 id="display">0</h3>
```

#### Angular Version

```ts
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
  public currentNumber = 0;
  private _counterSub$ = new Subject();
  private _subscription : Subscription;

  constructor() {
    this._subscription = this._counterSub$
      .switchMap(endRange => {
        return timer(0, 20)
            .mapTo(this.positiveOrNegative(endRange, this.currentNumber))
            .startWith(this.currentNumber)
            .scan((acc, curr) => acc + curr)
            // .delayWhen(i => {
            //   easing here
            // })
            .takeWhile(this.takeUntilFunc(endRange, this.currentNumber));
      })
      .subscribe(val => this.currentNumber = val);
  }

  private positiveOrNegative(endRange, currentNumber) {
    return endRange > currentNumber ? 1 : -1;
  }

  private takeUntilFunc(endRange, currentNumber) {
    return endRange > currentNumber
      ? val => val <= endRange
      : val => val >= endRange;
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
```

