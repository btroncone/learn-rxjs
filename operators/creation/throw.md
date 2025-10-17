# throwError

```typescript
throwError(errorOrErrorFactory: (() => any) | any): Observable<never>
```

**Creates an Observable that immediately emits an error notification upon subscription.**

---

💡 **When should you use throwError vs. just throwing an error?**

In most cases within operator callbacks (like `map`, `tap`, `mergeMap`), you can simply use JavaScript's native `throw` statement since RxJS wraps these in try-catch blocks. Use `throwError()` specifically when you need to **return an Observable that errors** - particularly in operators like `switchMap`, `mergeMap`, or `concatMap` where an Observable is expected as the return value.

💡 **Factory function recommended**

As of RxJS 7+, pass a factory function `() => error` rather than the error directly. This creates the error at the moment of subscription, providing better stack traces: `throwError(() => new Error('message'))`.

---

## Why use throwError?

Think of `throwError` as your "error signal generator" - it creates an Observable that does nothing but immediately send out an error signal. It's like having a specialized alarm button: when you press it, it doesn't emit any values or complete normally, it just triggers the error path.

You'll reach for `throwError` when you're working in Observable pipelines where you need to return an Observable, but something has gone wrong and you want to propagate that error downstream. For instance, in a [conditional API call](#example-2-conditional-error-in-switchmap) where you validate input before making a request, or when [implementing retry logic](#example-3-using-throwerror-with-retry-strategy) where you want to signal specific failures.

Here's a key insight: while JavaScript's native `throw` statement works great inside operators like `map` or `tap`, `throwError()` shines when you're in operators that expect you to return an Observable - like `switchMap`, `mergeMap`, or inside a custom creation function. In those cases, just throwing would break the chain; you need to return an error Observable instead. It's the difference between throwing an error in your code versus constructing an Observable that represents an error state.

---

## Examples

### Example 1: Basic error emission

[StackBlitz](https://stackblitz.com/edit/typescript-5d3stz?file=index.ts&devtoolsheight=100)

```typescript
import { throwError } from 'rxjs';

// Create an observable that immediately emits an error
const error$ = throwError(() => new Error('Something went wrong!'));

// Subscribe to see the error
error$.subscribe({
  next: val => console.log('Next:', val), // Won't be called
  error: err => console.error('Error caught:', err.message),
  complete: () => console.log('Complete!') // Won't be called
});

// Output: "Error caught: Something went wrong!"
```

### Example 2: Conditional error in switchMap

[StackBlitz](https://stackblitz.com/edit/typescript-oulg71yj?file=index.ts)

```typescript
import { of, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

interface User {
  id: number;
  name: string;
}

// Simulate fetching user data
function fetchUser(id: number) {
  return of({ id, name: `User ${id}` });
}

// Validate user ID before fetching - handle errors per item
of(0, 5, -1, 10)
  .pipe(
    mergeMap((id) => {
      // Create the source observable based on validation
      const source$ =
        id <= 0
          ? throwError(() => new Error(`Invalid user ID: ${id}`))
          : fetchUser(id);

      // Handle errors for each item individually
      return source$.pipe(
        catchError((err) => {
          console.error('Caught:', err());
          // Provide fallback user for this item only
          return of({ id: 0, name: 'Guest User' } as User);
        })
      );
    })
  )
  .subscribe((user) => console.log('User:', user.name));

/* Output:
   Caught: Invalid user ID: 0
   User: Guest User
   User: User 5
   Caught: Invalid user ID: -1
   User: Guest User
   User: User 10
*/
```

### Example 3: Using throwError with retry strategy

[StackBlitz](https://stackblitz.com/edit/typescript-gtwzvj3b?file=index.ts)

```typescript
import { of, throwError, timer } from 'rxjs';
import { mergeMap, retry, tap } from 'rxjs/operators';

let attemptCount = 0;

// Simulate an unreliable API call
function unreliableApiCall() {
  attemptCount++;
  console.log(`API call attempt #${attemptCount}`);
  
  // Fail first 2 attempts, succeed on 3rd
  return attemptCount < 3
    ? throwError(() => new Error('Network timeout'))
    : of({ data: 'Success!' });
}

// Try the API call with retry logic
of(null).pipe(
  mergeMap(() => unreliableApiCall()),
  retry(2) // Retry up to 2 times on error
).subscribe({
  next: result => console.log('Result:', result.data),
  error: err => console.error('Final error:', err.message)
});

/* Output:
   API call attempt #1
   API call attempt #2
   API call attempt #3
   Result: Success!
*/
```

---

## Related Recipes

- [Smart Counter](https://www.learnrxjs.io/learn-rxjs/recipes/smartcounter)
- [HTTP Polling](https://www.learnrxjs.io/learn-rxjs/recipes/http-polling)

---

## Additional Resources

- [throwError](https://rxjs.dev/api/index/function/throwError) 📰 - Official docs
- [Error Handling in RxJS](https://blog.angular-university.io/rxjs-error-handling/) 📰 - Comprehensive guide

---

📁 **Source Code:** [https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/throwError.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/throwError.ts)