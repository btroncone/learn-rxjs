# from

#### signature: `from(ish: ObservableInput, mapFn: function, thisArg: any, scheduler: Scheduler): Observable`

## Turn an array, promise, or iterable into an observable.

---

:bulb: For arrays and iterables, all contained values will be emitted as a
sequence!

:bulb: This operator can also be used to emit a string as a sequence of
characters!

---

<a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a>

### Examples

##### Example 1: Observable from array

( [jsBin](http://jsbin.com/foceyuketi/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/o7kb5e6j/) )

```js
import { from } from 'rxjs/observable/from';

//emit array as a sequence of values
const arraySource = from([1, 2, 3, 4, 5]);
//output: 1,2,3,4,5
const subscribe = arraySource.subscribe(val => console.log(val));
```

##### Example 2: Observable from promise

( [jsBin](http://jsbin.com/tamofinujo/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/2czc5sae/) )

```js
import { from } from 'rxjs/observable/from';

//emit result of promise
const promiseSource = from(new Promise(resolve => resolve('Hello World!')));
//output: 'Hello World'
const subscribe = promiseSource.subscribe(val => console.log(val));
```

##### Example 3: Observable from collection

( [jsBin](http://jsbin.com/tezohobudu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/ae6hu9a8/) )

```js
import { from } from 'rxjs/observable/from';

//works on js collections
const map = new Map();
map.set(1, 'Hi');
map.set(2, 'Bye');

const mapSource = from(map);
//output: [1, 'Hi'], [2, 'Bye']
const subscribe = mapSource.subscribe(val => console.log(val));
```

##### Example 4: Observable from string

( [jsBin](http://jsbin.com/wenozubana/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/hfvzjcvL/) )

```js
import { from } from 'rxjs/observable/from';

//emit string as a sequence
const source = from('Hello World');
//output: 'H','e','l','l','o',' ','W','o','r','l','d'
const subscribe = source.subscribe(val => console.log(val));
```

### Additional Resources

* [from](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-from)
  :newspaper: - Official docs
* [Creation operators: from, fromArray, fromPromise](https://egghead.io/lessons/rxjs-creation-operators-from-fromarray-frompromise?course=rxjs-beyond-the-basics-creating-observables-from-scratch)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/from.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/from.ts)
