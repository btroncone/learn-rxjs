# of

####signature: ` of(...values, scheduler: Scheduler): Observable`
*The gist: Emits provided values...*

( [jsBin](http://jsbin.com/tawezibeyu/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/f7b35ayz/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-of) )

```js
//emits any number of provided values in sequence
const source = Rx.Observable.of(1,2,3,4,5);
//output: 1,2,3,4,5
const subscribe = source.subscribe(val => console.log(val));

//emits values of any type
const sourceTwo = Rx.Observable.of({name: 'Brian'}, [1,2,3], function hello(){ return 'Hello'});
//output: {name: 'Brian}, [1,2,3], function hello() { return 'Hello' }
const subscribeTwo = sourceTwo.subscribe(val => console.log(val));
```

### How of works...
*Coming soon...*


### Additional Resources
* [Creation operators: of](https://egghead.io/lessons/rxjs-creation-operator-of?course=rxjs-beyond-the-basics-creating-observables-from-scratch) :video_camera: :dollar: - André Staltz