# groupBy

#### signature: `groupBy(keySelector: Function, elementSelector: Function): Observable`

## Group into observables based on provided value.

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX "Ultimate RxJS")](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: Group by property

(
[StackBlitz](https://stackblitz.com/edit/typescript-dozkcg?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/buworowuye/edit?js,console) |
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

##### Example 2: Group by into key - values

(
[StackBlitz](https://stackblitz.com/edit/rxjs-groupby-key-vals?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { from, of, zip } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';

const people = [
  { name: 'Sue', age: 25 },
  { name: 'Joe', age: 30 },
  { name: 'Frank', age: 25 },
  { name: 'Sarah', age: 35 }
];

from(people)
  .pipe(
    groupBy(person => person.age, p => p.name),
    mergeMap(group => zip(of(group.key), group.pipe(toArray())))
  )
  .subscribe(console.log);

/*
  output:
  [25, ["Sue", "Frank"]]
  [30, ["Joe"]]
  [35, ["Sarah"]]
*/
```

### Additional Resources

- [groupBy](https://rxjs.dev/api/operators/groupBy)
  📰 - Official docs
- [Group higher order observables with RxJS groupBy](https://egghead.io/lessons/rxjs-group-higher-order-observables-with-rxjs-groupby?course=use-higher-order-observables-in-rxjs-effectively)
  🎥 💵 - André Staltz
- [Use groupBy in real RxJS applications](https://egghead.io/lessons/rxjs-use-groupby-in-real-rxjs-applications?course=use-higher-order-observables-in-rxjs-effectively)
  🎥 💵 - André Staltz

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/groupBy.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/groupBy.ts)
