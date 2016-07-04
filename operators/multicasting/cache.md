# cache

####signature: `cache(bufferSize: number, windowTime: number, scheduler : Scheduler): Observable`
*The gist: Share source and deliver specified number of latest emitted values upon subscription...*

( [jsBin](http://jsbin.com/laxumuzuge/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/cb0dcnnx/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-cache) )

```js
//basic promise, resolve after 2 seconds
const myPromise = val => new Promise(resolve => setTimeout(() => resolve(`Result: ${val}`), 2000));
//emit after 1 second
const source = Rx.Observable.timer(1000);

const example = source
	//side effects triggered once
	.do(() => console.log('Triggering Side Effect!'))
	.mergeMap(myPromise)
//cache the last emission
const cached = example.cache(1);

/*
	both subscribers share the same source
  Triggering Side Effect!
	Result: 0
	Result: 0
*/
const subscriberOne = cached.subscribe(val => console.log(val));
const subscriberTwo = cached.subscribe(val => console.log(val));


setTimeout(() => {
	/*
  	late subscribers will receieve the last (1) emission
    output:
    Subscriber 3: Result: 0
  */
	const subscriberThree = cached.subscribe(val => console.log(`Subscriber 3: ${val}`));
}, 5000);
```

### How cache works...
*Coming soon...*


### Additional Resources
*Coming soon...*