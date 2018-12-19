# fromEvent

#### signature: `fromEvent(target: EventTargetLike, eventName: string, selector: function): Observable`

## Turn event into observable sequence.

<div class="ua-ad"><a href="https://ultimatecourses.com/?ref=76683_kee7y7vk"><img src="https://ultimatecourses.com/assets/img/banners/uc-leader.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Observable from mouse clicks

(
[StackBlitz](https://stackblitz.com/edit/typescript-mfyefr?file=index.ts&devtoolsheight=50)
| [jsBin](http://jsbin.com/xikapewoqa/1/edit?js,console,output) |
[jsFiddle](https://jsfiddle.net/btroncone/vbLz1pdx/) )

```js
// RxJS v6+
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

//create observable that emits click events
const source = fromEvent(document, 'click');
//map to string with given event timestamp
const example = source.pipe(map(event => `Event time: ${event.timeStamp}`));
//output (example): 'Event time: 7276.390000000001'
const subscribe = example.subscribe(val => console.log(val));
```

### Related Recipes

- [Smart Counter](../../recipes/smartcounter.md)
- [Progress Bar](../../recipes/progressbar.md)
- [Game Loop](../../recipes/gameloop.md)
- [HTTP Polling](../../recipes/http-polling.md)
- [Horizontal Scroll Indicator](../../recipes/horizontal-scroll-indicator.md)

### Additional Resources

- [fromEvent](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-fromEvent)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/FromEventObservable.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/FromEventObservable.ts)
