# HTTP Polling

[![Ultimate RxJS](https://ultimatecourses.com/static/banners/banner-rxjs.svg 'Ultimate RxJS')](https://ultimatecourses.com/courses/rxjs?ref=4)

### Examples

##### Example 1

_By [@barryrowe](https://twitter.com/barryrowe)_

This recipe demonstrates one way you can achieve polling an HTTP endpoint on an
interval. This is a common task in web applications, and one that RxJS tends to
handle really well as the continuous series of HTTP requests and responses is
easy to reason about as a stream of data.

(
[StackBlitz](https://stackblitz.com/edit/rxjs-http-poll-recipe-jc5cj7?file=index.ts&devtoolsheight=50)
)

![HTTP Polling](https://drive.google.com/uc?export=view&id=1HwHApLDoxO9Zc5DAG3XtgJBl83CpXmjU)

```js
// Import stylesheets
import './style.css';

import { Observable, Subscription, of, fromEvent, from, empty, merge, timer } from 'rxjs';
import { map, mapTo, switchMap, tap, mergeMap, takeUntil, filter, finalize } from 'rxjs/operators';

declare type RequestCategory = 'cats' | 'meats';

// Constants for Cat Requests
const CATS_URL = "https://placekitten.com/g/{w}/{h}";
function mapCats(response): Observable<string> {

  return from(new Promise((resolve, reject) => {
      var blob = new Blob([response], {type: "image/png"});
      let reader = new FileReader();
      reader.onload = (data: any) => {
        resolve(data.target.result);
      };
      reader.readAsDataURL(blob);
  }));
}

// Constants for Meat Requests
const MEATS_URL = "https://baconipsum.com/api/?type=meat-and-filler";
function mapMeats(response): Observable<string> {
  const parsedData = JSON.parse(response);
  return of(parsedData ? parsedData[0] : '');
}

/*************************
 * Our Operating State
 *************************/
 // Which type of data we are requesting
let requestCategory: RequestCategory = 'cats';
// Current Polling Subscription
let pollingSub: Subscription;
/*************************/

/**
 * This function will make an AJAX request to the given Url, map the
 * JSON parsed repsonse with the provided mapper function, and emit
 * the result onto the returned observable.
 */
function requestData(url: string, mapFunc: (any) => Observable<string>): Observable<string> {
  console.log(url)
  const xhr = new XMLHttpRequest();
  return from(new Promise<string>((resolve, reject) => {

    // This is generating a random size for a placekitten image
    //   so that we get new cats each request.
    const w = Math.round(Math.random() * 400);
    const h = Math.round(Math.random() * 400);
    const targetUrl = url
      .replace('{w}', w.toString())
      .replace('{h}', h.toString());

    xhr.addEventListener("load", () => {
      resolve(xhr.response);
    });
    xhr.open("GET", targetUrl);
    if(requestCategory === 'cats') {
      // Our cats urls return binary payloads
      //  so we need to respond as such.
      xhr.responseType = "arraybuffer";
    }
    xhr.send();
  }))
  .pipe(
    switchMap((data) => mapFunc(xhr.response)),
    tap((data) => console.log('Request result: ', data))
  );
}


/**
 * This function will begin our polling for the given state, and
 * on the provided interval (defaulting to 5 seconds)
 */
function startPolling(category: RequestCategory, interval: number = 5000): Observable<string> {
  const url = category === 'cats' ? CATS_URL : MEATS_URL;
  const mapper = category === 'cats' ? mapCats : mapMeats;

  return timer(0, interval)
    .pipe(
      switchMap(_ => requestData(url, mapper))
    );
}

// Gather our DOM Elements to wire up events
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const text = document.getElementById('text');
const pollingStatus = document.getElementById('polling-status');
const catsRadio = document.getElementById('catsCheckbox');
const meatsRadio = document.getElementById('meatsCheckbox');
const catsClick$ = fromEvent(catsRadio, 'click').pipe(mapTo('cats'));
const meatsClick$ = fromEvent(meatsRadio, 'click').pipe(mapTo('meats'));
const catImage: HTMLImageElement = <HTMLImageElement>document.getElementById('cat');
// Stop polling
let stopPolling$ = fromEvent(stopButton, 'click');

function updateDom(result) {
  if (requestCategory === 'cats') {
    catImage.src = result;
    console.log(catImage);
  } else {
    text.innerHTML = result;
  }
}

function watchForData(category: RequestCategory) {
    // Start  new Poll
    return startPolling(category, 5000).pipe(
      tap(updateDom),
      takeUntil(
        // stop polling on either button click or change of categories
        merge(
          stopPolling$,
          merge(catsClick$, meatsClick$).pipe(filter(c => c !== category))
        )
      ),
      // for demo purposes only
      finalize(() => pollingStatus.innerHTML = 'Stopped')
    )
}

// Handle Form Updates
catsClick$
  .subscribe((category: RequestCategory) => {
    requestCategory = category;
    catImage.style.display = 'block';
    text.style.display = 'none';
  });

meatsClick$
  .subscribe((category: RequestCategory) => {
    requestCategory = category;
    catImage.style.display = 'none';
    text.style.display = 'block';
  });

// Start Polling
fromEvent(startButton, 'click')
.pipe(
  // for demo purposes only
  tap(_ => pollingStatus.innerHTML = 'Started'),
  mergeMap(_ => watchForData(requestCategory))
)
.subscribe();
```

### Operators Used

- [filter](../operators/filtering/filter.md)
- [fromEvent](../operators/creation/fromevent.md)
- [from](../operators/creation/from.md)
- [map](../operators/transformation/map.md)
- [mapTo](../operators/transformation/mapTo.md)
- [merge](../operators/combination/merge.md)
- [mergeMap](../operators/transformation/mergemap.md)
- [switchMap](../operators/transformation/switchmap.md)
- [timer](../operators/creation/timer.md)

##### Example 2: Simple http polling

_By [@adamlubek](https://github.com/adamlubek)_

This recipe demonstrates polling an HTTP endpoint using repeat. It waits for 3
seconds following the response to poll again. Code below is simplifed to
demonstrate bare bones of solution but link below contains verbose logging and
error handling.

(
[StackBlitz](https://stackblitz.com/edit/rxjs-http-polling?file=index.ts&devtoolsheight=80)
)

```js
// RxJS v6+
import { of } from 'rxjs';
import { delay, tap, mergeMap, repeat } from 'rxjs/operators';

const fakeDelayedRequest = () => of(new Date()).pipe(delay(1000));

const display = response => {
  document.open();
  document.write(response);
};

const poll = of({}).pipe(
  mergeMap(_ => fakeDelayedRequest()),
  tap(display),
  delay(3000),
  repeat()
);

poll.subscribe();
```
