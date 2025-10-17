# create

## Deprecated: Use `new Observable()` instead

> ⚠️ **Important**: `Observable.create()` was deprecated in RxJS v6.4.0. Use the `new Observable()` constructor instead.

**signature**: `new Observable(subscribe: (observer: Observer) => TeardownLogic)`

```typescript
new Observable(subscribe: (observer: Observer) => TeardownLogic)
```

Create a custom observable by defining subscription behavior.

---

## 💡 Tips

- **Consider creation operators first**: Before creating a custom observable, check if operators like [defer](./defer.md), [from](./from.md), [fromEvent](./fromevent.md), or [interval](./interval.md) already solve your use case
- **Use for bridging non-reactive APIs**: Custom observables shine when wrapping callbacks, event emitters, WebSockets, or other non-observable data sources
- **Always return teardown logic**: Return a cleanup function to prevent memory leaks when subscriptions end

---

## Why use a custom observable?

Custom observables are your bridge between the non-reactive world and RxJS. Think of them as adapters—when you have a data source that doesn't speak "Observable" (like a WebSocket connection, a third-party library with callbacks, or a browser API like Geolocation), creating a custom observable lets you wrap it up and make it play nicely with the rest of your reactive code.

Here's the thing: **you'll rarely need to create custom observables**. RxJS already provides creation operators for most common scenarios. Timers, events, promises, arrays, and more. But when you encounter an API that doesn't fit any existing operator, custom observables give you fine-grained control. You decide exactly when to emit values (observer.next()), how to handle errors (observer.error()), and what cleanup should happen when someone unsubscribes.

One way to think about this is like writing a translator. The non-reactive API speaks one language, your Observable streams speak another, and your custom observable sits in the middle making sure they understand each other. When implementing [the cleanup function](#example-2-observable-with-proper-cleanup), remember that this is your chance to be a good citizen. Close connections, cancel timers, remove listeners. It's like turning off the lights when you leave a room.

In essence, custom observables are powerful but should be used sparingly. If an existing creation operator can do the job, use that. But when you need that extra control—when you're integrating with legacy code, third-party libraries, or unusual data sources, this is your tool.

---

## Examples

### Example 1: Simple custom observable that emits multiple values

([StackBlitz](https://stackblitz.com/edit/typescript-meebpsdr?file=index.ts))

```typescript
// RxJS v6+
import { Observable } from 'rxjs';

/*
  Create an observable that emits 'Hello' and 'World' on subscription.
  Note: Using the modern constructor syntax, not the deprecated Observable.create()
*/
const hello$ = new Observable(observer => {
  observer.next('Hello');
  observer.next('World');
  observer.complete();
});

// Output: 'Hello'...'World'
const subscription = hello$.subscribe(val => console.log(val));
```

### Example 2: Observable with proper cleanup

([StackBlitz](https://stackblitz.com/edit/typescript-wbwrxn67?file=index.ts))

```typescript
// RxJS v6+
import { Observable } from 'rxjs';

/*
  Create an observable that emits even numbers every second.
  Demonstrates the importance of returning a teardown function.
*/
const evenNumbers$ = new Observable(observer => {
  let value = 0;
  
  const intervalId = setInterval(() => {
    if (value % 2 === 0) {
      observer.next(value);
    }
    value++;
  }, 1000);
  
  // Return cleanup function - called when unsubscribe() is invoked
  return () => {
    console.log('Cleaning up interval');
    clearInterval(intervalId);
  };
});

// Output: 0...2...4...6...8
const subscription = evenNumbers$.subscribe(val => console.log(val));

// Unsubscribe after 10 seconds - triggers cleanup
setTimeout(() => {
  subscription.unsubscribe();
}, 10000);
```

### Example 3: Wrapping a callback-based API

([StackBlitz](https://stackblitz.com/edit/typescript-ury4kzws?file=index.ts))

```typescript
// RxJS v6+
import { Observable } from 'rxjs';

/*
  Wrap the browser's Geolocation API into an observable.
  This demonstrates how custom observables bridge non-reactive APIs.
*/
function getCurrentPosition(): Observable<GeolocationPosition> {
  return new Observable(observer => {
    // Check if geolocation is available
    if (!navigator.geolocation) {
      observer.error(new Error('Geolocation not supported'));
      return;
    }
    
    // Get position and emit it
    const watchId = navigator.geolocation.watchPosition(
      position => observer.next(position),
      error => observer.error(error),
      { enableHighAccuracy: true }
    );
    
    // Return cleanup to stop watching position when unsubscribed
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  });
}

// Usage
const position$ = getCurrentPosition();
const subscription = position$.subscribe({
  next: position => {
    console.log('Latitude:', position.coords.latitude);
    console.log('Longitude:', position.coords.longitude);
  },
  error: err => console.error('Error getting position:', err)
});

// Stop watching after 30 seconds
setTimeout(() => subscription.unsubscribe(), 30000);
```

### Example 4: Creating an observable from a WebSocket


```typescript
// RxJS v6+
import { Observable } from 'rxjs';

/*
  Wrap a WebSocket connection in an observable.
  Demonstrates managing complex async resources with proper cleanup.
*/
function createWebSocketObservable(url: string): Observable<MessageEvent> {
  return new Observable(observer => {
    const socket = new WebSocket(url);
    
    socket.onopen = () => {
      console.log('WebSocket connected');
    };
    
    socket.onmessage = (event) => {
      observer.next(event);
    };
    
    socket.onerror = (error) => {
      observer.error(error);
    };
    
    socket.onclose = () => {
      observer.complete();
    };
    
    // Cleanup: close the socket when unsubscribed
    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  });
}

// Usage
const messages$ = createWebSocketObservable('wss://example.com/socket');
const subscription = messages$.subscribe({
  next: event => console.log('Message received:', event.data),
  error: err => console.error('WebSocket error:', err),
  complete: () => console.log('WebSocket closed')
});

// Close connection after 60 seconds
setTimeout(() => subscription.unsubscribe(), 60000);
```

---

## Related Recipes

- [Smart Counter](../../recipes/smartcounter.md)

---

## Additional Resources

- [Observable](https://rxjs.dev/api/index/class/Observable) 📰 - Official docs
- [Observable Constructor](https://rxjs.dev/api/index/class/Observable#constructor) 📰 - Official constructor docs

---

**📁 Source Code:** [https://github.com/ReactiveX/rxjs/blob/master/packages/observable/src/observable.ts](https://github.com/ReactiveX/rxjs/blob/master/packages/observable/src/observable.ts)