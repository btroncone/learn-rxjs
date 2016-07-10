# do
####signature: `do(nextOrObserver: function, error: function, complete: function): Observable`
*The gist: Transparently perform actions, such as logging...*


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

### Follow the source code...
1. [Operator subscribes to source observable](https://github.com/ReactiveX/rxjs/blob/master/src/operator/do.ts#L66)
2. [An extra subscriber is created, based on the functions passed to do operator](https://github.com/ReactiveX/rxjs/blob/master/src/operator/do.ts#L85)
3. Both subscribe functions are invoked with values emitted from source ([Source #1](https://github.com/ReactiveX/rxjs/blob/master/src/operator/do.ts#L93) | [Source #2](https://github.com/ReactiveX/rxjs/blob/master/src/operator/do.ts#L97))
4. [Errors are forwarded to main subscriber](https://github.com/ReactiveX/rxjs/blob/master/src/operator/do.ts#L94-L95)



### Additional Resources
* [do](https://github.com/ReactiveX/rxjs/blob/master/src/operator/do.ts) :newspaper: - Official docs
* [Logging a stream with do](https://egghead.io/lessons/rxjs-logging-a-stream-with-do?course=step-by-step-async-javascript-with-rxjs) :video_camera: :dollar: - John Linquist
* [Utility operator: do](https://egghead.io/lessons/rxjs-utility-operator-do?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz