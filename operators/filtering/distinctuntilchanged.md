# distinctUntilChanged
#### signature: ` distinctUntilChanged(compare: function): Observable`

### Description

###### TL;DR: Only emit when the current value is different then the last

The **distinctUntilChanged** operator will emit values that are distinct from the source’s previous output. You can 
dictate how this comparison is performed by providing a function that will compare the current and previous values. 
A [strict equality comparison](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness) is used by default.

> :bulb:  distinctUntilChanged uses '===' comparison by default, object references must match!

### Examples

##### Example 1: distinctUntilChanged with basic values

( [jsBin](http://jsbin.com/qoyoxeheva/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/xc2vzct7/) )

```js
//only output distinct values, based on the last emitted value
const myArrayWithDuplicatesInARow = Rx.Observable
  .from([1,1,2,2,3,1,2,3]);
  
const distinctSub = myArrayWithDuplicatesInARow
	.distinctUntilChanged()
  	//output: 1,2,3,1,2,3
	.subscribe(val => console.log('DISTINCT SUB:', val));
  
const nonDistinctSub = myArrayWithDuplicatesInARow
	//output: 1,1,2,2,3,1,2,3
	.subscribe(val => console.log('NON DISTINCT SUB:', val));
```

##### Example 2: distinctUntilChanged with objects

( [jsBin](http://jsbin.com/mexocipave/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/t4ava5b4/) )

```js
const sampleObject = {name: 'Test'};
//Objects must be same reference
const myArrayWithDuplicateObjects = Rx.Observable.from([sampleObject, sampleObject, sampleObject]);
//only out distinct objects, based on last emitted value
const nonDistinctObjects = myArrayWithDuplicateObjects
  .distinctUntilChanged()
  //output: 'DISTINCT OBJECTS: {name: 'Test'}
  .subscribe(val => console.log('DISTINCT OBJECTS:', val));
```


### Additional Resources
* [distinctUntilChanged](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-distinctUntilChanged) :newspaper: - Official docs
* [Filtering operator: distinct and distinctUntilChanged](https://egghead.io/lessons/rxjs-filtering-operators-distinct-and-distinctuntilchanged?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/distinctUntilChanged.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/distinctUntilChanged.ts)
