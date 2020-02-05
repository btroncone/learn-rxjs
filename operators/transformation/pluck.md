# pluck

#### signature: `pluck(properties: ...args): Observable`

## Select property to emit.

{% hint style="info" %}

New to transformation operators? Check out the article
[Get started transforming streams with map, pluck, and mapTo](../../concepts/get-started-transforming.md)!

{% endhint %}

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: Pluck object property

(
[StackBlitz](https://stackblitz.com/edit/typescript-jkda4e?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/zokaxiwahe/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/58v9xq0f/) )

```js
// RxJS v6+
import { from } from 'rxjs';
import { pluck } from 'rxjs/operators';

const source = from([
  { name: 'Joe', age: 30 },
  { name: 'Sarah', age: 35 }
]);
//grab names
const example = source.pipe(pluck('name'));
//output: "Joe", "Sarah"
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Pluck nested properties

(
[StackBlitz](https://stackblitz.com/edit/typescript-rinjzk?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/joqesidugu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/n592m597/) )

```js
// RxJS v6+
import { from } from 'rxjs';
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

### Related Recipes

- [Breakout Game](../../recipes/breakout-game.md)
- [Car Racing Game](../../recipes/car-racing-game.md)
- [Lockscreen](../../recipes/lockscreen.md)
- [Memory Game](../../recipes/memory-game.md)
- [Mine Sweeper Game](../../recipes/mine-sweeper-game.md)
- [Platform Jumper Game](../../recipes/platform-jumper-game.md)
- [Tetris Game](../../recipes/tetris-game.md)
- [Uncover Image Game](../../recipes/uncover-image-game.md)

### Additional Resources

- [pluck](https://rxjs.dev/api/operators/pluck) 📰 - Official docs

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/pluck.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/pluck.ts)
