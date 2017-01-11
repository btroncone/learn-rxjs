# concatMap
####signature: `concatMap(project: function, resultSelector: function): Observable`

## Map values to inner observable, subscribe and emit in order.

### Examples

##### Example 1: Map to inner observable

( [jsBin](http://jsbin.com/powivemaxu/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/y3yx666r/) )

```js
//emit 'Hello' and 'Goodbye'
const source = Rx.Observable.of('Hello', 'Goodbye');
// map value from source into inner observable, when complete emit result and move to next
const example = source.concatMap(val => Rx.Observable.of(`${val} World!`));
//output: 'Example One: 'Hello World', Example One: 'Goodbye World'
const subscribe = example
  .subscribe(val => console.log('Example One:', val));
```

##### Example 2: Map to promise

( [jsBin](http://jsbin.com/celixodeba/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/Lym33L97//) )


```js
//emit 'Hello' and 'Goodbye'
const source = Rx.Observable.of('Hello', 'Goodbye');
//example with promise
const examplePromise = val => new Promise(resolve => resolve(`${val} World!`));
// map value from source into inner observable, when complete emit result and move to next
const example = source.concatMap(val => examplePromise(val))
//output: 'Example w/ Promise: 'Hello World', Example w/ Promise: 'Goodbye World'
const subscribe = example.subscribe(val => console.log('Example w/ Promise:', val));
```

##### Example 3: Supplying a projection function

( [jsBin](http://jsbin.com/vihacewozo/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/5sr5zzgy/) )

```js
//emit 'Hello' and 'Goodbye'
const source = Rx.Observable.of('Hello', 'Goodbye');
//example with promise
const examplePromise = val => new Promise(resolve => resolve(`${val} World!`));
//result of first param passed to second param selector function before being  returned
const example = source.concatMap(val => examplePromise(val), result => `${result} w/ selector!`);
//output: 'Example w/ Selector: 'Hello w/ Selector', Example w/ Selector: 'Goodbye w/ Selector'
const subscribe = example.subscribe(val => console.log('Example w/ Selector:', val));
```


### Additional Resources
* [concatMap](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-concatMap) :newspaper: - Official docs
* [Use RxJS concatMap to map and concat higher order observables](https://egghead.io/lessons/rxjs-use-rxjs-concatmap-to-map-and-concat-high-order-observables?course=use-higher-order-observables-in-rxjs-effectively) :video_camera: :dollar: - André Staltz

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/concatMap.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/concatMap.ts)
