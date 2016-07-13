# takeWhile
####signature: `takeWhile(predicate: function(value, index): boolean): Observable`

### Description

###### TL;DR: Emit values until one fails test

*Description coming soon...*

### Examples

##### Example 1: Take values under limit

( [jsBin](http://jsbin.com/zanefaqexu/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/yakd4jgc/) )

```js
//emit 1,2,3,4,5
const source = Rx.Observable.of(1,2,3,4,5);
//allow values until value from source is greater then 4, then complete
const example = source.takeWhile(val => val <= 4);
//output: 1,2,3,4
const subscribe = example.subscribe(val => console.log(val));
```


### Additional Resources
* [takeWhile](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-takeWhile) :newspaper: - Official docs
* [Completing a stream with takeWhile](https://egghead.io/lessons/rxjs-completing-a-stream-with-takewhile?course=step-by-step-async-javascript-with-rxjs) :video_camera: :dollar: - John Linquist

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/takeWhile.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/takeWhile.ts)