# groupBy

#### signature: `groupBy(keySelector: Function, elementSelector: Function): Observable`

## Group into observables based on provided value.

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Group by property

( [StackBlitz](https://stackblitz.com/edit/typescript-j7mjt7?file=index.ts&devtoolsheight=50) |
[jsBin](http://jsbin.com/buworowuye/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/utncxxvf/) )

```js
// RxJS v6+
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';

const people = [
  { name: 'Sue', age: 25 },
  { name: 'Joe', age: 30 },
  { name: 'Frank', age: 25 },
  { name: 'Sarah', age: 35 }
];
//emit each person
const source = from(people);
//group by age
const example = source.pipe(
  groupBy(person => person.age),
  // return each item in group as array
  mergeMap(group => group.pipe(toArray()))
);
/*
  output:
  [{age: 25, name: "Sue"},{age: 25, name: "Frank"}]
  [{age: 30, name: "Joe"}]
  [{age: 35, name: "Sarah"}]
*/
const subscribe = example.subscribe(val => console.log(val));
```

### Additional Resources

* [groupBy](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-groupBy)
  :newspaper: - Official docs
* [Group higher order observables with RxJS groupBy](https://egghead.io/lessons/rxjs-group-higher-order-observables-with-rxjs-groupby?course=use-higher-order-observables-in-rxjs-effectively)
  :video_camera: :dollar: - André Staltz
* [Use groupBy in real RxJS applications](https://egghead.io/lessons/rxjs-use-groupby-in-real-rxjs-applications?course=use-higher-order-observables-in-rxjs-effectively)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/groupBy.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/groupBy.ts)
