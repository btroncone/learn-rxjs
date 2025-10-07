# Type Ahead

_By [adamlubek](https://github.com/adamlubek)_

This recipe demonstrates the creation of type ahead client side code.



### Example Code

(
[StackBlitz](https://stackblitz.com/edit/rxjs-type-ahead?file=index.ts&devtoolsheight=50)
)

![Typeahead](https://drive.google.com/uc?export=view&id=1TdDA78dkiy5lC8A3Rz28oDq9SuaxsS45)

```js
// RxJS v6+
import { fromEvent, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap
} from 'rxjs/operators';

const getContinents = keys =>
  [
    'africa',
    'antarctica',
    'asia',
    'australia',
    'europe',
    'north america',
    'south america'
  ].filter(e => e.indexOf(keys.toLowerCase()) > -1);

const fakeContinentsRequest = keys =>
  of(getContinents(keys)).pipe(
    tap(_ => console.log(`API CALL at ${new Date()}`))
  );

fromEvent(document.getElementById('type-ahead'), 'keyup')
  .pipe(
    debounceTime(200),
    map((e: any) => e.target.value),
    distinctUntilChanged(),
    switchMap(fakeContinentsRequest),
    tap(c => (document.getElementById('output').innerText = c.join('\n')))
  )
  .subscribe();
```

##### html

```html
Get continents
<input id="type-ahead" />
<hr />
<div id="output"></div>
```

### Operators Used

- [debounceTime](../operators/filtering/debouncetime.md)
- [distinctUntilChanged](../operators/filtering/distinctuntilchanged.md)
- [fromEvent](../operators/creation/fromevent.md)
- [map](../operators/transformation/map.md)
- [of](../operators/creation/of.md)
- [switchMap](../operators/transformation/switchmap.md)
- [tap](../operators/utility/do.md)
