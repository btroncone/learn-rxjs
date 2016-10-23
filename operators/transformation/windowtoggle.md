# windowToggle
####signature: `windowToggle(openings: Observable, closingSelector: function(value): Observable): Observable`

## Collect and emit observable of values from source between opening and closing emission.

### Examples

##### Example 1: Toggle window at increasing interval

( [jsBin](http://jsbin.com/xasofupuka/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/3xmmuzy4/) )

```js
//emit immediately then every 1s
const source = Rx.Observable.timer(0,1000);
//toggle window on every 5
const toggle = Rx.Observable.interval(5000);
const example = source
    //turn window on every 5s
    .windowToggle(toggle, (val) => Rx.Observable.interval(val * 1000))
    .do(() => console.log('NEW WINDOW!'))

const subscribeTwo = example 
  //window emits nested observable
  .mergeAll()
/*
  output:
  "NEW WINDOW!"
  5
  "NEW WINDOW!"
  10
  11
  "NEW WINDOW!"
  15
  16
  "NEW WINDOW!"
  20
  21
  22
*/
  .subscribe(val => console.log(val));
```


### Additional Resources
* [windowToggle](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-windowToggle) :newspaper: - Official docs

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/windowToggle.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/windowToggle.ts)
