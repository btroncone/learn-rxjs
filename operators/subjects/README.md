# Subjects

A Subject is a special type of Observable that allows values to be multicasted to many Observables. Subjects are like EventEmitters.
There are 4 variants of subjects:

- Subject - simplest variant without intial value or replay behavior
- AsyncSubject - only emits a value when it completes. It will emit its latest value to all its observers on completion
- BehaviorSubject - requires an initial value and emits its current value whenever it is subscribed to
- ReplaySubject - buffers a set number of values and will emit those values immediately to any new subscribers in addition to emitting new values to existing subscribers.

## Contents

* [AsyncSubject](asyncsubject.md)
* [BehaviorSubject](behaviorsubject.md)
* [ReplaySubject](replaysubject.md)
* [Subject](subject.md)

### Additional Resources

* [On The Subject Of Subjects (in RxJS)](https://medium.com/@benlesh/on-the-subject-of-subjects-in-rxjs-2b08b7198b93)
  :newspaper: - Ben Lesh
