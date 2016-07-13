# do
####signature: `do(nextOrObserver: function, error: function, complete: function): Observable`

### Description

###### TL;DR: Transparently perform actions, such as logging

*Description coming soon...*

### Examples

##### Example 1: Logging with do

( [jsBin](http://jsbin.com/jimazuriva/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/qtyakorq/) )

```js
const source = Rx.Observable.of(1,2,3,4,5);
//transparently log values from source with 'do'
const example = source
  .do(val => console.log(`BEFORE MAP: ${val}`))
  .map(val => val + 10)
  .do(val => console.log(`AFTER MAP: ${val}`));
//'do' does not transform values
//output: 11...12...13...14...15
const subscribe = example.subscribe(val => console.log(val));
```


### Additional Resources
* [do](https://github.com/ReactiveX/rxjs/blob/master/src/operator/do.ts) :newspaper: - Official docs
* [Logging a stream with do](https://egghead.io/lessons/rxjs-logging-a-stream-with-do?course=step-by-step-async-javascript-with-rxjs) :video_camera: :dollar: - John Linquist
* [Utility operator: do](https://egghead.io/lessons/rxjs-utility-operator-do?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz

---
> :file_folder: Source Code:  [https://github.com/ReactiveX/rxjs/blob/master/src/operator/do.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/do.ts)