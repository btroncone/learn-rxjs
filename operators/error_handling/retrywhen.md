# retryWhen
####signature: `retryWhen(receives: notificationHandler, the: scheduler): Observable`
*The gist: Retry with additional logic...*


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

### Follow the source code...
*Coming soon...*


### Additional Resources
* [retryWhen](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-retryWhen) :newspaper: - Official docs
* [Error handling operator: retry and retryWhen](https://egghead.io/lessons/rxjs-error-handling-operator-retry-and-retrywhen?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz
