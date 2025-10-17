# distinctUntilKeyChanged

#### signature: `distinctUntilKeyChanged(key, compare?: fn): Observable`

## Only emit when the specified key value changes

💡 If you're comparing entire values, use [distinctUntilChanged](./distinctuntilchanged.md) instead!  
💡 For truly unique values across the entire stream (not just consecutive), check out [distinct](./distinct.md)!

### Why use distinctUntilKeyChanged?

When you're working with streams of objects—think user profiles, product items, or API responses, you often care about changes to a specific property rather than the entire object. Maybe you're tracking users by their ID, filtering products by SKU, or monitoring status updates. That's where `distinctUntilKeyChanged` shines.

Think of it like having a smart doorman at a club who recognizes people by their membership cards. Even if someone changes their outfit or hairstyle (other object properties), the doorman only cares about the card number. If you try to enter twice in a row with the same card, they'll stop you the second time: "You're already inside!" But if someone else with a different card shows up, they're let through. That's exactly what `distinctUntilKeyChanged` does—it checks a specific "card" (key) on each object and only lets through consecutive duplicates.

This is incredibly useful for scenarios like live data feeds where objects might be re-emitted frequently but you only want to react when a specific property actually changes. For instance, you might receive user objects from a WebSocket connection, but you only want to update your UI when the user's status field changes from 'online' to 'offline', not every time the object is re-broadcast. By using `distinctUntilKeyChanged('status')`, you filter out the noise and [react only to meaningful changes](#example-1-compare-based-on-key).

### Examples

##### Example 1: Compare based on key

(
[StackBlitz](https://stackblitz.com/edit/typescript-bpl1gwyk?file=index.ts)
)

```js
// RxJS v6+
import { from } from 'rxjs';
import { distinctUntilKeyChanged } from 'rxjs/operators';

// only output distinct values based on the 'name' key
const source$ = from([
  { name: 'Brian' },
  { name: 'Joe' },
  { name: 'Joe' },
  { name: 'Sue' }
]);

source$
  // only emit when name property changes
  .pipe(distinctUntilKeyChanged('name'))
  // output: { name: 'Brian' }, { name: 'Joe' }, { name: 'Sue' }
  .subscribe(console.log);
```

##### Example 2: Keyboard events

(
[StackBlitz](https://stackblitz.com/edit/rxjs-distinctuntilkeychanged?file=index.ts&devtoolsheight=50)
)

```js
// RxJS v6+
import { fromEvent } from 'rxjs';
import { distinctUntilKeyChanged, map } from 'rxjs/operators';

// listen to keyboard events
const keys$ = fromEvent(document, 'keyup').pipe(
  // only emit when the 'code' property changes (ignore repeated key holds)
  distinctUntilKeyChanged<KeyboardEvent>('code'),
  // extract the actual key value for display
  map(e => e?.key)
);

keys$.subscribe(console.log);
```

##### Example 3: Custom comparison function

(
[StackBlitz](https://stackblitz.com/edit/typescript-exygmrr6?file=index.ts)
)

```js
// RxJS v6+
import { of } from 'rxjs';
import { distinctUntilKeyChanged } from 'rxjs/operators';

interface Person {
  age: number;
  name: string;
}

// stream of person objects
const people$ = of<Person>(
  { age: 4, name: 'Foo1' },
  { age: 7, name: 'Bar' },
  { age: 5, name: 'Foo2' },
  { age: 6, name: 'Foo3' }
);

people$
  .pipe(
    // only emit when first 3 letters of name change
    distinctUntilKeyChanged(
      'name',
      (x: string, y: string) => x.substring(0, 3) === y.substring(0, 3)
    )
  )
  // output: { age: 4, name: 'Foo1' }, { age: 7, name: 'Bar' }, { age: 5, name: 'Foo2' }
  .subscribe(console.log);
```

### Related Recipes

- [Alphabet Invasion Game](../../recipes/alphabet-invasion-game.md)
- [Battleship Game](../../recipes/battleship-game.md)

### Additional Resources

- [distinctUntilKeyChanged](https://rxjs.dev/api/operators/distinctUntilKeyChanged) 📰 - Official docs
- [Filtering operator: distinct, distinctUntilChanged, distinctUntilKeyChanged](https://egghead.io/lessons/rxjs-filtering-operators-distinct-distinctuntilchanged-distinctuntilkeychanged) 🎥 - Egghead.io

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/operators/distinctUntilKeyChanged.ts](https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/operators/distinctUntilKeyChanged.ts)