# bufferWhen
####signature: `bufferWhen(closingSelector: function): Observable`
*The gist: Buffer all values until closing selector emits, emit buffered values, repeat...*

( [jsBin](http://jsbin.com/vugerupube/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/nr9agfuL/) )

```js
//emit value every 1 second
const oneSecondInterval = Rx.Observable.interval(1000);
//return an observable that emits value every 5 seconds
const fiveSecondInterval = () => Rx.Observable.interval(5000);
//every five seconds, emit buffered values
const bufferWhenExample = oneSecondInterval.bufferWhen(fiveSecondInterval);
//log values
//ex. output: [0,1,2,3]...[4,5,6,7,8]
const subscribe = bufferWhenExample.subscribe(val => console.log('Emitted Buffer: ', val));
```

### How bufferWhen works...
*Coming soon...*


### Additional Resources
* [bufferWhen](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-bufferWhen) :newspaper: - Official docs