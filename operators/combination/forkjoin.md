# forkJoin

#### signature: `forkJoin(...args, selector : function): Observable`

## When all observables complete, emit the last emitted value from each.

---

:bulb: If you want corresponding emissions from multiple observables as they
occur, try [zip](zip.md)!

:warning: If an inner observable does not complete `forkJoin` will never emit a
value!

---

### Why use `forkJoin`?

This operator is best used when you have a group of observables and only care
about the final emitted value of each. One common use case for this is if you
wish to issue multiple requests on page load (or some other event) and only want
to take action when a response has been receieved for all. In this way it is
similar to how you might use
[`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all).

Be aware that if any of the inner observables supplied to `forkJoin` error you
will lose the value of any other observables that would or have already
completed if you do not [`catch`](../error_handling/catch.md) the
[error correctly on the inner observable](#example-4-getting-successful-results-when-one-innner-observable-errors).
If you are only concerned with all inner observables completing successfully you
can [catch the error on the outside](#example-3-handling-errors-on-outside).

It's also worth noting that if you have an observable that emits more than one
item, and you are concerned with the previous emissions `forkJoin` is not the
correct choice. In these cases you may better off with an operator like
[combineLatest](combinelatest.md) or [zip](zip.md).

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Observables completing after different durations

( [StackBlitz](https://stackblitz.com/edit/typescript-2qr3qi?file=index.ts) |
[jsBin](http://jsbin.com/remiduhimu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/5fj77920/81/) )

```js
import { delay, take } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { of } from 'rxjs/observable/of';
import { interval } from 'rxjs/observable/interval';

const myPromise = val =>
  new Promise(resolve =>
    setTimeout(() => resolve(`Promise Resolved: ${val}`), 5000)
  );

/*
  when all observables complete, give the last
  emitted value from each as an array
*/
const example = forkJoin(
  //emit 'Hello' immediately
  of('Hello'),
  //emit 'World' after 1 second
  of('World').pipe(delay(1000)),
  //emit 0 after 1 second
  interval(1000).pipe(take(1)),
  //emit 0...1 in 1 second interval
  interval(1000).pipe(take(2)),
  //promise that resolves to 'Promise Resolved' after 5 seconds
  myPromise('RESULT')
);
//output: ["Hello", "World", 0, 1, "Promise Resolved: RESULT"]
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Making a variable number of requests

( [StackBlitz](https://stackblitz.com/edit/typescript-uxbl41?file=index.ts) |
[jsBin](http://jsbin.com/febejakapi/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/0b8Lnh7s/1/) )

```js
import { mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { of } from 'rxjs/observable/of';

const myPromise = val =>
  new Promise(resolve =>
    setTimeout(() => resolve(`Promise Resolved: ${val}`), 5000)
  );

const source = of([1, 2, 3, 4, 5]);
//emit array of all 5 results
const example = source.pipe(mergeMap(q => forkJoin(...q.map(myPromise))));
/*
  output:
  [
   "Promise Resolved: 1",
   "Promise Resolved: 2",
   "Promise Resolved: 3",
   "Promise Resolved: 4",
   "Promise Resolved: 5"
  ]
*/
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 3: Handling errors on outside

( [StackBlitz](https://stackblitz.com/edit/typescript-3fgrkn?file=index.ts) |
[jsBin](http://jsbin.com/gugawucixi/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/6vz7tjx2/1/) )

```js
import { delay, catchError } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

/*
  when all observables complete, give the last
  emitted value from each as an array
*/
const example = forkJoin(
  //emit 'Hello' immediately
  of('Hello'),
  //emit 'World' after 1 second
  of('World').pipe(delay(1000)),
  // throw error
  _throw('This will error')
).pipe(catchError(error => of(error)));
//output: 'This will Error'
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 4: Getting successful results when one inner observable errors

( [StackBlitz](https://stackblitz.com/edit/typescript-z2nedm?file=index.ts) |
[jsBin](http://jsbin.com/memajepefe/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/emdu4doy/1/) )

```js
import { delay, catchError } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

/*
  when all observables complete, give the last
  emitted value from each as an array
*/
const example = forkJoin(
  //emit 'Hello' immediately
  of('Hello'),
  //emit 'World' after 1 second
  of('World').pipe(delay(1000)),
  // throw error
  _throw('This will error').pipe(catchError(error => of(error)))
);
//output: ["Hello", "World", "This will error"]
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 5: forkJoin in Angular

( [plunker](https://plnkr.co/edit/ElTrOg8NfR3WbbAfjBXQ?p=preview) )

```js
@Injectable()
export class MyService {
  makeRequest(value: string, delayDuration: number) {
    // simulate http request
    return of(`Complete: ${value}`).pipe(
      delay(delayDuration)
    );
  }
}

@Component({
  selector: 'my-app',
  template: `
    <div>
      <h2>forkJoin Example</h2>
      <ul>
        <li> {{propOne}} </li>
        <li> {{propTwo}} </li>
        <li> {{propThree}} </li>
      </ul>
    </div>
  `,
})
export class App {
  public propOne: string;
  public propTwo: string;
  public propThree: string;
  constructor(private _myService: MyService) {}

  ngOnInit() {
    // simulate 3 requests with different delays
    forkJoin(
      this._myService.makeRequest('Request One', 2000),
      this._myService.makeRequest('Request Two', 1000)
      this._myService.makeRequest('Request Three', 3000)
    )
    .subscribe(([res1, res2, res3]) => {
      this.propOne = res1;
      this.propTwo = res2;
      this.propThree = res3;
    });
  }
}
```

### Additional Resources

* [forkJoin](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-forkJoin)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/observable/ForkJoinObservable.ts](https://github.com/ReactiveX/rxjs/blob/master/src/observable/ForkJoinObservable.ts)
