# dematerialize

#### signature: `dematerialize(): Observable`

## Turn notification objects into notification values.

### Examples

##### Example 1: Converting notifications to values

( [jsBin](http://jsbin.com/vafedocibi/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/jw08mouy/) )

```js
//emit next and error notifications
const source = Rx.Observable.from([
  Rx.Notification.createNext('SUCCESS!'),
  Rx.Notification.createError('ERROR!')
])
  //turn notification objects into notification values
  .dematerialize();

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
> [https://github.com/ReactiveX/rxjs/blob/master/src/operator/demterialize.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/dematerialize.ts)
