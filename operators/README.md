# RxJS Operators By Example

A complete list of RxJS operators with clear explanations, relevant resources,
and executable examples.

_[Prefer a complete list in alphabetical order?](complete.md)_

### Contents (By Operator Type)

- [Combination](combination/README.md)
  - [combineAll](combination/combineall.md)
  - [combineLatest](combination/combinelatest.md) ⭐
  - [concat](combination/concat.md) ⭐
  - [concatAll](combination/concatall.md)
  - [endWith](combination/endwith.md)
  - [forkJoin](combination/forkjoin.md)
  - [merge](combination/merge.md) ⭐
  - [mergeAll](combination/mergeall.md)
  - [pairwise](combination/pairwise.md)
  - [race](combination/race.md)
  - [startWith](combination/startwith.md) ⭐
  - [withLatestFrom](combination/withlatestfrom.md) ⭐
  - [zip](combination/zip.md)
- [Conditional](conditional/README.md)
  - [defaultIfEmpty](conditional/defaultifempty.md)
  - [every](conditional/every.md)
  - [iif](conditional/iif.md)
  - [sequenceequal](conditional/sequenceequal.md)
- [Creation](creation/README.md)
  - [ajax](creation/ajax.md) ⭐
  - [create](creation/create.md)
  - [defer](creation/defer.md)
  - [empty](creation/empty.md)
  - [from](creation/from.md) ⭐
  - [fromEvent](creation/fromevent.md)
  - [generate](creation/generate.md)
  - [interval](creation/interval.md)
  - [of](creation/of.md) ⭐
  - [range](creation/range.md)
  - [throwError](creation/throwError.md)
  - [timer](creation/timer.md)
- [Error Handling](error_handling/README.md)
  - [catch / catchError](error_handling/catch.md) ⭐
  - [retry](error_handling/retry.md)
  - [retryWhen](error_handling/retrywhen.md)
- [Filtering](filtering/README.md)
  - [audit](filtering/audit.md)
  - [auditTime](filtering/audittime.md)
  - [debounce](filtering/debounce.md)
  - [debounceTime](filtering/debouncetime.md) ⭐
  - [distinct](filtering/distinct.md)
  - [distinctUntilChanged](filtering/distinctuntilchanged.md) ⭐
  - [distinctUntilKeyChanged](filtering/distinctuntilkeychanged.md)
  - [filter](filtering/filter.md) ⭐
  - [find](filtering/find.md)
  - [first](filtering/first.md)
  - [ignoreElements](filtering/ignoreelements.md)
  - [last](filtering/last.md)
  - [sample](filtering/sample.md)
  - [single](filtering/single.md)
  - [skip](filtering/skip.md)
  - [skipUntil](filtering/skipuntil.md)
  - [skipWhile](filtering/skipwhile.md)
  - [take](filtering/take.md) ⭐
  - [takeLast](filtering/takelast.md)
  - [takeUntil](filtering/takeuntil.md) ⭐
  - [takeWhile](filtering/takewhile.md)
  - [throttle](filtering/throttle.md)
  - [throttleTime](filtering/throttletime.md)
- [Multicasting](multicasting/README.md)
  - [multicast](multicasting/multicast.md)
  - [publish](multicasting/publish.md)
  - [share](multicasting/share.md) ⭐
  - [shareReplay](multicasting/sharereplay.md) ⭐
- [Transformation](transformation/README.md)
  - [buffer](transformation/buffer.md)
  - [bufferCount](transformation/buffercount.md)
  - [bufferTime](transformation/buffertime.md) ⭐
  - [bufferToggle](transformation/buffertoggle.md)
  - [bufferWhen](transformation/bufferwhen.md)
  - [concatMap](transformation/concatmap.md) ⭐
  - [concatMapTo](transformation/concatmapto.md)
  - [expand](transformation/expand.md)
  - [exhaustMap](transformation/exhaustmap.md)
  - [groupBy](transformation/groupby.md)
  - [map](transformation/map.md) ⭐
  - [mapTo](transformation/mapto.md)
  - [mergeMap / flatMap](transformation/mergemap.md) ⭐
  - [mergeScan](transformation/mergescan.md)
  - [partition](transformation/partition.md)
  - [pluck](transformation/pluck.md)
  - [reduce](transformation/reduce.md)
  - [scan](transformation/scan.md) ⭐
  - [switchMap](transformation/switchmap.md) ⭐
  - [switchMapTo](transformation/switchmapto.md)
  - [toArray](transformation/toarray.md)
  - [window](transformation/window.md)
  - [windowCount](transformation/windowcount.md)
  - [windowTime](transformation/windowtime.md)
  - [windowToggle](transformation/windowtoggle.md)
  - [windowWhen](transformation/windowwhen.md)
- [Utility](utility/README.md)
  - [tap / do](utility/do.md) ⭐
  - [delay](utility/delay.md)
  - [delayWhen](utility/delaywhen.md)
  - [dematerialize](utility/dematerialize.md)
  - [finalize / finally](utility/finalize.md)
  - [let](utility/let.md)
  - [repeat](utility/repeat.md)
  - [repeatWhen](utility/repeatwhen.md)
  - [timeInterval](utility/timeinterval.md)
  - [timeout](utility/timeout.md)
  - [timeoutWith](utility/timeoutwith.md)
  - [toPromise](utility/topromise.md)

⭐ - _commonly used_

### Additional Resources

- [What Are Operators?](http://reactivex.io/rxjs/manual/overview.html#operators)
  📰 - Official Docs
- [What Operators Are](https://egghead.io/lessons/rxjs-what-rxjs-operators-are)
  🎥 💵 - André Staltz
