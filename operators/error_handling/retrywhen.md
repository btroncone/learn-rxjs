# retryWhen
####signature: `retryWhen(receives: (errors: Observable) => Observable, the: scheduler): Observable`

### Description

###### TL;DR: Retry with additional logic

The **retryWhen** operator mirrors the output of the source except in the case of an error.  When an error occurs it is passed to the ```notificationHandler``` function which stipulates the next action.  If the function emits an error or complete, the operator would so the same.  If not, the operator would resubscribes to the source.

### Examples

##### Example 1: Trigger retry after specified duration

( [jsBin](http://jsbin.com/miduqexalo/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/49mkhsyr/) )

```js
//emit value every 1s
const source = Rx.Observable.interval(1000);
const example = source
  .map(val => {
    if(val > 5){
     //error will be picked up by retryWhen
     throw val;
    }
    return val;
  })
  .retryWhen(errors => errors
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


### Additional Resources
* [retryWhen](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-retryWhen) :newspaper: - Official docs
* [Error handling operator: retry and retryWhen](https://egghead.io/lessons/rxjs-error-handling-operator-retry-and-retrywhen?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz


---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/retryWhen.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/retryWhen.ts)
