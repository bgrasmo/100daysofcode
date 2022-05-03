## Section 17: NodeJS introduction, getting started with backend development
### Going through course content for day 47:
<b>Installing NodeJS</b><br>
What is NodeJS? A JavaScript runtime, a tool for executing JavaScript outside of the browser. Can be installed on any computer and hence to be used to write and execute server side JavaScript code.

Download from https://nodejs.org/ though I used Node Version Manager. Have noted on that in my other repo.

<b>Executing NodeJS code</b><br>
A thing to note is that most code will be the same as we've already learned, but since this is server-side, there is no DOM to interact with, so no buttons or other HTML elements to get.

```JS
const userName = 'Joe';
console.log(userName);
```

The above code could have been written in the browser, but now we can write it for NodeJS and run it from the commandline:

```zsh
$ node app.js
Joe
$ 
```

<b>Creating a custome NodeJS server</b><br>
We'll start by building a webserver with NodeJS, by using the HTTP package. This allows us to listen for and deal with incoming requests, and then send a response back. Then we can send a request to that app from the browser.

We'll start with `const http = require('http')` and that will return an object full of utility methods and properties provided by NodeJS.

We then call a method returned to us in the http object we created above called createServer. This again returns an object that has the server functionality we need built in.

Then we call a method to have the server listen on the desired port. In full:

```JS
const http = require('http');
const server = http.createServer();
server.listen(3000)
```

Now we have a server listening on a port, but it has no instructions for what to do with the incoming requests.

<b>Handling requests and creating custom responses</b><br>
To tell the server what to do with incoming requests, we can add a callback function when we create the server. The callback function needs to take two parameters, one for request and one for response, as it will be passed two objects. The request object will contain info about the incoming request, while the response object is for sending a respons back.

We don't care about the request yet, we will focus on sending a response for now. To do that, we start by setting statusCode in the response object to 200, to indicate that the request was received and handled successfully. Then we can use the 'end' method to set the response and send the response.

```JS
function handleRequest(request, response) {
  response.statusCode = 200;
  response.end('<h1>Hello, world!</h1>');
};
```

<b>Doing more server-side work</b><br>
Our server currently isn't doing much. Now we want to add a path '/currenttime' that will show a timestamp if accessed. If you access / the same hello world message should be shown.

We do that by checking request.url, which doesn't actuall contain the full url, just the path. And this is exactly what we need here:
```JS
if (request.url === '/currenttime') {
  response.statusCode = 200;
  response.end('<h1>' + new Date().toISOString() + '</h1>');
}
```
