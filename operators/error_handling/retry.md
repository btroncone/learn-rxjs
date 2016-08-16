# retry
####signature: `retry(number: number): Observable`

### Description

###### TL;DR: Retry provided number of times on error

The **retry** operator mirrors the output of the source except in the case of an error.  When an error is emitted, the operator would resubscribe to the source and retry.  It will do so for the number of times provided in the parameter.  Once the retry count is reached, and there's still an error, the source will emit that error.

### Examples

##### Example 1: Retry 2 times on error

( [jsBin](http://jsbin.com/yovacuxuqa/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/hg7z16bo/) )

```js
//emit value every 1s
const source = Rx.Observable.interval(1000);
const example = source
  .flatMap(val => {
    //throw error for demonstration
    if(val > 5){
      return Rx.Observable.throw('Error!');
    }
    return Rx.Observable.of(val);
  })
  //retry 2 times on error
  .retry(2);
/*
  output: 
  0..1..2..3..4..5..
  0..1..2..3..4..5..
  0..1..2..3..4..5..
  "Error!: Retried 2 times then quit!"
*/
const subscribe = example
  .subscribe({
     next: val => console.log(val),
     error: val => console.log(`${val}: Retried 2 times then quit!`)
});
```


### Additional Resources
* [retry](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-retry) :newspaper: - Official docs
* [Error handling operator: retry and retryWhen](https://egghead.io/lessons/rxjs-error-handling-operator-retry-and-retrywhen?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/retry.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/retry.ts)
