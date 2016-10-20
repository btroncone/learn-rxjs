# bufferTime(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler)

### TL;DR: Collects emitted values within the timeframe then output them as an array.

### Description
The `bufferTime` operator buffer the values based on the specified time span.  The operator is not dependent on the current time span in order to completes but completes immediately after the source does.


### Arguments

#### [bufferTimeSpan : number](#example-1-buffer-for-2-seconds)
This argument allows us to specify the time frame at which the operator would buffer and emit.  The operator will collect the values during this time frame, then at the end, emits an array of the accumulated values and start a new collection.  This will continues until the source completes.  If this argument is not provided, what you will see is a continuous emission that could potentially overload your system depending on what you're doing.

#### [bufferCreationInterval? : number](#example-2-multiple-active-buffers)
`bufferCreationInterval` indicates when the next buffer should start (in ms).  If the argument is larger than the buffer time, the result would be a gap in between arrays.  For example, if you have a source that emits a value every second, a `bufferTimeSpan` of 3 seconds, and a `bufferCreationInterval` of 5 seconds, you will get an output that skips two source emissions because the new buffer would not start until two seconds after the previous buffer has been filled.  Alternatively, if `bufferCreationInterval` was smaller, you would see overlapping data in the buffer emissions.

#### [maxBufferSize? : number](#example-3-max-buffer-size)
`maxBufferSize` is a number(ms) that allows you place a cap on how big the buffer gets.  If the source outputs more data then you're interested in, you can restrict the size of this buffer to take only so many values.  You must becareful in this, however, because if the buffer caps before the next buffer starts, you might not be able to catch the output.  If capped correctly, you will be able to reduce overlapping data resulting from small `bufferCreationInterval`.  Note that this number must be an whole, non-negative number.  That is, if you provide a negative number and/or a decimal, this will not work.

#### scheduler? : function
By default, the scheduler is null. When provided, the user can dictate when an action is to take place. This allows order tasks and schedule execution.


### Examples

##### Example 1: Buffer for 2 seconds

( [jsBin](http://jsbin.com/bafakiyife/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/vx7vwg01/) )

```js
//Create an observable that emits a value every 500ms
const source = Rx.Observable.interval(500);
//After 2 seconds have passed, emit buffered values as an array
const example = source.bufferTime(2000);
//Print values to console
//ex. output [0,1,2]...[3,4,5,6]
const subscribe = example.subscribe(val => console.log('Buffered with Time:', val));
```

##### Example 2: Multiple active buffers

( [jsBin](http://jsbin.com/tadiwiniri/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/7k4ygj1x/) )

```js
//Create an observable that emits a value every 500ms
const source = Rx.Observable.interval(500);
/*
bufferTime also takes second argument, when to start the next buffer (time in ms)
for instance, if we have a bufferTime of 2 seconds but second argument (bufferCreationInterval) of 1 second:
ex. output: [0,1,2]...[1,2,3,4,5]...[3,4,5,6,7]
*/
const example = source.bufferTime(2000,1000);
//Print values to console
const subscribe = example.subscribe(val => console.log('Start Buffer Every 1s:', val));
```

#### Example 3: Max Buffer Size

( [jsFiddle](https://jsfiddle.net/apv1onh2/) )

```js
console.clear();

const source = Rx.Observable.interval(50);

//Try toggling the maxBufferSize between 3 to 5.  Note the data gap and overlap in between each emission.
const example = source.bufferTime(400, 200, 4);
const subscribe = example.subscribe(val => console.log('Buffered with Time:', val));
```


### Additional Resources
* [bufferTime](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-bufferTime) :newspaper: - Official docs

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/bufferTime.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/bufferTime.ts)
