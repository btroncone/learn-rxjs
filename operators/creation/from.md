# from

####signature: `from(ish: ObservableInput, mapFn: function, thisArg: any, scheduler: Scheduler): Observable`
*The gist: Turn an array, promise, or iterable into an observable...*

( [jsBin](http://jsbin.com/yunebajugi/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/o7kb5e6j/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-from) )

```js
//emit array as a sequence of values
const arraySource = Rx.Observable.from([1,2,3,4,5]);
//output: 1,2,3,4,5
const subscribe = arraySource.subscribe(val => console.log(val));

//emit result of promise
const promiseSource = Rx.Observable.from(new Promise(resolve => resolve('Hello World!')));
//output: 'Hello World'
const subscribeTwo = promiseSource.subscribe(val => console.log(val));

//works on js collections
const map = new Map();
map.set(1, 'Hi');
map.set(2, 'Bye');

const mapSource = Rx.Observable.from(map);
//output: [1, 'Hi'], [2, 'Bye']
const subscribeThree = mapSource.subscribe(val => console.log(val));
```

### How from works...
*Coming soon...*


### Additional Resources
* [Creation operators: from, fromArray, fromPromise](https://egghead.io/lessons/rxjs-creation-operators-from-fromarray-frompromise?course=rxjs-beyond-the-basics-creating-observables-from-scratch) :video_camera: :dollar: - André Staltz