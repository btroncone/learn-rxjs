# race

#### signature: `race(): Observable`

## The observable to emit first is used.

### Examples

##### Example 1: race with 4 observables

( [jsBin](http://jsbin.com/goqiwobeno/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/8jcmb1ec/) )

```js
//take the first observable to emit
const example = Rx.Observable.race(
  //emit every 1.5s
  Rx.Observable.interval(1500),
  //emit every 1s
  Rx.Observable.interval(1000).mapTo('1s won!'),
  //emit every 2s
  Rx.Observable.interval(2000),
  //emit every 2.5s
  Rx.Observable.interval(2500)
);
//output: "1s won!"..."1s won!"...etc
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: race with an error

( [jsFiddle](https://jsfiddle.net/gbeL4t55/2/) )

```js
console.clear();

//Throws an error and ignore the rest of the observables.
const first = Rx.Observable.of('first')
  .delay(100)
  .map(() => {
    throw 'error';
  });
const second = Rx.Observable.of('second').delay(200);
const third = Rx.Observable.of('third').delay(300);

const race = Rx.Observable.race(first, second, third).subscribe(val =>
  console.log(val)
);
```

### Additional Resources

* [race](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-race)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/operator/race.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/race.ts)
