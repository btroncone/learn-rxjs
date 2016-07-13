# create
####signature: `create(subscribe: function)`
*The gist: Creates an observable with a given subscribe function...*


### Examples

##### Example 1: Observable that emits multiple values

( [jsBin](http://jsbin.com/qorugiwaba/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/td5107he/) )

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
```

##### Example 2: Observable that emits even numbers on timer

( [jsBin](http://jsbin.com/lodilohate/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/vtozg6uf/) )

```js
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
const subscribe = evenNumbers.subscribe(val => console.log(val));
//unsubscribe after 10 seconds
setTimeout(() => {
  subscribe.unsubscribe();
}, 10000);
```


### Additional Resources
* [Creation operators: Create()](https://egghead.io/lessons/rxjs-creation-operator-create?course=rxjs-beyond-the-basics-creating-observables-from-scratch) :video_camera: :dollar: - André Staltz
* [Using Observable.create for fine-grained control](https://egghead.io/lessons/rxjs-using-observable-create-for-fine-grained-control) :video_camera: :dollar: - Shane Osbourne


> :file_folder: [https://github.com/ReactiveX/rxjs/blob/master/src/observable/GenerateObservable.ts](https://github.com/ReactiveX/rxjs/blob/master/src/observable/GenerateObservable.ts)
