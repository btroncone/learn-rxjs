# catch

####signature: `catch(project : function): Observable`
*The gist: Gracefully handle errors and exceptions without terminating observable...*

( [jsBin](http://jsbin.com/litesodute/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/ukec2y4p/) )

```js
//emit error
const source = Rx.Observable.throw('This is an error!');
//gracefully handle error, returning observable with error message
const example = source.catch(val => Rx.Observable.of(`I caught: ${val}`));
//output: 'I caught: This is an error'
const subscribe = example.subscribe(val => console.log(val));

//create promise that immediately rejects
const myBadPromise = () => new Promise((resolve, reject) => reject('Rejected!'));
//emit single value after 1 second
const sourceTwo = Rx.Observable.timer(1000);
//catch rejected promise, returning observable containing error message
const exampleTwo = sourceTwo.flatMap(() => Rx.Observable
                                       .fromPromise(myBadPromise())
                                       .catch(error => Rx.Observable.of(`Bad Promise: ${error}`))
                                    );
//output: 'Bad Promise: Rejected'
const subscribeTwo = exampleTwo.subscribe(val => console.log(val));
```

### How catch works...
*Coming soon...*


### Additional Resources
* [Error handling operator: catch](https://egghead.io/lessons/rxjs-error-handling-operator-catch?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz
