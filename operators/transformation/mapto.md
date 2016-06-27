# mapTo
####signature: `mapTo(value: any): Observable`
*The gist: Map to a constant value every time...*

( [jsBin](http://jsbin.com/yazusehahu/1/edit?js,console,output) | [jsFiddle](https://jsfiddle.net/qg6qfqLz/37/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mapTo) )

```js
//emit value every two seconds
const source = Rx.Observable.interval(2000);
//map all emissions to one value
const example = source.mapTo('HELLO WORLD!');
//output: 'HELLO WORLD!'...'HELLO WORLD!'...'HELLO WORLD!'...
const subscribe = example.subscribe(val => console.log(val));

//emit every click on document
const clickSource = Rx.Observable.fromEvent(document, 'click');
//map all emissions to one value
const exampleTwo = clickSource.mapTo('GOODBYE WORLD!');
//output: (click)'GOODBYE WORLD!'...
const subscribeTwo = exampleTwo.subscribe(val => console.log(val));
```