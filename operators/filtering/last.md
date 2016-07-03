# last
####signature: `last(predicate: function): Observable`
*The gist: Emit last item or last to pass test...*

( [jsBin](http://jsbin.com/xidufijuku/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/qg6qfqLz/19/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-last) )

```js
const source = Rx.Observable.from([1,2,3,4,5]);
//no arguments, emit last value
const example = source.last();
//output: "Last value: 5"
const subscribe = example.subscribe(val => console.log(`Last value: ${val}`));

//emit last even number
const exampleTwo = source.last(num => num % 2 === 0);
//output: "Last to pass test: 4"
const subscribeTwo = exampleTwo.subscribe(val => console.log(`Last to pass test: ${val}`));
```

### How last works...
*Coming soon...*


### Additional Resources
* [Filtering operator: takeLast, last](https://egghead.io/lessons/rxjs-filtering-operators-takelast-last?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz