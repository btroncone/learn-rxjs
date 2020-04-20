# Time based operators comparison

RxJS offers a rich selection of time based operators but this diversity can come at cost when choosing the right operator for a task at hand. Below is a visual comparison of popular time based operators.

Compared operators:

- [auditTime](../operators/filtering/audittime.md)
- [bufferTime](../operators/transformation/buffertime.md)
- [debounceTime](../operators/filtering/debouncetime.md)
- sampleTime
- [throttleTime](../operators/filtering/throttletime.md)

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
const intrvl = 1000;
const time = 3000;

const intervaled = (operator, operatorName) =>
  interval(intrvl)
    .pipe(
      take(takeValue),
      operator,
      tap(x => console.log(`${operatorName}:${x}`))
    );

merge(
  interval(intrvl).pipe(take(takeValue), tap(v => console.log(`i: ${v}`))),
  intervaled(auditTime(time), "auditTime"),
  intervaled(bufferTime(time), "bufferTime"),
  intervaled(debounceTime(time), "debounceTime"),
  intervaled(sampleTime(time), "sampleTime"),
  intervaled(throttleTime(time), "throttleTime")
).subscribe();

// output
/*
i: 0
throttleTime:0
i: 1
i: 2
bufferTime:0,1
sampleTime:1
i: 3
auditTime:3
i: 4
throttleTime:4
i: 5
bufferTime:2,3,4
sampleTime:4
i: 6
i: 7
auditTime:7
i: 8
bufferTime:5,6,7
sampleTime:7
throttleTime:8
i: 9
bufferTime:8,9
debounceTime:9

*/
```
