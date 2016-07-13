# buffer
####signature: `buffer(closingNotifier: Observable): Observable`

### Description

###### TL;DR: Collect output values until provided observable emits, emit as array

*Description coming soon...*

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


### Additional Resources
* [buffer](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-buffer) :newspaper: - Official docs
* [Transformation operator: buffer](https://egghead.io/lessons/rxjs-transformation-operator-buffer?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/buffer.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/buffer.ts)