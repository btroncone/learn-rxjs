# debounceTime

#### signature: `debounceTime(dueTime: number, scheduler: Scheduler): Observable`

## Discard emitted values that take less than the specified time between output

### Why Use `debounceTime`
The `debounceTime` operator is great for exensive action because it limits the number of emission from the source observable, which make communication less noisy.  For example, websites such as YouTube or Twitter have search bars with the ability to gives you hint and typeahead based on your input.  Each time you type in a character, it makes an API call and brings back relevant data.  By watching what the user is typing and attaching a `debounceTime` operator, these search bars can greatly limit the amount of API calls they have to make while still provide users with great feedback.

---

:bulb: This operator is popular in scenarios such as type-ahead where the rate
of user input must be controlled!

---

### Examples

##### Example 1: Debouncing based on time between input

( [jsBin](http://jsbin.com/kacijarogi/1/edit?js,console,output) |
[jsFiddle](https://jsfiddle.net/btroncone/7kbg4q2e/) )

```js
const input = document.getElementById('example');

//for every keyup, map to current input value
const example = Rx.Observable.fromEvent(input, 'keyup').map(
  i => i.currentTarget.value
);

//wait .5s between keyups to emit current value
//throw away all other values
const debouncedInput = example.debounceTime(500);

//log values
const subscribe = debouncedInput.subscribe(val => {
  console.log(`Debounced Input: ${val}`);
});
```

#### Example 2: Debouncing input to reduce API calls to Wikipedia

([jsFiddle](https://jsfiddle.net/ElHuy/w3z3dg45/))

```js
const wikiEndpoint = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=';

const input = document.getElementById('search');

const example = Rx.Observable.fromEvent(input, 'keyup')
	.map(i => i.currentTarget.value)
	.debounceTime(500);

example.map(val => {
  if (val.trim().length > 0) {
    fetch(wikiEndpoint+val)
      .then(r => r.json())
      .then(d => {
        const results = d.query.search;
        const display = document.getElementById('display');
        display.innerHTML = "";
        results.forEach(result => 
          display.insertAdjacentHTML("beforeend",
            `<div>
               <h3>${result.title}</h3>
               <span>${result.snippet}</span>
             </div>`));
        })
    }
  }).subscribe();
```

```html
<input id='search'>

<section id='display'></section>
```

### Additional Resources

* [debounceTime](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-debounceTime)
  :newspaper: - Official docs
* [Transformation operator: debounce and debounceTime](https://egghead.io/lessons/rxjs-transformation-operators-debounce-and-debouncetime?course=rxjs-beyond-the-basics-operators-in-depth)
  :video_camera: :dollar: - André Staltz

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/master/src/operator/debounceTime.ts](https://github.com/ReactiveX/rxjs/blob/master/src/operator/debounceTime.ts)
