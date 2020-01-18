# Multicasting Operators

In RxJS observables are cold, or unicast by default. These operators can make an
observable hot, or multicast, allowing side-effects to be shared among multiple
subscribers.

## Contents

- [publish](publish.md)
- [multicast](multicast.md)
- [share](share.md) ⭐
- [shareReplay](sharereplay.md) ⭐

⭐ - _commonly used_

### Additional Resources

- [Hot vs Cold Observables](https://medium.com/@benlesh/hot-vs-cold-observables-f8094ed53339#.8x9uam5rg)
  📰 - Ben Lesh
- [Unicast v Multicast](https://github.com/zenparsing/es-observable/issues/66)
  📰 - GitHub Discussion
- [Demystifying Hot and Cold Observables](https://egghead.io/lessons/rxjs-demystifying-cold-and-hot-observables-in-rxjs)
  🎥 - André Staltz
