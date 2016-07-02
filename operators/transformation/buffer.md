# buffer
####signature: `buffer<T>(closingNotifier: Observable<any>): Observable<T[]>`
*The gist: Collect output values until something happens then hand them over. Repeat...*

( [jsBin](http://jsbin.com/fazimarajo/edit?js,console,output) | [jsFiddle](https://jsfiddle.net/qg6qfqLz/27/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-buffer) )

```js
//Create an observable that emits a value every second
const myInterval = Rx.Observable.interval(1000);
//Create an observable that emits every time document is clicked
const bufferBy = Rx.Observable.fromEvent(document, 'click');
/*
Collect all values emitted by our interval observable until we click document. This will cause the bufferBy Observable to emit a value, satisfying the buffer. Pass us all collected values since last buffer as an array.
*/
const myBufferedInterval = myInterval.buffer(bufferBy);
//Print values to console
//ex. output: [1,2,3] ... [4,5,6,7,8]
const subscribe = myBufferedInterval.subscribe(val => console.log(' Buffered Values:', val));
```

### How buffer works...
1. [Operator subscribes to source observable](https://github.com/ReactiveX/rxjs/blob/master/src/operator/buffer.ts#L55).
2. An [inner subscriber is created](https://github.com/ReactiveX/rxjs/blob/master/src/util/subscribeToResult.ts#L21) and [subscribed to the given inner observable](https://github.com/ReactiveX/rxjs/blob/master/src/util/subscribeToResult.ts#L33), or closing notififier.
3. Values emitted from source are [pushed to internal array](https://github.com/ReactiveX/rxjs/blob/master/src/operator/buffer.ts#L73).
4. When the given [inner observable emits](https://github.com/ReactiveX/rxjs/blob/master/src/InnerSubscriber.ts#L17), the [buffer is cleared and passed to subscriber](https://github.com/ReactiveX/rxjs/blob/master/src/operator/buffer.ts#L76-L82). Repeat...

### Additional Resources
*Coming soon...*