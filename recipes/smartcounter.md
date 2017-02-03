# Smart Counter

An interesting element on interfaces which involve dynamically updating numbers is a smart counter, or odometer effect. Instead of jumping a number up and down, quickly counting to the desired number can achieve a cool effect. An example of a popular library that accomplishes this is [odometer](https://github.com/HubSpot/odometer) by [Hubspot](https://github.com/HubSpot). Let's see how we can accomplish something similar with just a few lines of RxJS.



#### Vanilla JS

( [JSBin](http://jsbin.com/jojucaqiki/1/edit?js,output) | [JSFiddle](https://jsfiddle.net/btroncone/au4sqvxu/) )
```ts
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

const subscription = (function(currentNumber) {
  return Rx.Observable
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
}(0));

```

###### HTML
```html
<input id="range" type="number">
<button id="update">Update</button>
<h3 id="display">0</h3>
```

We can easily take our vanilla smart counter and wrap it in any popular component based UI library. Below is an example of an Angular smart counter component which takes an `Input` of the updated end ranges and performs the appropriate transition.

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

### Operators Used
* [fromEvent](../operators/creation/fromevent.md)
* [map](../operators/transformation/map.md)
* [mapTo](../operators/transformation/mapto.md)
* [scan](../operators/transformation/scan.md)
* [startWith](../operators/combination/startwith.md)
* [switchMap](../operators/transformation/switchmap.md)
* [takeWhile](../operators/filtering/takewhile.md)
