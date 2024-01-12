# race

#### signature: `race(): Observable`

## The observable to emit first is used.

### Why use race?
The `race` operator is the go-to choice when you want to work with multiple observables that compete against each other, and you're only interested in the first one to emit a value. It's like a competitive race, where the first runner to cross the finish line claims the victory, and the others don't matter anymore (if you're not first you're last?).

A relatable example of using `race` can be observed in an image loading scenario. Imagine you have two sources to load an image from, and you want to display the image as soon as possible. You can use the race operator to subscribe to both sources, and once the first source successfully loads the image, it will emit the value, and the subscription to the other source will be automatically unsubscribed.

It's crucial to remember that `race` only pays attention to the first emitted value from the competing observables. Once an observable wins the race, the other observables are disregarded, and their potential future emissions will have no impact on the output.

If your use case involves working with multiple observables that should all emit values and complete, or you need to process the emitted values in a specific order, consider using operators like [combineLatest](combinelatest.md) or [forkJoin](forkjoin.md) instead.

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1qq2-q-eVe-F_-d0eSvTyqaGRjpfLDdJz 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

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

- [race](https://rxjs-dev.firebaseapp.com/api/index/function/race) 📰 - Official docs
- [race](https://web.archive.org/web/20220930042726/https://indepth.dev/reference/rxjs/operators/race) - In Depth Dev Reference

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/observable/race.ts](https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/observable/race.ts)
