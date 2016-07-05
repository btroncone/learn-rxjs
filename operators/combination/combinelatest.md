# combineLatest
####signature: `combineLatest(observables: ...Observable, project: function): Observable`
*The gist: An observable that will combine a group of observables and emit the lastest values from all whenever one emits.*

###Examples
( [jsBin](http://jsbin.com/lumaqanoha/1/edit?js,console) | [jsFiddle](https://jsfiddle.net/btroncone/mygy9j86/) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-combineLatest) )

#####Example 1:
```js
const timerOne = Rx.Observable.timer(1000, 4000);
const timerTwo = Rx.Observable.timer(2000, 4000);
const timerThree = Rx.Observable.timer(3000, 4000);

const combined = Rx.Observable
.combineLatest(
    timerOne,
    timerTwo,
    timerThree
);
//The combineLatest operator can takes in any number of observables as well as an optional projection function.

const subscribe = combined.subscribe(latestValues => {
	const [timerValOne, timerValTwo, timerValThree] = latestValues;
  console.log(
    `Timer One Latest: ${timerValOne}, 
     Timer Two Latest: ${timerValTwo}, 
     Timer Three Latest: ${timerValThree}`
   );
});
/*
This combined observable will only emit values when all of the listed observables have emitted
their first value.  Afterward, when one timer emits, the combined observable will emit the latest
values from each timer as an array. This is why you won’t see any values till after 3 seconds
when all three emits the value 0.
*/
```

#####Example 2:
```js
const timerOne = Rx.Observable.timer(1000, 4000);
const timerTwo = Rx.Observable.timer(2000, 4000);
const timerThree = Rx.Observable.timer(3000, 4000);

const combinedProject = Rx.Observable
.combineLatest(
    timerOne,
    timerTwo,
    timerThree,
    (one, two, three) => {
      return `Timer One (Proj) Latest: ${one}, 
              Timer Two (Proj) Latest: ${two}, 
              Timer Three (Proj) Latest: ${three}`
    }
);
const subscribe = combinedProject.subscribe(latestValuesProject => console.log(latestValuesProject));
/*
Here, we provided a projection function inside the combineLatest operator instead of the subscribe
operator.  This allows us to clear up our subscribe operator.  We could also move the function outside
and give it a variable name.  Then, we can simply pass in the variable, letting us clean the code even more.
*/
```

### How combineLatest works...
*Coming soon...*


### Additional Resources
* [Combining streams with combineLatest](https://egghead.io/lessons/rxjs-combining-streams-with-combinelatest?course=step-by-step-async-javascript-with-rxjs) :video_camera: :dollar: - John Linquist
* [Combination operator: combineLatest](https://egghead.io/lessons/rxjs-combination-operator-combinelatest?course=rxjs-beyond-the-basics-operators-in-depth) :video_camera: :dollar: - André Staltz
