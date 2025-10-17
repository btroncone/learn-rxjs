# map

## signature: `map(project: (value: T, index: number) => R): Observable<R>`

### Apply projection with each value from source.

{% hint style="info" %}

New to transformation operators? Check out the article
[Get started transforming streams with map, pluck, and mapTo](../../concepts/get-started-transforming.md)!

{% endhint %}

---

💡 Similar to the well-known Array.prototype.map, this is the operator you'll use most often to transform values in your streams!

💡 Need to extract a single property from an object? Before RxJS v7, you might have used `pluck`, but now `map` with destructuring or property access is the recommended approach.

💡 If your transformation function returns an Observable (like an HTTP call), you don't want `map` – you want one of the flattening operators: `mergeMap`, `switchMap`, `concatMap`, or `exhaustMap`.

💡 The `map` operator applies to each value individually. If you need to transform or combine multiple values together, look at operators like `scan`, `reduce`, or `combineLatest`.

---

### Why use map?

`map` is your go-to operator for transforming data as it flows through your observable streams. Think of it as a factory assembly line where each item gets modified before moving along. Just as a stamping machine presses a logo onto every product passing through, `map` applies your transformation function to every value that comes down the stream.

This operator truly shines when you need to reshape data to fit your application's needs. Imagine you're building a search feature for a shopping site. Your API returns complex product objects with dozens of fields – inventory counts, warehouse locations, internal IDs, and more – but your UI only needs the product name, price, and image URL. Rather than lugging around all that extra data through your application, you use `map` right after the HTTP call to [extract just what you need](#example-3-mapping-api-response-to-ui-model). This keeps your data flow clean and your components focused.

One of the most common patterns you'll encounter is using `map` to [extract properties from objects](#example-2-map-to-single-property) or responses. Whether it's grabbing the `data` property from an API response wrapper, pulling user IDs from a collection of user objects, or transforming form values into the shape your backend expects, `map` handles these everyday transformation needs. It's also perfect for [simple calculations](#example-5-calculations-and-formatting) – adding tax to prices, converting timestamps to formatted dates, or transforming coordinates for a mapping library.

What makes `map` particularly powerful is its predictability and simplicity. Unlike operators that manage multiple emissions or timing concerns, `map` has a straightforward one-to-one relationship: one input value produces one output value, synchronously. This makes it easy to reason about and debug. If a value goes in, a transformed value comes out immediately, no subscriptions required, no async complexity.

`map` is equally useful for transforming events into data you actually care about. When working with DOM events, you rarely need the entire event object – just specific properties like [mouse coordinates](#example-4-transform-dom-events) or keyboard input values. `map` lets you cleanly extract exactly what matters.

A critical point to remember: `map` is for *synchronous* transformations. If your transformation function needs to call an API, query a database, or perform any asynchronous operation that returns an Observable, `map` is the wrong choice. When you map to an Observable, you create a "higher-order Observable" (an Observable of Observables), which isn't what you want. For those scenarios, reach for `mergeMap`, `switchMap`, `concatMap`, or `exhaustMap` – the flattening operators that handle inner Observables.

In essence, whenever you find yourself thinking "I need to transform each value in this stream," `map` should be your first instinct. It's the Swiss Army knife of RxJS – simple, reliable, and perfect for the vast majority of transformation tasks you'll encounter in reactive programming.

---

## Examples

### Example 1: Add 10 to each number

( [StackBlitz](https://stackblitz.com/edit/typescript-a7bnxb?file=index.ts&devtoolsheight=100) )

```javascript
// RxJS v6+
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

//emit (1,2,3,4,5)
const source = from([1, 2, 3, 4, 5]);
//add 10 to each value
const example = source.pipe(map(val => val + 10));
//output: 11,12,13,14,15
const subscribe = example.subscribe(val => console.log(val));
```

### Example 2: Map to single property

( [StackBlitz](https://stackblitz.com/edit/typescript-qgpnju?file=index.ts&devtoolsheight=100) )

```javascript
// RxJS v6+
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

//emit ({name: 'Joe', age: 30}, {name: 'Frank', age: 20},{name: 'Ryan', age: 50})
const source = from([
  { name: 'Joe', age: 30 },
  { name: 'Frank', age: 20 },
  { name: 'Ryan', age: 50 }
]);
//extract each person's name using destructuring
const example = source.pipe(map(({ name }) => name));
//output: "Joe","Frank","Ryan"
const subscribe = example.subscribe(val => console.log(val));
```

### Example 3: Mapping API Response to UI Model

( [StackBlitz](https://stackblitz.com/edit/typescript-kus9nthn?file=index.ts) )

```javascript
// RxJS v6+
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

// Simulate an API response with extra metadata
const apiResponse = of({
  status: 'success',
  timestamp: 1634567890,
  data: {
    id: 123,
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    internalFields: { /* ... */ }
  }
});

// Extract and reshape just what the UI needs
const uiModel = apiResponse.pipe(
  map(response => ({
    fullName: `${response.data.firstName} ${response.data.lastName}`,
    email: response.data.email,
    id: response.data.id
  }))
);

// output: { fullName: 'Jane Doe', email: 'jane@example.com', id: 123 }
const subscribe = uiModel.subscribe(val => console.log(val));
```

### Example 4: Transform DOM Events

( [StackBlitz](https://stackblitz.com/edit/typescript-a8rwwcaj?file=index.ts) )

```javascript
// RxJS v6+
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

// Track mouse position from click events
const clicks = fromEvent(document, 'click');

const positions = clicks.pipe(
  map((event: MouseEvent) => ({
    x: event.clientX,
    y: event.clientY,
    timestamp: Date.now()
  }))
);

// output: { x: 234, y: 567, timestamp: 1634567891234 }
positions.subscribe(pos => console.log('Click position:', pos));
```

### Example 5: Calculations and Formatting

( [StackBlitz](https://stackblitz.com/edit/typescript-rfbasqua?file=index.ts) )

```javascript
// RxJS v6+
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

// Shopping cart items
const cartItems = from([
  { name: 'Laptop', price: 999.99, quantity: 1 },
  { name: 'Mouse', price: 29.99, quantity: 2 },
  { name: 'Keyboard', price: 79.99, quantity: 1 }
]);

// Calculate total and format for display
const itemsWithTotal = cartItems.pipe(
  map(item => ({
    ...item,
    total: item.price * item.quantity,
    displayPrice: `$${(item.price * item.quantity).toFixed(2)}`
  }))
);

/* output: 
  { name: 'Laptop', price: 999.99, quantity: 1, total: 999.99, displayPrice: '$999.99' }
  { name: 'Mouse', price: 29.99, quantity: 2, total: 59.98, displayPrice: '$59.98' }
  { name: 'Keyboard', price: 79.99, quantity: 1, total: 79.99, displayPrice: '$79.99' }
*/
const subscribe = itemsWithTotal.subscribe(item => console.log(item));
```

---

### Related Recipes

* [Alphabet Invasion Game](https://www.learnrxjs.io/learn-rxjs/recipes/alphabet-invasion-game)
* [Battleship Game](https://www.learnrxjs.io/learn-rxjs/recipes/battleship-game)
* [Catch The Dot Game](https://www.learnrxjs.io/learn-rxjs/recipes/catch-the-dot-game)
* [Save Indicator](https://www.learnrxjs.io/learn-rxjs/recipes/save-indicator)
* [Smart Counter](https://www.learnrxjs.io/learn-rxjs/recipes/smartcounter)
* [Space Invaders Game](https://www.learnrxjs.io/learn-rxjs/recipes/space-invaders-game)
* [Stop Watch](https://www.learnrxjs.io/learn-rxjs/recipes/stop-watch)
* [Swipe To Refresh](https://www.learnrxjs.io/learn-rxjs/recipes/swipe-to-refresh)
* [Type Ahead](https://www.learnrxjs.io/learn-rxjs/recipes/type-ahead)

---

### Additional Resources

* [map](https://rxjs.dev/api/operators/map) 📰 - Official docs
* [map vs flatMap](https://egghead.io/lessons/rxjs-rxjs-map-vs-flatmap) 🎥 - Ben Lesh
* [Transformation operator: map and mapTo](https://egghead.io/lessons/rxjs-transformation-operator-map-and-mapto?course=rxjs-beyond-the-basics-operators-in-depth) 🎥 💵 - André Staltz

---

📁 **Source Code:** [https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/operators/map.ts](https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/operators/map.ts)