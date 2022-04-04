# map, pluck, mapTo를 이용해 stream 변형하기


Observable(옵저버블)을 사용하다 보면,
어떤 타입의 stream(스트림)을 다른 타입의 스트림으로 변환해야 하는 상황이 자주 발생할 것입니다.
예를 들자면 클릭 이벤트 옵저버블을 `clientX`와 `clientY` 좌표만 포함하는 객체 옵저버블로 변환시켜야 하는 상황이나,
계산 수행이나 요청 초기화를 위해 입력 이벤트 스트림에서 값을 추출해야 하는 상황이 있을 수 있죠.
또는 키 코드와 같은 객체에서 속성 하나를 추출하여 (파이프)라인에서 다른 작업을 수행해야 하는 상황일 수도 있습니다.
스트림을 변형해야 하는 상황들은 끊임없이 존재합니다.

이 문서에서는, 스트림을 변환하는 데 사용되는 가장 일반적인 연산자인 `map`을 배워볼 것입니다.
`map`에 대해 이해하기 위해 먼저 `Array.map`을 살펴보고,
이러한 접근 방식을 RxJS `map` 연산자를 통해 옵저버블에서 적용하는 방법을 알아보겠습니다.
마지막으로, 몇 가지 상황에서 `map` 대신 사용할 수 있는 연산자들과 해당하는 예시들을 확인해볼 것입니다.
그럼 시작해 볼까요?

## `map` 소개

여러분이 자바스크립트 배열을 사용해본 적이 있다면 이미 `Array.map`에 익숙할 것입니다.
배열을 다룰 때, `map` 메소드를 사용하면 주어진 함수를 
배열 내의 각 요소에 적용하여 배열을 변환할 수 있습니다.
예를 들어, `1-5`의 숫자 배열이 있다고 해 봅시다.

```js
const numbers = [1, 2, 3, 4, 5];
```

이 배열을 각 숫자에 10을 곱한 배열로 변환하기 위해 `map` 메소드를 사용할 수 있습니다.
숫자 배열에서 `map`을 호출하고, 배열의 각 값을 호출하는 함수를 전달하고,
10으로 곱한 숫자를 반환하면 됩니다.

```js
const numbers = [1, 2, 3, 4, 5];
const numbersTimesTen = numbers.map(number => number * 10);

// [10,20,30,40,50]
console.log(numbersTimesTen);
```

`map` 메소드는 기존의 배열을 변경하지 않고 새 배열을 반환합니다.
`map`을 호출한 후 `numbers` 배열을 로깅해보면 `numbers` 배열이 바뀌지 않았다는 것을 알 수 있죠.

```js
const numbers = [1, 2, 3, 4, 5];
const numbersTimesTen = numbers.map(number => number * 10);

// [10,20,30,40,50]
console.log(numbersTimesTen);

// [1,2,3,4,5]
console.log(numbers);
```

조금 더 자세히 이해하기 위해, `Array.map`의 원리적인 구현을 살펴보겠습니다.

1. 새 배열을 생성합니다.
2. 소스 배열에 포함된 모든 요소에 대해 함수를 적용합니다.
3. 함수의 결과를 `resultArray`에 임시로 push 합니다.
4. 모든 요소에 이 작업을 완료하면, 새 배열을 반환합니다.

```js
Array.prototype.map = function(projectFn) {
  let resultArray = [];
  // 모든 요소를 순회
  this.forEach(item => {
    // 제공된 project function을 적용
    let result = projectFn(item);
    // 새 배열에 결과값을 push
    resultArray.push(result);
  });
  // 변환된 값들을 가진 배열 반환
  return resultArray;
};
```

[실제 `Array.map`의 구현](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 은 index 추적 및 오류 관리 같은 기능들이 포함되어 있지만, 
백그라운드에서 어떻게 작동하는지 간단히 알아보기 위해 축약했습니다.

{% hint style="info" %}

RxJS는 [`filter`](../operators/filtering/filter.md),
[`reduce`](../operators/transformation/reduce.md), 
[`find`](../operators/filtering/find.md)와 같이 자주 쓰이는 배열 메소드들의 
옵저버블 버전 또한 제공한답니다!

{% endhint %}

그러면 `map` 메소드를 사용할 수 있는 다른 상황에는 무엇이 있을까요?
`Array.map`을 사용해서 객체를 변환할 수도 있습니다.
예를 들어, 성과 이름 속성이 있는 객체 배열이 있고 각 객체에 전체 이름 속성을 추가하려 한다고 가정해 봅시다.
이 문제는 각 객체의 모든 속성과 `fullName` 속성을 갖고 있는 새 객체에 _매핑_ 하는 함수가 있다면 
해결할 수 있을 것 같습니다. 이 예제에서는 [전개 구문](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax),
[템플릿 리터럴](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
을 사용하고 있지만, 명시적으로 속성을 작성해도 괜찮습니다.

```js
const people = [
  { firstName: '사과', lastName: '김' },
  { firstName: '자몽', lastName: '이' }
];
const peopleWithFullName = people.map(person => ({
  ...person,
  fullName: `${person.lastName}${person.firstName}`
}));

// [{ firstName: '사과', lastName: '김', fullName: '김사과' }, {firstName: '자몽', lastName: '이', fullName: '이자몽' }]
console.log(peopleWithFullName);
```

`map`의 또 다른 사용 사례는 객체에서 하나의 속성만 추출하는 상황입니다.
위의 예시에서, _오직_ 성 속성만 보여주기로 했다고 가정해봅시다.
이번에는 함수에서 새 객체를 반환하는 대신에 기존 객체에서 필요한 속성만 반환하면 됩니다.

```js
const people = [
  { firstName: '사과', lastName: '김' },
  { firstName: '자몽', lastName: '이' }
];
const lastNames = people.map(person => person.lastName);

// [ '김', '이' ]
console.log(lastNames);
```

사람 객체 배열을 문자열 성 배열로 변환해보았습니다.

보셨다시피, `map` 메소드는 다양한 상황에서 유연하게 사용될 수 있습니다. 
그렇다면 RxJS에서 `map`을 활용하는 방법은 무엇이고, 언제 옵저버블과 함께 사용할 수 있을까요?

## RxJS `map` 연산자

![map](https://drive.google.com/uc?export=view&id=1fbxzA5p0FFFUTo0dOAanoq6s1LBip3Ga)

RxJS의 `map` 연산자는 옵저버블에서 방출된 값을 제공된 함수를 기반으로 변환합니다.
배열 내에 포함된 값이 아니라, 옵저버블에서 방출된 값을 대상으로 한다는 것을 제외하면 `Array.map`과 유사하죠.

`Array.map`에서 활용했던 초기 예제로부터 시작해 보겠습니다. 대신에, 숫자 배열 대신 숫자 옵저버블을 변환해 봅시다. 
숫자 배열을 옵저버블로 변환하기 위해 [`from`](../operators/creation/from.mdl) 연산자를 사용하겠습니다.

```js
import { from } from 'rxjs';

const numbers = [1, 2, 3, 4, 5];
const number$ = from(numbers);
```

`from` 연산자는 배열이 제공되었을 때 각 요소를 순서대로(동기적으로) 내보냅니다.
옵저버블을 구독하여 콘솔에 인쇄되는 값을 확인해 봅시다.

```js
import { from } from 'rxjs';

const numbers = [1, 2, 3, 4, 5];
const number$ = from(numbers);

/*
 * 1
 * 2
 * 3
 * 4
 * 5
 */
number$.subscribe(console.log);
```

**팁:** _내부적으로 `from`이 각 값 타입을 어떻게 처리하는지 알고 싶다면,
[`subscribeTo`](https://github.com/ReactiveX/rxjs/blob/e17df333fec66ea3d79e3f70565064f757c3a4fe/src/internal/util/subscribeTo.ts#L14-L29) 와
관련된 헬퍼 함수들을 확인해 보세요. 위의 예제에서는 
[subscribeToArray](https://github.com/ReactiveX/rxjs/blob/e17df333fec66ea3d79e3f70565064f757c3a4fe/src/internal/util/subscribeToArray.ts#L7-L12) 가 사용되었습니다. 이러한 헬퍼 함수들은
[mergeMap](../operators/transformation/mergemap.md)과 같은 병합 연산자의 옵저버블이 아닌 반환 값을 처리할 때에도 사용됩니다._

이 옵저버블을 방출된 값에 10을 곱한 옵저버블로 변환하기 위해 `map` 연산자를 이용해보겠습니다.
`Array.map`처럼, `map` 연산자는 소스의 각 요소를 변환하는 함수를 사용할 수 있습니다.
이 예제에서, 소스 옵저버블에서 방출된 값에 10을 곱한 값을 반환하는 함수를 사용합니다.

```js
import { from } from 'rxjs';

const numbers = [1, 2, 3, 4, 5];
const number$ = from(numbers);
const numbersMultipliedByTen$ = number$.pipe(map(number => number * 10));

/*
 * 10
 * 20
 * 30
 * 40
 * 50
 */
numbersMultipliedByTen$.subscribe(console.log);
```

새 배열을 반환하기 전에 이 함수를 배열의 각 요소에 적용하는 대신, 
옵저버블에 함수가 적용되고, 값이 스트림을 통과할 때 결과 값이 실시간으로 방출됩니다.
RxJS 소스 코드에서 호출된 함수의 결과가 구독자(대상)에게 전달되는지 확인해 볼까요?

[(소스 코드)](https://github.com/ReactiveX/rxjs/blob/e17df333fec66ea3d79e3f70565064f757c3a4fe/src/internal/operators/map.ts#L81-L91)

```ts
protected _next(value: T) {
    let result: any;
    try {
      // project: map 연산자에 전달하는 함수
      result = this.project.call(this.thisArg, value, this.count++);
    } catch (err) {
    // 발생한 모든 에러 전달
      this.destination.error(err);
      return;
    }
    // project 함수를 호출한 결과를 구독자에게 방출
    this.destination.next(result);
  }
```

위에서 보았던 객체 배열 예제와 유사하게, `map` 연산자로 객체 옵저버블을 변환할 수 있습니다.
예를 들어, 클릭 이벤트 옵저버블을 `clientX`와 `clientY` 좌표만 포함하는 객체 옵저버블로 변환시켜야 하는 상황이라고 가정해보면,
해당하는 속성만 있는 객체를 반환하는 함수를 이용해 `map` 연산자를 적용해볼 수 있겠습니다.

```js
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

const click$ = fromEvent(document, 'click');

click$
  .pipe(
    map(event => ({
      x: event.clientX,
      y: event.clientY
    }))
    // { x: 12, y: 45 }, { x: 23, y: 132 }
  )
  .subscribe(console.log);
```

`map`을 이용해 객체에서 단일 속성만 가져와야 하는 상황도 살펴보겠습니다.
`keyup` 이벤트에서 `code` 속성만 존재하는 옵저버블이 있다면, 
유저가 특정 문자나 키를 입력할 때 조치를 취할 수 있을 것입니다.
이 옵저버블을 만들어내기 위해, `map` 연산자를 필요한 속성만 반환하게끔 적용할 수 있겠죠?

```js
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

const keyup$ = fromEvent(document, 'keyup');

keyup$
  .pipe(map(event => event.code))
  // 'Space', 'Enter'
  .subscribe(console.log);
```

`map`은 여러 상황들에서 완벽하게 작동하지만, RxJS는 추가적으로 단일 속성에 _매핑_ 하려는 경우, 
모든 이벤트에서 _항상_ 동일한 값에 매핑하려는 경우에 사용할 수 있는 헬퍼 연산자를 제공합니다.
먼저, 단일 속성에 매핑하려는 경우를 살펴볼까요?

## `pluck`으로 단일 속성 추출하기

![pluck](https://drive.google.com/uc?export=view&id=1-TdTqWb-qoif4FJojY3sC0oS81EkB65z)

RxJS에는 단순히 다른 연산자를 단축하기만 한 연산자들이 많습니다. 
예를 들어, 방출된 값에서 하나의 속성만을 가져오고 싶다면 언제든 `map` 대신 `pluck`을 사용할 수 있죠.
위의 이벤트 코드 예제에서도 `map` 대신 `pluck`을 사용해 `이벤트` 객체에서 `code` 속성을 추출할 수 있습니다. 

```js
import { fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';

const keyup$ = fromEvent(document, 'keyup');

keyup$
  .pipe(pluck('code'))
  // 'Space', 'Enter'
  .subscribe(console.log);
```

`pluck`에 여러 개의 값을 전달하여 객체 내부에 중첩된 속성을 가져올 수도 있습니다.
예를 들어, 클릭된 `target` 엘리먼트에서 `nodeName`을 가져오고 싶다면 
두 속성을 `pluck`에 순서대로 전달하면 됩니다.

```js
import { fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';

const click$ = fromEvent(document, 'click');

click$
  .pipe(pluck('target', 'nodeName'))
  // 'DIV', 'MAIN'
  .subscribe(console.log);
```

RxJS의 다른 헬퍼 연산자와 마찬가지로, `pluck`은 내부에서 `map` 연산자를 재사용하여
적절한 속성을 가져오는 함수를 전달합니다.

[(소스 코드)](https://github.com/ReactiveX/rxjs/blob/e17df333fec66ea3d79e3f70565064f757c3a4fe/src/internal/operators/pluck.ts#L48-L54)

```ts
export function pluck<T, R>(...properties: string[]): OperatorFunction<T, R> {
  const length = properties.length;
  if (length === 0) {
    throw new Error('list of properties cannot be empty.');
  }
  return (source: Observable<T>) =>
    map(plucker(properties, length))(source as any);
}
```

예제에서 `map`과 `pluck`은 기능적으로 동일하게 작동하지만, 한 눈에 알아보기 쉬운 것을 선택하는 게 좋습니다. 

마지막으로, 입력에 관계없이 **항상** 하나의 값에 매핑하려는 경우에 `mapTo` 연산자를 사용할 수 있습니다.

## `mapTo`로 상수 값에 매핑하기

![mapTo](https://drive.google.com/uc?export=view&id=1329klWDEvjgjh3JVJkzHoZDc7CpcLZvO)

단순히 `map`을 사용한 후 입력을 무시하면, 매번 특정 값에 매핑하고 싶은 상황을 해결할 수 있습니다.

```js
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

const click$ = fromEvent(document, 'click');

click$
  .pipe(map(() => '클릭하셨군요!'))
  // '클릭하셨군요!', '클릭하셨군요!'
  .subscribe(console.log);
```

이 작업에서는 반환된 값을 무시하므로 매핑 함수가 필요하지 않습니다.
이러한 상황에서는 `map` 대신 `mapTo`에 모든 방출에 대해 반환하려는 값을 제공하면 됩니다.

```js
import { fromEvent } from 'rxjs';
import { mapTo } from 'rxjs/operators';

const click$ = fromEvent(document, 'click');

click$
  .pipe(mapTo('You clicked!'))
  // 'You clicked!', 'You clicked!'
  .subscribe(console.log);
```

`mapTo`는 `pluck`과 마찬가지로 `map`에 비해 기능적 이점을 제공하지는 않지만, 한 눈에 이해하기 조금 더 쉬울 수 있죠.

## 정리하기

정리해보자면, `map`은 제공된 보조 함수를 사용해 스트림을 변환할 수 있는 다목적 연산자입니다. 
키 코드 매핑, 입력 필드의 값 업데이트, 객체의 형태 변경 등 일상적인 상황에서 굉장히 많이 사용되죠.
단일 속성에 매핑하는 경우나 항상 상수 값에 매핑하는 경우 각각 [`pluck`](../operators/transformation/pluck.md) 과
[`mapTo`](../operators/transformation/mapto.md) 헬퍼 연산자를 사용할 수도 있습니다.

더 복잡한 값에 대한 매핑을 담당하는 변환 연산자와 그 예제 목록을 보려면, 
[transformation operator(변환 연산자) 카테고리](../operators/transformation/README.md)를 참고하세요.
다음 문서에서 이 주제들에 대해 더 자세히 알아보도록 하죠!
