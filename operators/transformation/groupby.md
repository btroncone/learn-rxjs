# groupBy
####signature: `groupBy(keySelector: Function, elementSelector: Function): Observable`

## Group into observables based on provided value.

### Examples

##### Example 1:  Group by property

( [jsBin](http://jsbin.com/zibomoluru/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/utncxxvf/) )

```js
const people = [{name: 'Sue', age:25},{name: 'Joe', age: 30},{name: 'Frank', age: 25}, {name: 'Sarah', age: 35}];
//emit each person
const source = Rx.Observable.from(people);
//group by age
const example = source
  .groupBy(person => person.age)
  //return as array of each group
  .flatMap(group => group.reduce((acc, curr) => [...acc, ...curr], []))
/*
  output:
  [{age: 25, name: "Sue"},{age: 25, name: "Frank"}]
  [{age: 30, name: "Joe"}]
  [{age: 35, name: "Sarah"}]
*/
const subscribe = example.subscribe(val => console.log(val));
```


### Additional Resources
* [groupBy](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-groupBy) :newspaper: - Official docs
* [Group higher order observables with RxJS groupBy](https://egghead.io/lessons/rxjs-group-higher-order-observables-with-rxjs-groupby?course=use-higher-order-observables-in-rxjs-effectively) :video_camera: :dollar: - André Staltz
* [Use groupBy in real RxJS applications](https://egghead.io/lessons/rxjs-use-groupby-in-real-rxjs-applications?course=use-higher-order-observables-in-rxjs-effectively) :video_camera: :dollar: - André Staltz

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/groupBy.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/groupBy.ts)
