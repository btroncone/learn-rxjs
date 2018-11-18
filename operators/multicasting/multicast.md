# multicast

#### signature: `multicast(selector: Function): Observable`

## Share source utilizing the provided Subject.

<div class="ua-ad"><a href="https://ultimatecourses.com/?ref=76683_kee7y7vk"><img src="https://ultimatecourses.com/assets/img/banners/uc-leader.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: multicast with standard Subject

(
[StackBlitz](https://stackblitz.com/edit/typescript-vge8sk?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/zexuyosuvi/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/x2z7p1gm/) )

```js
// RxJS v6+
import { Subject, interval } from 'rxjs';
import { take, tap, multicast, mapTo } from 'rxjs/operators';

//emit every 2 seconds, take 5
const source = interval(2000).pipe(take(5));

const example = source.pipe(
  //since we are multicasting below, side effects will be executed once
  tap(() => console.log('Side Effect #1')),
  mapTo('Result!')
);

//subscribe subject to source upon connect()
const multi = example.pipe(multicast(() => new Subject()));
/*
  subscribers will share source
  output:
  "Side Effect #1"
  "Result!"
  "Result!"
  ...
*/
const subscriberOne = multi.subscribe(val => console.log(val));
const subscriberTwo = multi.subscribe(val => console.log(val));
//subscribe subject to source
multi.connect();
```

##### Example 2: multicast with ReplaySubject

(
[StackBlitz](https://stackblitz.com/edit/typescript-n5ghjj?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/ruhexuhike/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/oj68u58j/) )

```js
// RxJS v6+
import { interval, ReplaySubject } from 'rxjs';
import { take, multicast, tap, mapTo } from 'rxjs/operators';

//emit every 2 seconds, take 5
const source = interval(2000).pipe(take(5));

//example with ReplaySubject
const example = source.pipe(
  //since we are multicasting below, side effects will be executed once
  tap(_ => console.log('Side Effect #2')),
  mapTo('Result Two!')
);
//can use any type of subject
const multi = example.pipe(multicast(() => new ReplaySubject(5)));
//subscribe subject to source
multi.connect();

setTimeout(() => {
  /*
   subscriber will receieve all previous values on subscription because
   of ReplaySubject
   */
  const subscriber = multi.subscribe(val => console.group(val));
}, 5000);
```

### Additional Resources

- [multicast](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-multicast)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/multicast.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/multicast.ts)
