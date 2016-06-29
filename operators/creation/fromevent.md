# fromEvent

####signature: `fromEvent(target: EventTargetLike, eventName: string, selector: function): Observable`
*The gist: Emit events from observable...*

( [jsBin](http://jsbin.com/xikapewoqa/1/edit?js,console,output) | [jsFiddle]() | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-windowToggle) )

```js
//create observable that emits click events
const source = Rx.Observable.fromEvent(document, 'click');
//map to string with given event timestamp
const example = source.map(event => `Event time: ${event.timeStamp}`)
//output (example): 'Event time: 7276.390000000001'
const subscribe = example.subscribe(val => console.log(val));
```

### How fromEvent works...
*Coming soon...*


### Additional Resources
*Coming soon...*