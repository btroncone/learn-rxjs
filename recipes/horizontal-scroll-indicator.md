# Horizontal scroll indicator

_By [adamlubek](https://github.com/adamlubek)_

This recipe demonstrates the creation of a horizontal scroll indicator.

<div class="ua-ad"><a href="https://ultimatecourses.com/"><img src="https://ultimatecourses.com/assets/img/banners/ultimate-angular-leader.svg" style="width:100%;max-width:100%"></a></div>

### Example Code

(
[StackBlitz](https://stackblitz.com/edit/rxjs-horizontal-scroll-indicator?file=index.ts)
)

```js
// RxJS v6+
import { fromEvent } from 'rxjs'; 
import { throttleTime, tap } from 'rxjs/operators';

const scrollIndication = document.getElementById('indication');
const getScrollWidth = () => {
  const doc = document.documentElement;
  // https://www.w3schools.com/howto/howto_js_scroll_indicator.asp
  const winScroll = doc.scrollTop;
  const height = doc.scrollHeight - doc.clientHeight;
  
  return (winScroll / height) * 100;
}
const setScroll = _ => 
  scrollIndication.style.width = getScrollWidth() + '%'

fromEvent(document, 'scroll')
  .pipe(
    throttleTime(20),
    tap(setScroll)
  )
.subscribe()
```

##### html

```html
<style>
  #indication {
    position: fixed;
    width: 5px;
    height: 7px;
    background-color: #FF3366;
    left: 0px;
    right: 0px;
    top: 0px;
    z-index: 2;
  }
</style>

<div id="indication">&nbsp;</div>
Scroll down!!!
<div class="app" style="position: absolute; margin-top: 3000px;">Boom!</div>
```

### Operators Used

- [fromEvent](../operators/creation/fromevent.md)
- [tap](../operators/utility/do.md)
- [throttleTime](../operators/filtering/throttletime.md)
