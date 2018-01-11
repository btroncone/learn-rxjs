# take

#### signature: `take(count: number): Observable`

## Emit provided number of values before completing.

### Why use `take`

When you are interested in only the first set number of emission, you want to use `take`.  Maybe you want to see what the user first clicked on when he/she first entered the page, you would want to subscribe to the click event and just take the first emission. There is a race and you want to observe the race, but you're only interested in the first who crosses the finish line. This operator is clear and straight forward, you just want to see the first *n* numbers of emission to do whatever it is you need.

---

:bulb: If you want to take a variable number of values based on some logic, or
another observable, you can use [takeUntil](takeuntil.md) or
[takeWhile](takewhile.md)!

:bulb: `take` is the opposite of `skip` where `take` will take the first *n* number of emissions while `skip` will skip the first *n* number of emissions.

---

### Examples

##### Example 1: Take 1 value from source

( [jsBin](http://jsbin.com/vaxitupiwi/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/f9bz0tr3/) )

```js
//emit 1,2,3,4,5
const source = Rx.Observable.of(1, 2, 3, 4, 5);
//take the first emitted value then complete
const example = source.take(1);
//output: 1
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Take the first 5 values from source

( [jsBin](http://jsbin.com/kexenuzulu/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/g1fhxgua/) )

```js
//emit value every 1s
const interval = Rx.Observable.interval(1000);
//take the first 5 emitted values
const example = interval.take(5);
//output: 0,1,2,3,4
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 3: Taking first click loclation
([jsFiddle](https://jsfiddle.net/ElHuy/9c5j064x/))

```html
<div id="locationDisplay">
  Where would you click first?
</div>
```

```js
const oneClickEvent = Rx.Observable
	.fromEvent(document, 'click')
  .take(1)
  .do(v => {
  	document.getElementById('locationDisplay').innerHTML
    	= `Your first click was on location ${v.screenX}:${v.screenY}`;
  });

const subscribe = oneClickEvent.subscribe();
```

### Additional Resources

* [take](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-take)
  :newspaper: - Official docs
* [Filtering operator: take, first, skip](https://egghead.io/lessons/rxjs-filtering-operators-take-first-skip?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/operator/take.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/take.ts)
