# create

#### signature: `create(subscribe: function)`

## Create an observable with given subscription function.

<a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a>

### Examples

##### Example 1: Observable that emits multiple values

( [jsBin](http://jsbin.com/qorugiwaba/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/td5107he/) )

```js
import { Observable } from 'rxjs/Observable';
/*
  Create an observable that emits 'Hello' and 'World' on  
  subscription.
*/
const hello = Observable.create(function(observer) {
  observer.next('Hello');
  observer.next('World');
});

//output: 'Hello'...'World'
const subscribe = hello.subscribe(val => console.log(val));
```

##### Example 2: Observable that emits even numbers on timer

( [jsBin](http://jsbin.com/lodilohate/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/vtozg6uf/) )

```js
import { Observable } from 'rxjs/Observable';

/*
  Increment value every 1s, emit even numbers.
*/
const evenNumbers = Observable.create(function(observer) {
  let value = 0;
  const interval = setInterval(() => {
    if (value % 2 === 0) {
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

* [create](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-create)
  :newspaper: - Official docs
* [Creation operators: Create()](https://egghead.io/lessons/rxjs-creation-operator-create?course=rxjs-beyond-the-basics-creating-observables-from-scratch)
  :video_camera: :dollar: - André Staltz
* [Using Observable.create for fine-grained control](https://egghead.io/lessons/rxjs-using-observable-create-for-fine-grained-control)
  :video_camera: :dollar: - Shane Osbourne

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/GenerateObservable.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/GenerateObservable.ts)
