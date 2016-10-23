# partition
####signature: `partition(predicate: function: boolean, thisArg: any): [Observable, Observable]`

## Split one observable into two based on provided predicate.

### Examples

##### Example 1: Split even and odd numbers

( [jsBin](http://jsbin.com/hipehexaku/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/q0xo7gvv/) )

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
```

##### Example 2: Split success and errors

( [jsBin](http://jsbin.com/kukuguhuri/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/fe246u5p/) )

```js
const source = Rx.Observable.from([1,2,3,4,5,6]);
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
const subscribe = Rx.Observable.merge(
  success.map(val => `Success! ${val.success}`),
  error.map(val => `Error! ${val.error}`)
).subscribe(val => console.log(val));
```


### Additional Resources
* [partition](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-partition) :newspaper: - Official docs

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/partition.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/partition.ts)
