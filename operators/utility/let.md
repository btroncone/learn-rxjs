# let
#### signature: `let(function): Observable`

## Let me have the whole observable.

### Examples

##### Example 1: Reusing error handling logic with let

( [jsBin](http://jsbin.com/rosuborara/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/qtq1h8vw/) )

```js
// custom error handling logic
const retryThreeTimes = obs => obs.retry(3).catch(_ => Rx.Observable.of('ERROR!'));
const examplePromise = val => new Promise(resolve => resolve(`Complete: ${val}`));

//faking request
const subscribe = Rx.Observable
  .of('some_url')
  .mergeMap(url => examplePromise(url))
  // could reuse error handling logic in multiple places with let
  .let(retryThreeTimes)
  //output: Complete: some_url
  .subscribe(result => console.log(result));

const customizableRetry = retryTimes => obs => obs.retry(retryTimes).catch(_ => Rx.Observable.of('ERROR!'));

//faking request
const secondSubscribe = Rx.Observable
  .of('some_url')
  .mergeMap(url => examplePromise(url))
  // could reuse error handling logic in multiple places with let
  .let(customizableRetry(3))
  //output: Complete: some_url
  .subscribe(result => console.log(result));
```

##### Example 2: Applying map with let

( [jsBin](http://jsbin.com/jiyupaxomo/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/6n7w3b22/) )

```js
//emit array as a sequence
const source = Rx.Observable.from([1,2,3,4,5]);
//demonstrating the difference between let and other operators
const test = source
  .map(val => val + 1)
  /*
  	this would fail, let behaves differently than most operators
  	val in this case is an observable
  */
  //.let(val => val + 2)
  .subscribe(val => console.log('VALUE FROM ARRAY: ', val));

const subscribe = source
  .map(val => val + 1)
  //'let' me have the entire observable
  .let(obs => obs.map(val => val + 2))
  //output: 4,5,6,7,8
  .subscribe(val => console.log('VALUE FROM ARRAY WITH let: ', val));
```

##### Example 3: Applying multiple operators with let

( [jsBin](http://jsbin.com/zamizapaho/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/gxsq1woc/) )

```js
//emit array as a sequence
const source = Rx.Observable.from([1,2,3,4,5]);

//let provides flexibility to add multiple operators to source observable then return
const subscribeTwo = source
   .map(val => val + 1)
   .let(obs => obs
      .map(val => val + 2)
      //also, just return evens
      .filter(val => val % 2 === 0)
    )
  //output: 4,6,8
  .subscribe(val => console.log('let WITH MULTIPLE OPERATORS: ', val));
```

##### Example 4: Applying operators through function

( [jsBin](http://jsbin.com/vojelelamu/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/ah09dL9e/) )

```js
//emit array as a sequence
const source = Rx.Observable.from([1,2,3,4,5]);
 
//pass in your own function to add operators to observable
const obsArrayPlusYourOperators = (yourAppliedOperators) => {
  return source
    .map(val => val + 1)
    .let(yourAppliedOperators)
 };
const addTenThenTwenty = obs => obs.map(val => val + 10).map(val => val + 20);
const subscribe = obsArrayPlusYourOperators(addTenThenTwenty)
	//output: 32, 33, 34, 35, 36
	.subscribe(val => console.log('let FROM FUNCTION:', val));
```


### Additional Resources
* [let](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/let.md) :newspaper: - Official docs

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/let.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/let.ts)
