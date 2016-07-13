# catch
####signature: `catch(project : function): Observable`
*The gist: Gracefully handle errors and exceptions without terminating observable...*

> :bulb: Tip: Remember to return an observable from your catch function!

### Examples

##### Example 1: Catching error from observable

( [jsBin](http://jsbin.com/porevoxelu/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/wk4oLLqc/) )

```js
//emit error
const source = Rx.Observable.throw('This is an error!');
//gracefully handle error, returning observable with error message
const example = source.catch(val => Rx.Observable.of(`I caught: ${val}`));
//output: 'I caught: This is an error'
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: Catching rejected promise

( [jsBin](http://jsbin.com/rusaxubanu/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/sLq92gLv/) )

```js
//create promise that immediately rejects
const myBadPromise = () => new Promise((resolve, reject) => reject('Rejected!'));
//emit single value after 1 second
const source = Rx.Observable.timer(1000);
//catch rejected promise, returning observable containing error message
const example = source.flatMap(() => Rx.Observable
                                       .fromPromise(myBadPromise())
                                       .catch(error => Rx.Observable.of(`Bad Promise: ${error}`))
                                    );
//output: 'Bad Promise: Rejected'
const subscribe = example.subscribe(val => console.log(val));
```


### Additional Resources
* [Error handling operator: catch](https://egghead.io/lessons/rxjs-error-handling-operator-catch?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz


> :file_folder: [https://github.com/ReactiveX/rxjs/blob/master/src/operator/catch.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/catch.ts)