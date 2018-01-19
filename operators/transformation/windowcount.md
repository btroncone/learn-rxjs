# windowCount

#### signature: `windowCount(windowSize: number, startWindowEvery: number): Observable`

## Observable of values from source, emitted each time provided count is fulfilled.

### Examples

##### Example 1: Start new window every x items emitted

( [jsBin](http://jsbin.com/nezuvacexe/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/xjgbnqp5/) )

```js
//emit every 1s
const source = Rx.Observable.interval(1000);
const example = source
  //start new window every 4 emitted values
  .windowCount(4)
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
  3
  "NEW WINDOW!"
  4
  5
  6
  7 
*/
  .subscribe(val => console.log(val));
```

### Additional Resources

* [windowCount](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-windowCount)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/windowCount.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/windowCount.ts)
