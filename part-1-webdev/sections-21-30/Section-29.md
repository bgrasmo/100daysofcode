## Section 29: Authentication and working with sessions
## Day 29 - 2022-05-08
### Going through course content for day 70:
<b>What is authentication and why would you want to add it to a website?</b><br>
Authentication means you have identified yourself (losely) by some means, like an email address or a phone number and a password to some website or app for instance. With this you can have created an account and logged in to said website or app. When you are logged in you are said to be authenticated, as in theory you are the same person that logged in with these credentials as the previous time they were used.

The instructor doesn't mention authorization, which is the "grant access" part. When you are authenticated (logged in) you can be authorized (granted access) to use certain resources which aren't available to everyone.

The need for authentication and authorization is when some content should only be available to to certain users. Like the shopping cart and order history in an online shop should only be accessible to you and not everyone else. You can be logged in or authenticated, and not get any more access than if you weren't logged in.

How to implement authentication? We need three things:
1. We need a user signup page so they can register as users
1. We need a log in page, so they can identify what user they are
1. We need functionality to keep track of the users so they can only get access to their own shopping cart and their own profile page.

The last step is authorization without the instructor talking about it.

<b>Setting up the starting project</b><br>
As usual, download and unzip the demo project and then run npm install.

<b>Adding basic signup functionality</b><br>
We could have implemented this with ajax, but that isn't the focus for this part so we'll use the built in browser methods for posting forms to handle this. So for our post route handler we get data in the request body that we'll want to pick up.

```JS
router.post('/signup', async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredConfirmEmail = userData['confirm-email'];
  const enteredPassword = userData.password;

  const user = {
    email: enteredEmail,
    password: enteredPassword
  }
  await db.getDb().collection('users').insertOne(user);

  res.redirect('/login');
});
```

A couple of problems here. We don't validate data on input, but set up to do it on the backend which is a little too late. We also store the password in cleartext.

### Going through course content for day 71:
<b>Must do: Hashing passwords</b><br>
This means using a one-way function to change the password into something that can't be deciphered.

Install bcrypt.js: `npm install bcryptjs`

We can then use 'bcrypt.hash()' to hash the password. We need a second parameter to decide the strength of the hasing, and 12 was recommended by the instrctor. As bcrypt returns a promise we have to await it.

```JS
const hashedPassword = await bcrypt.hash(userData.password, 12);
```

<b>Adding user login functionality</b><br>
Here we need to check the database to see if we find a user with a matching email and if so, if the entered password matches what we have stored. Since the stored password is hashed, we'll have to use a bcrypt function to see if the password entered now can be hashed to the same string that was stored. If so, the password matches.

```JS
const passwordsAreEqual = await bcrypt.compare(enteredPassword, existingUser.password);
```

bcrypt will return a boolean here.

<b>Validating signup information</b><br>
In our signup route handler we'll want to make sure email and password was actually entered, and that the email entered twice in two different fields match. We'll also want to make sure the entered password is at least X characters in length. We'll also want to make sure the entered email contains an @, and that can be done with .includes('@') which can be called on strings. We'll also want to call trim() on the entered password, so entering just blanks won't work.

If these criteria are not met, we don't want to create a user but will instead return the user to the signup page. (Though what we really want to do is return an error.)

```JS
if (
  !enteredEmail ||
  !enteredConfirmEmail ||
  !enteredPassword ||
  enteredPassword.trim() < 8 ||
  enteredEmail !== enteredConfirmEmail ||
  !enteredEmail.includes('@')
) {
  console.log('Incorrect data!')
  return res.redirect('/signup');
}
```

Now we also want to make sure the email entered isn't already a user:

```JS
const existingUser = await db
  .getDb()
  .collection('users')
  .findOne({ email: enteredEmail });

if (existingUser) {
  console.log('User exists already!');
  return res.redirect('/signup');
}
```

<b>Introducing sessions and cookies</b><br>
Having added signup, we've not magically protected our site. We will have to add checks to see if we have an authenticated user for authentication to have an effect. But how do we track this, that a user is authenticated? The requests coming in to our server looks identical, except for change of ip address and browser perhaps.

We will have to implement a "ticket" system, where if you buy a ticket to some event, the event organizers note that, and give you a ticket to get access to the event. So they have some information on their side, while you also have some information on your side. And when you want to access the event, they check to see that you have a valid ticket to let you in.

So the idea then is that when the user successfully logs in, we generate a ticket and send it to the user, so that the browser can store it and show it to us in future requests.

We will do that with sessions, which will be unique for each and every visitor. This sessions will in reality be created even before the user logs in, but then we'll have stored information that the user hasn't logged in yet in the session. The session id will be stored in a cookie in the users browser, sent from our server and automatically managed by the browser. So then, on our server we'll have a session, while on the client we'll have a session cookie with the ID of the session.

<b>Adding session support to our website</b><br>
Sessions and cookies will often be used without being for authentication purposes but we will not be doing that here. Also we won't have to write all the functionality ourselves, but can again use third-party packages. Express has am 'express session' package that manages sessions for us and might be all we need. If not, a package called 'cookie-parser' might help out.

We'll install just express-sessions.

To set up the session feature we'll have to add it as a middleware, because it will have to run on every request. The session takes some input, and the keys can't be changed, but the value is up to us.

The secret should be kept a secret, and should be quite secure, as it is used to make sure that a session can't be faked. We'll also set the 'resave' option to false to make sure that a session is only updated in the database if it (the data in it) has actually changed. If we set it to true, a new session would be stored in the database for every incoming request, and if the client sends a lot of requests quickly it could mean a session was stored before the previous had finished storing, and would then be set as empty. We will also want to set saveUninitialized to false to we ensure we only save a session when we have some data in it.

Now we have the most important setting, and that is where session data should be stored, and that is controlled by the store setting. We have some options here, like storing in memory but that is bad if the server restarts, or if we have multiple servers handling requests. It is an option that could work during development though. Another option is file storage which could be fine, but we are already working with a mongodb database, so we'll want to use that. We do typically need to install third-party packages that will manage the storage for us, and that can be found in the session package. So for our example, express session documentation has a link to compatible session stores. We'll use connect-mongodb-session that is maintained by the mongodb team.

Some code:

```JS
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session');

const MongoDBStore = mongodbStore(session);
```

As can be seen from the capitalization, MongoDBStore is a class, a constructor function we can execute to create a new object based on the blueprint. This class takes some configuration input:

```JS
const sessionStore = new MongoDBStore({
  uri: 'mongodb://localhost:27017',
  databaseName: 'auth-demo',
  collection: 'sessions'
});
```

The collection is where we want to store our sessions, and we've simply named that 'sessions'. This object will then be input as the store option in the middleware:

```JS
app.use(session({
  secret: 'Super-secret',
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}));
```

### Going through course content for day 72:
<b>Storing authentication data in sessions</b><br>
We'll start by adding some data to the session if the user logged in successfully. Having added express-session, we now have a new property on the request object simply called session that we will use. Session again gives us some built in properties and methods, like id (of the session), save or destroy (delete it). It is also possible to add properties which are not shown, so we can add new pieces of data to the session. We'll add id (of the user) and email (again of the user).

As a demo we can also store an 'isAuthenticated' boolean that we set to true since the user is authenticated, but it's a bit duplicate since we wouldn't have id and email of user if it wasn't the case.

The sessions will automatically be saved to our database by the express session package so we don't need to think about that. However, if we directly afterwards redirect to a route that is protected, it can be that the redirect happens before the session is stored in the database. Therefore we'll call session.save here and this takes a callback function that will only be called when save is finished, so we'll move our redirect in there.

```JS
req.session.user = { id: existingUser._id, email: existingUser.email };
req.session.isAuthenticated = true;
req.session.save(() => {
  res.redirect('/admin');
});
```

<b>Using sessions and cookies for controlling access</b><br>
Now that we've stored a session with authentication information, we want to check that when the admin route handler is called since that should be protected.

We will check on the isAuthenticated flag since we set that, but if we didn't, we could check on the user object instead.

We've not got a cookie in the browser and a session stored in the database. If we wanted the cookie to expire, we could set a cookie object on the session, and add a maxAge property to it. This wants a number in milliseconds. 1000 milliseconds is a second, so to make it expire in 24 hours we'd set 24 * 60 * 60 * 1000 for the value.

If we don't set a maxAge the cookie can be removed when the browser is closed down, but if we do set it, the browser won't remove our cookie.

```JS
router.get('/admin', function (req, res) {
  if (!req.session.isAuthenticated) {
    return res.status(401).render('401');
  }
  res.render('admin');
});
```

<b>Adding logout functionality</b><br>
When the user logs out, we want to delete the authentication data in the session. We should probably not delete the entire cookie since it can also be used to store other data, like items in the shopping cart.

After clearing the data, we'll redirect to the starting page which doesn't care if the user is authenticated or not, so we'll not care to wait with the redirect until the save has finished. (My thoughts would be we should do that, in case we have a logged in icon or similar on the starting page which could still be showing).

```JS
router.post('/logout', function (req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  req.session.save(() => {
    res.redirect('/');
  });
});
```

<b>A closer look at cookies</b><br>
How is the cookie sent? We can see it in the network tab when we log in to our site. On the post request where we send our username and password, in the response headers there is a 'Set-Cookie' header, and there we can see our cookie. The browser looks at the headers returned, sees this and will set the cookie for us.

Then on subsequent requests we can see that the cookie is in the headers with the 'Cookie:' key. What about ajax requests then? Given what we've looked at so far has been handled by the browser, while ajax is something we call from JavaScript.

<b>Diving deeper into sessions, beoynd authentication</b><br>
On our signup page, if the user enters different email addresses or a password that is too short, the signup will fail and the user will be redirected back to the signup page. We've given no message as to why that happened, and the page is now empty so the user wll have to enter everything again.

Looking at the network tab there are two requests, one getting a redirect response and the page it's redirected to, and then the actual request for that page. So we want to temporarily store the user entered data in the session before we redirect, so it can be pre-filled on the page and the user won't have to enter all of it again.

```JS
req.session.inputData = {
  hasError: true,
  message: 'Invalid input - please try again!',
  email: enteredEmail,
  confirmEmail: enteredConfirmEmail,
  password: enteredPassword
};
```

We'll also want to wait for the save to succeed before we redirect. Then we'll load the stored session data and send it to the signup page to show. In case we don't have any inputData, which is the case if it's the first time we visit the page, we'll set the object with values being empty so we can pass it into the signup page regardless of status.

We'll then set the default values using the value="" attribute in HTML.

The app actually crashed because we had return inside the save function for the post to signup route handler. Return always applies to the function in which it's used, so that didn't prevent the rest of the code from running. In other words, with the return inside the save, the code coming afterwards for creating the user still ran. So the return have to be placed after the save and not inside, because there is no more code in there we want to prevent from executing.

Then we'll want to clear the input data from the session, so it doesn't persist forever, and we'll do that by simply setting it to null: `req.session.inputData = null;`

This technique is called 'flashing'. We're flashing some data onto the session just to have it for the next request.

### Going through course content for day 73:
<b>Authentication vs authorization</b><br>
These terms are sort of related, but they describe different things. For authentication we're talking about signup and login with credentials. With authorization we're restricting the actions a user can perform and / or the pages a user can visit. A typical example, mentioned before, is if you have an online shop, any given user should only be allowed to view their own orders, not any one elses. Though we can add functionality so that one user can grant access to let another user see their orders, i.e authorize them to do so.

A small example: Copy the admin file and name the copy profile. The idea is that every logged in user should see the profile page, but only admins should see the admin page. We'll then copy the admin route and paste it but change it to profile. We'll also need to add a profile link in the header. Now we have two pages that everyone who are logged in can access, but we'll want to restrict access to the admin page.

We'll just modify one of the registered users to make it an administrator since we don't have a way to do that from our website.

```
db.users.updateOne({_id: ObjectId("817259a95f842cd856ba01fd")}, {$set: { isAdmin: true}})
```

There are two ways to track this then. One is to store the admin flag in the session, but if we remove the admin flag we'll have to update the sessions. So a better way would be to make an extra query when we need it, and ask if the user which we have the id for is admin or not.

We'll then have to add another check to the admin route handler after we've tried fetching the id, checking if the admin flag is set, but if not, return a 403 not authorized page. Copy the 401 page to make this. Here we'll want to return this page so the code coming after, the admin page render, doesn't execute.

<b>Practicing sessions and working with sessions</b><br>
Now we'll clean up the page a little. For instance it doesn't make much sense to show the log out link if the user isn't even logged in. The same for profile and admin. We can also add logic to check if a user tries to register as someone who's already registered, and show a message if wrong email or password is entered.

We'll start with handling the validation errors by adding the inputData object with an error message to the check for existing user. What is a good message to present in this case to not give away that the user already exists?

We'll do the same for the login page.

<b>Writing custom middlewares and using res.locals</b><br>
How can we now, in a simple and smart way set the header to only show the relevant links depending on if the user is logged in or not and admin or not? It's an included file and used in all our files so passing user status to all of them seems like a lot of unnecessary work.

Fortunately express has a way to handle this, as it's quite common that some data should be made available to all templates. We solve that by adding an app.use with our own function after we've initialized the session:

```JS
app.use(async (req, res, next) => {
  const isAuth = req.session.isAuthenticated;

  if (!req.session.user || !isAuth) {
    return next();
  }
  const user = await db.getDb
    .collection('users')
    .findOne({ _id: req.session.user.id });
  const isAdmin = user.isAdmin;

  next();
});
```

This middleware will run for every request, so we need to use the next function here, because it should only do something for some requests, and then it should move on to the next middleware our route in line.

Then we need to store the data we got in a special place that all templates can reach, without explicitly having the data passed to them. There the data will be available to all other middlewares as well. That is 'res.locals' which allow you to set some global values that will be available for this entire request response cycle.

We use it by setting whatever key value we want like this:

```JS
res.locals.isAuth = isAuth;
res.locals.isAdmin = isAdmin;
```

Now that this is set globally and is available to all templates, we can use it in the header template to only show the ones that make sense.

```HTML
<li><a href="/">Home</a></li>
<% if (!locals.isAuth) { %>
<li><a href="/signup">Signup</a></li>
<li><a href="/login">Login</a></li>
<% } %>
<% if (locals.isAdmin) { %>
<li><a href="/admin">Admin</a></li>
<% } %>
<% if (locals.isAuth) { %>
  <li><a href="/profile">Profile</a></li>
  <li>
    <form action="/logout" method="POST">
      <button>Logout</button>
    </form>
  </li>
<% } %>
```

Since we now have these global variables for authentication and admin status, we can simplify our route handlers a little as well. We don't need to make a database query in the admin route for instance, as we've already done that and have the result ready. So now we can simply do this instead:

```JS
if (!res.locals.isAdmin) {
  return res.status(403).render('403');
}
```
