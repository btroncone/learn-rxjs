# fromEvent

####signature: `fromEvent(target: EventTargetLike, eventName: string, selector: function): Observable`
*The gist: Emit events from observable...*

### Examples

##### Example 1: Observable from mouse clicks

( [jsBin](http://jsbin.com/xikapewoqa/1/edit?js,console,output) | [jsFiddle](https://jsfiddle.net/btroncone/vbLz1pdx/) )

```js
//create observable that emits click events
const source = Rx.Observable.fromEvent(document, 'click');
//map to string with given event timestamp
const example = source.map(event => `Event time: ${event.timeStamp}`)
//output (example): 'Event time: 7276.390000000001'
const subscribe = example.subscribe(val => console.log(val));
```

### Follow the source code...
*Coming soon...*


### Additional Resources
* [fromEvent](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-fromEvent) :newspaper: - Official docs