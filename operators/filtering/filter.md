# filter

#### signature: `filter(select: Function, thisArg: any): Observable`

## Emit values that pass the provided condition.

---

:bulb: If you would like to complete an observable when a condition fails, check
out [takeWhile](takewhile.md)!

---

<div class="ua-ad"><a href="https://ultimatecourses.com/"><img src="https://ultimatecourses.com/assets/img/banners/ultimate-angular-leader.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: filter for even numbers

(
[StackBlitz](https://stackblitz.com/edit/typescript-4g4cys?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/vafogoluye/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/tkz0fuy2/) )

```js
// RxJS v6+
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';

//emit (1,2,3,4,5)
const source = from([1, 2, 3, 4, 5]);
//filter out non-even numbers
const example = source.pipe(filter(num => num % 2 === 0));
//output: "Even number: 2", "Even number: 4"
const subscribe = example.subscribe(val => console.log(`Even number: ${val}`));
```

##### Example 2: filter objects based on property

(
[StackBlitz](https://stackblitz.com/edit/typescript-n73fsn?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/qihagaxuso/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/yjdsoug1/) )

```js
// RxJS v6+
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';

//emit ({name: 'Joe', age: 31}, {name: 'Bob', age:25})
const source = from([{ name: 'Joe', age: 31 }, { name: 'Bob', age: 25 }]);
//filter out people with age under 30
const example = source.pipe(filter(person => person.age >= 30));
//output: "Over 30: Joe"
const subscribe = example.subscribe(val => console.log(`Over 30: ${val.name}`));
```

##### Example 3: filter for number greater than specified value

(
[StackBlitz](https://stackblitz.com/edit/typescript-eyvvfu?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/rakabaheyu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/g1tgreha/) )

```js
// RxJS v6+
import { interval } from 'rxjs';
import { filter } from 'rxjs/operators';

//emit every second
const source = interval(1000);
//filter out all values until interval is greater than 5
const example = source.pipe(filter(num => num > 5));
/*
  "Number greater than 5: 6"
  "Number greater than 5: 7"
  "Number greater than 5: 8"
  "Number greater than 5: 9"
*/
const subscribe = example.subscribe(val =>
  console.log(`Number greater than 5: ${val}`)
);
```

### Related Recipes

- [HTTP Polling](../../recipes/http-polling.md)
- [Game Loop](../../recipes/gameloop.md)
- [Lockscreen](../../recipes/lockscreen.md)
- [Mine Sweeper Game](../../recipes/mine-sweeper-game.md)

### Additional Resources

- [filter](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-filter)
  :newspaper: - Official docs
- [Adding conditional logic with filter](https://egghead.io/lessons/rxjs-adding-conditional-logic-with-filter?course=step-by-step-async-javascript-with-rxjs)
  :video_camera: :dollar: - John Linquist
- [Filtering operator: filter](https://egghead.io/lessons/rxjs-filtering-operator-filter?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/filter.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/filter.ts)
