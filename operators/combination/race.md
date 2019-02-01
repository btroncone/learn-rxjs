# race

#### signature: `race(): Observable`

## The observable to emit first is used.

<div class="ua-ad"><a href="https://ultimatecourses.com/?ref=76683_kee7y7vk"><img src="https://ultimatecourses.com/assets/img/banners/ultimate-angular-leader.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: race with 4 observables

(
[StackBlitz](https://stackblitz.com/edit/typescript-cvfmug?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/goqiwobeno/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/8jcmb1ec/) )

```js
// RxJS v6+
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

(
[StackBlitz](https://stackblitz.com/edit/typescript-in6fw6?file=index.ts&devtoolsheight=100)
| [jsFiddle](https://jsfiddle.net/gbeL4t55/2/) )

```js
// RxJS v6+
import { delay, map } from 'rxjs/operators';
import { of, race } from 'rxjs';

//Throws an error and ignores the other observables.
const first = of('first').pipe(
  delay(100),
  map(_ => {
    throw 'error';
  })
);
const second = of('second').pipe(delay(200));
const third = of('third').pipe(delay(300));
// nothing logged
race(first, second, third).subscribe(val => console.log(val));
```

### Additional Resources

- [race](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-race)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/race.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/race.ts)
