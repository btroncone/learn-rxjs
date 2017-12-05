# retryWhen

#### signature: `retryWhen(receives: (errors: Observable) => Observable, the: scheduler): Observable`

## Retry an observable sequence on error based on custom criteria.

### Examples

##### Example 1: Trigger retry after specified duration

( [jsBin](http://jsbin.com/miduqexalo/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/49mkhsyr/) )

```js
//emit value every 1s
const source = Rx.Observable.interval(1000);
const example = source
  .map(val => {
    if (val > 5) {
      //error will be picked up by retryWhen
      throw val;
    }
    return val;
  })
  .retryWhen(errors =>
    errors
      //log error message
      .do(val => console.log(`Value ${val} was too high!`))
      //restart in 5 seconds
      .delayWhen(val => Rx.Observable.timer(val * 1000))
  );
/*
  output: 
  0
  1
  2
  3
  4
  5
  "Value 6 was too high!"
  --Wait 5 seconds then repeat
*/
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Increased duration between retries

( [jsBin](http://jsbin.com/nexuxoyifa/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/tLx1c3j6/2/) )

```js
//emit value every 1s
const source = Rx.Observable.interval(1000);
const example = source
  .map(val => {
    if (val > 2) {
      //error will be picked up by retryWhen
      throw val;
    }
    return val;
  })
  .retryWhen(attempts => {
    return attempts.zip(Rx.Observable.range(1, 4)).mergeMap(([error, i]) => {
      if (i > 3) {
        return Rx.Observable.throw(error);
      }
      console.log(`Wait ${i} seconds, then retry!`);
      return Rx.Observable.timer(i * 1000);
    });
  })
  .catch(_ => Rx.Observable.of('Ouch, giving up!'));

const subscribe = example.subscribe(val => console.log(val));
```

### Additional Resources

* [retryWhen](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-retryWhen)
  :newspaper: - Official docs
* [Error handling operator: retry and retryWhen](https://egghead.io/lessons/rxjs-error-handling-operator-retry-and-retrywhen?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/operator/retryWhen.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/retryWhen.ts)
