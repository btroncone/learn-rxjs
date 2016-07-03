# filter
####signature: `filter(select: Function, thisArg: any): Observable`
*The gist: Only return values that pass the provided condition...*

( [jsBin](http://jsbin.com/gaqojobove/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/qg6qfqLz/16/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-filter) )

```js
//emit (1,2,3,4,5)
const source = Rx.Observable.from([1,2,3,4,5]);
//filter out non-even numbers
const example = source.filter(num => num % 2 === 0);
//output: "Even number: 2", "Even number: 4"
const subscribe = example.subscribe(val => console.log(`Even number: ${val}`));

//emit ({name: 'Joe', age: 31}, {name: 'Bob', age:25})
const sourceTwo = Rx.Observable.from([{name: 'Joe', age: 31}, {name: 'Bob', age:25}]);
//filter out people with age under 30
const exampleTwo = sourceTwo.filter(person => person.age >= 30);
//output: "Over 30: Joe"
const subscribeTwo = exampleTwo.subscribe(val => console.log(`Over 30: ${val.name}`));

//emit every second
const sourceThree = Rx.Observable.interval(1000);
//filter out all values until interval is greater than 5
const exampleThree = sourceThree.filter(num => num > 5);
/*
  "Number greater than 5: 6"
  "Number greater than 5: 7"
  "Number greater than 5: 8"
  "Number greater than 5: 9"
*/
const subscribeThree = exampleThree.subscribe(val => console.log(`Number greater than 5: ${val}`));
```

### How filter works...
*Coming soon...*


### Additional Resources
* [Adding conditional logic with filter](https://egghead.io/lessons/rxjs-adding-conditional-logic-with-filter?course=step-by-step-async-javascript-with-rxjs) :video_camera: :dollar: - John Linquist
