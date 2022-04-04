# RxJS 입문

RxJS가 처음이신가요?
이 문서에서는 RxJS에 대해 파악하기 위해 필요한 주요 개념을 다룹니다. 꽉 잡으시고, 시작합니다!

## Observable(옵저버블)이 무엇인가요?

옵저버블은 시간에 따라 흐르는 스트림(stream) 또는 데이터 값입니다. 
거의 모든 것을 옵저버블로 만들 수 있지만, RxJS에서의 일반적인 활용 예시는 이벤트입니다.
이 이벤트는 마우스 이동, 버튼 클릭, 텍스트 필드 입력이나 라우트 변경 등 무엇이든 될 수 있죠.
옵저버블을 만드는 가장 쉬운 방법은 [내장 creation 함수](operators/creation/README.md)를 이용하는 것입니다.
예를 들어,[`fromEvent`](../operators/creation/fromevent.md) 라는 내장 함수를 이용해 
마우스 클릭 이벤트 옵저버블을 만들 수 있습니다.

```js
// fromEvent 연산자 import
import { fromEvent } from 'rxjs';

// button 엘리먼트 참조
const button = document.getElementById('myButton');

// button 클릭 옵저버블 생성 
const myObservable = fromEvent(button, 'click');
```

지금 우리에게 있는 이 옵저버블은 아무것도 하지 않습니다. 
**이는 옵저버블이 ["차갑거나"](https://jae-gyeong.tistory.com/entry/%EB%9C%A8%EA%B1%B0%EC%9A%B4-Observable), 활성화되지 않았기 때문입니다(예: 이벤트 리스너 연결).
이것 전까지는 말이죠...**

[//]: # (TODO: 차후에 설명 추가)

## Subscription(구독)

구독은 모든 것을 움직이는 원동력입니다.
누군가 손잡이를 돌리기만 하면 나올 준비가 되어있는 물줄기(옵저버블)의 수도꼭지 같은 것이라고 생각하면 편합니다.
옵저버블의 경우, 손잡이를 돌리는 역할은 `subscriber(구독자)`에게 주어집니다.

구독을 생성하려면 `observer(옵저버)`라고 하는 함수 또는 객체를 제공하는 `subscribe` 메소드를 호출합니다. 
여기서 각 이벤트에 대한 반응(-형 프로그래밍) 방법을 결정할 수 있습니다.

```js
// fromEvent 연산자 import
import { fromEvent } from 'rxjs';

// button 엘리먼트 참조
const button = document.getElementById('myButton');

// button 클릭 옵저버블 생성 
const myObservable = fromEvent(button, 'click');

// 이제 각 클릭 이벤트에 대한 로그를 찍어봅시다.
const subscription = myObservable.subscribe(event => console.log(event));
```

위의 예시에서 `myObservable.subscribe()` 는

1. 클릭 이벤트를 위한 버튼에 이벤트 리스너를 설정하고
2. 클릭 이벤트가 발생할 때마다 구독 메서드(옵저버)에 전달한 함수를 호출합니다.
3. 적절한 이벤트 리스너를 제거하는 것처럼, `unsubscribe()`가 포함된 구독 객체를 반환합니다.

이 구독 메소드는 에러 또는 완료 상태를 처리하기 위해 객체 map으로 제공되기도 합니다. 
단순 함수 형태보다 자주 사용하진 않겠지만, 필요한 경우를 위해 알아두는 것이 좋습니다.

```js
// 함수 대신에, next, error, complete 메소드가 있는 객체를 반환합니다.
const subscription = myObservable.subscribe({
  // 성공적으로 방출되었을 때
  next: event => console.log(event),
  // 에러
  error: error => console.log(error),
  // 완료 시 한 번 호출
  complete: () => console.log('complete!')
});
```

중요한 것은, 구독은 각각 새로운 실행 컨텍스트를 생성한다는 것입니다.
이 말은, `subscribe` 메소드를 호출할 때마다 새로운 이벤트 리스너가 생성된다는 것이죠.

```js
// addEventListener 호출
const subscription = myObservable.subscribe(event => console.log(event));

// addEventListener 또 호출!
const secondSubscription = myObservable.subscribe(event => console.log(event));

// unsubscribe(구독 해제)로 정리
subscription.unsubscribe();
secondSubscription.unsubscribe();
```

기본적으로, 구독은 옵저버블과 옵저버 사이에서 일대일, 일방적 소통을 생성합니다.
나쁜 PR을 merge한 여러분(`:옵저버`)에게 사수님(`:옵저버블`)이 소리지르는 것(`:방출`)처럼요!
이것을 **Unicasting(유니캐스팅)** 이라고도 합니다.
여러분이 컨퍼런스 발표 시나리오(`:하나의 옵저버블, 많은 옵저버`)를 더 선호한다면, 
`Subject`를 이용한 **Multicasting(멀티캐스팅)** 접근 방식을 취하게 됩니다. 
다음의 문서에서 더 자세히 알아보세요!

옵저버에게 데이터를 내보내는 옵저버블에 대해 설명할 때, push 기반의 모델이라는 점에 유의해야 합니다.
소스는 구독자가 데이터를 어떻게 사용하는지 알지도, 신경쓰지도 않고 단순히 데이터를 아래로 밀어내기만 합니다.

RxJS는 이벤트 스트림 위에서 작동하는 것도 좋지만, 그 자체로도 매우 유용합니다. 
**RxJS가 이벤트용 loadsh라고 불리게 된 이유는 RxJS의...**

## Operators(연산자)

연산자는 값을 변환하는 방법을 제공하여, 변형된 값들의 옵저버블을 반환합니다. 
자바스크립트 `Array` 메소드를 사용해본 적이 있다면 대부분의 RxJS 연산자들이 익숙할 것입니다.
예를 들어 옵저버블로부터 방출된 값들을 변환하고 싶을 때, [`map`](../operators/transformation/map.md)을 사용할 수 있습니다.

```js
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
/*
 *  'of'는 값을 순서대로 전달합니다. 
 *  이 예제에서는, 1,2,3,4,5를 순서대로 내보냅니다.
 */
const dataSource = of(1, 2, 3, 4, 5);

// 소스 옵저버블 구독
const subscription = dataSource
  .pipe(
    // 방출된 값에 각각 1을 더하기
    map(value => value + 1)
  )
  // 로그: 2, 3, 4, 5, 6
  .subscribe(value => console.log(value));
```

또는 특정한 값을 걸러내고 싶을 때, 
[`filter`](../operators/filtering/filter.md)를 사용할 수 있습니다.

```js
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';

const dataSource = of(1, 2, 3, 4, 5);

// 소스 옵저버블 구독
const subscription = dataSource
  .pipe(
    // 2보다 같거나 큰 값만 허용
    filter(value => value >= 2)
  )
  // 로그: 2, 3, 4, 5
  .subscribe(value => console.log(value));
```

실무에서 해결해야 할 문제가 있다면 
그를 **해결하기 위한 연산자가 이미 존재** 할 가능성이 높습니다.
RxJS 여정을 시작하면 엄청난 숫자의 연산자들에 압도당할 수 있습니다.
하지만 효과적인 시작을 위해 몇몇 연산자들만 먼저 익혀도 되죠.
언젠가 불가피하고 어려운 문제들이 발생하게 되면, 
연산자 라이브러리의 유연성을 칭찬하게 될 것입니다.

**눈치채셨나요? 위의 예제에서 연산자는 '이것' 안에 존재하는데요....**

## Pipe

`pipe` 함수는 옵저버블 데이터 소스에서 연산자까지 이어진 연결 라인입니다. 
공장의 원자재가 완제품이 되기 전, 일련의 과정을 거치는 것처럼 소스 데이터는 
상황에 맞게 데이터를 조작, 필터링, 그리고 변환할 수 있는 파이프라인을 통과합니다.
`pipe`를 포함하는 옵저버블 체인 내에서 5개 이상의 연산자를 사용하는 건, 드물지 않습니다.

예를 들어, 옵저버블로 구현된 자동 완성 솔루션의 요청 및 표시 프로세스 모두 연산자들을 이용해  최적화할 수 있습니다.

```js
// 텍스트 박스의 값으로부터 생성된 옵저버블과 pipe 체인 연산자들
inputValue
  .pipe(
    // 200ms 기다리기
    debounceTime(200),
    // 연속해서 같은 값이 온다면, 무시하기
    distinctUntilChanged(),
    // 요청이 활성화되어있는 동안 값이 업데이트되면 이전 요청을 취소하고 새로운 옵저버블로 'switch(전환)'합니다.
    switchMap(searchTerm => typeaheadApi.search(searchTerm))
  )
  // 구독 생성
  .subscribe(results => {
    // DOM 업데이트
  });
```

**그렇지만 상황에 적절한 연산자가 무엇인지 어떻게 알 수 있을까요? 좋은 소식 하나 알려드리자면...**

## 연산자는 공통된 카테고리로 묶을 수 있습니다

적절한 연산자를 찾기 위해 가장 먼저 해야 할 일은 관련된 카테고리를 찾는 것입니다. 
소스로부터 필터링된 데이터가 필요한가요?
그러면 [`filtering`](../operators/filtering/README.md) 연산자들을 확인해보세요.
옵저버블 스트림을 통과하는 데이터의 흐름 속 버그를 추적하고 디버깅하려고 하시나요? 
작업을 수행해줄 [`utility`](../operators/utility/README.md) 연산자들이 있습니다.
**연산자 카테고리에는...**

### [Creation operators(생성 연산자)](../operators/creation/README.md)

이 연산자들은 거의 모든 것들로부터 옵저버블을 생성하게끔 합니다.
일반적인 상황이든, 특별한 상황이든지 간에 자유롭게 스트림으로 전환하죠.

예를 들어, 유저의 스크롤에 따라 움직이는 Progress(진행률) 바를 생성한다고 가정해 봅시다.
여기서 우리는 [`fromEvent`](../operators/creation/fromevent.md) 연산자를 사용해
스크롤 이벤트를 스트림으로 전환할 수 있죠.

```js
fromEvent(scrollContainerElement, 'scroll')
  .pipe(
    // 다음 문서에서 이 코드에 대해 더 자세히 다뤄볼 것입니다.
    takeUntil(userLeavesArticle)
  )
  .subscribe(event => {
    // 계산하고, DOM을 업데이트하기
  });
```

가장 자주 쓰이는 생성 연산자들은 [`of`](../operators/creation/of.md), [`from`](../operators/creation/from.md),
그리고 [`fromEvent`](../operators/creation/fromevent.md)입니다.

### [Combination operators(조합 연산자)](../operators/combination/README.md)

이 연산자들은 여러 개의 옵저버블들로부터 정보를 결합합니다. 
연산자들 간의 차이는 방출된 값의 순서, 시간, 구조에서 주로 나타납니다.

예를 들어, 여러 개의 데이터 소스에서 업데이트된 값들을 결합해 계산을 수행할 수 있습니다.

```js
// 소스 중 하나가 방출퇼 때마다, 각 소스에서 마지막으로 방출된 값을 제공합니다.
combineLatest(sourceOne, sourceTwo).subscribe(
  ([latestValueFromSourceOne, latestValueFromSourceTwo]) => {
    // 계산 수행
  }
);
```

가장 자주 쓰이는 조합 연산자들은
[`combineLatest`](../operators/combination/combinelatest.md),
[`concat`](../operators/combination/concat.md),
[`merge`](../operators/combination/merge.md),
[`startWith`](../operators/combination/startwith.md), 그리고
[`withLatestFrom`](../operators/combination/withlatestfrom.md)입니다.

### [Error handling operators(에러 처리 연산자)](../operators/error_handling/README.md)

이 연산자들은 오류를 정상적으로 처리하고, 오류 발생 시에 재시도하는 효과적인 방법을 제공합니다.

예를 들어, 실패한 네트워크 요청으로부터 보호하기 위해 [`catchError`](../operators/error_handling/catch.md)연산자를 사용할 수 있죠.

```js
source
  .pipe(
    mergeMap(value => {
      return makeRequest(value).pipe(
        catchError(handleErrorByReturningObservable)
      );
    })
  )
  .subscribe(value => {
    // take action
  });
```

가장 자주 쓰이는 에러 처리 연산자는
[`catchError`](../operators/error_handling/catch.md)입니다.

### [Filtering operators(필터링 연산자)](../operators/filtering/README.md)

이 연산자들은 옵저버블 소스에서 값을 허용하거나 거부하고, 스트림 내부에 축적된 값을 처리하는 기술들을 제공합니다.

예를 들어, 소스에서 처음 방출된 `5`개의 값만 갖기 위해[`take`](../operators/filtering/take.md) 연산자를 사용할 수 있습니다.

```js
source.pipe(take(5)).subscribe(value => {
  // 어떤 행동
});
```

가장 자주 쓰이는 필터링 연산자는
[`debounceTime`](../operators/filtering/debouncetime.md),
[`distinctUntilChanged`](../operators/filtering/distinctuntilchanged.md),
[`filter`](../operators/filtering/filter.md),
[`take`](../operators/filtering/take.md), 그리고
[`takeUntil`](../operators/filtering/takeuntil.md)입니다.

### [Multicasting operators(멀티캐스팅 연산자)](../operators/multicasting/README.md)

기본적으로 RxJS에서 옵저버블은 "차가운" 옵저버블이거나 유니캐스트(하나의 구독자당 하나의 소스)에 해당합니다.
이 연산자들은 옵저버블을 "뜨겁게" 만들거나 멀티캐스트로 만들어 여러 구독자 간에 사이드 이펙트를 공유할 수 있죠.

예를 들어, 나중에 구독한 구독자와 활성된 소스 내에서 가장 마지막으로 방출된 값을 공유할 수 있습니다.

```js
const source = data.pipe(shareReplay());

const firstSubscriber = source.subscribe(value => {
  // 어떤 행동
});

// 잠시 뒤...

// 'secondSubscriber'는 구독 시 마지막으로 방출된 값을 갖게 되고, 'firstSubscriber'와 실행 컨택스트를 공유합니다.
const secondSubscriber = source.subscribe(value => {
  // 어떤 행동
});
```

가장 자주 쓰이는 멀티캐스팅 연산자는
[`shareReplay`](../operators/multicasting/sharereplay.md)입니다.

### [Transformation operators(변형 연산자)](../operators/transformation/README.md)

연산자 체인을 통과하며 값을 변환시키는 건 흔한 작업이죠.
이 연산자들은 여러분이 접할 대부분의 상황들에 대해 변환 기술을 제공합니다.

[Redux](https://redux.js.org/) 와 유사하게 시간이 지남에 따라 상태 객체를 축적하려면,

```js
source
  .pipe(
    scan((accumulatedState, currentState) => {
      return { ...accumulatedState, ...currentState };
    })
  )
  .subscribe();
```

가장 자주 쓰이는 변형 연산자는
[`concatMap`](../operators/transformation/concatmap.md),
[`map`](../operators/transformation/map.md),
[`mergeMap`](../operators/transformation/mergemap.md),
[`scan`](../operators/transformation/scan.md), 그리고
[`switchMap`](../operators/transformation/switchmap.md)입니다.

## 공통된 동작을 가진 연산자들

같은 카테고리 내에 연산자들은 공통된 동작을 공유하는 경우가 많습니다.
이 공통된 동작들을 알아차리게 되면, 머릿속에 [_나만의 연산자 트리_](https://rxjs-dev.firebaseapp.com/operator-decision-tree) 를 만들 수 있습니다.

**예를 들어, 대부분의 연산자는 여기에 포함되죠...**

#### Operators that flatten(평탄화 기반의 연산자)

다시 설명하자면, 내부 옵저버블의 구독을 관리하는 연산자로, 값들을 하나의 옵저버블 소스로 방출합니다.
옵저버블이나 promise 기반의 API에서 HTTP 요청을 처리할 때, 평탄화 연산자를 사용할 수 있죠.

```js
fromEvent(button, 'click')
  .pipe(
    mergeMap(value => {
      // 이 내부 구독은 mergeMap으로 관리되고, 옵저버에 응답된 값을 방출합니다.
      return makeHttpRequest(value);
    })
  )
  .subscribe(response => {
    // 어떤 행동
  });
```

**평탄화 기반의 연산자를 동작에 따라 세부적으로 나눠보자면....**

#### Operators that `switch`(전환 기반의 연산자)

전등 스위치처럼, `switch` 기반의 연산자들은 소스에서 현재의 옵저버블을 꺼 버리고(`:구독 해제`)
새 옵저버블을 켜 방출되게 합니다. 전환 연산자는 한 번에 둘 이상의 활성화된 옵저버블을 필요로 하지 않을 때 유용합니다.

```js
inputValueChanges
        // 이전 요청/옵저버블이 취소되어 새 값이 전달되는 경우 마지막에 전달된 새 값만 중요합니다.
  .pipe(
    // 데이터를 위한 GET 요청
    switchMap(requestObservable)
  )
  .subscribe();
```

전환 기반의 연산자들은 `switchAll`,
[`switchMap`](../operators/transformation/switchmap.md), 그리고
[`switchMapTo`](../operators/transformation/switchmapto.md)가 있습니다.

#### Operators that `concat`(연결 기반의 연산자)

ATM 기계 앞의 줄에서, 다음 거래는 이전 거래가 완료되기 전까지 시작될 수 없습니다. 
이를 옵저버블 용어로 말하자면, 이전 구독이 완료되어 트리거되는 순서대로 한 번에 하나의 구독만 발생한다는 것입니다.
연결 연산자들은 위와 같이 실행 순서가 중요한 상황에서 유용하죠.

```js
concat(
  firstObservable,
  // 'firstObservable'이 완료되면 시작
  secondObservable,
  // 'secondObservable'이 완료되면 시작
  thirdObservable
).subscribe(values => {
  // 어떤 행동
});
```

연결 기반의 연산자들은 [`concat`](../operators/combination/concat.md),
[`concatAll`](../operators/combination/concatall.md),
[`concatMap`](../operators/transformation/concatmap.md), 그리고
[`concatMapTo`](../operators/transformation/concatmapto.md)가 있습니다.

#### Operators that `merge`(병합 기반의 연산자)

고속도로의 차선 합류 도로와 마찬가지로, 
병합 기반의 연산자는 한 차선에서 흐르는 여러 활성화된 옵저버블들을 선착순으로 지원합니다.
이 연산자들은 여러 소스 중 하나에서 이벤트가 발생했을 때, 작업을 트리거하려는 상황에서 유용합니다.

```js
merge(firstObservable, secondObservable)
  // 첫 번째 또는 두 번째 옵저버블의 방출 시
  .pipe(mergeMap(saveActivity))
  .subscribe();
```

병합 기반의 연산자들은 [`merge`](../operators/combination/merge.md),
[`mergeMap`](../operators/transformation/mergemap.md), `mergeMapTo` 그리고
[`mergeAll`](../operators/combination/mergeall.md)이 있습니다.

## 연산자 간의 기타 유사성

유사한 목표를 갖고 있지만 트리거에 다양성을 제공하는 연산자도 있습니다.
예를 들어, 특정 조건이 충족되고 나서 옵저버블을 구독 취소하기 위해 이러한 연산자들을
사용할 수 있습니다.

1. [`take`](../operators/filtering/take.md)는 `n`개의 값만을 원할 때 사용합니다.
2. [`takeLast`](../operators/filtering/takelast.md)는 뒤에서 `n`개의 값만을 원할 때 사용합니다.
3. [`takeWhile`](../operators/filtering/takewhile.md)은 충족해야 할 값의 조건이 있을 때 사용합니다.
4. [`takeUntil`](../operators/filtering/takeuntil.md)은 다른 소스가 방출될 때까지 활성화 상태를 유지할 때 사용합니다.

처음엔 RxJS의 연산자 수가 압도적으로 느껴질 수 있지만, 이러한 공통된 동작과 패턴은 RxJS의 학습 격차를 빠르게 메울 수 있습니다.

## 이것으로 무엇을 할 수 있죠?

옵저버블을 통한 push 기반 프로그래밍에 더욱 익숙해지면 옵저버블 스트림을 통해 애플리케이션의 모든 비동기 동작들을 모델링할 수 있습니다.
특히 복잡한 동작에 대한 간단한 솔루션과 다양성을 제공하죠.

예를 들어, 유저가 퀴즈 질문에 답했을 때 유저의 활동 내역을 저장하는 요청을 보내고 싶다고 가정해 봅시다.
초기 구현은 각 이벤트에 대한 저장 요청을 시작하는 [`mergeMap`](../opearators/transformation/mergemap.md)
연산자를 사용할 수 있겠죠?

```js
const formEvents = fromEvent(formField, 'click');
const subscription = formEvents
  .pipe(
    map(convertToAppropriateValue),
    mergeMap(saveRequest)
  )
  .subscribe();
```

이후, 저장 시 순서를 확인해야 한다고 판단되었을 때 연산자 동작에 대한 지식이 있다면,
복잡한 대기열 시스템을 구현하는 대신에
[`mergeMap`](../operators/transformation/mergemap.md) 연산자를
[`concatMap`](../operators/transformation/concatmap.md)으로 교체하기만 하면 됩니다.
```js
const formEvents = fromEvent(formField, 'click');
const subscription = formEvents
  .pipe(
    map(convertToAppropriateValue),
    // 이제 이전 요청이 완료될 때까지 다음 요청은 시작되지 않습니다!
    concatMap(saveRequest)
  )
  .subscribe();
```

고작 한 단어를 바꿔 이벤트 요청을 순서대로 처리하게 만든 건, 앞으로 우리가 할 수 있는 일에 비하면 빙산의 일각에 불과하죠!

## 계속하세요!

RxJS를 배우는 게 두려울 수 있지만, 투자 가치는 충분하다고 약속드릴 수 있습니다.
설명드린 개념 중 일부분이 여전히 명확하지(또는 이해되지) 않아도, 걱정하지 마세요!
곧 모든 게 명확해질 거예요.

사이트 왼쪽에 있는 연산자들의 예시와, [입문자를 위한 자료](../README.md#입문자를+위한+자료)들을 확인해보세요.
반응형 프로그래밍 전문가가 되기 위한 여러분들의 여정을 응원합니다!