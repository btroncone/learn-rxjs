# range

####signature: `range(start: number, count: number, scheduler: Scheduler): Observable`
*The gist: Emits numbers within a specified range...*

### Examples

##### Example 1: Emit range 1-10

( [jsBin](http://jsbin.com/yalefomage/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/cfvfgwn9/) )

```js
//emit 1-10 in sequence
const source = Rx.Observable.range(1,10);
//output: 1,2,3,4,5,6,7,8,9,10
const example = source.subscribe(val => console.log(val));
```

### Follow the Source Code
*Coming soon...*


### Additional Resources
* [range](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-range) :newspaper: - Official docs