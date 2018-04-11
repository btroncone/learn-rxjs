# mapTo

#### signature: `mapTo(value: any): Observable`

## Map emissions to constant value.

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Map every emission to string

(
[StackBlitz](https://stackblitz.com/edit/typescript-zdgcuu?file=index.ts&devtoolsheight=50)
| [jsBin](http://jsbin.com/qujolenili/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/4ojq56ng/) )

```js
import { interval } from 'rxjs/observable/interval';
import { mapTo } from 'rxjs/operators';

//emit value every two seconds
const source = interval(2000);
//map all emissions to one value
const example = source.pipe(mapTo('HELLO WORLD!'));
//output: 'HELLO WORLD!'...'HELLO WORLD!'...'HELLO WORLD!'...
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Mapping clicks to string

(
[StackBlitz](https://stackblitz.com/edit/typescript-qm5spu?file=index.ts&devtoolsheight=50)
| [jsBin](http://jsbin.com/xaheciwara/1/edit?js,console,output) |
[jsFiddle](https://jsfiddle.net/btroncone/52fqL4nn/) )

```js
import { fromEvent } from 'rxjs/observable/fromEvent';
import { mapTo } from 'rxjs/operators';

//emit every click on document
const source = fromEvent(document, 'click');
//map all emissions to one value
const example = source.pipe(mapTo('GOODBYE WORLD!'));
//output: (click)'GOODBYE WORLD!'...
const subscribe = example.subscribe(val => console.log(val));
```

### Related Recipes

* [HTTP Polling](../../recipes/http-polling.md)
* [Smart Counter](../../recipes/smartcounter.md)

### Additional Resources

* [mapTo](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mapTo)
  :newspaper: - Official docs
* [Changing behavior with mapTo](https://egghead.io/lessons/rxjs-changing-behavior-with-mapto?course=step-by-step-async-javascript-with-rxjs)
  :video_camera: :dollar: - John Linquist
* [Transformation operator: map and mapTo](https://egghead.io/lessons/rxjs-transformation-operator-map-and-mapto?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/mapTo.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/mapTo.ts)
