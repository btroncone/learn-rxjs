# partition
####signature: `partition(predicate: function: boolean, thisArg: any): [Observable, Observable]`
*The gist: Split one observable into two based on predicate...*

( [jsBin](http://jsbin.com/fuqojubaqu/edit?js,console) | [jsFiddle](https://jsfiddle.net/qg6qfqLz/39/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-partition) )
```js
const source = Rx.Observable.from([1,2,3,4,5,6]);
//first value is true, second false
const [evens, odds] = source.partition(val => val % 2 === 0);
/*
  Output:
  "Even: 2"
  "Even: 4"
  "Even: 6"
  "Odd: 1"
  "Odd: 3"
  "Odd: 5"
*/
const subscribe = Rx.Observable.merge(
 evens
  .map(val => `Even: ${val}`),
 odds
  .map(val => `Odd: ${val}`)
).subscribe(val => console.log(val));
//if greater than 3 throw
const example = source
  .map(val => {
    if(val > 3){
      throw `${val} greater than 3!`
    }
    return {success: val};
  })
  .catch(val => Rx.Observable.of({error: val}));
//split on success or error
const [success, error] = example.partition(res => res.success)
/*
  Output:
  "Success! 1"
  "Success! 2"
  "Success! 3"
  "Error! 4 greater than 3!"
*/
const subscribeTwo = Rx.Observable.merge(
  success.map(val => `Success! ${val.success}`),
  error.map(val => `Error! ${val.error}`)
).subscribe(val => console.log(val));
```