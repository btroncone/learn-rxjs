# pluck

#### signature: `pluck(properties: ...args): Observable`

## Select properties to emit.

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Pluck object property

( [jsBin](http://jsbin.com/zokaxiwahe/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/58v9xq0f/) )

```js
import { from } from 'rxjs/observable/from';
import { pluck } from 'rxjs/operators';

const source = from([{ name: 'Joe', age: 30 }, { name: 'Sarah', age: 35 }]);
//grab names
const example = source.pipe(pluck('name'));
//output: "Joe", "Sarah"
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Pluck nested properties

( [jsBin](http://jsbin.com/joqesidugu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/n592m597/) )

```js
import { from } from 'rxjs/observable/from';
import { pluck } from 'rxjs/operators';

const source = from([
  { name: 'Joe', age: 30, job: { title: 'Developer', language: 'JavaScript' } },
  //will return undefined when no job is found
  { name: 'Sarah', age: 35 }
]);
//grab title property under job
const example = source.pipe(pluck('job', 'title'));
//output: "Developer" , undefined
const subscribe = example.subscribe(val => console.log(val));
```

### Additional Resources

* [pluck](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-pluck)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/pluck.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/pluck.ts)
