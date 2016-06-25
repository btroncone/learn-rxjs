# first
###signature: `first(predicate: function, select: function)`
*The gist: Emit the first value, or the first to pass condition...*

([demo](http://jsbin.com/poloquxuja/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-first))
```js
const source = Rx.Observable.from([1,2,3,4,5]);
//no arguments, emit first value
const example = source.first();
//output: "First value: 1"
const subscribe = example.subscribe(val => console.log(`First value: ${val}`));

//emit first item to pass test
const exampleTwo = source.first(num => num === 5);
//output: "First to pass test: 5"
const subscribeTwo = exampleTwo.subscribe(val => console.log(`First to pass test: ${val}`));

//using optional projection function
const exampleThree = source.first(num => num % 2 === 0, 
                                    (result, index) => `First even: ${result} is at index: ${index}`);
//output: "First even: 2 at index: 1"
const subscribeThree = exampleThree.subscribe(val => console.log(val));
```