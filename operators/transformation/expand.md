# expand

#### signature: `expand(project: function, concurrent: number, scheduler: Scheduler): Observable`

## Recursively call provided function.

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Examples

##### Example 1: Add one for each invocation

( [jsBin](http://jsbin.com/fuxocepazi/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/nu4apbLt/) )

```js
import { interval } from 'rxjs/observable/interval';
import { of } from 'rxjs/observable/of';
import { expand } from 'rxjs/operators';

//emit 2
const source = of(2);
const example = source.pipe(
  //recursively call supplied function
  expand(val => {
    //2,3,4,5,6
    console.log(`Passed value: ${val}`);
    //3,4,5,6
    return of(1 + val);
  }),
  //call 5 times
  take(5)
);
/*
	"RESULT: 2"
	"Passed value: 2"
	"RESULT: 3"
	"Passed value: 3"
	"RESULT: 4"
	"Passed value: 4"
	"RESULT: 5"
	"Passed value: 5"
	"RESULT: 6"
	"Passed value: 6"
*/
//output: 2,3,4,5,6
const subscribe = example.subscribe(val => console.log(`RESULT: ${val}`));
```

### Additional Resources

* [expand](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-expand)
  :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/patching/operator/expand.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/patching/operator/expand.ts)
