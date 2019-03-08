# Time based operators comparison

RxJs offers rich choice of time based operators but richness comes at cost when choosing right operator for a task at hand.
Below comparison presents visual comparison of time based operators.

(
[Stackblitz](https://stackblitz.com/edit/rxjs-time-based-operators-comparison?file=index.ts&devtoolsheight=100))

```js
/*
interval      ^0-------1-------2-------3-------4-------5-------6-------7-------8-------9------|
auditTime     ^------------------------3-------------------------------7----------------------|
bufferTime    ^----------------[0,1]-------------------[2,3,4]-----------------[5,6,7]-[8,9]--|
debounceTime  ^------------------------------------------------------------------------9------|
sampleTime    ^----------------1-----------------------4-----------------------7--------------|
throttleTime  ^0-------------------------------4-------------------------------8--------------|
*/

// RxJS v6+
import { interval, merge } from 'rxjs';
import { auditTime, bufferTime, debounceTime, sampleTime, throttleTime, tap, take } from 'rxjs/operators';

const takeValue = 10;
const intervaled = (operator, operatorName) =>
  interval(1000)
    .pipe(
      take(takeValue),
      operator,
      tap(x => console.log(`${operatorName}:${x}`))
    );

merge(
  interval(1000).pipe(take(takeValue), tap(v => console.log(`i: ${v}`))),
  intervaled(auditTime(3000), "audtiTime"),
  intervaled(bufferTime(3000), "bufferTime"),
  intervaled(debounceTime(3000), "debounceTime"),
  intervaled(sampleTime(3000), "sampleTime"),
  intervaled(throttleTime(3000), "throttleTime")
).subscribe();


// output
/*
0
throttleTime:0
1
2
bufferTime:0,1
sampleTime:1
3
audtiTime:3
4
throttleTime:4
5
bufferTime:2,3,4
sampleTime:4
6
7
audtiTime:7
8
bufferTime:5,6,7
sampleTime:7
throttleTime:8
9
bufferTime:8,9
debounceTime:9

*/
```
