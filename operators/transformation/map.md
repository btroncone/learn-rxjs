# map

#### signature: `map(project: Function, thisArg: any): Observable`

## Apply projection with each value from source.

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX "Ultimate RxJS")](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: Add 10 to each number

(
[StackBlitz](https://stackblitz.com/edit/typescript-a7bnxb?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/padasukano/1/edit?js,console) |
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

(
[StackBlitz](https://stackblitz.com/edit/typescript-qgpnju?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/detozumale/1/edit?js,console) |
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

- [Alphabet Invasion Game](../../recipes/alphabet-invasion-game.md)
- [Battleship Game](../../recipes/battleship-game.md)
- [Catch The Dot Game](../../recipes/catch-the-dot-game.md)
- [Game Loop](../../recipes/gameloop.md)
- [HTTP Polling](../../recipes/http-polling.md)
- [Lockscreen](../../recipes/lockscreen.md)
- [Memory Game](../../recipes/memory-game.md)
- [Mine Sweeper Game](../../recipes/mine-sweeper-game.md)
- [Save Indicator]('../../recipes/save-indicator.md)
- [Smart Counter](../../recipes/smartcounter.md)
- [Space Invaders Game](../../recipes/space-invaders-game.md)
- [Stop Watch](../../recipes/stop-watch.md)
- [Swipe To Refresh](../../recipes/swipe-to-refresh.md)
- [Tetris Game](../../recipes/tetris-game.md)
- [Type Ahead](../../recipes/type-ahead.md)

### Additional Resources

- [map](https://rxjs.dev/api/operators/map)
  :newspaper: - Official docs
- [map vs flatMap](https://egghead.io/lessons/rxjs-rxjs-map-vs-flatmap)
  🎥 - Ben Lesh
- [Transformation operator: map and mapTo](https://egghead.io/lessons/rxjs-transformation-operator-map-and-mapto?course=rxjs-beyond-the-basics-operators-in-depth)
  🎥 💵 - André Staltz

* [Build your own map operator](https://blog.strongbrew.io/build-the-operators-from-rxjs-from-scratch/?lectureId=map#app)
  🎥 - Kwinten Pisman

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/map.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/map.ts)
