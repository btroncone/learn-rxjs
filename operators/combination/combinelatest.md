# combineLatest
####signature: `combineLatest(observables: ...Observable, project: function): Observable`
*The gist: An observable that will combine a group of observables and emit the lastest values from all whenever one emits.*  

###Examples

#####Example 1: Combining three timer observables.
( [jsBin](http://jsbin.com/lumaqanoha/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/mygy9j86/) )
```js
//timerOne emits first value at 1s, then once every 4s
const timerOne = Rx.Observable.timer(1000, 4000);
//timerTwo emits first value at 2s, then once every 4s
const timerTwo = Rx.Observable.timer(2000, 4000);
//timerThree emits first value at 3s, then once every 4s
const timerThree = Rx.Observable.timer(3000, 4000);

/*
This combined observable will only emit values when all of the listed observables have emitted
their first value.  Afterward, when one timer emits, the combined observable will emit the latest
values from each timer as an array. This is why you won’t see any values till after 3 seconds
when all three emits the value 0.
*/
const combined = Rx.Observable
.combineLatest(
    timerOne,
    timerTwo,
    timerThree
);
//The combineLatest operator can takes in any number of observables as well as an optional projection function.

const subscribe = combined.subscribe(latestValues => {
  const [timerValOne, timerValTwo, timerValThree] = latestValues;
  /*
    Example:
    timerOne first tick: 'Timer One Latest: 1, Timer Two Latest:0, Timer Three Latest: 0
    timerTwo first tick: 'Timer One Latest: 1, Timer Two Latest:1, Timer Three Latest: 0
    timerThree first tick: 'Timer One Latest: 1, Timer Two Latest:1, Timer Three Latest: 1
  */
  console.log(
    `Timer One Latest: ${timerValOne}, 
     Timer Two Latest: ${timerValTwo}, 
     Timer Three Latest: ${timerValThree}`
   );
});
```

#####Example 2: Moving the projection function in subscriber to combineLatest.
( [jsBin](http://jsbin.com/lumaqanoha/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/mygy9j86/) )
```js
//timerOne emits first value at 1s, then once every 4s
const timerOne = Rx.Observable.timer(1000, 4000);
//timerTwo emits first value at 2s, then once every 4s
const timerTwo = Rx.Observable.timer(2000, 4000);
//timerThree emits first value at 3s, then once every 4s
const timerThree = Rx.Observable.timer(3000, 4000);

/*
Here, we provided a projection function inside the combineLatest operator instead of the subscribe
operator.  This allows us to clear up our subscribe operator.  We could also move the function outside
and give it a variable name.  Then, we can simply pass in the variable, letting us clean the code even more.
*/
const combinedProject = Rx.Observable
.combineLatest(
    timerOne,
    timerTwo,
    timerThree,
    (one, two, three) => {
      /*
        Example:
        timerOne first tick: 'Timer One Latest: 1, Timer Two Latest:0, Timer Three Latest: 0
        timerTwo first tick: 'Timer One Latest: 1, Timer Two Latest:1, Timer Three Latest: 0
        timerThree first tick: 'Timer One Latest: 1, Timer Two Latest:1, Timer Three Latest: 1
      */
      return `Timer One (Proj) Latest: ${one}, 
              Timer Two (Proj) Latest: ${two}, 
              Timer Three (Proj) Latest: ${three}`
    }
);
const subscribe = combinedProject.subscribe(latestValuesProject => console.log(latestValuesProject));
```

### How combineLatest works...
*Coming soon...*


### Additional Resources
* [combineLatest: Official Documentation](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-combineLatest)
* [Combining streams with combineLatest](https://egghead.io/lessons/rxjs-combining-streams-with-combinelatest?course=step-by-step-async-javascript-with-rxjs) :video_camera: :dollar: - John Linquist
* [Combination operator: combineLatest](https://egghead.io/lessons/rxjs-combination-operator-combinelatest?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz
