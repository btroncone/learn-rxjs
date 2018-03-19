# retry

#### signature: `retry(number: number): Observable`

## Retry an observable sequence a specific number of times should an error occur.

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Retry 2 times on error

( [jsBin](http://jsbin.com/yovacuxuqa/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/hg7z16bo/) )

```js
import { interval } from 'rxjs/observable/interval';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { mergeMap, retry } 'rxjs/operators';

//emit value every 1s
const source = interval(1000);
const example = source.pipe(
  mergeMap(val => {
    //throw error for demonstration
    if (val > 5) {
      return _throw('Error!');
    }
    return of(val);
  }),
  //retry 2 times on error
  retry(2)
);
/*
  output:
  0..1..2..3..4..5..
  0..1..2..3..4..5..
  0..1..2..3..4..5..
  "Error!: Retried 2 times then quit!"
*/
const subscribe = example.subscribe({
  next: val => console.log(val),
  error: val => console.log(`${val}: Retried 2 times then quit!`)
});
```

### Additional Resources

* [retry](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-retry)
  :newspaper: - Official docs
* [Error handling operator: retry and retryWhen](https://egghead.io/lessons/rxjs-error-handling-operator-retry-and-retrywhen?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/retry.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/retry.ts)
