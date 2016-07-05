# multicast
####signature: `multicast(selector: Function): Observable`
*The gist: Share subscription to source given particular Subject...*

( [jsBin](http://jsbin.com/kisinazaga/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/x2z7p1gm/) | [official docs](http://reactivex-rxjs5.surge.sh/function/index.html#static-function-publish) )

```js
const source = Rx.Observable.interval(2000).take(5);

const example = source
  //since we are multicasting below, side effects will be executed once
  .do(() => console.log('Side Effect #1'))
  .mapTo('Result!')

//subscribe subject to source upon connect()
const multi = example.multicast(() => new Rx.Subject());
/*
  subscribers will share source
  output:
  "Side Effect #1"
  "Result!"
  "Result!"
  ...
*/
const subscriberOne = multi.subscribe(val => console.log(val));
const subscriberTwo = multi.subscribe(val => console.log(val));
//subscribe subject to source
multi.connect();

//example with ReplaySubject
const exampleTwo = source
  //since we are multicasting below, side effects will be executed once
  .do(() => console.log('Side Effect #2'))
  .mapTo('Result Two!')
//can use any type of subject
const multiTwo = exampleTwo.multicast(() => new Rx.ReplaySubject(5));
//subscribe subject to source
multiTwo.connect();

setTimeout(() => { 
  /*
   subscriber will receieve all previous values on subscription because
   of ReplaySubject
   */
  const subscriberThree = multiTwo
    .subscribe(val => console.group(val));
}, 5000);
```

### How multicast works...
*Coming soon...*


### Additional Resources
*Coming soon...*