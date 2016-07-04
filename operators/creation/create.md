# create

####signature: `create(subscribe: function)`
*The gist: Creates an observable with a given subscribe function...*

( [jsBin](http://jsbin.com/hinacisafu/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/ukec2y4p/6/) )

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

### How empty works...
*Coming soon...*


### Additional Resources
* [Creation operators: Create()](https://egghead.io/lessons/rxjs-creation-operator-create?course=rxjs-beyond-the-basics-creating-observables-from-scratch) :video_camera: :dollar: - André Staltz
* [Using Observable.create for fine-grained control](https://egghead.io/lessons/rxjs-using-observable-create-for-fine-grained-control) :video_camera: :dollar: - Shane Osbourne