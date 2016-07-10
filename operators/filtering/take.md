# take
####signature: ` take(count: number): Observable`
*The gist: Emit only specified number of values...*


### Examples

##### Example 1: Take 1 value from source

( [jsBin](http://jsbin.com/vaxitupiwi/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/f9bz0tr3/) )

```js
//emit 1,2,3,4,5
const source = Rx.Observable.of(1,2,3,4,5);
//take the first emitted value then complete
const example = source.take(1);
//output: 1
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Take the first 5 values from source

( [jsBin](http://jsbin.com/lovawayefe/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/g1fhxgua/) )

```js
//emit value every 1s
const interval = Rx.Observable.interval(1000);
//take the first 5 emitted values
const example = interval.take(5);
//output: 0,1,2,3,4
const subscribe = example.subscribe(val => console.log(val));
```

### Follow the source code...
1. [Operator subscribes to source observable](https://github.com/ReactiveX/rxjs/blob/master/src/operator/take.ts#L60)
2. For each value emitted from source an internal counter is incremented
    1. **IF** - [The total number of values emitted from source is less than or equal to supplied value, deliver value to subscriber](https://github.com/ReactiveX/rxjs/blob/master/src/operator/take.ts#L78-L79)
    2. **IF** - [The total number of values emitted from source is greater than supplied value, unsubscribe and complete](https://github.com/ReactiveX/rxjs/blob/master/src/operator/take.ts#L80-L83)


### Additional Resources
* [take](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-take) :newspaper: - Official docs
* [Filtering operator: take, first, skip](https://egghead.io/lessons/rxjs-filtering-operators-take-first-skip?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz