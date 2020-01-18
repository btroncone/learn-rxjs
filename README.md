# Introduction

Clear examples, explanations, and resources for RxJS.

_By_ [_@btroncone_](https://twitter.com/BTroncone)

## Introduction

[RxJS](https://github.com/ReactiveX/rxjs) is one of the hottest libraries in web development today. Offering a powerful, functional approach for dealing with events and with integration points into a growing number of frameworks, libraries, and utilities, the case for learning Rx has never been more appealing. Couple this with the ability to utilize your knowledge across [nearly any language](http://reactivex.io/languages.html), having a solid grasp on reactive programming and what it can offer seems like a no-brainer.

**But...**

Learning RxJS and reactive programming is [hard](https://twitter.com/hoss/status/742643506536153088). There's the multitude of concepts, large API surface, and fundamental shift in mindset from an [imperative to declarative style](https://tylermcginnis.com/imperative-vs-declarative-programming/). This site focuses on making these concepts approachable, the examples clear and easy to explore, and features references throughout to the best RxJS related material on the web. The goal is to supplement the [official docs](http://reactivex.io/rxjs/) and pre-existing learning material while offering a new, fresh perspective to clear any hurdles and tackle the pain points. Learning Rx may be difficult but it is certainly worth the effort!

[![Ultimate RxJS](https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX)](https://ultimatecourses.com/courses/rxjs?ref=4)

### Brand New to RxJS?

Start getting familiar with all the key concepts needed to be productive with our [RxJS Primer](learn-rxjs/concepts/rxjs-primer.md)!

## Content

#### Operators

Operators are the horse-power behind observables, providing an elegant, declarative solution to complex asynchronous tasks. This section contains all [RxJS operators](learn-rxjs/operators/), included with clear, executable examples. Links to additional resources and recipes for each operator are also provided, when applicable.

**Operator Categories**

* [Combination](learn-rxjs/operators/combination/)
* [Conditional](learn-rxjs/operators/conditional/)
* [Creation](learn-rxjs/operators/creation/)
* [Error Handling](learn-rxjs/operators/error_handling/)
* [Multicasting](learn-rxjs/operators/multicasting/)
* [Filtering](learn-rxjs/operators/filtering/)
* [Transformation](learn-rxjs/operators/transformation/)
* [Utility](learn-rxjs/operators/utility/)

**OR...**

[Complete listing in alphabetical order](learn-rxjs/operators/complete.md)

#### Understanding Subjects

A Subject is a special type of Observable which shares a single execution path among observers.

* [Overview](learn-rxjs/subjects/)
* [AsyncSubject](learn-rxjs/subjects/asyncsubject.md)
* [BehaviorSubject](learn-rxjs/subjects/behaviorsubject.md)
* [ReplaySubject](learn-rxjs/subjects/replaysubject.md)
* [Subject](learn-rxjs/subjects/subject.md)

#### Concepts

Without a solid base knowledge of how Observables work behind the scenes, it's easy for much of RxJS to feel like 'magic'. This section helps solidify the major concepts needed to feel comfortable with reactive programming and Observables.

* [RxJS Primer](learn-rxjs/concepts/rxjs-primer.md)
* [RxJS v5 -&gt; v6 Upgrade](learn-rxjs/concepts/rxjs5-6.md)
* [Time based operators comparison](learn-rxjs/concepts/time-based-operators-comparison.md)
* [Understanding Operator Imports](learn-rxjs/concepts/operator-imports.md)

#### Recipes

Recipes for common use-cases and interesting solutions with RxJS.

* [Alphabet Invasion Game](learn-rxjs/recipes/alphabet-invasion-game.md)
* [Battleship Game](learn-rxjs/recipes/battleship-game.md)
* [Breakout Game](learn-rxjs/recipes/breakout-game.md)
* [Car Racing Game](learn-rxjs/recipes/car-racing-game.md)
* [Catch The Dot Game](learn-rxjs/recipes/catch-the-dot-game.md)
* [Click Ninja Game](learn-rxjs/recipes/click-ninja-game.md)
* [Flappy Bird Game](learn-rxjs/recipes/flappy-bird-game.md)
* [Game Loop](learn-rxjs/recipes/gameloop.md)
* [Horizontal Scroll Indicator](learn-rxjs/recipes/horizontal-scroll-indicator.md)
* [HTTP Polling](learn-rxjs/recipes/http-polling.md)
* [Lockscreen](learn-rxjs/recipes/lockscreen.md)
* [Matrix Digital Rain](learn-rxjs/recipes/matrix-digital-rain.md)
* [Memory Game](learn-rxjs/recipes/memory-game.md)
* [Mine Sweeper Game](learn-rxjs/recipes/mine-sweeper-game.md)
* [Platform Jumper Game](learn-rxjs/recipes/platform-jumper-game.md)
* [Progress Bar](learn-rxjs/recipes/progressbar.md)
* [Save Indicator](learn-rxjs/recipes/save-indicator.md)
* [Smart Counter](learn-rxjs/recipes/smartcounter.md)
* [Stop Watch](learn-rxjs/recipes/stop-watch.md)
* [Space Invaders Game](learn-rxjs/recipes/space-invaders-game.md)
* [Swipe To Refresh](learn-rxjs/recipes/swipe-to-refresh.md)
* [Tank Battle Game](learn-rxjs/recipes/tank-battle-game.md)
* [Tetris Game](learn-rxjs/recipes/tetris-game.md)
* [Type Ahead](learn-rxjs/recipes/type-ahead.md)
* [Uncover Image Game](learn-rxjs/recipes/uncover-image-game.md)

## Introductory Resources

New to RxJS and reactive programming? In addition to the content found on this site, these excellent resources will help jump start your learning experience!

#### Conferences

* [RxJS Live](https://www.rxjs.live/) - RxJS specific conference, Las Vegas

#### Reading

* [RxJS Introduction](https://rxjs-dev.firebaseapp.com/guide/overview) -

  Official Docs

* [The Introduction to Reactive Programming You've Been Missing](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754) -

  André Staltz

* [RxJS: Observables, Observers and Operators Introduction](https://ultimatecourses.com/blog/rxjs-observables-observers-operators) -

  Todd Motto

#### Videos

* [RxJS Basics](https://ultimatecourses.com/courses/rxjs?ref=4) :dollar: - Brian

  Troncone

* [Asynchronous Programming: The End of The Loop](https://egghead.io/courses/mastering-asynchronous-programming-the-end-of-the-loop) -

  Jafar Husain

* [What is RxJS?](https://egghead.io/lessons/rxjs-what-is-rxjs) - Ben Lesh
* [Creating Observable from Scratch](https://egghead.io/lessons/rxjs-creating-observable-from-scratch) -

  Ben Lesh

* [Introduction to RxJS Marble Testing](https://egghead.io/lessons/rxjs-introduction-to-rxjs-marble-testing)

  :dollar: - Brian Troncone

* [Introduction to Reactive Programming](https://egghead.io/courses/introduction-to-reactive-programming)

  💵 - André Staltz

* [Reactive Programming using Observables](https://www.youtube.com/watch?v=HT7JiiqnYYc&feature=youtu.be) -

  Jeremy Lund

#### Exercises

* [Functional Programming in JavaScript](http://reactivex.io/learnrx/) - Jafar

  Husain

#### Tools

* [Rx Marbles - Interactive diagrams of Rx Observables](http://rxmarbles.com/) -

  André Staltz

* [Rx Visualizer - Animated playground for Rx Observables](https://rxviz.com) -

  Misha Moroshko

* [Reactive.how - Animated cards to learn Reactive Programming](http://reactive.how) -

  Cédric Soulas

* [Rx Visualization - Visualizes programming with RxJS](https://fingerpich.github.io/rx-visualization/) -

  Mojtaba Zarei

_Interested in RxJS 4? Check out_ [_Denis Stoyanov's_](https://github.com/xgrommx) _excellent_ [_eBook_](https://xgrommx.github.io/rx-book/)_!_

## Translations

* [简体中文](https://rxjs-cn.github.io/learn-rxjs-operators)

### A Note On References

All references included in this GitBook are resources, both free and paid, that helped me tremendously while learning RxJS. If you come across an article or video that you think should be included, please use the _edit this page_ link in the top menu and submit a pull request. Your feedback is appreciated!

