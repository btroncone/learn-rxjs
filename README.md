# 시작하기

RxJS에 대한 명확한 예제, 설명, 자료.

[//]: # (Clear examples, explanations, and resources for RxJS.)

[@btroncone](https://www.learnrxjs.io/) 님이 작성하신 [Learn RxJs](https://www.learnrxjs.io/) 문서의 한국어 번역본입니다.

## RxJS 소개

[RxJS](https://github.com/ReactiveX/rxjs) 는 최근 웹 개발에서 핫한 라이브러리 중 하나입니다.
이벤트 처리에 대해 강력하고 기능적인 접근법을 제공하며, 다양한 프레임워크, 라이브러리, 유틸리티들로 활용되고 있습니다. 그러니 Rx를 배우는 것은 그 어느 때보다 매력적이죠.
Rx는 [거의 모든 언어](http://reactivex.io/languages.html) 에서 활용할 수 있기 때문에,
반응형 프로그래밍을 확실하게 파악할 수 있으며, 무엇을 제공하는지 쉽게 이해할 수 있습니다.

**그러나...**

RxJS와 반응형 프로그래밍은 배우기 [어렵습니다](https://twitter.com/hoss/status/742643506536153088).
다양한 개념들, 방대한 API들이 존재하며 사고 방식을 [명령형에서 선언적 스타일로](https://tylermcginnis.com/imperative-vs-declarative-programming/)
전환해야 합니다. 이 사이트는 이러한 개념을 쉽게 접근할 수 있게 하는 데 초점을 두고 있으며, 명확하고 찾아보기 쉬운 예제를 제공하고, 좋은 자료들을 참조해 두었습니다.

최종 목표는 [공식 문서](http://reactivex.io/rxjs/) 와 기존 학습 자료를 보완하면서, 어렵지 않게 문제를 해결할 수 있는 새롭고 신선한 관점을 제공하는 것입니다.
Rx를 배우는 것은 어렵겠지만, 충분히 배울 가치가 있습니다!

### RxJS를 처음 접하셨나요?

[RxJS 입문](/concepts/rxjs-primer.md) 문서를 통해 핵심 개념들에 익숙해져 보세요!

## 목차

#### Operators

Operator는 observable의 복잡한 비동기 작업에 우아하고 선언적인 해결책을 제공하는 강력한 도구입니다.
이 섹션에서는 모든 [RxJS operator](/operators/README.md)와 명확하고 실행 가능한 예제 코드, 추가 자료를 제공합니다.

##### Operator 분류

- [Combination](/operators/combination/README.md)
- [Conditional](/operators/conditional/README.md)
- [Creation](/operators/creation/README.md)
- [Error Handling](/operators/error_handling/README.md)
- [Multicasting](/operators/multicasting/README.md)
- [Filtering](/operators/filtering/README.md)
- [Transformation](/operators/transformation/README.md)
- [Utility](/operators/utility/README.md)

**또는...**

[전체 목록](/operators/complete.md)

#### Subjects

Subject는 하나의 실행 경로를 여러 observer들이 공유하는 특별한 observable입니다.

- [개요](/subjects/README.md)
- [AsyncSubject](/subjects/asyncsubject.md)
- [BehaviorSubject](/subjects/behaviorsubject.md)
- [ReplaySubject](/subjects/replaysubject.md)
- [Subject](/subjects/subject.md)

#### RxJS 개념

Observable의 내부 동작에 대한 기초적인 지식 없이는 RxJS가 그저 마술처럼 느껴질 수 있습니다.
이 섹션에서는 반응형 프로그래밍과 observable에 익숙해지는 데 필요한 주요 개념들을 다루고 있습니다.

- [RxJS 입문](concepts/rxjs-primer.md)
- [map, pluck, mapTo를 이용해 stream 변형하기](concepts/get-started-transforming.md)
- [시간 기반의 operator 비교](concepts/time-based-operators-comparison.md)
- [RxJS v5에서 v6으로](concepts/rxjs5-6.md)

#### 레시피

- [영어 타자 연습 게임](/recipes/alphabet-invasion-game.md)
- [Battleship 게임](/recipes/battleship-game.md)
- [버블 게임](/recipes/breakout-game.md)
- [카레이싱 게임](/recipes/car-racing-game.md)
- [점을 잡아라!](/recipes/catch-the-dot-game.md)
- [클릭좌 게임](/recipes/click-ninja-game.md)
- [날아라 새 게임](/recipes/flappy-bird-game.md)
- [게임 루프](/recipes/gameloop.md)
- [가로 스크롤 표시 바](/recipes/horizontal-scroll-indicator.md)
- [HTTP 폴링](/recipes/http-polling.md)
- [잠금화면](/recipes/lockscreen.md)
- [매트릭스 디지털 비 효과](/recipes/matrix-digital-rain.md)
- [기억력 게임](/recipes/memory-game.md)
- [지뢰 찾기](/recipes/mine-sweeper-game.md)
- [점프 게임](/recipes/platform-jumper-game.md)
- [Progress 바](/recipes/progressbar.md)
- [저장 표시](/recipes/save-indicator.md)
- [똑똑한 카운터](/recipes/smartcounter.md)
- [스톱워치](/recipes/stop-watch.md)
- [스페이스 인베이더](/recipes/space-invaders-game.md)
- [새로고침하려면 스와이프하세요](/recipes/swipe-to-refresh.md)
- [2인용 탱크 게임](/recipes/tank-battle-game.md)
- [테트리스](/recipes/tetris-game.md)
- [미리 입력](/recipes/type-ahead.md)
- [이미지 덮기 게임](/recipes/uncover-image-game.md)

## 입문자를 위한 자료

RxJS와 반응형 프로그래밍이 처음이신가요? 여러분의 학습 경험에 도움이 될 좋은 자료들을 첨부해 두었습니다.

#### 컨퍼런스

- [RxJS Live](https://www.rxjs.live/)

#### 문서

- [RxJS Introduction](https://rxjs-dev.firebaseapp.com/guide/overview) - 공식 문서

- [The Introduction to Reactive Programming You've Been Missing](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754) -
  André Staltz

- [RxJS: Observables, Observers and Operators Introduction](https://ultimatecourses.com/blog/rxjs-observables-observers-operators) -
  Todd Motto

#### 동영상

- [Ultimate RxJS](https://ultimatecourses.com/courses/rxjs?ref=4) 💵 - Brian
  Troncone

- [Asynchronous Programming: The End of The Loop](https://egghead.io/courses/mastering-asynchronous-programming-the-end-of-the-loop) -
  Jafar Husain

- [What is RxJS?](https://egghead.io/lessons/rxjs-what-is-rxjs) - Ben Lesh
- [Creating Observable from Scratch](https://egghead.io/lessons/rxjs-creating-observable-from-scratch) -
  Ben Lesh

- [Introduction to RxJS Marble Testing](https://egghead.io/lessons/rxjs-introduction-to-rxjs-marble-testing)
  💵 - Brian Troncone

- [Introduction to Reactive Programming](https://egghead.io/courses/introduction-to-reactive-programming)
  💵 - André Staltz

- [Reactive Programming using Observables](https://www.youtube.com/watch?v=HT7JiiqnYYc&feature=youtu.be) -
  Jeremy Lund

#### 연습문제

- [Functional Programming in JavaScript](http://reactivex.io/learnrx/) - Jafar
  Husain

#### 툴

- [Rx Marbles - Observable 다이어그램 모음](http://rxmarbles.com/) -
  André Staltz

- [Rx Visualizer - Observable Playground](https://rxviz.com) -
  Misha Moroshko

- [Reactive.how - 반응형 프로그래밍 학습용 사이트](http://reactive.how) -
  Cédric Soulas

- [Rx Visualization - RxJS 프로그래밍 시각화 도구](https://fingerpich.github.io/rx-visualization/) -
  Mojtaba Zarei

_RxJS 4가 궁금하신가요?_
[_Denis Stoyanov_](https://github.com/xgrommx) _의 멋진_
[_eBook_](https://xgrommx.github.io/rx-book/) _을 확인해보세요!_

## 원문/번역

- [English](https://www.learnrxjs.io/)
- [简体中文](https://rxjs-cn.github.io/learn-rxjs-operators)
