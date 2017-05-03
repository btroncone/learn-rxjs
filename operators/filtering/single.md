# single
#### signature: `single(a: Function): Observable`

## Emit single item that passes expression.

### Examples

##### Example 1: Emit first number passing predicate

( [jsBin](http://jsbin.com/solecibuza/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/26r5y90s/) )

```js
//emit (1,2,3,4,5)
const source = Rx.Observable.from([1,2,3,4,5]);
//emit one item that matches predicate
const example = source.single(val => val === 4);
//output: 4
const subscribe = example.subscribe(val => console.log(val));
```


### Additional Resources
* [single](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-single) :newspaper: - Official docs

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/single.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/single.ts)
