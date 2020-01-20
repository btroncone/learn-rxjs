# Get started transforming streams with map, pluck, and mapTo

When working with observables one of the most common use cases you will
encounter is the need to transform a stream of some value type into a stream of
another value type. For instance, you may have an observable of click events
that you wish to transform into an observable of objects containing just the
`clientX` and `clientY` coordinates. Or maybe you need to extract a value from a
stream of input events to perform a calculation or initiate a request. Or
perhaps you just want to extract a single property from an object, like a key
code, to perform another action down the (pipe)line. The scenarios for
transforming streams are endless.

In this article, we are going to learn about the most common operator used to
transform streams, the `map` operator. We will start by taking a look at
`Array.map` to build a general understanding of the `map` operation. Next, we
will explore how we can apply this approach to observables by using the RxJS
`map` operator. Finally, we will check out a few helper operators that can be
used in place of `map` should the right scenario present itself, exploring
common use cases along the way. Let's get started!

## Introducing `map`

If you have spent time working with JavaScript arrays you may already be
familiar with `Array.map`. When dealing with arrays, the `map` method lets you
transform an array by applying a provided function (often referred to as a
'projection' function) to each item within the array. For instance, let's say we
have an array of numbers `1-5`:

```js
const numbers = [1, 2, 3, 4, 5];
```

If we wanted to transform this into an array of each number multiplied by ten,
we could use the `map` method. To do this, we call `map` on our numbers array,
passing it a function which will be invoked with each value of the source array,
returning the number multiplied by ten:

```js
const numbers = [1, 2, 3, 4, 5];
const numbersTimesTen = numbers.map(number => number * 10);

// [10,20,30,40,50]
console.log(numbersTimesTen);
```

The `map` method does not mutate the existing array, but instead returns a new
array. For example, if we were to log the `numbers` array after calling `map`,
we can see that it's unchanged:

```js
const numbers = [1, 2, 3, 4, 5];
const numbersTimesTen = numbers.map(number => number * 10);

// [10,20,30,40,50]
console.log(numbersTimesTen);

// [1,2,3,4,5]
console.log(numbers);
```

To understand this better, let's walk through what a naive implementation of
`Array.map` could look like.

1. We create a new array.
2. For every item contained in the source array we apply the provided function.
3. We then push the result of this function to a temporary `resultArray`.
4. After doing this for every item, we return the new array.

```js
Array.prototype.map = function(projectFn) {
  let resultArray = [];
  // loop through each item
  this.forEach(item => {
    // apply the provided project function
    let result = projectFn(item);
    // push the result to our new array
    resultArray.push(result);
  });
  // return the array containing transformed values
  return resultArray;
};
```

While the
[real implementation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
of `Array.map` includes features like index tracking and proper error
management, this gives us a general sense of how things work behind the scenes.

So what are some other common scenarios where we could put the `map` method to
use? Using `Array.map`, we may also want to transform objects. For instance,
suppose we have an array of objects with a first and last name property and we
want to tack on a full name property to each object. We could accomplish this by
supplying a function that accepts each object and _maps_ it to a new object that
includes all current properties plus the new `fullName` property. In this
example we are using the
[object spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
and
[template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals),
but you could also explicitly rewrite the properties:

```js
const people = [
  { firstName: 'Brian', lastName: 'Troncone' },
  { firstName: 'Todd', lastName: 'Motto' }
];
const peopleWithFullName = people.map(person => ({
  ...person,
  fullName: `${person.firstName} ${person.lastName}`
}));

// [{ firstName: 'Brian', lastName: 'Troncone', fullName: 'Brian Troncone' }, {firstName: 'Todd', lastName: 'Motto', fullName: 'Todd Motto' }]
console.log(peopleWithFullName);
```

Another common use case for `map` is extracting a single property from an
object. For example, given the sample above suppose we decided we only _really_
need the last name property for display. Instead of our function returning a new
object, we can instead return just the property we need from that object:

```js
const people = [
  { firstName: 'Brian', lastName: 'Troncone' },
  { firstName: 'Todd', lastName: 'Motto' }
];
const lastNames = people.map(person => person.lastName);

// [ 'Troncone', 'Motto' ]
console.log(peopleWithFullName);
```

At this point, we are transforming an array of people objects into an array of
string last names.

As you can see, the `map` method is extremely flexible with a wide variety of
use cases, but how does this translate to `map` with RxJS, and when would you
put this to use with observables?

## Introducing the RxJS `map` operator

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

click$
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

click$
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

const keyup$ = fromEvent(document, 'click');

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

keyup$
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
