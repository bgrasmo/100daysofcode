## Section 28: Ajax and asynchronous JS-driven http requests
## Day 28 - 2022-05-07
### Going through course content for day 68:
<b>What is Ajax? And why would you need it?</b><br>
AJAX: Asynchronous Javascript And XML. The idea is to send http requests via javascript in the browser.

Browsers have two built in javascript features for using ajax: The XMLHttpRequest object or the fetch function.

Why do you want to send http requests from your javascript code running in the browser? Let's look at what happens without it:

* Enter a url (sends a get request to url)
* click a link (sends a get request to url)
* submits a form (sends get or post request to url)

This obviously works fine, but has the consequence of always loading a (new) page. (And I guess from that we can see what ajax does, send requests without loading a new page.)

When using ajax and sending http requests from our javascript, we can handle the response in the same script, which means we have control over browser behavior and can prevent loading new pages.

An example using the blog we have built could be that instead of loading comments on visit, we have a link to load commens. Without ajax we would have to load a new page. With ajax we can load the comments, and simply update the page the browser is currently showing with the new content. The same can be donw for posting comments. Instead of redirecting to a new page on success, we can show a success message on the current page.

<b>More about what ajax is</b><br>
XMLHttpRequest: A built in object that contains utility methods for sending http requests. As the name implies it was originally developed to send XML data. It can still be used, but can be a bit clunky and complex. Not many use it directly but via third party packages like Axios.

XML: Extensible Markup Language, looks a lot like html. It's a format for formatting or structuring text data into a machine readable way. While html is standardized, xml is not. Xml is also quite verbose (lots of opening and closing tags) so it can be a lot of unnecessary work.

```xml
<post-comment>
  <title>This was great!</title>
  <comment-text>Thanks a lot, this was really helpful!</comment-text>
</post-comment>
```

Instead of xml, json is used.

```json
{
  "title": "This was great!",
  "comment-text": "Thanks a lot, this was really helpful!"
}
```

While json stands for JavaScript Object Notation, it's not identical to objects in JavaScript. In json, all keys are wrapped in double quotes, the same are all text values. Numbers and boolean values are stored without. This is actually just a text file, or a text format, so a special way to structure text content.

XMLHttpRequest also works with json, so that's the format that's typically chosen thse days for sending data to the server from the browser.

The fetch() function: Also contains utility functions for sending http requests. Added to browsers in recent years, so uses modern features like promises which XMLHttpRequest does not. But third party library can use promises, even if the underlying technology does not, so Axios supports promises for instance.

The fetch() function is relative straightforward to use (instead of the clunky and complex setup of the XMLHttpRequest object) so it's a good alternative to XMLHttpRequest and third party libraries like Axios.

With that out of the way, we'll use the fetch() function.

### Going through course content for day 69:
<b>The starting project and a problem</b><br>
Set up the starting project provided by the instructor. (Blog with node, express and mongodb which we created in section 26.)

Routes for handling comments added compared to the project we previously created

<b>Sending and handling a GET ajax request</b><br>
We need to change the "load comments" button from a form, as that triggers the page reloading we want to avoid. Instead we'll set up a click listener on the button to send the ajax request

The fetch function by default sends a GET request, and as parameter it wants the url it should send the request to. One challenge now is that we want the ID of the post in the middle of the url, and how do we get that ID? One good way to do that would be to add it to the button itself with the data- attribute. Since we're using ejs, that is easily done by inserting post._id to data-postid.

Remember that the callback function from the event listener will get an event object. Useful to remember, but not what we will use now since we've already selected the button, which contains the id in the data-postid attribute.

The fetch function returns a promise, so we'll use async await to catch the response, which is an object with lots of information about the response. We can for instance see the headers returned, we get an OK boolean but most importantly the body, which is the data sent back by the server. However the body is not "conveniently" formatted, so if we get back a json method we'll want to use that instead. To make it interesting the json method also returns a promise since the parsing can take some time so we need to await that as well.

```JS
const fetchCommentsForPost = async () => {
  const postId = loadCommentsBtnElemt.dataset.postid;
  const response = await fetch(`/posts/${postId}/comments`);
  const responseData = await response.json();
};
```

Now we need to change our backend a bit, as the route doesn't return json data, it returns a rendered page. It was created for a button in a form which we've since removed. The response object contains a built in json method which is what we want, as it encods data to json for us, which we can then return. The json method in the fetch call is used to decode the json data into JavaScript data values.

We get an array back from mongodb so we can send that to the frontend, or we can put the array in an object and send that back.

```JS
res.json(comments); // Returns the array
res.json({ comments: comments }); // Returns the array in an object
```

We previously needed to get the post the comments belong to as well to render a complete page, but we don't need that anymore so we can delete it.

<b>Updating the DOM based on the response</b><br>
Our comments page was previously rendered on the server with ejs, but now we'll update it in the browser so we have to remove a lot of the ejs code in it.

Then we need to create a HTML list of the comments, select the existing comment section and replace its contents with the comments loaded with fetch.

```JS
const createCommentsList = (comments) => {
  const commentListElement = document.createElement('ol');

  for (const comment of comments) {
    const commentElement = document.createElement('li');
    commentElement.innerHTML = `
    <article class="comment-item">
      <h2>${comment.title}</h2>
      <p>${comment.text}</p>
    </article>
    `;
    commentListElement.appendChild(commentElement);
  }
  return commentListElement;
};

const commentListElement = createCommentsList(responseData);
commentsSectionElement.innerHTML = '';
commentsSectionElement.appendChild(commentListElement);
```

<b>Preparing the post request</b><br>
The current way of posting comments obviously works, but it reloads the page and all the loaded comments are gone. To improve the experience here, we'll also handle the post with ajax.

This time we have a more proper form, and not just a form created for a button like previously, so we'll keep it this time for semantic reasons. However, we don't want the form to be posted when clicking the button, so we'll remove action and method from the form. We'll then add an event listener to the form itself and not the button.

Then we need to suppress the default browser behavior of sending the request (though to where and how, give we've removed action and method? It would just be cleared). So this time we want the event object in our callback function, to call the event.preventDefault method.

<b>Sending and handling a post ajax request</b><br>
Some more preparations needs to be done. We'll add the post id to the form so we have it there as well.

Then we change so the fetch function doesn't GET, but POST instead. That is done by adding a second parameter to the function, an object where we specify that the method should be POST. Now we also need to add the data that should be sent and we do that with the body field, which should be in json format. We'll use JSON.stringify() for that.

```JS
const saveComment = (event) => {
  event.preventDefault();
  const postId = commentsFormElement.dataset.postid;

  const enteredTitle = commentTitleElement.value;
  const enteredText = commentTextElement.value;

  const comment = { title: enteredTitle, text: enteredText };

  fetch(`/posts/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment)
  });
}
```

Now we have to add a new middleware to our backend to parse the incoming json that. That is simply express.json().

Then again we want to change the response from the route handler receiving the post, as we don't want to redirect anymore. We instead want to respond with a json with a message saying the comment was added. It's up to us if we want to wait for this message on the frontend, or not do anything about it.

And that didn't work, because we didn't set any encoding on the post request. We need to set it to json for the right middleware to catch and handle it. (And that's how the middlewares work, they don't just try to do their thing and see if it works, they look in the headers for their type).

```JS
fetch(`/posts/${postId}/comments`, {
  method: 'POST',
  body: JSON.stringify(comment),
  headers: {
    'Content-Type': 'application/json'
  }
});
```

### Going through course content for day 70:
<b>Improving the user experience</b><br>
We were able to send the request successfully with ajax, but while we didn't do anything with the response, the fact that we got a response is interesting.

Since fetch returns a promise, we'll convert the function to async, then await the fetch post request to catch the response, though we're not actually interested in what it contains (Hmm, what about error handling?)

When we've received the response, we'll fetch comments so they are updated and that can be done by calling the fetchCommentsForPost() function by ourselves.

We've introduced an issue if you have a post without any comments, and you then click the load comments button, that entire area will be removed. We cleared it with `commentsSectionElement.innerHTML = '';` before adding our comment list since we wanted to replace the content with comments. Now the load comments button is gone as well and user have to reload page to get it back.

To fix that weæll check that the responseData in fetch comments is truthy and that response data length is greater than 0, which means the array will contain at least 1 item. Then if we don't have any comments, we can change to paragraph text to say something about that:

```JS
if (responseData && responseData.length > 0) {
  const commentListElement = createCommentsList(responseData);
  commentsSectionElement.innerHTML = '';
  commentsSectionElement.appendChild(commentListElement);
} else {
  commentsSectionElement.firstElementChild.textContent =
    'We could not find any comments, want to add one?';
}
```

<b>Handling errors, server side and technical</b><br>
It could be that we can't reach our database, or for some reason or another can't store the content we posted. We should handle that gracefully and inform the user that something went wrong.

In the save comments function, we'll check the response.ok boolean to see if the post was ok or not. If the post was ok, we'll fetch comments, if not, we should inform the user somehow. We'll just use alert for now, proper handling is left as an exercise for the reader.

So now we handle that the request was sent, but something went wrong on the server. What can we do if the request was not even sent because user lost connectivity without noticing? (This is the technical problem hintet at in the topic title.) In this case the fetch function will throw and error, so try / catch is useful here.

To simulate this error case, we can set 'no throttling' to 'offline' in the networks tab.

We don't only want to handle errors for posting, we also want to do that for fetching comments.

<b>We now have more http requests</b><br>
The ones we've used for far, the default browser methods:<br>
* GET - fetch some data
* POST - store some data

New ones we can use in ajax requests:<br>
* PUT - update / replace some data
* PATCH - update some data
* DELETE - delete some data

These are just for implying certain actions, it's up to the backend to actually honor this. In other words, we can send a DELETE request, and the server can respond by sending some data back if it's coded that way.

Put and patch, like post, can carry a request body while delete can't. So it's similar to get there.
