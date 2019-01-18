# Subjects

A Subject is a special type of Observable which shares a single execution path among observers. 

You can think of this as a single speaker talking at a microphone in a room full of people. Their message (the subject) is being delivered  to many (multicast) people (the observers) at once. This is the basis of **multicasting**. Typical observables would be comparable to a 1 on 1 conversation.

There are 4 variants of subjects:

- **Subject** - No intial value or replay behavior.
- **AsyncSubject** - Emits latest value to observers upon completion.
- **BehaviorSubject** - Requires an initial value and emits its current value (last emitted item) to new subscribers.
- **ReplaySubject** - Emits specified number of last emitted values (a replay) to new subscribers.

## Contents

* [AsyncSubject](asyncsubject.md)
* [BehaviorSubject](behaviorsubject.md)
* [ReplaySubject](replaysubject.md)
* [Subject](subject.md)

### Additional Resources

* [Official Overview](http://reactivex.io/rxjs/manual/overview.html#subject)
  :newspaper:
* [Official Documentation](http://reactivex.io/documentation/subject.html)
  :newspaper:
* [On The Subject Of Subjects (in RxJS)](https://medium.com/@benlesh/on-the-subject-of-subjects-in-rxjs-2b08b7198b93)
  :newspaper: - Ben Lesh
