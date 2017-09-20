# defer
#### signature: `defer(factoryFunction: Observable): Observable`

## Upon subscription, returns a new Observable through the Observable factory function.

### Examples

##### Example 1: 

( [jsBin](http://jsbin.com/sigivaputo/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/ElHuy/btygt1vL/) )

```js
const defer = Rx.Observable.defer(() =>
	Rx.Observable.interval(750)
  	.take(5));

 const test = a => {
 if (a > 0) {
    --a;
    defer.subscribe(console.log);
    test(a);
  }
}

//Making 5 intervals at the same time.
test(5);
```

##### Example 2: Defering response to user input

( [jsBin](http://jsbin.com/yekopoqege/1/edit?html,js,console,output) | [jsFiddle](https://jsfiddle.net/btroncone/98ca76v3/) )

```html
<input id="input">
```

```js
let reply = '';
const input = document.getElementById("input");
const inputObs = Rx.Observable.fromEvent(input, 'keyup')
  .do(i => reply = i.currentTarget.value)
  .debounceTime(750)
  .switchMap(_ => defer);

const defer = Rx.Observable.defer(() => {
	console.log(`Me: ${reply}`);
	if (reply === "hi") {
  	return Rx.Observable.of('hello');
  } else if (reply === "hello") {
  	return Rx.Observable.of('hi');
  } else {
  	return Rx.Observable.of('salutation');
  }
})

inputObs.subscribe(response => console.log(`Computer: ${response}`));
```

### Additional Resources
* [defer](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-defer) :newspaper: - Official docs

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/add/observable/defer.ts](https://github.com/ReactiveX/rxjs/blob/master/src/add/observable/defer.ts)
