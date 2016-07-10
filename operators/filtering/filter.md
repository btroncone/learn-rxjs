# filter
####signature: `filter(select: Function, thisArg: any): Observable`
*The gist: Only return values that pass the provided condition...*


### Examples

##### Example 1: filter for even numbers

( [jsBin](http://jsbin.com/vafogoluye/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/tkz0fuy2/) )

```js
//emit (1,2,3,4,5)
const source = Rx.Observable.from([1,2,3,4,5]);
//filter out non-even numbers
const example = source.filter(num => num % 2 === 0);
//output: "Even number: 2", "Even number: 4"
const subscribe = example.subscribe(val => console.log(`Even number: ${val}`));
```

##### Example 2: filter objects based on property

( [jsBin](http://jsbin.com/qihagaxuso/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/yjdsoug1/) )

```js
//emit ({name: 'Joe', age: 31}, {name: 'Bob', age:25})
const source = Rx.Observable.from([{name: 'Joe', age: 31}, {name: 'Bob', age:25}]);
//filter out people with age under 30
const example = source.filter(person => person.age >= 30);
//output: "Over 30: Joe"
const subscribe = example.subscribe(val => console.log(`Over 30: ${val.name}`));
```

##### Example 3: filter for number greater than specified value

( [jsBin](http://jsbin.com/rakabaheyu/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/g1tgreha/) )

```js
//emit every second
const source = Rx.Observable.interval(1000);
//filter out all values until interval is greater than 5
const example = source.filter(num => num > 5);
/*
  "Number greater than 5: 6"
  "Number greater than 5: 7"
  "Number greater than 5: 8"
  "Number greater than 5: 9"
*/
const subscribe = example.subscribe(val => console.log(`Number greater than 5: ${val}`));
```

### Follow the source code...
1. [Operator subscribes to source observable](https://github.com/ReactiveX/rxjs/blob/master/src/operator/filter.ts#L60)
2. [Each time a value is emitted from source, the supplied predicate expression is invoked with said value](https://github.com/ReactiveX/rxjs/blob/master/src/operator/filter.ts#L85)
3. **IF** - [The result is truthy, value from source is emitted to subscriber](https://github.com/ReactiveX/rxjs/blob/master/src/operator/filter.ts#L90-L92)


### Additional Resources
* [filter](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-filter) :newspaper: - Official docs
* [Adding conditional logic with filter](https://egghead.io/lessons/rxjs-adding-conditional-logic-with-filter?course=step-by-step-async-javascript-with-rxjs) :video_camera: :dollar: - John Linquist
* [Filtering operator: filter](https://egghead.io/lessons/rxjs-filtering-operator-filter?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz