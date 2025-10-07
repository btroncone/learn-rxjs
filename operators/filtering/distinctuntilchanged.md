# distinctUntilChanged

#### signature: `distinctUntilChanged(compare: function): Observable`

## Only emit when the current value is different than the last.

---

💡 distinctUntilChanged uses `===` comparison by default, object references must
match!

💡 If you want to compare based on an object property, you can use
[`distinctUntilKeyChanged`](distinctuntilkeychanged.md) instead!

---

### Why use `distinctUntilChanged`?

This operator stands guard, ensuring that you're not bombarded with repetitive information. Imagine if your best friend kept repeating the same story to you every time you met. It'd get old, right? The `distinctUntilChanged` operator does just that; it prevents subsequent identical emissions from an observable.

Think about a search bar on a website. As users type their queries, you don't want to send a server request for the same input value multiple times in a row, it would be redundant and inefficient. Here’s where `distinctUntilChanged` combined with [`debounceTime`](debouncetime.md) could shine. Imagine a user typing in a search term and then slightly hesitating before adding another letter. You might want to wait just a little bit (that’s (`debounceTime`)[debouncetime.md] doing its magic) and then, before firing off a request, ensure the term is actually different than the previous one - this is where you can utilize `distinctUntilChanged`.

For example, if a user is searching for "apple" and they type "app" -> wait a bit -> "appl" -> backtrack to "app" -> type again "appl", without `distinctUntilChanged`, you might end up sending redundant requests. But with it, once "appl" is recognized as previously processed, it won't send the redundant search request again.

It's important to remember that **`distinctUntilChanged` compares the current value with the last emitted value**. It doesn’t keep a long history. So, if an observable emitted the values 1, 2, 2, 3, 3, 2 - you’d get 1, 2, 3, 2 in return. By default, it also uses simple equality to compare values. If you're working with objects or arrays, you might need to provide a custom comparison function to determine whether values are distinct.

In essence, when you're looking to filter out consecutive duplicate emissions from your observables, think of `distinctUntilChanged` as your go-to option.



### Examples

##### Example 1: distinctUntilChanged with basic values

(
[StackBlitz](https://stackblitz.com/edit/typescript-bsb8mw?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { from } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

// only output distinct values, based on the last emitted value
const source$ = from([1, 1, 2, 2, 3, 3]);

source$
  .pipe(distinctUntilChanged())
  // output: 1,2,3
  .subscribe(console.log);
```

##### Example 2: distinctUntilChanged with objects

(
[StackBlitz](https://stackblitz.com/edit/typescript-moe7mh?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { from } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

const sampleObject = { name: 'Test' };

//Objects must be same reference
const source$ = from([sampleObject, sampleObject, sampleObject]);

// only emit distinct objects, based on last emitted value
source$
  .pipe(distinctUntilChanged())
  // output: {name: 'Test'}
  .subscribe(console.log);
```

##### Example 3: Using custom comparer function

(
[StackBlitz](https://stackblitz.com/edit/typescript-hzta27?file=index.ts&devtoolsheight=100)
)

```js
// RxJS v6+
import { from } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

// only output distinct values, based on the last emitted value
const source$ = from([
  { name: 'Brian' },
  { name: 'Joe' },
  { name: 'Joe' },
  { name: 'Sue' }
]);

source$
  // custom compare for name
  .pipe(distinctUntilChanged((prev, curr) => prev.name === curr.name))
  // output: { name: 'Brian }, { name: 'Joe' }, { name: 'Sue' }
  .subscribe(console.log);
```

### Related Recipes

- [Lockscreen](../../recipes/lockscreen.md)
- [Save Indicator](../../recipes/save-indicator.md)
- [Type Ahead](../../recipes/type-ahead.md)

### Additional Resources

- [distinctUntilChanged](https://rxjs.dev/api/operators/distinctUntilChanged)
  📰 - Official docs
- [distinctUntilChanged](https://indepth.dev/reference/rxjs/operators/distinct-until-changed) - In Depth Dev Reference
- [Filtering operator: distinct and distinctUntilChanged](https://egghead.io/lessons/rxjs-filtering-operators-distinct-and-distinctuntilchanged?course=rxjs-beyond-the-basics-operators-in-depth)
  🎥 💵 - André Staltz

---

> 📁 Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/distinctUntilChanged.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/distinctUntilChanged.ts)
