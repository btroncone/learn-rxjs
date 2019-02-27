# Learn RxJS

Clear examples, explanations, and resources for RxJS.

_By [@btroncone](https://twitter.com/BTroncone)_

## Introduction

[RxJS](https://github.com/ReactiveX/rxjs) is one of the hottest libraries in web
development today. Offering a powerful, functional approach for dealing with
events and with integration points into a growing number of frameworks,
libraries, and utilities, the case for learning Rx has never been more
appealing. Couple this with the ability to utilize your knowledge across
[nearly any language](http://reactivex.io/languages.html), having a solid grasp
on reactive programming and what it can offer seems like a no-brainer.

**But...**

Learning RxJS and reactive programming is
[hard](https://twitter.com/hoss/status/742643506536153088). There's the
multitude of concepts, large API surface, and fundamental shift in mindset from
an
[imperative to declarative style](http://codenugget.co/2015/03/05/declarative-vs-imperative-programming-web.html).
This site focuses on making these concepts approachable, the examples clear and
easy to explore, and features references throughout to the best RxJS related
material on the web. The goal is to supplement the
[official docs](http://reactivex.io/rxjs/) and pre-existing learning material
while offering a new, fresh perspective to clear any hurdles and tackle the pain
points. Learning Rx may be difficult but it is certainly worth the effort!

<div class="ua-ad"><a href="https://ultimatecourses.com/?ref=76683_kee7y7vk"><img src="https://ultimatecourses.com/assets/img/banners/ultimate-angular-leader.svg" style="width:100%;max-width:100%"></a></div>

## Content

#### Operators

Operators are the horse-power behind observables, providing an elegant,
declarative solution to complex asynchronous tasks. This section contains all
[RxJS operators](/operators/README.md), included with clear, executable examples
in both [JSBin](https://jsbin.com) and [JSFiddle](https://jsfiddle.net). Links
to additional resources and recipes for each operator are also provided, when
applicable.

##### Operator Categories

- [Combination](/operators/combination/README.md)
- [Conditional](/operators/conditional/README.md)
- [Creation](/operators/creation/README.md)
- [Error Handling](/operators/error_handling/README.md)
- [Multicasting](/operators/multicasting/README.md)
- [Filtering](/operators/filtering/README.md)
- [Transformation](/operators/transformation/README.md)
- [Utility](/operators/utility/README.md)

**OR...**

[Complete listing in alphabetical order](/operators/complete.md)

#### Understanding Subjects

A Subject is a special type of Observable which shares a single execution path among observers. 

- [Overview](/subjects/README.md)
- [AsyncSubject](/subjects/asyncsubject.md)
- [BehaviorSubject](/subjects/behaviorsubject.md)
- [ReplaySubject](/subjects/replaysubject.md)
- [Subject](/subjects/subject.md)

#### Concepts

Without a solid base knowledge of how Observables work behind the scenes, it's
easy for much of RxJS to feel like 'magic'. This section helps solidify the
major concepts needed to feel comfortable with reactive programming and
Observables.

- [RxJS v5 -> v6 Upgrade](/concepts/rxjs5-6.md)
- [Understanding Operator Imports](/concepts/operator-imports.md)

#### Recipes

Recipes for common use-cases and interesting solutions with RxJS.

- [Catch The Dot Game](/recipes/catch-the-dot-game.md)
- [Flappy Bird Game](/recipes/flappy-bird-game.md)
- [Game Loop](/recipes/gameloop.md)
- [Horizontal Scroll Indicator](/recipes/horizontal-scroll-indicator.md)
- [HTTP Polling](/recipes/http-polling.md)
- [Lockscreen](/recipes/lockscreen.md)
- [Progress Bar](/recipes/progressbar.md)
- [Smart Counter](/recipes/smartcounter.md)
- [Space Invaders Game](/recipes/space-invaders-game.md)
- [Swipe To Refresh](/recipes/swipe-to-refresh.md)
- [Type Ahead](/recipes/type-ahead.md)

## Introductory Resources

New to RxJS and reactive programming? In addition to the content found on this
site, these excellent articles and videos will help jump start your learning
experience!

#### Reading

- [RxJS Introduction](http://reactivex.io/rxjs/manual/overview.html#introduction) -
  Official Docs
- [The Introduction to Reactive Programming You've Been Missing](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754) -
  André Staltz

#### Videos

- [Asynchronous Programming: The End of The Loop](https://egghead.io/courses/mastering-asynchronous-programming-the-end-of-the-loop) -
  Jafar Husain
- [What is RxJS?](https://egghead.io/lessons/rxjs-what-is-rxjs) - Ben Lesh
- [Creating Observable from Scratch](https://egghead.io/lessons/rxjs-creating-observable-from-scratch) -
  Ben Lesh
- [Introduction to RxJS Marble Testing](https://egghead.io/lessons/rxjs-introduction-to-rxjs-marble-testing) -
  Brian Troncone
- [Introduction to Reactive Programming](https://egghead.io/courses/introduction-to-reactive-programming)
  :dollar: - André Staltz
- [Reactive Programming using Observables](https://www.youtube.com/watch?v=HT7JiiqnYYc&feature=youtu.be) -
  Jeremy Lund

#### Exercises

- [Functional Programming in JavaScript](http://reactivex.io/learnrx/) - Jafar
  Husain

#### Tools

- [Rx Marbles - Interactive diagrams of Rx Observables](http://rxmarbles.com/) -
  André Staltz
- [Rx Visualizer - Animated playground for Rx Observables](https://rxviz.com) -
  Misha Moroshko
- [Reactive.how - Animated cards to learn Reactive Programming](http://reactive.how) -
  Cédric Soulas
- [Rx Visualization - Visualizes programming with RxJS](https://fingerpich.github.io/rx-visualization/) - Mojtaba Zarei

_Interested in RxJS 4? Check out [Denis Stoyanov's](https://github.com/xgrommx)
excellent [eBook](https://xgrommx.github.io/rx-book/)!_

## Translations

- [简体中文](https://rxjs-cn.github.io/learn-rxjs-operators)

### A Note On References

All references included in this GitBook are resources, both free and paid, that
helped me tremendously while learning RxJS. If you come across an article or
video that you think should be included, please use the _edit this page_ link in
the top menu and submit a pull request. Your feedback is appreciated!
