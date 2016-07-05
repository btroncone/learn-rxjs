# timer

####signature: `timer(initialDelay: number | Date, period: number, scheduler: Scheduler): Observable`
*The gist: After given duration, emit numbers in sequence every specified duration...*

( [jsBin](http://jsbin.com/posozozuyi/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/vpx0y8fu/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-timer) )

```js
//emit 0 after 1 second then complete, since no second argument is supplied
const source = Rx.Observable.timer(1000);
//output: 0
const subscribe = source.subscribe(val => console.log(val));

/*
  timer takes a second argument, how often to emit subsequent values
  in this case we will emit first value after 1 second and subsequent
  values every 2 seconds after
*/
const sourceTwo = Rx.Observable.timer(1000, 2000);
//output: 0,1,2,3,4,5......
const subscribeTwo = sourceTwo.subscribe(val => console.log(val));
```

### How timer works...
*Coming soon...*


### Additional Resources
* [Creation operators: interval and timer](https://egghead.io/lessons/rxjs-creation-operators-interval-and-timer?course=rxjs-beyond-the-basics-creating-observables-from-scratch) :video_camera: :dollar: - André Staltz