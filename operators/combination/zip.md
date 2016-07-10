# zip
####signature: `zip(observables: *): Observable`
*The gist: After all observables emit, emit values as an array...*

> :bulb: Tip: Combined with an [interval](../creation/interval) or [timer](../creation/timer.md) zip can also be used to delay output!

### Examples

##### Example 1: zip multiple observables emitting at alternate intervals

( [jsBin](http://jsbin.com/lireyisira/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/ton462sg/) )

```js
const sourceOne = Rx.Observable.of('Hello');
const sourceTwo = Rx.Observable.of('World!');
const sourceThree = Rx.Observable.of('Goodbye');
const sourceFour = Rx.Observable.of('World!');
//wait until all observables have emitted a value then emit all as an array
const example = Rx.Observable
  .zip(
    sourceOne,
    sourceTwo.delay(1000),
    sourceThree.delay(2000),
    sourceFour.delay(3000)
  );
//output: ["Hello", "World!", "Goodbye", "World!"]
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: zip when 1 observable completes

( [jsBin](http://jsbin.com/fisitatesa/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/oamyk3xr/) )

```js
//emit every 1s
const interval = Rx.Observable.interval(1000);
//when one observable completes no more values will be emitted
const example = Rx.Observable
  .zip(
    interval,
    interval.take(2)
  );
//output: [0,0]...[1,1]
const subscribe = example.subscribe(val => console.log(val));
```

### Follow the Source Code
*Coming soon...*


### Additional Resources
* [zip](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-zip) :newspaper: - Official docs
* [Combination operator: zip](https://egghead.io/lessons/rxjs-combination-operator-zip?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz
