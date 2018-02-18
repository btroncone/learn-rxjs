# map

#### signature: `map(project: Function, thisArg: any): Observable`

## Apply projection with each value from source.

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Add 10 to each number

( [jsBin](http://jsbin.com/padasukano/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/yd38awLa/) )

```js
import { from } from 'rxjs/observable/from';
import { map } from 'rxjs/operators';

//emit (1,2,3,4,5)
const source = from([1, 2, 3, 4, 5]);
//add 10 to each value
const example = source.pipe(map(val => val + 10));
//output: 11,12,13,14,15
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Map to single property

( [jsBin](http://jsbin.com/detozumale/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/tdLd5tgc/) )

```js
import { from } from 'rxjs/observable/from';
import { map } from 'rxjs/operators';

//emit ({name: 'Joe', age: 30}, {name: 'Frank', age: 20},{name: 'Ryan', age: 50})
const source = from([
  { name: 'Joe', age: 30 },
  { name: 'Frank', age: 20 },
  { name: 'Ryan', age: 50 }
]);
//grab each persons name
const example = source.pipe(map(person => person.name));
//output: "Joe","Frank","Ryan"
const subscribe = example.subscribe(val => console.log(val));
```

### Related Recipes

* [Smart Counter](../../recipes/smartcounter.md)

### Additional Resources

* [map](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-map)
  :newspaper: - Official docs
* [map vs flatMap](https://egghead.io/lessons/rxjs-rxjs-map-vs-flatmap)
  :video_camera: - Ben Lesh
* [Transformation operator: map and mapTo](https://egghead.io/lessons/rxjs-transformation-operator-map-and-mapto?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/patching/operator/map.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/patching/operator/map.ts)
