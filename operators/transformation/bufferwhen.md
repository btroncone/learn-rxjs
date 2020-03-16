# bufferWhen

#### signature: `bufferWhen(closingSelector: function): Observable`

## Collect all values until closing selector emits, emit buffered values.

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1qq2-q-eVe-F_-d0eSvTyqaGRjpfLDdJz 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1: Emit buffer based on interval

(
[StackBlitz](https://stackblitz.com/edit/typescript-f4a2fu?file=index.ts&devtoolsheight=10)
| [jsBin](http://jsbin.com/vugerupube/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/nr9agfuL/) )

```js
// RxJS v6+
import { interval } from 'rxjs';
import { bufferWhen } from 'rxjs/operators';

//emit value every 1 second
const oneSecondInterval = interval(1000);
//return an observable that emits value every 5 seconds
const fiveSecondInterval = () => interval(5000);
//every five seconds, emit buffered values
const bufferWhenExample = oneSecondInterval.pipe(
  bufferWhen(fiveSecondInterval)
);
//log values
//ex. output: [0,1,2,3]...[4,5,6,7,8]
const subscribe = bufferWhenExample.subscribe(val =>
  console.log('Emitted Buffer: ', val)
);
```

### Additional Resources

- [bufferWhen](https://rxjs.dev/api/operators/bufferWhen) 📰 - Official docs

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/bufferWhen.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/bufferWhen.ts)
