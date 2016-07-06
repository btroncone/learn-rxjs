# bufferTime
####signature: `bufferTime(bufferTimeSpan: number, bufferCreationInterval: number, scheduler: Scheduler): Observable`
*The gist: Collect output values until specified time has passed then hand them over. Repeat...*

( [jsBin](http://jsbin.com/hizuxiruqa/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/vx7vwg01/) )

```js
//Create an observable that emits a value every 500ms
const source = Rx.Observable.interval(500);
//After 2 seconds have passed, emit buffered values as an array
const bufferTime = source.bufferTime(2000);
//Print values to console
//ex. output [0,1,2]...[3,4,5,6]
const subscribe = bufferTime.subscribe(val => console.log('Buffered with Time:', val));

/*
bufferTime also takes second argument, when to start the next buffer (time in ms)
for instance, if we have a bufferTime of 2 seconds but second argument (bufferCreationInterval) of 1 second:
ex. output: [0,1,2]...[1,2,3,4,5]...[3,4,5,6,7]
*/
const bufferTimeTwo = source.bufferTime(2000,1000);
//Print values to console
const secondSubscribe = bufferTimeTwo.subscribe(val => console.log('Start Buffer Every 1s:', val));
```

### How bufferTime works...
*Coming soon...*

### Additional Resources
* [bufferTime](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-bufferTime) :newspaper: - Official docs