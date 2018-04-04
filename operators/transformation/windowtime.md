# windowTime

#### signature: `windowTime(windowTimeSpan: number, windowCreationInterval: number, scheduler: Scheduler): Observable`

## Observable of values collected from source for each provided time span.

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Open new window every specified duration

( [StackBlitz](https://stackblitz.com/edit/typescript-vkkkef?file=index.ts&devtoolsheight=50) |
[jsBin](http://jsbin.com/mifayacoqo/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/g04b3qeb/) )

```js
import { timer } from 'rxjs/observable/timer';
import { windowTime, tap, mergeAll } from 'rxjs/operators';

//emit immediately then every 1s
const source = timer(0, 1000);
const example = source.pipe(
  //start new window every 3s
  windowTime(3000),
  tap(_ => console.log('NEW WINDOW!'))
);

const subscribeTwo = example
  .pipe(
    //window emits nested observable
    mergeAll()
    /*
            output:
            "NEW WINDOW!"
            0
            1
            2
            "NEW WINDOW!"
            3
            4
            5
          */
  )
  .subscribe(val => console.log(val));
```

### Additional Resources

* [windowTime](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-windowTime)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/windowTime.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/windowTime.ts)
