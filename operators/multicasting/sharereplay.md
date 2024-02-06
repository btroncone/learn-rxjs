# shareReplay

#### signature: `shareReplay(bufferSize?: number, windowTime?: number, scheduler?I IScheduler): Observable`

## Share source and replay specified number of emissions on subscription.

### Why use `shareReplay`?

You generally want to use `shareReplay` when you have side-effects or taxing
computations that you do not wish to be executed amongst multiple subscribers.
It may also be valuable in situations where you know you will have late
subscribers to a stream that need access to previously emitted values. This
ability to _replay_ values on subscription is what differentiates
[`share`](./share.md) and `shareReplay`.

For instance, suppose you have an observable that emits the last visited url. In
the first example we are going to use [`share`](./share.md):

```js
// simulate url change with subject
const routeEnd = new Subject<{data: any, url: string}>();

// grab url and share with subscribers
const lastUrl = routeEnd.pipe(
  pluck('url'),
  share()
);

// initial subscriber required
const initialSubscriber = lastUrl.subscribe(console.log);

// simulate route change
routeEnd.next({data: {}, url: 'my-path'});

// nothing logged
const lateSubscriber = lastUrl.subscribe(console.log);
```

In the above example nothing is logged as the `lateSubscriber` subscribes to the
source. Now suppose instead we wanted to give access to the last emitted value
on subscription, we can accomplish this with `shareReplay`:

```js
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { pluck, share, shareReplay, tap } from 'rxjs/operators';

// simulate url change with subject
const routeEnd = new Subject<{data: any, url: string}>();

// grab url and share with subscribers
const lastUrl = routeEnd.pipe(
  tap(_ => console.log('executed')),
  pluck('url'),
  // defaults to all values so we set it to just keep and replay last one
  shareReplay(1)
);

// requires initial subscription
const initialSubscriber = lastUrl.subscribe(console.log);

// simulate route change
// logged: 'executed', 'my-path'
routeEnd.next({data: {}, url: 'my-path'});

// logged: 'my-path'
const lateSubscriber = lastUrl.subscribe(console.log);
```

Note that this is similar behavior to what you would see if you subscribed a
`ReplaySubject` to the `lastUrl` stream, then subscribed to that `Subject`:

```js
// simulate url change with subject
const routeEnd = new Subject<{data: any, url: string}>();

// instead of using shareReplay, use ReplaySubject
const shareWithReplay = new ReplaySubject();

// grab url and share with subscribers
const lastUrl = routeEnd.pipe(
  pluck('url')
)
.subscribe(val => shareWithReplay.next(val));

// simulate route change
routeEnd.next({data: {}, url: 'my-path'});

// subscribe to ReplaySubject instead
// logged: 'my path'
shareWithReplay.subscribe(console.log);
```

In fact, if we dig into the source code we can see a very similar technique is
being used. When a subscription is made, `shareReplay` will subscribe to the
source, sending values through an internal `ReplaySubject`:

(
[source](https://github.com/ReactiveX/rxjs/blob/b25db9f369b07f26cf2fc11714ec1990b78a4536/src/internal/operators/shareReplay.ts#L26-L37)
)

```js
  return function shareReplayOperation(this: Subscriber<T>, source: Observable<T>) {
    refCount++;
    if (!subject || hasError) {
      hasError = false;
      subject = new ReplaySubject<T>(bufferSize, windowTime, scheduler);
      subscription = source.subscribe({
        next(value) { subject.next(value); },
        error(err) {
          hasError = true;
          subject.error(err);
        },
        complete() {
          isComplete = true;
          subject.complete();
        },
      });
    }


    const innerSub = subject.subscribe(this);


    return () => {
      refCount--;
      innerSub.unsubscribe();
      if (subscription && refCount === 0 && isComplete) {
        subscription.unsubscribe();
      }
    };
  };
}
```

[![Ultimate RxJS](https://ultimatecourses.com/static/banners/banner-rxjs.svg 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: Multiple subscribers sharing source

(
[Stackblitz](https://stackblitz.com/edit/typescript-9cfnxm?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { Subject, ReplaySubject } from 'rxjs';
import { pluck, share, shareReplay, tap } from 'rxjs/operators';

// simulate url change with subject
const routeEnd = new Subject<{data: any, url: string}>();
// grab url and share with subscribers
const lastUrl = routeEnd.pipe(
  tap(_ => console.log('executed')),
  pluck('url'),
  // defaults to all values so we set it to just keep and replay last one
  shareReplay(1)
);
// requires initial subscription
const initialSubscriber = lastUrl.subscribe(console.log)
// simulate route change
// logged: 'executed', 'my-path'
routeEnd.next({data: {}, url: 'my-path'});
// logged: 'my-path'
const lateSubscriber = lastUrl.subscribe(console.log);
```

### Additional Resources

- [shareReplay](https://rxjs.dev/api/operators/shareReplay) 📰 - Official docs

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/shareReplay.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/shareReplay.ts)
