# share
####signature: `share(): Observable`
*The gist: Share observable among multiple subscribers...*

( [jsBin](http://jsbin.com/jobiyomari/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/Lmesxxaq/) )

```js
//emit value in 1s
const source = Rx.Observable.timer(1000);
//log side effect, emit result
const example = source
  .do(() => console.log('***SIDE EFFECT***'))
  .mapTo('***RESULT***');
/*
  ***NOT SHARED, SIDE EFFECT WILL BE EXECUTED TWICE***
  output: 
  "***SIDE EFFECT***"
  "***RESULT***"
  "***SIDE EFFECT***"
  "***RESULT***"
*/
const subscribe = example.subscribe(val => console.log(val));
const subscribeTwo = example.subscribe(val => console.log(val));

//share observable among subscribers
const sharedExample = example.share();
/*
  ***SHARED, SIDE EFFECT EXECUTED ONCE***
  output: 
  "***SIDE EFFECT***"
  "***RESULT***"
  "***RESULT***"
*/
const subscribeThree = sharedExample.subscribe(val => console.log(val));
const subscribeFour = sharedExample.subscribe(val => console.log(val));
```

### How share works...
*Coming soon...*


### Additional Resources
* [share](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-share) :newspaper: - Official docs
* [Sharing streams with share](https://egghead.io/lessons/rxjs-sharing-streams-with-share?course=step-by-step-async-javascript-with-rxjs) :video_camera: :dollar: - John Linquist
