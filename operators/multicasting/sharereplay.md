# shareReplay

#### signature: `share(bufferSize?: number, windowTime?: number, scheduler?I IScheduler): Observable`

## Share source and replay specified number of emissions on subscription.

---

:bulb: share is like [multicast](multicast.md) with a `ReplaySubject` and
refCount!

---

### Why use `shareReplay`?

You generally want to use `shareReplay` when you have side-effects or taxing
computations that you do not wish to be executed amongst multiple subscribers.
The difference between `shareReplay` and [`share`](./share.md) is late
subscribers (subscriptions after a value has been emitted) can recieve a
specified number of emitted values on subscription. For instance, suppose you
have a

Behind the scenes

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Multiple subscribers sharing source

( [Stackblitz](http://jsbin.com/jobiyomari/1/edit?js,console) )

```js
```

### Additional Resources

* [shareReplay](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-shareReplay)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/patching/operator/shareReplay.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/patching/operator/shareReplay.ts)
