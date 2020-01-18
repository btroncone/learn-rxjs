# dematerialize

#### signature: `dematerialize(): Observable`

## Turn notification objects into notification values.

![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX)

### Examples

**Example 1: Converting notifications to values**

\( [StackBlitz](https://stackblitz.com/edit/typescript-bxdwbg?file=index.ts&devtoolsheight=100) \| [jsBin](http://jsbin.com/vafedocibi/1/edit?js,console) \| [jsFiddle](https://jsfiddle.net/btroncone/jw08mouy/) \)

```javascript
// RxJS v6+
import { from, Notification } from 'rxjs';
import { dematerialize } from 'rxjs/operators';

//emit next and error notifications
const source = from([
  Notification.createNext('SUCCESS!'),
  Notification.createError('ERROR!')
]).pipe(
  //turn notification objects into notification values
  dematerialize()
);

//output: 'NEXT VALUE: SUCCESS' 'ERROR VALUE: 'ERROR!'
const subscription = source.subscribe({
  next: val => console.log(`NEXT VALUE: ${val}`),
  error: val => console.log(`ERROR VALUE: ${val}`)
});
```

### Additional Resources

* [dematerialize](https://rxjs.dev/api/operators/dematerialize)

  :newspaper: - Official docs

> :file\_folder: Source Code: [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/demterialize.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/dematerialize.ts)

