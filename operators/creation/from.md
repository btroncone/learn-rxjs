# from

#### signature: `from(ish: ObservableInput, mapFn: function, thisArg: any, scheduler: Scheduler): Observable`

## Turn an array, promise, or iterable into an observable.

---

:bulb: This operator can be used to convert a promise to an observable!

:bulb: For arrays and iterables, all contained values will be emitted as a
sequence!

:bulb: This operator can also be used to emit a string as a sequence of
characters!

---

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/angular"><img src="https://ultimatecourses.com/assets/img/banners/ultimate-angular-leader.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Observable from array

(
[StackBlitz](https://stackblitz.com/edit/typescript-sckwsw?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/foceyuketi/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/o7kb5e6j/) )

```js
// RxJS v6+
import { from } from 'rxjs';

//emit array as a sequence of values
const arraySource = from([1, 2, 3, 4, 5]);
//output: 1,2,3,4,5
const subscribe = arraySource.subscribe(val => console.log(val));
```

##### Example 2: Observable from promise

(
[StackBlitz](https://stackblitz.com/edit/typescript-clpg1f?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/tamofinujo/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/2czc5sae/) )

```js
// RxJS v6+
import { from } from 'rxjs';

//emit result of promise
const promiseSource = from(new Promise(resolve => resolve('Hello World!')));
//output: 'Hello World'
const subscribe = promiseSource.subscribe(val => console.log(val));
```

##### Example 3: Observable from collection

(
[StackBlitz](https://stackblitz.com/edit/typescript-drfckx?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/tezohobudu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/ae6hu9a8/) )

```js
// RxJS v6+
import { from } from 'rxjs';

//works on js collections
const map = new Map();
map.set(1, 'Hi');
map.set(2, 'Bye');

const mapSource = from(map);
//output: [1, 'Hi'], [2, 'Bye']
const subscribe = mapSource.subscribe(val => console.log(val));
```

##### Example 4: Observable from string

(
[StackBlitz](https://stackblitz.com/edit/typescript-19nejh?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/wenozubana/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/hfvzjcvL/) )

```js
// RxJS v6+
import { from } from 'rxjs';

//emit string as a sequence
const source = from('Hello World');
//output: 'H','e','l','l','o',' ','W','o','r','l','d'
const subscribe = source.subscribe(val => console.log(val));
```

### Related Recipes

- [Progress Bar](../../recipes/progressbar.md)
- [HTTP Polling](../../recipes/http-polling.md)
- [Lockscreen](../../recipes/lockscreen.md)

### Additional Resources

- [from](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-from)
  :newspaper: - Official docs
- [Creation operators: from, fromArray, fromPromise](https://egghead.io/lessons/rxjs-creation-operators-from-fromarray-frompromise?course=rxjs-beyond-the-basics-creating-observables-from-scratch)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/from.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/from.ts)
