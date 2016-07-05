# toPromise

####signature: `toPromise() : Promise`
*The gist: Convert observable to promise...*

( [jsBin](http://jsbin.com/favoqecixi/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/thykc9up/) | [official docs](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/topromise.md) )

```js
//return basic observable
const sample = val => Rx.Observable.of(val).delay(5000);
//convert basic observable to promise
const example = sample('First Example')
  .toPromise()
  //output: 'First Example'
  .then(result => {
    console.log('From Promise:', result);
  });
/*
  convert each to promise and use Promise.all
  to wait for all to resolve
*/
const exampleTwo = () => {
  return Promise.all([
    sample('Promise 1').toPromise(),
    sample('Promise 2').toPromise()
  ]);
}
//output: ["Promise 1", "Promise 2"]
exampleTwo().then(val => {
  console.log('Promise.all Result:', val);
});
```

### How toPromise works...
*Coming soon...*


### Additional Resources
*Coming soon...*