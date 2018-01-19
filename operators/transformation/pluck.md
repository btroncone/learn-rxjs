# pluck

#### signature: `pluck(properties: ...args): Observable`

## Select properties to emit.

### Examples

##### Example 1: Pluck object property

( [jsBin](http://jsbin.com/zokaxiwahe/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/58v9xq0f/) )

```js
const source = Rx.Observable.from([
  { name: 'Joe', age: 30 },
  { name: 'Sarah', age: 35 }
]);
//grab names
const example = source.pluck('name');
//output: "Joe", "Sarah"
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Pluck nested properties

( [jsBin](http://jsbin.com/joqesidugu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/n592m597/) )

```js
const source = Rx.Observable.from([
  { name: 'Joe', age: 30, job: { title: 'Developer', language: 'JavaScript' } },
  //will return undefined when no job is found
  { name: 'Sarah', age: 35 }
]);
//grab title property under job
const example = source.pluck('job', 'title');
//output: "Developer" , undefined
const subscribe = example.subscribe(val => console.log(val));
```

### Additional Resources

* [pluck](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-pluck)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/pluck.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/pluck.ts)
