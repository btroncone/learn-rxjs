# fromPromise

####signature: `fromPromise(promise: Promise, scheduler: Scheduler): Observable`
*The gist: Create an observable from a promise, emitting the result...*

### Examples

##### Example 1: Converting promise to observable and catching errors

( [jsBin](http://jsbin.com/cokivecima/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/upy6nr6n/) )

```js
//example promise that will resolve or reject based on input
const myPromise = (willReject) => {
	return new Promise((resolve, reject) => {
  	if(willReject){
    	reject('Rejected!');
    }
    resolve('Resolved!');
  })
}
//emit true, then false
const source = Rx.Observable.of(true, false);
const example = source
	.mergeMap(val => Rx.Observable
  	//turn promise into observable
  	.fromPromise(myPromise(val))
    //catch and gracefully handle rejections
  	.catch(error => Rx.Observable.of(`Error: ${error}`)))
//output: 'Error: Rejected!', 'Resolved!'
const subscribe = example.subscribe(val => console.log(val));
```

### How fromPromise works...
*Coming soon...*


### Additional Resources
* [fromPromise](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-fromPromise) :newspaper: - Official docs
* [Creation operators: from, fromArray, fromPromise](https://egghead.io/lessons/rxjs-creation-operators-from-fromarray-frompromise?course=rxjs-beyond-the-basics-creating-observables-from-scratch) :video_camera: :dollar: - André Staltz