# map
####signature: `map(project: Function, thisArg: any): Observable`
*The gist: Apply projection to each element...*

( [jsBin](http://jsbin.com/vegagizedo/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/qg6qfqLz/36/) | [official docs](http://reactivex-rxjs5.surge.sh/function/index.html#static-function-map) )
```js
//emit (1,2,3,4,5)
const source = Rx.Observable.from([1,2,3,4,5]);
//add 10 to each value
const example = source.map(val => val + 10);
//output: 11,12,13,14,15
const subscribe = example.subscribe(val => console.log(val));

//emit ({name: 'Joe', age: 30}, {name: 'Frank', age: 20},{name: 'Ryan', age: 50})
const sourceTwo = Rx.Observable.from([{name: 'Joe', age: 30}, {name: 'Frank', age: 20},{name: 'Ryan', age: 50}]);
//grab each persons name
const exampleTwo = sourceTwo.map(person => person.name);
//output: "Joe","Frank","Ryan"
const subscribe = exampleTwo.subscribe(val => console.log(val));
```

### Additional Resources
* [map vs flatMap](https://egghead.io/lessons/rxjs-rxjs-map-vs-flatmap) :video_camera: - Ben Lesh