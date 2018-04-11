# HTTP Polling

_By [@barryrowe](https://twitter.com/barryrowe)_

This recipe demonstrates one way you can achieve polling an HTTP endpoint on an
interval. This is a common task in web applications, and one that RxJS tends to
handle really well as the continuous series of HTTP requests and responses is
easy to reason about as a stream of data.

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Example Code

(
[StackBlitz](https://stackblitz.com/edit/rxjs-http-poll-recipe-olrk2t?file=index.ts&devtoolsheight=50)
)

```js
// Import stylesheets
import './style.css';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { of } from 'rxjs/observable/of';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { from } from 'rxjs/observable/from';
import { timer } from 'rxjs/observable/timer';
import { empty } from 'rxjs/observable/empty';
import { merge } from 'rxjs/observable/merge';
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

* [filter](../operators/filtering/filter.md)
* [fromEvent](../operators/creation/fromevent.md)
* [from](../operators/creation/from.md)
* [map](../operators/transformation/map.md)
* [mapTo](../operators/transformation/mapTo.md)
* [mergeMap](../operators/transformation/mergemap.md)
* [switchMap](../operators/transformation/switchmap.md)
* [timer](../operators/creation/timer.md)
