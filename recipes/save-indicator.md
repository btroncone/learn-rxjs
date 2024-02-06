# Save Indicator

This recipe demonstrates the creation of a google docs-esque save indicator with
RxJS.

[![Ultimate RxJS](https://ultimatecourses.com/static/banners/banner-rxjs.svg 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Example Code

( [StackBlitz](https://stackblitz.com/edit/rxjs-3txbvy?file=index.ts) )

![Save Indicator](https://drive.google.com/uc?export=view&id=1sYFqLoKlT0EPHxSDMSX7pT14RDjybU0Q)

```js
import { fromEvent, of, merge, empty, concat, defer } from 'rxjs';
import {
  delay,
  map,
  mergeMap,
  tap,
  debounceTime,
  distinctUntilChanged,
  mapTo,
  filter,
  share,
  switchAll
} from 'rxjs/operators';
import { format } from 'date-fns';

// track in progress saves
let savesInProgress = 0;

// references
const input = document.getElementById('note-input');
const saveIndicator = document.querySelector('.save-indicator');

// streams
const keyup$ = fromEvent(input, 'keyup');

// fake save request
const saveChanges = value => {
  return of(value).pipe(delay(1500));
};

/**
 * Trigger a save when the user stops typing for 200ms
 * After new data has been successfully saved, so a saved
 * and last updated indicator.
 */
const inputToSave$ = keyup$.pipe(
  debounceTime(200),
  map(e => e.target.value),
  distinctUntilChanged(),
  share()
);

const savesInProgress$ = inputToSave$.pipe(
  mapTo(of('Saving')),
  tap(_ => savesInProgress++)
);

const savesCompleted$ = inputToSave$.pipe(
  mergeMap(saveChanges),
  tap(_ => savesInProgress--),
  // ignore if additional saves are in progress
  filter(_ => !savesInProgress),
  mapTo(
    concat(
      // display saved for 2s
      of('Saved!'),
      empty().pipe(delay(2000)),
      // then last updated time, defer for proper time
      defer(() => of(`Last updated: ${format(Date.now(), 'MM/DD/YYYY hh:mm')}`))
    )
  )
);

merge(savesInProgress$, savesCompleted$)
  .pipe(
    /*
   If new save comes in when our completion observable is running, we want to switch to it for a status update.
  */
    switchAll()
  )
  .subscribe(status => {
    saveIndicator.innerHTML = status;
  });
```
