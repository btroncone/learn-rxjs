# bufferWhen

#### signature: `bufferWhen(closingSelector: function): Observable`

## Collect all values until closing selector emits, emit buffered values.

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Emit buffer based on interval

( [jsBin](http://jsbin.com/vugerupube/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/nr9agfuL/) )

```js
import { interval } from 'rxjs/observable/interval';
import { bufferWhen } from 'rxjs/operators';

//emit value every 1 second
const oneSecondInterval = interval(1000);
//return an observable that emits value every 5 seconds
const fiveSecondInterval = () => interval(5000);
//every five seconds, emit buffered values
const bufferWhenExample = oneSecondInterval.pipe(bufferWhen(fiveSecondInterval));
//log values
//ex. output: [0,1,2,3]...[4,5,6,7,8]
const subscribe = bufferWhenExample.subscribe(val =>
  console.log('Emitted Buffer: ', val)
);
```

### Additional Resources

* [bufferWhen](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-bufferWhen)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/patching/operator/bufferWhen.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/patching/operator/bufferWhen.ts)
