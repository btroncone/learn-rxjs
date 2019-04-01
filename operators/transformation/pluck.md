# pluck

#### signature: `pluck(properties: ...args): Observable`

## Select properties to emit.

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/angular"><img src="https://ultimatecourses.com/assets/img/banners/ultimate-angular-leader.svg" style="width:100%;max-width:100%"></a></div>

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

const source = from([{ name: 'Joe', age: 30 }, { name: 'Sarah', age: 35 }]);
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

- [Lockscreen](../../recipes/lockscreen.md)
- [Mine Sweeper Game](../../recipes/mine-sweeper-game.md)
- [Platform Jumper Game](../../recipes/platform-jumper-game.md)

### Additional Resources

- [pluck](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-pluck)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/pluck.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/pluck.ts)
