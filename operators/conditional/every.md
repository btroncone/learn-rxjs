# every
####signature: `every(predicate: function, thisArg: any): Observable`

### Description

###### TL;DR: Does every emitted value pass condition?

The **every** operator takes a predicate function and test ever emission from the source against this function.  This function will check if the value meet the condition you specified and return a boolean based on the result.  If all pass the test, the operator will return true, if not, it will return false.  Note that the **every** operator will only return a value when the source completes. 

### Examples

##### Example 1: Some values false

( [jsBin](http://jsbin.com/cibijotase/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/1b46tsm7/) )

```js
//emit 5 values
const source = Rx.Observable.of(1,2,3,4,5);
const example = source
  //is every value even?
  .every(val => val % 2 === 0)
//output: false
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: All values true

( [jsBin](http://jsbin.com/yuxefiviko/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/x34nLmcj/) )

```js
//emit 5 values
const allEvens = Rx.Observable.of(2,4,6,8,10);
const example = allEvens
  //is every value even?
  .every(val => val % 2 === 0);
//output: true
const subscribe = example.subscribe(val => console.log(val));
```


### Additional Resources
* [every](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-every) :newspaper: - Official docs

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/every.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/every.ts)
