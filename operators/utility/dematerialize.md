# dematerialize

#### signature: `dematerialize(): Observable`

## Turn notification objects into notification values.

<div class="ua-ad"><a href="https://ultimatecourses.com/?ref=76683_kee7y7vk"><img src="https://ultimatecourses.com/assets/img/banners/ultimate-angular-leader.svg" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Converting notifications to values

(
[StackBlitz](https://stackblitz.com/edit/typescript-bxdwbg?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/vafedocibi/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/jw08mouy/) )

```js
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

- [dematerialize](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-dematerialize)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/demterialize.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/dematerialize.ts)
