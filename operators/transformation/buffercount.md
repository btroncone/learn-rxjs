# bufferCount
####signature: `bufferCount(bufferSize: number, startBufferEvery: number = null): Observable`
*The gist: Collect output values until specified number is fulfilled then hand them over. Repeat...*


### Examples

##### Example 1: Collect buffer and emit after specified number of values

( [jsBin](http://jsbin.com/suveqaromu/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/ky9myc5b/) )

```js
//Create an observable that emits a value every second
const source = Rx.Observable.interval(1000);
//After three values are emitted, pass on as an array of buffered values
const bufferThree = source.bufferCount(3);
//Print values to console
//ex. output [0,1,2]...[3,4,5]
const subscribe = bufferThree.subscribe(val => console.log('Buffered Values:', val));
```

##### Example 2: Overlapping buffers

( [jsBin](http://jsbin.com/kiloxiraya/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/3c67qcz1/) )

```js
//Create an observable that emits a value every second
const source = Rx.Observable.interval(1000);
/*
bufferCount also takes second argument, when to start the next buffer
for instance, if we have a bufferCount of 3 but second argument (startBufferEvery) of 1:
1st interval value:
buffer 1: [0]
2nd interval value:
buffer 1: [0,1]
buffer 2: [1]
3rd interval value:
buffer 1: [0,1,2] Buffer of 3, emit buffer
buffer 2: [1,2]
buffer 3: [2]
4th interval value:
buffer 2: [1,2,3] Buffer of 3, emit buffer
buffer 3: [2, 3]
buffer 4: [3]
*/
const bufferEveryOne = source.bufferCount(3,1);
//Print values to console
const subscribe = bufferEveryOne.subscribe(val => console.log('Start Buffer Every 1:', val));
```

### Follow the Source Code
*On subscription...*

1. [Operator subscribes to source observable](https://github.com/ReactiveX/rxjs/blob/master/src/operator/bufferCount.ts#L59)

*When value is emitted from source...*

1. [Each value is pushed to internal array](https://github.com/ReactiveX/rxjs/blob/master/src/operator/bufferCount.ts#L91)
    1. **IF** - [The second parameter, *startBufferEvery* is supplied, an additional buffer array will be created for every given values emitted from source](https://github.com/ReactiveX/rxjs/blob/master/src/operator/bufferCount.ts#L85-L87)
2. [When supplied buffer size is met, buffer is emitted to subscriber and removed](https://github.com/ReactiveX/rxjs/blob/master/src/operator/bufferCount.ts#L92-L100)

### Additional Resources
* [bufferCount](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-bufferCount) :newspaper: - Official docs