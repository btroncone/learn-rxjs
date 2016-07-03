# take

####signature: ` take(count: number): Observable`
*The gist: Emit only specified number of values...*

( [jsBin](http://jsbin.com/zeputevule/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/d3pn27dv/12/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-take) )

```js
//emit 1,2,3,4,5
const source = Rx.Observable.of(1,2,3,4,5);
//take the first emitted value then complete
const example = source.take(1);
//output: 1
const subscribe = example.subscribe(val => console.log(val));

//emit value every 1s
const interval = Rx.Observable.interval(1000);
//take the first 5 emitted values
const exampleTwo = interval.take(5);
//output: 0,1,2,3,4
const subscribeTwo = exampleTwo.subscribe(val => console.log(val));
```

### How take works...
1. [Operator subscribes to source observable](https://github.com/ReactiveX/rxjs/blob/master/src/operator/take.ts#L60).
2. For each value emitted from source an internal counter is incremented.
    1. [**IF** total number of values emitted from source is less than or equal to supplied value, deliver value to subscriber](https://github.com/ReactiveX/rxjs/blob/master/src/operator/take.ts#L78-L79).
    2. [**IF** total number of values emitted from source is greater than supplied value, unsubscribe and complete](https://github.com/ReactiveX/rxjs/blob/master/src/operator/take.ts#L80-L83).


### Additional Resources
* [Filtering operator: take, first, skip](https://egghead.io/lessons/rxjs-filtering-operators-take-first-skip?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz