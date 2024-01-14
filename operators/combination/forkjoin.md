# forkJoin

#### signature: `forkJoin(...args, selector : function): Observable`

## When all observables complete, emit the last emitted value from each.

---

💡 If you want corresponding emissions from multiple observables as they occur,
try [zip](zip.md)!

⚠ If an inner observable does not complete `forkJoin` will never emit a value!

---

### Why use `forkJoin`?

This operator is best used when you have a group of observables and only care
about the final emitted value of each. One common use case for this is if you
wish to issue multiple requests on page load (or some other event) and only want
to take action when a response has been received for all. In this way it is
similar to how you might use
[`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all).

Be aware that if any of the inner observables supplied to `forkJoin` error you
will lose the value of any other observables that would or have already
completed if you do not [`catch`](../error_handling/catch.md) the
[error correctly on the inner observable](#example-5-getting-successful-results-when-one-inner-observable-errors).
If you are only concerned with all inner observables completing successfully you
can [catch the error on the outside](#example-4-handling-errors-on-outside).

It's also worth noting that if you have an observable that emits more than one
item, and you are concerned with the previous emissions `forkJoin` is not the
correct choice. In these cases you may be better off with an operator like
[combineLatest](combinelatest.md) or [zip](zip.md).

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1qq2-q-eVe-F_-d0eSvTyqaGRjpfLDdJz 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: Using a dictionary of sources to make AJAX request

(
[StackBlitz](https://stackblitz.com/edit/typescript-u5pzuf?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6.5+
import { ajax } from 'rxjs/ajax';
import { forkJoin } from 'rxjs';

/*
  when all observables complete, provide the last
  emitted value from each as dictionary
*/
forkJoin(
  // as of RxJS 6.5+ we can use a dictionary of sources
  {
    google: ajax.getJSON('https://api.github.com/users/google'),
    microsoft: ajax.getJSON('https://api.github.com/users/microsoft'),
    users: ajax.getJSON('https://api.github.com/users')
  }
)
  // { google: object, microsoft: object, users: array }
  .subscribe(console.log);
```

##### Example 2: Observables completing after different durations

(
[StackBlitz](https://stackblitz.com/edit/typescript-c3f62b?file=index.ts&devtoolsheight=100) )

```js
// RxJS v6+
import { interval, forkJoin, of } from 'rxjs';
import { delay, take } from 'rxjs/operators';

const myPromise = val =>
  new Promise(resolve =>
    setTimeout(() => resolve(`Promise Resolved: ${val}`), 5000)
  );

/*
  when all observables complete, give the last
  emitted value from each as an array
*/
const example = forkJoin({
  //emit 'Hello' immediately
  sourceOne: of('Hello'),
  //emit 'World' after 1 second
  sourceTwo: of('World').pipe(delay(1000)),
  //emit 0 after 1 second
  sourceThree: interval(1000).pipe(take(1)),
  //emit 0...1 in 1 second interval
  sourceFour: interval(1000).pipe(take(2)),
  //promise that resolves to 'Promise Resolved' after 5 seconds
  sourceFive: myPromise('RESULT')
});
/*
 * Output:
 * { 
 *   sourceOne: "Hello", 
 *   sourceTwo: "World", 
 *   sourceThree: 0,
 *   sourceFour: 1,
 *   sourceFive: "Promise Resolved: RESULT"
 * }
 */
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 3: Making a variable number of requests (uses deprecated API)

(
[StackBlitz](https://stackblitz.com/edit/typescript-3mbbjw?file=index.ts&devtoolsheight=100) )

```js
// RxJS v6+
import { mergeMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';

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

##### Example 4: Handling errors on outside

(
[StackBlitz](https://stackblitz.com/edit/typescript-petcwk?file=index.ts&devtoolsheight=100) )

```js
// RxJS v6+
import { delay, catchError } from 'rxjs/operators';
import { forkJoin, of, throwError } from 'rxjs';

/*
  If any inner observables error, the error result
  will be emitted by catchError.
*/
const example = forkJoin({
  // emit 'Hello' immediately
  sourceOne: of('Hello'),
  // emit 'World' after 1 second
  sourceTwo: of('World').pipe(delay(1000)),
  // throw error
  sourceThree: throwError('This will error')
}).pipe(catchError(error => of(error)));

// output: 'This will Error'
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 5: Getting successful results when one inner observable errors

(
[StackBlitz](https://stackblitz.com/edit/typescript-7qcyvz?file=index.ts&devtoolsheight=100) )

```js
// RxJS v6+
import { delay, catchError } from 'rxjs/operators';
import { forkJoin, of, throwError } from 'rxjs';

/*
  Emit values from successfully completed
  inner observables.
*/
const example = forkJoin({
  // emit 'Hello' immediately
  sourceOne: of('Hello'),
  // emit 'World' after 1 second
  sourceTwo: of('World').pipe(delay(1000)),
  // throw error
  sourceThree: throwError('This will error').pipe(catchError(error => of(error)))
});

/*
 * Output:
 * {
 *   sourceOne: "Hello",
 *   sourceTwo: "World",
 *   sourceThree: "This will error"
 * }
 */
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 6: forkJoin in Angular

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
    forkJoin({
      requestOne: this._myService.makeRequest('Request One', 2000),
      requestTwo: this._myService.makeRequest('Request Two', 1000),
      requestThree: this._myService.makeRequest('Request Three', 3000)
    })
    .subscribe(({requestOne, requestTwo, requestThree}) => {
      this.propOne = requestOne;
      this.propTwo = requestTwo;
      this.propThree = requestThree;
    });
  }
}
```

### Additional Resources

- [forkJoin](https://rxjs.dev/api/index/function/forkJoin) 📰 - Official docs
- [forkJoin](https://web.archive.org/web/20220810205148/https://indepth.dev/reference/rxjs/operators/fork-join) - In Depth Dev Reference

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/observable/forkJoin.ts](https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/observable/forkJoin.ts)
