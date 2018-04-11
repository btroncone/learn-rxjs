# HTTP Polling

_By [@barryrowe](https://twitter.com/barryrowe)_

This recipe demonstrates one way you can achieve polling an HTTP endpoint on an interval. This is a common task in web applications, and one that RxJS tends to handle really well as the continuous series of HTTP requests and responses is easy to reason about as a stream of data. 

<div class="ua-ad"><a href="https://ultimateangular.com/?ref=76683_kee7y7vk"><img src="https://ultimateangular.com/assets/img/banners/ua-leader.svg"></a></div>

### Example Code

(
[StackBlitz](https://stackblitz.com/edit/rxjs-http-poll-recipe?file=index.ts&devtoolsheight=50)
)
```
// Import stylesheets
import './style.css';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { of } from 'rxjs/observable/of';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { timer } from 'rxjs/observable/timer';

import { map, switchMap, tap } from 'rxjs/operators';

// Constants for Cat Requests
const CATS_URL = "https://placekitten.com/g/{w}/{h}";
function mapCats(response): Observable<string> {

  return fromPromise(new Promise((resolve, reject) => {
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
let isRequestingCats = true;
// Current Polling Subscription
let pollingSub: Subscription;
/*************************/

/**
 * This function will make an AJAX request to the given Url, map the 
 * JSON parsed repsonse with the provided mapper function, and emit
 * the result onto the returned observable.
 */
function requestData(url: string, mapFunc: (any) => Observable<string>): Observable<string> {
  const xhr = new XMLHttpRequest();
  return fromPromise(new Promise<string>((resolve, reject) => {
    
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
    if(isRequestingCats) {
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
function startPolling(isCats: boolean = false, interval: number = 5000): Observable<string> {
  const url = isCats ? CATS_URL : MEATS_URL;
  const mapper = isCats ? mapCats : mapMeats;

  return timer(0, interval)
    .pipe(
      switchMap(() => requestData(url, mapper))
    );
}

function stopPolling(): void {
  if (pollingSub) {
    pollingSub.unsubscribe();
  }
}

// Gather our DOM Elements to wire up events
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const text = document.getElementById('text');
const catsRadio = document.getElementById('catsCheckbox');
const meatsRadio = document.getElementById('meatsCheckbox');
const catImage: HTMLImageElement = <HTMLImageElement>document.getElementById('cat');

function updateDom(result) {
  if (isRequestingCats) {
    catImage.src = result;
    console.log(catImage);
  } else {
    text.innerHTML = result;
  }
}

function watchForData() {
    // Clear any Previous Polls
    stopPolling(); 
    // Start  new Poll
    pollingSub = startPolling(isRequestingCats, 5000)
      .subscribe(updateDom);
}

// Handle Form Updates
fromEvent(catsRadio, 'click')
  .subscribe(() => {
    isRequestingCats = true;
    catImage.style.display = 'block';
    text.style.display = 'none';
  });
fromEvent(meatsRadio, 'click')
  .subscribe(() => {
    isRequestingCats = false;
    catImage.style.display = 'none';
    text.style.display = 'block';
  });

// Start Polling
fromEvent(startButton, 'click')
  .subscribe(watchForData);

// Clear Polling
fromEvent(stopButton, 'click')
  .subscribe(() => stopPolling());
```

### Operators Used

* [fromEvent](../operators/creation/fromevent.md)
* [fromPromise](../operators/creation/frompromise.md)
* [map](../operators/transformation/map.md)
* [switchMap](../operators/transformation/switchmap.md)
* [timer](../operators/creation/timer.md)