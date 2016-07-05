# scan
####signature: `scan(accumulator: function, seed: any): Observable`
*The gist: Reduce over time...*

( [jsBin](http://jsbin.com/jopikihuvu/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/d2g2a2c6/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-scan) )

```js
const testSubject = new Rx.Subject();
//basic scan example, sum over time starting with zero
const basicScan = testSubject
  .startWith(0)
  .scan((acc, curr) => acc + curr);
//log accumulated values
const subscribe = basicScan.subscribe(val => console.log('Accumulated total:', val));
//next values into subject, adding to the current sum
testSubject.next(1); //1
testSubject.next(2); //3
testSubject.next(3); //6

const testSubjectTwo = new Rx.Subject();
//scan example building an object over time
const objectScan = testSubjectTwo.scan((acc, curr) => Object.assign({}, acc, curr), {});
//log accumulated values
const subscribe = objectScan.subscribe(val => console.log('Accumulated object:', val));
//next values into subject, adding properties to object
testSubjectTwo.next({name: 'Joe'}); // {name: 'Joe'}
testSubjectTwo.next({age: 30}); // {name: 'Joe', age: 30}
testSubjectTwo.next({favoriteLanguage: 'JavaScript'}); // {name: 'Joe', age: 30, favoriteLanguage: 'JavaScript'}
```

### How scan works...
*Coming soon...*

### Additional Resources
* [Aggregating streams with reduce and scan using RxJS](https://egghead.io/lessons/rxjs-aggregating-streams-with-reduce-and-scan-using-rxjs) :video_camera: - Ben Lesh
* [Updating data with scan](https://egghead.io/lessons/rxjs-updating-data-with-scan?course=step-by-step-async-javascript-with-rxjs) :video_camera: :dollar: - John Linquist
* [Transformation operator: scan](https://egghead.io/lessons/rxjs-transformation-operator-scan?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz
