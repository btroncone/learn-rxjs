# merge

#### signature: `merge(input: Observable): Observable`

## Turn multiple observables into a single observable.

---

💡 This operator can be used as either a static or instance method!

💡 If order not throughput is a primary concern, try [concat](concat.md)
instead!

---

### Why use merge?
The merge operator is your go-to solution when you have multiple observables that produce values independently and you want to combine their output into a single stream. Think of it as a highway merger, where multiple roads join together to form a single, unified road - the traffic (data) from each road (observable) flows seamlessly together.

A real-world example can be seen in a chat application, where you have separate observables for receiving messages from multiple users. By using `merge`, you can bring all those message streams into a single unified stream for displaying the messages in the chat window.

Keep in mind that `merge` will emit values as soon as any of the observables emit a value. This is different from combineLatest or withLatestFrom, which wait for each observable to emit at least one value before emitting a combined value.

Lastly, if you're dealing with observables that emit values at specific intervals and you need to combine them based on time, consider using the [zip](zip.md) operator instead.



### Examples

##### Example 1: merging multiple observables, static method

(
[StackBlitz](https://stackblitz.com/edit/typescript-ohq6rx?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/conufujapi/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/qvq9dscu/) )

```js
// RxJS v6+
import { mapTo } from 'rxjs/operators';
import { interval, merge } from 'rxjs';

//emit every 2.5 seconds
const first = interval(2500);
//emit every 2 seconds
const second = interval(2000);
//emit every 1.5 seconds
const third = interval(1500);
//emit every 1 second
const fourth = interval(1000);

//emit outputs from one observable
const example = merge(
  first.pipe(mapTo('FIRST!')),
  second.pipe(mapTo('SECOND!')),
  third.pipe(mapTo('THIRD')),
  fourth.pipe(mapTo('FOURTH'))
);
//output: "FOURTH", "THIRD", "SECOND!", "FOURTH", "FIRST!", "THIRD", "FOURTH"
const subscribe = example.subscribe(val => console.log(val));
```

##### Example 2: merge 2 observables, instance method

(
[StackBlitz](https://stackblitz.com/edit/typescript-bcsl1r?file=index.ts&devtoolsheight=100)
| [jsBin](http://jsbin.com/wuwujokaqu/1/edit?js,console) |
[jsFiddle](https://jsfiddle.net/btroncone/me5ofcr0/) )

```js
// RxJS v6+
import { merge } from 'rxjs/operators';
import { interval } from 'rxjs';

//emit every 2.5 seconds
const first = interval(2500);
//emit every 1 second
const second = interval(1000);
//used as instance method
const example = first.pipe(merge(second));
//output: 0,1,0,2....
const subscribe = example.subscribe(val => console.log(val));
```

### Related Recipes

- [Battleship Game](../../recipes/battleship-game.md)
- [Flappy Bird Game](../../recipes/flappy-bird-game.md)
- [HTTP Polling](../../recipes/http-polling.md)
- [Lockscreen](../../recipes/lockscreen.md)
- [Memory Game](../../recipes/memory-game.md)
- [Save Indicator](../../recipes/save-indicator.md)

### Additional Resources

- [merge](https://rxjs.dev/api/index/function/merge) 📰 - Official docs
- [merge](https://indepth.dev/reference/rxjs/operators/merge) - In Depth Dev Reference
- [Handling multiple streams with merge](https://egghead.io/lessons/rxjs-handling-multiple-streams-with-merge?course=step-by-step-async-javascript-with-rxjs)
  🎥 💵 - John Linquist
- [Sharing network requests with merge](https://egghead.io/lessons/rxjs-reactive-programming-sharing-network-requests-with-rxjs-merge?course=introduction-to-reactive-programming)
  🎥 💵 - André Staltz
- [Combination operator: merge](https://egghead.io/lessons/rxjs-combination-operator-merge?course=rxjs-beyond-the-basics-operators-in-depth)
  🎥 💵 - André Staltz
- [Build your own merge operator](https://blog.strongbrew.io/build-the-operators-from-rxjs-from-scratch/?lectureId=merge#app)
  🎥 - Kwinten Pisman

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/merge.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/merge.ts)
