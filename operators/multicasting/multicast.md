# multicast

#### signature: `multicast(selector: Function): Observable`

## Share source utilizing the provided Subject.

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: multicast with standard Subject

( [jsBin](http://jsbin.com/zexuyosuvi/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/x2z7p1gm/) )

```js
import { interval } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';
import { take, tap, multicast } 'rxjs/operators';

//emit every 2 seconds, take 5
const source = interval(2000).pipe(take(5));

const example = source.pipe(
  //since we are multicasting below, side effects will be executed once
  tap(() => console.log('Side Effect #1')),
  mapTo('Result!');
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

( [jsBin](http://jsbin.com/ruhexuhike/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/oj68u58j/) )

```js
import { interval } from 'rxjs/observable/of';
import { take, multicast } 'rxjs/operators';

//emit every 2 seconds, take 5
const source = interval(2000).pipe(take(5));

//example with ReplaySubject
const example = source.pipe(
  //since we are multicasting below, side effects will be executed once
  tap(_ => console.log('Side Effect #2')),
  mapTo('Result Two!')
);
//can use any type of subject
const multi = example.pipe(multicast(() => new Rx.ReplaySubject(5)));
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

* [multicast](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-multicast)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/patching/operator/multicast.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/patching/operator/multicast.ts)
