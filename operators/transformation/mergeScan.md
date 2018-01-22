# mergeScan

#### signature: `mergeScan(accumulator: function(acc: R, value: T): Observable<R>, seed: *, concurrent: number): Observable<R>`

## `scan` while returning an Observable and merging it with the outer Observerable.

### Why Use `mergeScan`
This operator lets you interact with your accumlator as an Observable.

***Working Progress***

***On Hold, not sure if it'll be removed in v6***

---

:bulb: This operator is the core for many RxJS based
[Redux](http://redux.js.org) implementations!

---

### Examples

##### Example 1: Slowing Timer

([jsFiddle](https://jsfiddle.net/ElHuy/ka8Lwjx1/))

```js
console.clear();

const click$ = Rx.Observable
	.fromEvent(document, 'click')
	.mapTo(1);
  
const timer$ = (a,c) => Rx.Observable
	.timer(1000, (a+c)*1000);
  
const count$ = click$
	.mergeScan((a,c) => timer$(a,c).take(10), 0);

count$.subscribe(console.log);
```

### Additional Resources

* [mergeScan](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeScan)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [RxJS - mergeScan](https://github.com/ReactiveX/rxjs/blob/c3c56867eaf93f302ac7cd588034c7d8712f2834/src/internal/patching/operator/mergeScan.ts)
