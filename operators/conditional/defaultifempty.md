# defaultIfEmpty

#### signature: `defaultIfEmpty(defaultValue: any): Observable`

## Emit given value if nothing is emitted before completion.

### Examples

##### Example 1: Default for empty value

( [jsBin](http://jsbin.com/yawumoqatu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/8ex96cov/) )

```js
const empty = Rx.Observable.of();
//emit 'Observable.of() Empty!' when empty, else any values from source
const exampleOne = empty.defaultIfEmpty('Observable.of() Empty!');
//output: 'Observable.of() Empty!'
const subscribe = exampleOne.subscribe(val => console.log(val));
```

##### Example 2: Default for Observable.empty

( [jsBin](http://jsbin.com/kojafuvesu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/3edw828p/) )

```js
//empty observable
const empty = Rx.Observable.empty();
//emit 'Observable.empty()!' when empty, else any values from source
const example = empty.defaultIfEmpty('Observable.empty()!');
//output: 'Observable.empty()!'
const subscribe = example.subscribe(val => console.log(val));
```

### Additional Resources

* [defaultIfEmpty](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-defaultIfEmpty)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/operator/defaultIfEmpty.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/defaultIfEmpty.ts)
