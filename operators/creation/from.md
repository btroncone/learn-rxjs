# from
####signature: `from(ish: ObservableInput, mapFn: function, thisArg: any, scheduler: Scheduler): Observable`

### Description

###### TL;DR: Turn an array, promise, or iterable into an observable

The **from** operator turns any iterable item or promise into an observable that will emit that item.  In the case of a
promise, this new observable will emit the resolve of the promise.  If the iterable item is a string, each character is
emitted in order.

### Examples

##### Example 1: Observable from array

( [jsBin](http://jsbin.com/foceyuketi/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/o7kb5e6j/) )

```js
//emit array as a sequence of values
const arraySource = Rx.Observable.from([1,2,3,4,5]);
//output: 1,2,3,4,5
const subscribe = arraySource.subscribe(val => console.log(val));
```

##### Example 2: Observable from promise

( [jsBin](http://jsbin.com/tamofinujo/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/2czc5sae/) )

```js
//emit result of promise
const promiseSource = Rx.Observable.from(new Promise(resolve => resolve('Hello World!')));
//output: 'Hello World'
const subscribe = promiseSource.subscribe(val => console.log(val));
```

##### Example 3: Observable from collection

( [jsBin](http://jsbin.com/tezohobudu/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/ae6hu9a8/) )

```js
//works on js collections
const map = new Map();
map.set(1, 'Hi');
map.set(2, 'Bye');

const mapSource = Rx.Observable.from(map);
//output: [1, 'Hi'], [2, 'Bye']
const subscribe = mapSource.subscribe(val => console.log(val));
```


### Additional Resources
* [from](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-from) :newspaper: - Official docs
* [Creation operators: from, fromArray, fromPromise](https://egghead.io/lessons/rxjs-creation-operators-from-fromarray-frompromise?course=rxjs-beyond-the-basics-creating-observables-from-scratch) :video_camera: :dollar: - André Staltz

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/observable/FromObservable.ts](https://github.com/ReactiveX/rxjs/blob/master/src/observable/FromObservable.ts)
