# combineAll
####signature: `combineAll(project: function): Observable`
*The gist: Output latest values from inner observables when outer observable completes...*

( [jsBin](http://jsbin.com/nasakesame/edit?js,console) | [jsFiddle](https://jsfiddle.net/qg6qfqLz/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-combineAll) )
```js
//emit after five seconds then complete
const fiveSecondTimer = Rx.Observable.timer(5000);
//once timer (outer observable) fires and completes, latest emitted values from inner observables will be output, in this case there is a single value
const example = fiveSecondTimer.mapTo(Rx.Observable.of('Hello', 'World'));
const combined = example.combineAll();
//ex output: ["Hello"]...["World"]
const subscribe = combined.subscribe(val => console.log('Values from inner observable:', val));

//combineAll also takes a projection function that receives emitted values
const exampleTwo = fiveSecondTimer.mapTo(Rx.Observable.of('Hello', 'Goodbye'));
const combinedTwo = example.combineAll(val => `${val} Friend!`);
//ex output: "Hello Friend!"..."Goodbye Friend!"
const subscribeProjected = combined.subscribe(val => console.log('Values Using Projection:', val));
```