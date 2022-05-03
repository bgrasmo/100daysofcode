## Section 18: Enhancing NodeJS with ExpressJS
## Day 18 - 2022-04-27
### Going through course content for day 48:
<b>Easier NodeJS development with ExpressJS</b><br>
To start we will install Express with npm. But before we can do that, we have to set up the directory with npm init:

```zsh
$ npm init
```

Answer all the questions. An alternative would be to simply call `npm init -y` which creates the needed package.json file with only the basics, as the rest can be added later anyway.

Now we can install Express:

```zsh
$ npm install express
```

<b>Creating a server with express and handling requests+responses</b><br>
To use express instead of http, change the require in app.js to this instead:<br>

```JS
const express = require('express');
```
While the http package returned an object, express returns a function and can be executed. That function call returns an object, a so-called app object.

```JS
const app = express();
```

Then on the app object, we can call listen:
```JS
app.listen(3000);
```

Now we still want to let express know what should happen for different requests, so before the listen, we call the get method. This will allow us to define a request handler for incoming requests. This get method takes two parameters, the path it should handle, and the function that should be called for a request to that path.

Now then, instead of creating a new named function for this, we can create an anonymous function. Basically, just define the function in place, where we have put the function name previously. Then that anonymous function, like the named one we used for the http package, gets two parameters sent in from express: the request and the response object. (And a third one actually, a function we call next, that we can execute inside this anonymous function, but we'll get back to that later.)

Instead of response.end, since express is a third-party library that function a little different than the http package, we now call response.send instead. We've abbreviated request and response to just req and res:

```JS
app.get('/currenttime', function(req, res) {
  res.send('<h1>' + new Date().toISOString() + '</h1>');
});

app.get('/', function(req,res) {
  res.send('<h1>Hello, world!</h1>');
});
```

This combination of a path and a req+res handler function is called a route, or route-handler.

We don't have to send the status code as express defaults to 200. We can override it if we wan't, but we won't do that right now.

Functions can either be written as `function(req, res) { ... }` or a new shorthand format: `(req, res) => { ... }` or just `() => { ... }` if it doesn't take any parameters. Found on express documentation where they set up listen like this, to console.log the port it listens on:
```JS
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
```

<b>Parsing user data with express</b><br>
Let's send a form back for / instead of the 'Hello, world' message, so that the user can send something back to us that we can parse.

```JS

app.get('/', (req, res) => {
  res.send('<form action="/store-user" method="POST"><label>Your name</label><input type="text" name="username"><button>Submit</button></form>');
});
```
Just adding a button means the form will be submitted when clicked. (As long as we have a name on the input field as well, without a name it won't be submitted.) Action defines where it will be submitted to, and method, well, the method. The next step now, and something we couldn't do with JavaScript in the browser, will be to set up our express server to listen on that path and with that method.

We then use `app.post` instead of get, and on the request object, we can get the body object, and in that the username that was sent, with dot notation:
```JS
app.post('/store-user', (req, res) => {
  const userName = req.body.username;
  console.log(userName);
  res.send('<h1>Username stored!</h1>');
});
```

And when we try that it crashes: `TypeError: Cannot read properties of undefined (reading 'username')`

Why? Because express is a library that mostly deals with routing incoming requests, so it allows us to define which request to which path with which method should be handled by which function. It also gives us easy access to the request body, but there is one very important thing it does not do out of the box, and that is parse that body. In other words, it doesn't translate the data received to a JavaScript object automatically.

In devtools, in the network tab we can see the request that was sent, the POST to /store-user. Clicking on the network request that failed, and scroll down to the bottom (or go to payload in Brave) and you can see the body, which is form data. And that is not JavaScript code, not an object, just some raw text. And we are not parsing that data before we try to use it in our JavaScript code.

To tell express it should parse the body, in our code after executing the express function, we call the 'use' function. This allows us to handle incoming requests, with the difference that it does not care about what kind of request it is. So although we can, we don't have to define a path here. We can use this to add an extra handler that should be executed on all incoming requests. A general handler like this that apply to more than one type of reuqest is typically called middleware. That's because it sort of sits in the middle between express seeing the request and our code handling the request.

So what we need here is a function that looks at the request and checks if it has any kind of data attached, and if so, extracts it. We can actually use the express function for that, as it has a urlencoded method which does exactly that. We need to send an object as argument to this function, and set extended: false, which is needed to avoid getting warnings. (No further explanation given)

```JS
app.use(express.urlencoded({extended: false}));
```

Now it worked!

<b>Storing data server-side</b><br>
Create a new folder called data and create a blank file called 'users.json' in that folder, and add an ampty array to it: '[]'. No variable names or anything, this isn't JavaScript code.

Then we need to 'require' a core NodeJS package called 'fs' which stands for file system and lets us read from and write to files. Core NodeJS functionality should be added before third-party packages, or so the convention says. This fs package returns an object. 

We also need the path package in order to construct a path to our file that works on all operating systems.

In order to update the contents of the file, we need to read in existing content first, add the new input that was POSTed, then write it back. The code:

```JS
const fs = require('fs');
const path = require('path');

(...)

app.post('/store-user', (req, res) => {
  const userName = req.body.username;

  const filePath = path.join(__dirname, 'data', 'users.json');
  
  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);
  
  existingUsers.push(userName);

  fs.writeFileSync(filePath, JSON.stringify(existingUsers));

  res.send('<h1>Username stored!</h1>');
});
```
We use 'path.join' to add path fragments together. The '__dirname' variable contains our current directory, and to that we need to add 'data' as that's the new folder we created to hold data, and then the filename at the end.

Then we read the data from the file with readFileSync (and sync is important to make to read happen right away) and store it inn fileData. Note that the output from readFile is raw data, and if you concole.log it, it looks like a buffer. That's why we use a globally available method on the JSON object called parse to parse it into a JavaScript object.

Now we can push the input username to this array. (The push method is available on all JavaScript arrays)

Then we can finally write the data back, but we need to convert it from a JavaScript object to a JSON string. For this we again use the globally available JSON object, and the second method on that called stringify.

### Going through course content for day 49:
<b>Reading in a file and returning dynamic responses</b><br>
We'll add a new path that will read in the data we have stored and display them on a page so users can see them.

We can send the data read from file back directly like this as Express will translate it into some raw text that looks exactly like our file:
```JS
const fileData = fs.readFileSync(filePath);
const existingUsers = JSON.parse(fileData);

res.send(existingUsers);
```

```
["Joe","Jane","Doe"]
```

Instead of sending back the text as-is, we can make it into an HTML element, a list for instance, like this:
```JS
let responseData = '<ul>';

for (const user of existingUsers) {
  responseData += '<li>' + user + '</li>';
}
responseData += '</ul>'

res.send(responseData);
```

And that is some dynamically generated HTML!

<b>Enhancing developer workflow with nodemon</b><br>
To avoid having to stop and restart our server all the time, we can use a package called nodemon. This watches for file changes, and restarts the server when files are changed. That is also valuable to avoid the case where you don't understand why something you've changed isn't working, and it's because you forgot to restart the server.

Nodemon will be installed as a development dependency, as it doesn't offer functionality to the server we are developing, it's only something we use to help during development.

```zsh
$ npm install nodemon --save-dev
```

Nodemon has now been installed as a package in our project, not as a globally available tool on our machine. So to run it, we have to modify our package.json file:
```json
"scripts": {
  "start": "nodemon app.js"
},
```

Now we've defined that it can be started with npm. If another name than start was selected, it has to be started with `npm run <selected-name>`. Start however is a reserved script name, so we can simply start it with `npm start`

Whenever the code is changed now and the file is changed, nodemon will restart it for us!

```
[nodemon] 2.0.15
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
Example app listening on port 3000
[nodemon] restarting due to changes...
[nodemon] starting `node app.js`
Example app listening on port 3000
```
