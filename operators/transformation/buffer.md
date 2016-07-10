# buffer
####signature: `buffer(closingNotifier: Observable): Observable`
*The gist: Collect output values until something happens then hand them over. Repeat...*

### Examples

##### Example 1: Buffer until document click

( [jsBin](http://jsbin.com/fazimarajo/edit?js,console,output) | [jsFiddle](https://jsfiddle.net/btroncone/7451s67k/) )

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

### Follow the Source Code
*On subscription...*

1. [Operator subscribes to source observable](https://github.com/ReactiveX/rxjs/blob/master/src/operator/buffer.ts#L55)
2. [An inner subscriber is created](https://github.com/ReactiveX/rxjs/blob/master/src/util/subscribeToResult.ts#L21) and [subscribed to the given inner observable](https://github.com/ReactiveX/rxjs/blob/master/src/util/subscribeToResult.ts#L33), or *closing notifier*
3. [Values emitted from source are pushed to internal array](https://github.com/ReactiveX/rxjs/blob/master/src/operator/buffer.ts#L73)
4. [When the given inner observable emits](https://github.com/ReactiveX/rxjs/blob/master/src/InnerSubscriber.ts#L17), the [buffer is cleared and emitted to subscriber](https://github.com/ReactiveX/rxjs/blob/master/src/operator/buffer.ts#L76-L82). Repeat...

### Additional Resources
* [buffer](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-buffer) :newspaper: - Official docs
* [Transformation operator: buffer](https://egghead.io/lessons/rxjs-transformation-operator-buffer?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz
