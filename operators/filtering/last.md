# last
####signature: `last(predicate: function): Observable`
*The gist: Emit last item or last to pass test...*


### Examples

##### Example 1: Last value in sequence

( [jsBin](http://jsbin.com/pevaqeloki/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/b05r434a/) )

```js
const source = Rx.Observable.from([1,2,3,4,5]);
//no arguments, emit last value
const example = source.last();
//output: "Last value: 5"
const subscribe = example.subscribe(val => console.log(`Last value: ${val}`));
```

##### Example 2: Last value to pass predicate

( [jsBin](http://jsbin.com/yagexuwari/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/pkx2btsh/) )

```js
const source = Rx.Observable.from([1,2,3,4,5]);
//emit last even number
const exampleTwo = source.last(num => num % 2 === 0);
//output: "Last to pass test: 4"
const subscribeTwo = exampleTwo.subscribe(val => console.log(`Last to pass test: ${val}`));
```

### Follow the Source Code
*Coming soon...*


### Additional Resources
* [last](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-last) :newspaper: - Official docs
* [Filtering operator: takeLast, last](https://egghead.io/lessons/rxjs-filtering-operators-takelast-last?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz