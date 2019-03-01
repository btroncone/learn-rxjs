# map

#### signature: `map(project: Function, thisArg: any): Observable`

## Apply projection with each value from source.

<div class="ua-ad"><a href="https://ultimatecourses.com/?ref=76683_kee7y7vk"><img src="https://ultimatecourses.com/assets/img/banners/ultimate-angular-leader.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Add 10 to each number

( [StackBlitz](https://stackblitz.com/edit/typescript-a7bnxb?file=index.ts&devtoolsheight=100) |
[jsBin](http://jsbin.com/padasukano/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/yd38awLa/) )

```js
// RxJS v6+
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

//emit (1,2,3,4,5)
const source = from([1, 2, 3, 4, 5]);
//add 10 to each value
const example = source.pipe(map(val => val + 10));
//output: 11,12,13,14,15
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Map to single property

( [StackBlitz](https://stackblitz.com/edit/typescript-qgpnju?file=index.ts&devtoolsheight=100) |
[jsBin](http://jsbin.com/detozumale/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/tdLd5tgc/) )

```js
// RxJS v6+
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

//emit ({name: 'Joe', age: 30}, {name: 'Frank', age: 20},{name: 'Ryan', age: 50})
const source = from([
  { name: 'Joe', age: 30 },
  { name: 'Frank', age: 20 },
  { name: 'Ryan', age: 50 }
]);
//grab each persons name, could also use pluck for this scenario
const example = source.pipe(map(({ name }) => name));
//output: "Joe","Frank","Ryan"
const subscribe = example.subscribe(val => console.log(val));
```

### Related Recipes

- [Smart Counter](../../recipes/smartcounter.md)
- [Game Loop](../../recipes/gameloop.md)
- [HTTP Polling](../../recipes/http-polling.md)
- [Lockscreen](../../recipes/lockscreen.md)
- [Type Ahead](../../recipes/type-ahead.md)
- [Catch The Dot Game](../../recipes/catch-the-dot-game.md)
- [Space Invaders Game](../../recipes/space-invaders-game.md)
- [Swipe To Refresh](../../recipes/swipe-to-refresh.md)
- [Alphabet Invasion Game](../../recipes/alphabet-invasion-game.md)

### Additional Resources

* [map](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-map)
  :newspaper: - Official docs
* [map vs flatMap](https://egghead.io/lessons/rxjs-rxjs-map-vs-flatmap)
  :video_camera: - Ben Lesh
* [Transformation operator: map and mapTo](https://egghead.io/lessons/rxjs-transformation-operator-map-and-mapto?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/map.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/map.ts)
