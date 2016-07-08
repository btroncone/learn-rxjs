# ignoreElements
####signature: `ignoreElements(): Observable`
*The gist: Ignore everything but complete and error...*



### Examples

##### Example 1: Ignore all elements from source

( [jsBin](http://jsbin.com/yiyefelubi/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/59scjqss/) )

```js
//emit value every 100ms
const source = Rx.Observable.interval(100);
//ignore everything but complete
const example = source
  .take(5)
  .ignoreElements();
//output: "COMPLETE!"
const subscribe = example.subscribe(
  val => console.log(`NEXT: ${val}`),
  val => console.log(`ERROR: ${val}`),
  () => console.log('COMPLETE!')
);
```

##### Example 2: Only displaying error

( [jsBin](http://jsbin.com/gogonawuze/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/srcwdgw6/) )

```js
//emit value every 100ms
const source = Rx.Observable.interval(100);
//ignore everything but error
const error = source
  .flatMap(val => {
    if(val === 4){
      return Rx.Observable.throw(`ERROR AT ${val}`);
    }
    return Rx.Observable.of(val);
  })
  .ignoreElements();
//output: "ERROR: ERROR AT 4"
const subscribe = error.subscribe(
  val => console.log(`NEXT: ${val}`),
  val => console.log(`ERROR: ${val}`),
  () => console.log('SECOND COMPLETE!')
);
```

### How ignoreElements works...
*Coming soon...*


### Additional Resources
* [ignoreElements](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-ignoreElements) :newspaper: - Official docs