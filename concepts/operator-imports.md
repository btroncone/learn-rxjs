# Understanding Operator Imports

A problem you may have run into in the past when consuming or creating a public library that depends on RxJS is handling operator inclusion. The most predominant way to include operators in your project is to import them like below:

```js
import 'rxjs/add/operator/take';
```

This adds the imported operator to the `Observable` prototype for use throughout your project:

[(Source)](https://github.com/ReactiveX/rxjs/blob/master/src/add/operator/take.ts)

```js
import { Observable } from '../../Observable';
import { take } from '../../operator/take';

Observable.prototype.take = take;

declare module '../../Observable' {
  interface Observable<T> {
    take: typeof take;
  }
}
```

This is method is generally *OK* for private projects and modules, the issue arises when you are using these imports in say, an [npm](https://www.npmjs.com/) package or library to be consumed throughout your organization.

### A Quick Example

To see where a problem can spring up, let's imagine **Person A** is creating a public Angular component library. In this library you need a few operators so you add the typical imports:

*some-public-library.ts*
```js
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/switchMap';
```

**Person B** comes along and includes your library. They now have access to these operators even though they did not personally import them. *Probably not a huge deal but it can be confusing.* You use the library and operators, life goes on...

A month later **Person A** decides to update their library. They no longer need `switchMap` or `concatMap` so they remove the imports:

*some-public-library.ts*
```js
import 'rxjs/add/operator/take';
```

**Person B** upgrades the dependency, builds their project, which now fails. They never included `switchMap` or `concatMap` themselves, it was **just working** based on the inclusion of a 3rd party dependency. If you were not aware this could be an issue it may take a bit to track down.

### The Solution

Instead of importing operators like:

```js
import 'rxjs/add/operator/take';
```

We can instead import them like:

```js
import { take } from 'rxjs/operator/take';
```

This keeps them off the `Observable` prototype and let's us call them directly:

```js
import { take } from 'rxjs/operator/take';
import { of } from 'rxjs/observable/of';

take.call(
  of(1,2,3), 
  2
);
```

This quickly gets **ugly** however, imagine we have a longer chain:

```js
import { take } from 'rxjs/operator/take';
import { map } from 'rxjs/operator/map';
import { of } from 'rxjs/observable/of';

map.call(
  take.call(
    of(1,2,3), 
    2
  ),
  val => val + 2
);
```

Pretty soon we have a block of code that is near impossible to understand. How can we get the best of both worlds?

### RxJS Helpers

RxJS now comes with a [`pipe`](https://github.com/ReactiveX/rxjs/blob/755df9bf908108974e38aaff79887279f2cde008/src/Observable.ts#L305-L329) helper on `Observable` that alleviates the pain of not having operators on the prototype. We can take the ugly block of code from above:

```js
import { take } from 'rxjs/operator/take';
import { map } from 'rxjs/operator/map';
import { of } from 'rxjs/observable/of';

map.call(
  take.call(
    of(1,2,3), 
    2
  ),
  val => val + 2
);
```

And transform it into:

```js
import { take, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

of(1,2,3)
  .pipe(
    take(2),
    map(val => val + 2)
  );
```

Much easier to read, right? If you are developing in Angular and using the [`@angular/cdk`](https://www.npmjs.com/package/@angular/cdk) you can utilize the `RxChain` function and helper methods right now for a similar feel:

```ts
import { of } from 'rxjs/observable/of';
import { RxChain, map, debounceTime } from '@angular/cdk/rxjs';

RxChain
  .from(of(1,2,3))
  .call(map, val => val + 2)
  .call(debounceTime, 1000)
```

Whichever approach you prefer, both make it easy for you to keep a readable operator chain while maintaining a clean prototype for other projects!
