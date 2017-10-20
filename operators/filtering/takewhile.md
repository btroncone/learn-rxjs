# takeWhile
#### signature: `takeWhile(predicate: function(value, index): boolean): Observable`

## Emit values until provided expression is false.

### Examples

##### Example 1: Take values under limit

( [jsBin](http://jsbin.com/zanefaqexu/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/yakd4jgc/) )

```js
//emit 1,2,3,4,5
const source = Rx.Observable.of(1,2,3,4,5);
//allow values until value from source is greater than 4, then complete
const example = source.takeWhile(val => val <= 4);
//output: 1,2,3,4
const subscribe = example.subscribe(val => console.log(val));
```


##### Example 2: Difference between takeWhile() and filter() 

( [jsBin](http://jsbin.com/yatoqurewi/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/r497jgw3/1/) )

```js
// emit 3, 3, 3, 9, 1, 4, 5, 8, 96, 3, 66, 3, 3, 3
const source = Rx.Observable.of(3, 3, 3, 9, 1, 4, 5, 8, 96, 3, 66, 3, 3, 3);

// allow values until value from source equals 3, then complete
// output: [3, 3, 3]
source
 .takeWhile(it => it === 3 )
 .subscribe(val => console.log('takeWhile', val));

// output: [3, 3, 3, 3, 3, 3, 3]
source
 .filter(it => it === 3)
 .subscribe(val => console.log('filter', 3));
```



### Related Recipes
* [Smart Counter](../../recipes/smartcounter.md)

### Additional Resources
* [takeWhile](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-takeWhile) :newspaper: - Official docs
* [Completing a stream with takeWhile](https://egghead.io/lessons/rxjs-completing-a-stream-with-takewhile?course=step-by-step-async-javascript-with-rxjs) :video_camera: :dollar: - John Linquist

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/takeWhile.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/takeWhile.ts)
