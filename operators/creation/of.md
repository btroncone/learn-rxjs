# of

####signature: ` of(...values, scheduler: Scheduler): Observable`
*The gist: Emits provided values...*

### Examples

##### Example 1: Emitting a sequence of numbers

( [jsBin](http://jsbin.com/kodixitoji/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/f7b35ayz/) )

```js
//emits any number of provided values in sequence
const source = Rx.Observable.of(1,2,3,4,5);
//output: 1,2,3,4,5
const subscribe = source.subscribe(val => console.log(val));
```

##### Example 2: Emitting an object, array, and function

( [jsBin](http://jsbin.com/xevobujama/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/d9rng4dj/) )

```js
//emits values of any type
const source = Rx.Observable.of({name: 'Brian'}, [1,2,3], function hello(){ return 'Hello'});
//output: {name: 'Brian}, [1,2,3], function hello() { return 'Hello' }
const subscribe = source.subscribe(val => console.log(val));
```


### Additional Resources
* [of](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-of) :newspaper: - Official docs
* [Creation operators: of](https://egghead.io/lessons/rxjs-creation-operator-of?course=rxjs-beyond-the-basics-creating-observables-from-scratch) :video_camera: :dollar: - André Staltz


> :file_folder: [https://github.com/ReactiveX/rxjs/blob/master/src/observable/ArrayObservable.ts](https://github.com/ReactiveX/rxjs/blob/master/src/observable/ArrayObservable.ts)
