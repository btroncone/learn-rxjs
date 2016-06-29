# create

####signature: `create(subscribe: function)`
*The gist: Creates an observable with a given subscribe function...*

( [jsBin](http://jsbin.com/hinacisafu/1/edit?js,console) | [jsFiddle]() )

```js
/*
  Create an observable that emits 'Hello' and 'World' on  
  subscription.
*/
const hello = Rx.Observable.create(function(observer) {
  observer.next('Hello');
  observer.next('World');
});

//output: 'Hello'...'World'
const subscribe = hello.subscribe(val => console.log(val));

/*
  Increment value every 1s, emit even numbers.
*/
const evenNumbers = Rx.Observable.create(function(observer) {
  let value = 0;
  const interval = setInterval(() => {
    if(value % 2 === 0){
      observer.next(value);
    }
    value++;
  }, 1000);
  
  return () => clearInterval(interval);
});
//output: 0...2...4...6...8
const subscribeTwo = evenNumbers.subscribe(val => console.log(val));
//unsubscribe after 10 seconds
setTimeout(() => {
  subscribeTwo.unsubscribe();
}, 10000);
```