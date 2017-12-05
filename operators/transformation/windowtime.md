# windowTime

#### signature: `windowTime(windowTimeSpan: number, windowCreationInterval: number, scheduler: Scheduler): Observable`

## Observable of values collected from source for each provided time span.

### Examples

##### Example 1: Open new window every specified duration

( [jsBin](http://jsbin.com/mifayacoqo/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/g04b3qeb/) )

```js
//emit immediately then every 1s
const source = Rx.Observable.timer(0, 1000);
const example = source
  //start new window every 3s
  .windowTime(3000)
  .do(() => console.log('NEW WINDOW!'));

const subscribeTwo = example
  //window emits nested observable
  .mergeAll()
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
  .subscribe(val => console.log(val));
```

### Additional Resources

* [windowTime](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-windowTime)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/operator/windowTime.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/windowTime.ts)
