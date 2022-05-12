## Section 31: Writing good code, refactoring and the MVC pattern
## Day 31 - 2022-05-10
### Going through course content for day 75:
<b>Going through our starting project</b><br>
It's a continuation of the blog we've created, but with some added features for administering posts

<b>What's wrong with our code?</b><br>
The blog.js file which contains our routes is huge, and the code in there does a lot of different things. We have routes that handle user authentication and we have routes that handle the blog posts.

For the HTML templates we are using includes, so we've put commonly used functionality in their own files, which are then included where needed. So we've managed to split this code up a bit, which is something we'll want to do for the route handling as well.

The app.js file has also grown a bit and is doing different things with different middlewares. It's not too bad as it is, but adding more middlewares could eventually make it hard to have an overview of.

What we want to do is called refactoring, and that is not for adding new functionality, but improving our existing code, and making the codebase more managable.

### Going through course content for day 76:
<b>Splitting our routes</b><br>
Copy the blog.js file to auth.js. Now in auth.js remove all logic that is related to the blog, and in blog.js remove all logic that is related to authentication. Since auth.js is new, we need to register it in app.js in the same place blogRoutes is. Then we also need to call app.use for our new authRoutes. It doesn't matter what order we register them in as long as we don't have the same route in both files. Then the first won to be registered would be the one that would be used.

Splitting the code like this is of course optional, but strongly recommended.

<b>Extracting configuration settings</b><br>
We'll move certain configuration items out of the app.js file and into a config.js file instead, like the session configuration.

Doing this is quite optional and entirely up to the reader. It might not be recommended, as it can make getting an overview a little harder. We're doing it as an exercise though so we can see how it works.

We move all the MongoDB functionality from app.js to session.js in the newly created config directory. Then we wrap the sessionStore object creation in a function we can call elsewhere.

To show that it can be done, we move the session object from app.js to session.js wrap it in a function and return it from there. We then call that function in the app.use(session()) which creates the session configuration.

The above resulted in the following two lines in app.js:

```JS
const mongoDbSessionStore = sessionConfig.createSessionStore(session);
app.use(session(sessionConfig.createSessionConfig(mongoDbSessionStore)));
```

We can also do the entire session setup in the session.js file, directly use the store we set up there and then just return the initialized session middleware. Which I think would make more sense given we called it session.js, but it now only has some things related to sessions.

<b>Extracting custom middleware</b><br>
Create a new directory called 'middlewares' where we'll store our custom middleware. This file only contains one function, so we'll export it as such. We will call it in app.use by the name we import it as, and we won't execute it, that will be done by express for us on incoming requests. For csrf we are executing the function on app.use, and then it's the result of that function call that because registered as the middleware.

Going back to our auth.js route file, there is some code duplication in the session error handling. That is a sign more refactoring could be done. We also have a lot of logic related to working with the database.

<b>An introduction to the MVC pattern</b><br>
To 'outsource' the database logic in our authentication routes, we have a specific pattern called MVC: The Model View Controller pattern.

The model area contains the logic for interacting with your data and data storage. So here we define the functions and methods for storing data or fetching data.

The view area contains logic for presenting data and content to the user, which we are already doing with the 'views' directory and the EJS tags in our HTML files.

The controller area contains logic for connecting models with views. These are functions that are typically executed when our routes triggers, so we can say our routes are our controllers. (But we don't have models yet, so we don't have correct controllers yet either, we're doing too much work in them.)

<b>Creating our first model</b><br>
Create a models directory and a post.js file in it. We typically create models for the main data entities like user, post and so on. The model we're creating here, with the singular name, should deal with storing posts, and this should be a blueprint for a single post.

As you may have guess from the 'blueprint' in the previous paragraph, we'll now create a class. This will take in title, content and optionally an id. (Placed last since it is optional). Then we move the "newPost" object from blog.js to the save method in our blueprint, as well as the corresponding database insert for this post. We'll change it a little though, so instead of creating a new constant for the object and then inserting the constant, we'll have the object directly in the insert. So from:

```JS
const newPost = {
  title: enteredTitle,
  content: enteredContent,
};
await db.getDb().collection('posts').insertOne(newPost);
```

To:

```JS
async save() {
  const result = await db.getDb().collection('posts').insertOne({
    title: this.title,
    content: this.content,
  });
  return result;
}
```

Then we'll import the post class in blog.js, instantiate the new class with entered title and content as parameter, and call the save method to save it. Nice!

```JS
const post = new Post(enteredTitle, enteredContent);
await post.save();
```

I have a question though, why should we await the post.save? Given we also await the save in the method, isn't that enough? Aparently since it's an async function it will return a promise. (Regardless for the await in the method?)

<b>Adding update and delete functionality to the model</b><br>
For update we'll move the updateOne part from blog.js to post.js. We can now add a new method, or we can re-use the save method since we know the id won't always be set. If we have an ID we know we're not creating a new post since we're not the ones generating the IDs. Now we have one save and one update in the same function, both returning a result so we'll create that as a 'let' variable that will be returned after either. (Or both, you know what I mean.)

We can't use 'postId' in the update function, as that doesn't exist in our post.js file. We can use this.id instead, to use what was passed in to us, but does that have the correct format for what we want to do? Let's find out! In the constructor, first check if id is set. We don't want to do anything if it isn't. If it is set, we guess that it is the raw id string. Since we're working with MongoDB now, we want to set it to this ObjectId thing.

Since the conversion from string to ObjectId now happens in the post.js file, we can remove that from the blog.js file and instead instantiate the post class and then call save.

```JS
const post = new Post(enteredTitle, enteredContent, req.params.id);
await post.save();
```

Then finally on to delete functionality, which we'll add as a new method. For delete we only need the ID of the post, and given that's the last parameter passed to us, how do we handle that? We set the first two to null when instantiating the class:

```JS
const post = new Post(null, null, req.params.id);
```

<b>Adding fetch functionality to the model</b><br>
We can do a lot with a single post now in the model, but we don't have the option to fetch a list of posts or even just a single one.

New teachings here: We don't always have to instantiate this post class to use methods in it. This made sense for save, update and delete, but if we want to fetch a list of posts we have no single post object yet. For this situation, JavaScript has a feature called static methods. We define these kinds of methods with the 'static' word in front of it. These we don't call on the instantiated object, but on the class itself. (It can also be turned into an async method the usual way.)

```JS
static async fetchAll() {
  const posts = await db.getDb().collection('posts').find().toArray();
  return posts;
}
```

We can call this static method in our blog.js file like this:

```JS
const posts = await Post.fetchAll();
```

Static methods are useful if you want to use a class, but not just as a blueprint, but also for grouping related functionality together. This static method allows us to act not only on single posts that already exist, but also generally on functionality related to posts.

To fetch a single post we could have used another static method, but we'll rather create a method that will be called on the instantiated object:

```JS
async fetch() {
  if (!this.id) {
    return;
  }

  const postDocument = await db
    .getDb()
    .collection('posts')
    .findOne({ _id: this.id });
  this.title = postDocument.title;
  this.content = postDocument.content;
}
```

With the refactoring we've done so far, we've changed from _id to just id. So we need to update our EJS files as well. (The data we send to them has changed, or the key has, not the values.)

Nowe we have a model for our post part, and we could do the same for the auth part, but let's do that later. Let's rather have a look at how we can set up the controller.

## Day 32 - 2022-05-11
### Going through course content for day 77:
<b>Adding a first controller and controller actions</b><br>
We have a model, we have views, now we need a controller to connect the two properly. For that we will create a new directory called 'controllers'. In it we'll create a post-controllers.js file

We will not be doing this right from the get-go, as we will only have one post-controller and all the different functions that we need for the different routes is actually controller actions.

I didn't understand what was said next. Something about when we add a second controller for auth, this controller (post) will be renamed to clarify that we have two different controllers for the two different areas of our application. Right now since this is the only file, the individual functions will be treated as controllers, even though they are just actions that belong to a single controller. I hope this all will make sense later.

The route handler functions that we have as second paramters on our routes could be considered controllers. We will just want to outsource them into separate files and also slim then down so that the routes file is leaner and easier to quickly see all the routes that we are supporting.

Copy the functions to post-controllers.js and give them sensible names so they can be called from the route handlers in blog.js. For the 'get /admin' route we rely on the Post class, so we'll need to import that as well in our controllers file. It can then be deleted from the blog.js file

<b>Refactoring the session and input validation error functionality</b><br>
Now we'll make the controller functions leaner as there is some redundant code in there. Make a new directory again called util, short for utility, and a new file called validation-session.js as we'll move session validation there.

Instructor seemed to forget adding 'const' in front of the variable, or should it be without in this context? Haven't seen that before.

We also move the part relating to showing an error on validation to this file, though error messages can differ so some content should be set from outside. We'll add a second parameter to the function and use the spread operator in the object to extract it there. We also need to add a third parameter which functions as 'next'. We call save on the session, and then send in 'next', and that function will be called after saving has finished.

```JS
const flashErrorsToSession = (req, data, action) => {
  req.session.inputData = {
    hasError: true,
    ...data
  };

  req.session.save(action);
};

validationSession.flashErrorsToSession(
  req,
  {
    message: 'Invalid input, please correct it and try again',
    title: enteredTitle,
    content: enteredContent,
  },
  () => res.redirect(`/posts/${req.params.id}/edit`)
);
```

We also create a file in 'util' called validation and move logic for checking if a function is valid there.

A bug was introduced with this, with the result that edit posts don't show anything to edit. The reason is that we always set title and content to empty if we don't have any error data in the getSessionErrorData function. That is correct for a new post, but not for editing an existing one. We'll expand the function by taking some 'defaultValues' as input, and spread them in our object.

<b>Refactoring the CSRF token handling</b><br>
We need the CSRF token on every page where we take input, so now we have to pass it to every template with such an input. Since we refer to the CSRF token in the header include, we actually pass it in on every route.

So instead of sending it in on every render calls we can instead use res.locals again. We do that in app.js, but since this will function as a middleware we'll add a new file to that directory for the code to generate the tokens. The code for generating the token is very simple:

```JS
const addCSRFToken = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
}
```

Then we'll use it in app.js

```JS
const addCSRFTokenMiddleware = require('./middlewares/csrf-token-middleware');
app.use(addCSRFTokenMiddleware);
```

Then we need to change the header template and the other forms to find it as 'locals.csrfToken'. Now we can remove all occurrances of csrf token from post-controller and auth.js.

<b>Migrating the authentication functionality to MVC</b><br>
Add auth-controller.js and rename post-controllers to post-controller so it should be easier to see that the actual functions are not the controllers, they are the actions of your controllers. Ok. Instead it is the controller files and the groupings of the functions that act on a certain feature like the blog or like the auth part that makes up a controller. So therefore we now have a blog controller with all actions that are related to posts, and an auth controller with all actions related to authentication.

## Day 33 - 2022-05-12
### Going through course content for day 78:
<b>Improving asynchronous error handling</b><br>
We need to fix the errors that don't make it to our error handling by writing our own code for this, and add it to express as middleware.

One culprit here is the mongodb ObjectId method that throws an error if it gets an invalid id. Since this is in an async function which returns a promise, express doesn't catch it and our server crashes.

<b>Protecting routes with custom middleware</b><br>
As a bonus after all that refactoring, we will now add proper route protection!

Up until now it's only been /admin that has been protected by an authentication check. We should add that to other routes as well, like create post. If you know the correct url, you can open the page and add a post, or edit existing ones. Not good! There are also tools outside the browser that can perform post to the site for us which could also be used where we have no authentication.

We'll add a new middleware that automatically checks if the user is authenticated for all the routes we want to protect. Add 'auth-protection-middleware' to the project. In it we redirect to /401 if the user is not authenticated, which means we have to add a /401 route to auth.js and then the callback function in our auth-controller file:

```JS
const get401 = (req, res) => {
  res.status(401).render('401');
}
```

Now where do we put this middleware? If we put it where we have our routes, what happens? If we put it before our blog and auth routes we won't ever reach those since the user isn't authenticated yet, and can't be. If we put it after those routes, they will handle their routes, and our protection won't do anything. So the key is to add them in the actual routes where we need them, as we learned that those could take any number of callback functions.

That again is perhaps not optimal, as it could mean a lot of copy pasting if you have a lot of routes, so instead let's add it with the normal 'app.use' but after the / route. That will let everyone visit the home page, but protect the rest of the routes.

Because order matters, we now have to move the auth routes before the blog routes, as blog routes adds this protection, so we can never actually reach the 401 page unless we are authenticated.
