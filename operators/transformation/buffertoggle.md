# bufferToggle
####signature: `bufferToggle(openings: Observable, closingSelector: Function): Observable`
*The gist: Toggle buffer on to catch emitted values from source, toggle buffer off to emit buffered values...*


### Examples

##### Example 1: Toggle buffer on and off at interval

( [jsBin](http://jsbin.com/relavezugo/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/6ad3w3wf/) )

```js
//emit value every second
const sourceInterval = Rx.Observable.interval(1000);
//start first buffer after 5s, and every 5s after
const startInterval = Rx.Observable.interval(5000);
//emit value after 3s, closing corresponding buffer
const closingInterval = val => {
	console.log(`Value ${val} emitted, starting buffer! Closing in 3s!`)
	return Rx.Observable.interval(3000);
}
//every 5s a new buffer will start, collecting emitted values for 3s then emitting buffered values
const bufferToggleInterval = sourceInterval.bufferToggle(startInterval, closingInterval);
//log to console
//ex. emitted buffers [4,5,6]...[9,10,11]
const subscribe = bufferToggleInterval.subscribe(val => console.log('Emitted Buffer:', val));
```

### Follow the source code...
*Coming soon...*


### Additional Resources
* [bufferToggle](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-bufferToggle) :newspaper: - Official docs