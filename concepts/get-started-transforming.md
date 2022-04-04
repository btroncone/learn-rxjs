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

The `map` operator in RxJS transforms values emitted from the source observable
based on a provided projection function. This is similar to `Array.map`, except
we are operating on each value emitted from an observable as it occurs rather
than each value contained within an array.

For instance, let's start with our initial example, but instead of transforming
an array of numbers let's transform an observable of numbers. To do this, we
will use the [`from`](../operators/creation/from.mdl) creation operator to first
convert our numbers array into an observable:

```js
import { from } from 'rxjs';

const numbers = [1, 2, 3, 4, 5];
const number$ = from(numbers);
```

When provided an array, the `from` creation operator will loop through
(synchronously) emitting each item in sequence. When we subscribe we can see
each value printed to the console:

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

**Tip:** _If you want to see how `from` handles each value type behind the
scenes, you can check out the
[`subscribeTo`](https://github.com/ReactiveX/rxjs/blob/e17df333fec66ea3d79e3f70565064f757c3a4fe/src/internal/util/subscribeTo.ts#L14-L29),
and associated helper functions. In this case,
[subscribeToArray](https://github.com/ReactiveX/rxjs/blob/e17df333fec66ea3d79e3f70565064f757c3a4fe/src/internal/util/subscribeToArray.ts#L7-L12)
is used. This same helper function is also used to deal with non-observable
return values of flattening operators, such as
[mergeMap](../operators/transformation/mergemap.md)_

If we then wanted to transform this observable into the emitted values
multiplied by ten, we could use the `map` operator. Just like `Array.map`, the
`map` operator accepts a project function which describes how each value from
the source will be transformed. In this case, we will provide a function that
accepts the emitted value from the source observable and returns that value
multipled:

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

Instead of the function being applied to each item of an array, before a new
array is returned, with observables the project function is applied and the
result emitted in real-time as values blast through your streams. We can confirm
this in the RxJS source code by seeing the function we provide is invoked, with
the result being passed on to the subscriber (destination):

[(Source Code)](https://github.com/ReactiveX/rxjs/blob/e17df333fec66ea3d79e3f70565064f757c3a4fe/src/internal/operators/map.ts#L81-L91)

```ts
protected _next(value: T) {
    let result: any;
    try {
      // project is the function we pass to the map operator
      result = this.project.call(this.thisArg, value, this.count++);
    } catch (err) {
    // forward any errors that occur
      this.destination.error(err);
      return;
    }
    // emit the result of calling our project function to the subscriber
    this.destination.next(result);
  }
```

Similar to our array example with objects, we may also want to transform an
observable of objects with the `map` operator. For instance, suppose we have an
observable of `click` events that we wish to transform into an observable of
objects containing just the `clientX` and `clientY` coordinates of these events.
To do this we could apply the `map` operator, providing a function that returns
an object with just these properties:

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

There may also be times we want to grab a single property from an object using
`map`. For example, we may have a use case for an observable of just the `code`
property from `keyup` events, so we can take action when the user types a
particular character or key. To do this we can apply the `map` operator
returning just the property we are interested in:

```js
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

const keyup$ = fromEvent(document, 'keyup');

keyup$
  .pipe(map(event => event.code))
  // 'Space', 'Enter'
  .subscribe(console.log);
```

While `map` works perfectly fine in these situations, RxJS also surfaces helper
operators for cases where you just want to _map_ to a single property or when
you _always_ want to map to the same value on any event. First, let's take a
look at the single property scenario.

## Extract a single property with `pluck`

![pluck](https://drive.google.com/uc?export=view&id=1-TdTqWb-qoif4FJojY3sC0oS81EkB65z)

RxJS features many operators that are simply shortcuts for other operators. For
example, any time we just want to grab a single property from an emitted value,
instead of using `map` we could use `pluck`. The `pluck` operator accepts a list
of values which describe the property you wish to grab from the emitted item.
For instance, using our event code example from above we could use `pluck`
instead of `map` to extract the `code` property from the `event` object:

```js
import { fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';

const keyup$ = fromEvent(document, 'keyup');

keyup$
  .pipe(pluck('code'))
  // 'Space', 'Enter'
  .subscribe(console.log);
```

We can also pass `pluck` multiple values to grab a nested property within an
object. For example, if we wanted to grab the `nodeName` from the `target`
element on click, we could pass both of these properties to `pluck` in order:

```js
import { fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';

const click$ = fromEvent(document, 'click');

click$
  .pipe(pluck('target', 'nodeName'))
  // 'DIV', 'MAIN'
  .subscribe(console.log);
```

Like many other helper operators in RxJS, behind the scenes `pluck` is simply
reusing the `map` operator, passing it a function to grab the appropriate
property:

[(Source Code)](https://github.com/ReactiveX/rxjs/blob/e17df333fec66ea3d79e3f70565064f757c3a4fe/src/internal/operators/pluck.ts#L48-L54)

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

Functionally, `map` and `pluck` will operate the same in these scenarios, I
would suggest using whichever you feel most comfortable reading at a glance.

Lastly, there may also be times where you **always** want to map to a single
value, no matter the input. For these situations, you can use the `mapTo`
operator.

## Mapping to a constant value with `mapTo`

![mapTo](https://drive.google.com/uc?export=view&id=1329klWDEvjgjh3JVJkzHoZDc7CpcLZvO)

For situations where you find yourself always wanting to map to a specific
value, one way you could handle it is by simply using `map` and ignoring the
input:

```js
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

const click$ = fromEvent(document, 'click');

click$
  .pipe(map(() => 'You clicked!'))
  // 'You clicked!', 'You clicked!'
  .subscribe(console.log);
```

While this works, the wrapping function isn't necessary since we are ignoring
the received value. For these scenarios you can replace `map` with `mapTo`, and
simply provide the value you wish to return on all emissions:

```js
import { fromEvent } from 'rxjs';
import { mapTo } from 'rxjs/operators';

const click$ = fromEvent(document, 'click');

click$
  .pipe(mapTo('You clicked!'))
  // 'You clicked!', 'You clicked!'
  .subscribe(console.log);
```

Like `pluck`, `mapTo` provides no real benefit functionally over returning a
constant value with `map`, but syntactically it may prove slightly easier to
consume and read at a glance.

## Conclusion

In conclusion, `map` is a versatile operator which lets you transform a stream
using a provided projection function. Whether it's mapping to a keycode, value
updates from an input box, or reshaping an object, `map` will be one of the most
used operators in your day-to-day RxJS toolbox. For scenarios where you just
need to map to a single property, or always want to map to a constant value, you
can also check out the [`pluck`](../operators/transformation/pluck.md) and
[`mapTo`](../operators/transformation/mapto.md) helper operators.

For a full list of transformation operators with examples, including operators
which manage mapping to more complex values such as other observables, check out
the [transformation operator section](../operators/transformation/README.md). We
will explore these topics in detail in future posts!
