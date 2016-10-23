# empty
####signature: `empty(scheduler: Scheduler): Observable`

## Observable that immediately completes.

### Examples

##### Example 1: empty immediately completes

( [jsBin](http://jsbin.com/rodubucaqa/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/bz71mzuy/) )

```js
//Create observable that immediately completes
const example = Rx.Observable.empty();
//output: 'Complete!'
const subscribe = example.subscribe({
  next: () => console.log('Next'),
  complete: () => console.log('Complete!')
});
```

### Follow the Source Code
*Coming soon...*


### Additional Resources
* [empty](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-empty) :newspaper: - Official docs
* [Creation operators: empty, never, and throw](https://egghead.io/lessons/rxjs-creation-operators-empty-never-throw?course=rxjs-beyond-the-basics-creating-observables-from-scratch) :video_camera: :dollar: - André Staltz

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/observable/EmptyObservable.ts](https://github.com/ReactiveX/rxjs/blob/master/src/observable/EmptyObservable.ts)
