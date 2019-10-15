# ajax

#### signature: `ajax(urlOrRequest: string | AjaxRequest)`

## Create an observable for an Ajax request with either a request object with url, headers, etc or a string for a URL.

<div class="ua-ad"><a href="https://ultimatecourses.com/courses/rxjs"><img src="https://drive.google.com/uc?export=view&id=1htrban3k3Z8CxiKwEV6bdmxW5Wu8xdWX" style="width:100%;max-width:100%"></a></div>

### Examples

##### Example 1: Observable that emits the response object that is being returned from the request.

( [StackBlitz](https://stackblitz.com/edit/rxjs-raqi89) )

```js
// RxJS v6+
import { ajax } from 'rxjs/ajax';

const githubUsers = `https://api.github.com/users?per_page=2`;

const users = ajax(githubUsers);

const subscribe = users.subscribe(
  res => console.log(res),
  err => console.error(err)
);

/* output
{  
  "originalEvent":{  
    "isTrusted":true
  },
  "xhr":{  

  },
  "request":{  
    "async":true,
    "crossDomain":true,
    "withCredentials":false,
    "headers":{  

    },
    "method":"GET",
    "responseType":"json",
    "timeout":0,
    "url":"https://api.github.com/users?per_page=2"
  },
  "status":200,
  "responseType":"json",
  "response":[  
    {  
      "login":"mojombo",
      "id":1,
      "node_id":"MDQ6VXNlcjE=",
      "avatar_url":"https://avatars0.githubusercontent.com/u/1?v=4",
      "gravatar_id":"",
      ...
    },
    {  
      "login":"defunkt",
      "id":2,
      "node_id":"MDQ6VXNlcjI=",
      "avatar_url":"https://avatars0.githubusercontent.com/u/2?v=4",
      "gravatar_id":"",
      "...
    }
  ]
}
*/
```

##### Example 2: Observable that emits only the json key of the response object that is being returned from the request.

( [StackBlitz](https://stackblitz.com/edit/rxjs-8jkrhl) )

```js
// RxJS v6+
import { ajax } from 'rxjs/ajax';

const githubUsers = `https://api.github.com/users?per_page=2`;

const users = ajax.getJSON(githubUsers);

const subscribe = users.subscribe(
  res => console.log(res),
  err => console.error(err)
);

/* output
[  
  {  
    "login":"mojombo",
    "id":1,
    "node_id":"MDQ6VXNlcjE=",
    "avatar_url":"https://avatars0.githubusercontent.com/u/1?v=4",
    "gravatar_id":"",
    "...
  },
  {  
    "login":"defunkt",
    "id":2,
    "node_id":"MDQ6VXNlcjI=",
    "avatar_url":"https://avatars0.githubusercontent.com/u/2?v=4",
    "gravatar_id":"",
    ...
  }
]
*/
```

##### Example 3: Observable that emits the error object that is being returned from the request.

( [StackBlitz](https://stackblitz.com/edit/rxjs-vnxkth) )

```js
// RxJS v6+
import { ajax } from 'rxjs/ajax';

const githubUsers = `https://api.github.com/error`;

const users = ajax.getJSON(githubUsers);

const subscribe = users.subscribe(
  res => console.log(res),
  err => console.error(err)
);

/* output
Error: ajax error 404
*/
```

##### Example 4: Ajax operator with object as input.

( [StackBlitz](https://stackblitz.com/edit/rxjs-vqnnot) )

```js
// RxJS v6+
import { ajax } from 'rxjs/ajax';

const githubUsers = `https://api.github.com/error`;

const users = ajax({
  url: githubUsers,
  method: 'GET',
  headers: {
    /*some headers*/
  },
  body: {
    /*in case you need a body*/
  }
});

const subscribe = users.subscribe(
  res => console.log(res),
  err => console.error(err)
);
```

### Additional Resources

- [ajax](https://rxjs.dev/api/ajax/ajax) :newspaper: - Official docs

---

> :file_folder: Source Code:
> [https://github.com/ReactiveX/rxjs/blob/6.4.0/src/internal/observable/dom/ajax.ts#L20-L19](https://github.com/ReactiveX/rxjs/blob/6.4.0/src/internal/observable/dom/ajax.ts#L20-L19)
