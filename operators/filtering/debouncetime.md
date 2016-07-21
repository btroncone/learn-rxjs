# debounceTime
####signature: `debounceTime(dueTime: number, scheduler: Scheduler): Observable`

### Description

###### TL;DR: Throw away all emitted values that take less then the specified time between output

The **debounceTime** operator is not to be confused with the delay operator.  The output value is most current in the 
stream with no backlog of values waiting to be emitted.  The timer on this operator will reset if the source emits a value. 
Given the example below, if you spam the input, debounce will keep resetting its timer.  Until there’s a period of quite 
(0.5s), you will receive no output.

### Examples

##### Example 1: Debouncing based on time between input

( [jsBin](http://jsbin.com/kacijarogi/1/edit?js,console,output) | [jsFiddle](https://jsfiddle.net/btroncone/7kbg4q2e/) )

```js
const input = document.getElementById('example');

//for every keyup, map to current input value
const example = Rx.Observable
  .fromEvent(input, 'keyup')
  .map(i => i.currentTarget.value);

//wait .5s between keyups to emit current value
//throw away all other values
const debouncedInput = example.debounceTime(500);

//log values
const subscribe = debouncedInput.subscribe(val => {
  console.log(`Debounced Input: ${val}`);
});
```


### Additional Resources
* [debounceTime](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-debounceTime) :newspaper: - Official docs
* [Transformation operator: debounce and debounceTime](https://egghead.io/lessons/rxjs-transformation-operators-debounce-and-debouncetime?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/debounceTime.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/debounceTime.ts)