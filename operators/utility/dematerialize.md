# dematerialize

#### signature: `dematerialize(): Observable`

## Turn notification objects into notification values.

<a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a>

### Examples

##### Example 1: Converting notifications to values

( [jsBin](http://jsbin.com/vafedocibi/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/jw08mouy/) )

```js
import { from } 'rxjs/observable/from';
import { Notification } from 'rxjs/Notification';

//emit next and error notifications
const source = from([
  Notification.createNext('SUCCESS!'),
  Notification.createError('ERROR!')
  ]).pipe(
    //turn notification objects into notification values
    dematerialize()
  )

//output: 'NEXT VALUE: SUCCESS' 'ERROR VALUE: 'ERROR!'
const subscription = source.subscribe({
  next: val => console.log(`NEXT VALUE: ${val}`),
  error: val => console.log(`ERROR VALUE: ${val}`)
});
```

### Additional Resources

* [dematerialize](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-dematerialize)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/demterialize.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/dematerialize.ts)
