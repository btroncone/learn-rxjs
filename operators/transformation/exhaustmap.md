# exhaustMap
#### signature: `exhaustMap(project: function, resultSelector: function): Observable`

## Map to inner observable, ignore other values until that observable completes.

---

### Examples

##### Example 1: exhaustMap with interval

( [jsBin](http://jsbin.com/woposeqobo/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/9ovzapp9/) )

```js
const interval = Rx.Observable.interval(1000);
const delayedInterval = interval.delay(10).take(4);

const exhaustSub = Rx.Observable
	.merge(
  	   // delay 10ms, then start interval emitting 4 values
		delayedInterval,
       // emit immediately
		Rx.Observable.of(true)
  )
  /*
   *  The first emitted value (of(true)) will be mapped 
   *  to an interval observable emitting 1 value every 
   *  second, completing after 5.
   *  Because the emissions from the delayed interval 
   *  fall while this observable is still active they will be ignored.
   *
   *  Contrast this with concatMap which would queue, 
   *  switchMap which would switch to a new inner observable each emission,
   *  and mergeMap which would maintain a new subscription for each emitted value.
   */
  .exhaustMap(_ => interval.take(5))
  // output: 0, 1, 2, 3, 4
  .subscribe(val => console.log(val))
```


##### Example 2: Another exhaustMap with interval

( [jsFiddle](https://jsfiddle.net/ElHuy/01o70pgv/1/) )

```js
console.clear();

const firstInterval = Rx.Observable.interval(1000).take(10);
const secondInterval = Rx.Observable.interval(1000).take(2);

const exhaustSub = firstInterval.exhaustMap(f => {
	console.log(`Emission of first interval: ${f}`);  //I placed the first console.log so we could get a glimpse to what's happening behind the scene.
	return secondInterval;
}).subscribe(s => console.log(s));

/*
	When we subscribeds to the first interval, it starts to emit a value (value 0).
  This value is mapped to the second interval which then begins to emit (value 0).
  While the second intervals emit, values from the first interval are still rolling out, but promptly ignored.
  We can see this when firstInterval gives us our next value number 3 and not 1.
  
  Our output looks like this:
    Emission of first interval: 0
    0
    1
    Emission of first interval: 3
    0
    1
    Emission of first interval: 6
    0
    1
    Emission of first interval: 9
    0
    1
*/
```


### Additional Resources
* [exhaustMap](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-exhaustMap) :newspaper: - Official docs

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/exhaustMap.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/exhaustMap.ts)
