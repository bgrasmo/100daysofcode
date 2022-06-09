## Section 18: Working with http requests

## Day 59 - 2022-06-07

#### <b>Working with http requests</b>

Learnt a lot about this in the web dev course, so used this as a refresher and so there's not many notes here. Will write down anything I consider new, or new ideas for understanding the situation.

#### <b>Sending a get request with 'xhr'</b>

Using XMLHTTPRequest instead of fetch() here:

```JS
const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://jsonplaceholder.typeicode.com/posts');

xhr.responseType = 'json';

xhr.onload = () => {
  const listOfPosts = xhr.response;
}

xhr.send();
```

With responseType set to 'json' we don't have to call JSON.parse ourselves. If that isn't set, we'd have to call JSON.parse on the response object.

Also xhr.onload, we need to check status codes to check that response was ok. Then there's xhr.onerror if we couldn't even send the request.

We also have to check status codes >= 200 < 300 with fetch to check that the response was actually ok. Other errors with fetch I need to revisit.
