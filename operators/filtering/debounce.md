# debounce
####signature: `debounce(durationSelector: function): Observable`

## Throw away all emitted values that take less then the specified time, based on selector function, between output.

---
:bulb:  Though not as widely used as [debounceTime](debouncetime.md), **debounce** is important when the debounce rate is variable!

---

### Examples

##### Example 1: Debounce on timer

( [jsBin](http://jsbin.com/sorimeyoro/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/e5698yow/) )

```js
//emit four strings
const example = Rx.Observable.of('WAIT','ONE','SECOND','Last will display');
/*
    Only emit values after a second has passed between the last emission, 
    throw away all other values
*/
const debouncedExample = example.debounce(() => Rx.Observable.timer(1000));
/*
    In this example, all values but the last will be omitted
    output: 'Last will display'
*/
const subscribe = debouncedExample.subscribe(val => console.log(val));
```

##### Example 2: Debounce at increasing interval

( [jsBin](http://jsbin.com/sotaretese/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/6ab34nq6/) )

```js
//emit value every 1 second, ex. 0...1...2
const interval = Rx.Observable.interval(1000);
//raise the debounce time by 200ms each second
const debouncedInterval = interval.debounce(val => Rx.Observable.timer(val * 200))
/*
  After 5 seconds, debounce time will be greater than interval time,
  all future values will be thrown away
  output: 0...1...2...3...4......(debounce time over 1s, no values emitted)
*/
const subscribe = debouncedInterval.subscribe(val => console.log(`Example Two: ${val}`));
```


### Additional Resources
* [debounce](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-debounce) :newspaper: - Official docs
* [Transformation operator: debounce and debounceTime](https://egghead.io/lessons/rxjs-transformation-operators-debounce-and-debouncetime?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/debounce.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/debounce.ts)
