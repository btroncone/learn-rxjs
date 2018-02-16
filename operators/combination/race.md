# race

#### signature: `race(): Observable`

## The observable to emit first is used.

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: race with 4 observables

( [jsBin](http://jsbin.com/goqiwobeno/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/8jcmb1ec/) )

```js
import { mapTo } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { race } from 'rxjs/observable/race';

//take the first observable to emit
const example = race(
  //emit every 1.5s
  interval(1500),
  //emit every 1s
  interval(1000).pipe(mapTo('1s won!')),
  //emit every 2s
  interval(2000),
  //emit every 2.5s
  interval(2500)
);
//output: "1s won!"..."1s won!"...etc
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: race with an error

( [jsFiddle](https://jsfiddle.net/gbeL4t55/2/) )

```js
import { delay, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { race } from 'rxjs/observable/race';

console.clear();

//Throws an error and ignore the rest of the observables.
const first = of('first').pipe(
  delay(100),
  map(_ => {
    throw 'error';
  })
);
const second = of('second').pipe(delay(200));
const third = of('third').pipe(delay(300));

const race = race(first, second, third).subscribe(val => console.log(val));
```

### Additional Resources

* [race](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-race)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/race.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/race.ts)
