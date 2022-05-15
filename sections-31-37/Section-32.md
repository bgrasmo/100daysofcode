## Section 32: Milestone project: A complete online shop fra A to Z

## Day 33 - 2022-05-12

### Going through course content for day 78:

#### <b>Module introduction</b>

This will be a big one! A complete online shop built from scratch where users can signup and log in, browse goods, add them to their cart, update them in their cart, view their orders and so on. The shop will also have an administration interface where an administrator with special access can manage products and orders. The admin can add new products, change existing ones, their price, description and so on. The admin can also change the status of orders, to shipped for instance, so users can see their goods are on their way.

#### <b>Planning the project</b>

We'll build a demo online shop. What do we need for it?

1. A frontend with HTML, CSS and JavaScript
2. A backend, and we'll use Node, Express and MongoDB for that.

We will have two websites in one as we'll have the website our customers are using where they can browse and purchase goods, and we have the administration website for administering the goods and customer orders.

Key pages or views, as we will be using the MVC pattern:

| Customer                      | Administrator        |
| ----------------------------- | -------------------- |
| Signup                        | Signup               |
| Login                         | Login                |
| View all products             | First page dashboard |
| See product details           | View all products    |
| Add products to shopping cart | Add new products     |
| View their own orders         | Update products      |
|                               | View all orders      |

We also need some data entities, or models in the MVC pattern. Which data are we going to store?

User: Email, password, isAdmin, name, address
Product: Name, summary, price, image, description (available inventory?)
Cart: Items, total price, number of items
Order: User data, products / cart data, date, status

#### <b>Your challenge</b>

You've been given all the information you need to build this, you've learned all you need to do through this course. Can you now build this on your own?

Sounds fun, but I think it would take me weeks to complete fully on my own at this point. I will probably try a little on my own first and then see how the instructor solved it.

#### <b>Course project setup</b>

Where do we start? Perhaps start with authentication first and when that is complete, we can implement the admin pages.

Set up a new directory for the project, run `npm init -y` and then add express. Then add node-mon with '--save-dev' as it'll only be used during development. Now we can add a start script to start nodemon on our app.js. Then add the app.js file and in it add the basic lines to start a basic express server.

#### <b>Creating directories, files and a first set of routes</b>

Given the Model View Controller pattern, it makes sense to make directories called exactly that, models, views, controllers. The demo shop will contain a lot of views, so to structure our code a little better than previously we add an 'auth' and an 'admin' directory under views, which will holds views related to that functionality. We can also add 'cart' and 'products' directories.

Outside of the mvc directories we add one for our routes, and start with an 'auth-routes.js' file since that's what we'll be building first. Add the basic lines for setting up express router in it, and add a first route.

Now we can add the middleware function from auth-controller in the route handler in auth-routes. Add a login route and function as well.

Add the auth-routes to app.js as well, and register them as middleware with app.use.

## Day 34 - 2022-05-13

### Going through course content for day 79:

#### <b>Adding EJS and first views</b>

Install EJS in this project: `npm install ejs` then add view engine and views directory to express. To construct the path to this properly, we'll also want the built in Node package 'path'.

```JS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
```

Now add 'login' and 'signup' in auth directory under views. Since we experienced before that some content like header and navbar perhaps will be used by multiple files, we'll also want a directory where we can store them. Let's create a directory called customer for all views relating to the customer part of the website. We already have a directory called admin for the admin part.

Then it makes sense to move directories auth, cart and products into customer as well, as we have two main parts to our website and we now only have two folders in views.

Now create the head.ejs and header.ejs files. Head should contain the beginning of the html document, but not the body elements, and header should contain what goes into the header of the page, so within the body elements but not containing them.

Next up is the signup page where we'll add the signup form. We'll first have to include the head.ejs file though. Then we'll close the head tag as we don't want to add any more to that part of the document, and start the body tag. Since we'll always want to close the body and html tag at the bottom, we'll create a new file called footer which contains those, and then we can include it wherever we need it.

#### <b>Populating and rendering the first view</b>

We'll need to add the form input elements needed for signing up. So we need email address, verify email address, password, users name and address.

In vs code, hit ctrl-space to get autocompletion in the type of an input field, to see what options are available.

#### <b>Adding base CSS files and static file serving</b>

Add font Montserrat regular 400 and bold 700. Then we start provocatly by selecting all our elements and setting that they should have a box-sizing of border-box:

```CSS
* {
  box-sizing: border-box;
}
```

This is to ensure that the width of all the elements is the size we set it to, wheter it has a border or not. We also have to do it this way because this is not an inheritable property.

#### <b>Adding CSS variables and a website theme</b>
Inheritance in CSS is supposedly more efficient performance wise compared to the star selector, because with inheritance the style is applied once and then inherited. With the star selector it has to be applied to every single element.

## Day 35 - 2022-05-14

### Going through course content for day 80:

#### <b>More base CSS styles for the website</b>

When setting a color with a variable, or I guess using any variable in CSS, the var function takes a second argument which is a fallback value if the variable isn't found. In our case though where we first define the variables then later in the same file use them, we know the variables will be found so we don't need the fallback value.

Remember that width and height in % refers to available size of the parent element. Again we set width to 90% of parent elements width which is fine on smaller screens, but to not make it too wide on large screens we set a max-width as well. Then to make the content centered we add margin auto.

#### <b>Styling the first form element</b>

Setting display: block; on the label element forces a line break, so the element takes up the entire width. That means information about expected input will be above the input field. Not changing it to a block element would mean expected input and the input field would be on the same line, and the input field would have a different width, depending on the explanatory text.

#### <b>Adding a MongoDB database and connection</b>

Install the Node MongoDB package for this project with `npm install mongodb`. (Though I've heard good things about mongoose so will want to check that out later.)

When checking if we have a connection, we'll throw a new error with the message this time, rather than passing in an object with a message property to the throw function.

db.connectToDatabase returns a promise since it's an async function, and this time we will use .then().catch() to execute if connection succeeded or failed.

### Going through course content for day 81:

#### <b>Adding user signup</b>

Start by adding a user-model.js file in the models directory, that follows the naming convention we're using now. Here we'll add a class for user data.

We can create objects with object literals, meaning creating on the fly by adding some data inside curley braces or we can create them using the class blueprint approach. We can add methods to objects that weren't created from a blueprint, but if we take the blueprint approach, every object that is based on the class will inherit those methods.

We now also have to add the bcryptjs package to store passwords safely and add the urlencoded middleware from express to extract the data posted to the route.

Copy the signup.ejs to login.ejs and modify it to take email and password input only.

#### <b>Adding CSRF protection</b>

Install the csurf package: `npm install csurf` and add it to app.js as a middleware. This package will not scan all incoming requests that are not GET requests, and scan for csrf tokens. The requests will be denied if they don't have a token. To ensure that the relevant pages have this token, we will add it by using a custome middleware with res.locals.

Add middlewares directory and add a csrf-token.js file to it. Use our middleware in app.js, then add the hidden input fields to the signup page.

This will now fail since csurf also require sessions and that hasn't been added yet.

#### <b>Implementing proper error handling with the error handling middleware</b>

As header says, add new error-handler.js middleware in middlewares directory. Create 'shared' directory in views for files needed both by admin and user, and move the includes files in there. Then update the paths to all the includes in signup and login.

#### <b>Adding sessions and configuring them</b>

A session is a piece of data stored on the server connected to the user with the help of cookies. If a user has a valid cookie with a valid session id (accepted on the server) and this session says this user is authenticated, that user can be granted access.

Install extra packages for this with `npm install express-session connect-mongodb-session`.

Add a config directory and then create a session.js file in it to keep app.js minimal and have all session configuration in one file.

If we don't set a maxAge on the session, the cookie will be removed and the session will be removed when the user closes the browser.

### Going through course content for day 82:

#### <b>Add authentication and user login</b>

We need to perform a database lookup to see if the user with the entered email exists. This can be done with a method in the user object that performs this lookup on the email address there. I'll want a password "check" there as well to get the same 'hiccup' as if user was found and actual passwords compared. Also add method for comparing the entered password with the one stored in the database.

Create util directory and an authentication.js file in it for adding authentication information to the session.

#### <b>Finishing authentication and user login</b>

So far we have no check to see if a user is actually authenticated, so let's add that. Add 'check-auth.js' file in middlewares directory.

We can now check if 'locals.isAuth' is set in our header, and then show a logout button as a temporary visual confirmation that the we're logged in.

#### <b>Add logout functionality</b>

Add a form around the logout button, with method POST since we plan on "changing something on the server". (Delete the authentication status of the user in the session.) add the route and function for it.

#### <b>Handling errors in asynchronous code</b>

Express doesn't catch errors that happen inside asynchronous operations, so we have to handle them ourselves with try / catch. The solution is to use the 'next' function that is available in all middlewares, and call that function with the error we catch. That will trigger the default error handling in express, and it will render the 500 error page.

#### <b>Adding user input validation</b>

We can't trust the users or their input, so we need to perform validation in the backend.

But question! Why create the user object first, based on user input, and then afterwards check if the user input is valid? We first pass `req.body.<name>` to create object, and then check if `req.body.<name>` is valid. Since we're not using the user object for checking this, I would do this the other way around. (Yes, instructor saw the light and moved creating the user object below the validation checks.)

### Going through course content for day 83:

#### <b>Flashing errors and input data onto sessions</b>

Currently we're not giving any feedback to the user what went wrong. We just redirect.

Add code to 'flash' messages on the session.

#### <b>Displaying error message and saving user input</b>

Having 'flashed' info to the session, we need to modify our HTML templates to show said information.

#### <b>Admin authorization and protected navigation</b>

Manually set flag 'isAdmin: true' on a user in the database. Then save that in util/authentication.js. Then we can extract it in check-auth.

Then we can work on navigation and unlock more features for the admins than for the regular users.

#### <b>Setting up base navigation styles</b>

Add 'hamburger' menu in the header, which will mainly be shown on mobile devices. We'll also use the 'aside' element for 'side information, side content belonging to the main area we use it'. The nav element outside aside will only be visible outside mobile screens, the nav element inside aside will only be visible on mobile screens.

To avoid code duplication, we'll move the nav from header.ejs to its own file nav-items.ejs, and include it where needed.

## Day 36 - 2022-05-15

### Going through course content for day 84:

#### <b>Building a responsive website</b>

The main part of navigation.css will be for small screens, then we override for larger screens with a media query. Set it using min-width to select large screens, and hide the hamburger menu and navigation meant for small screens. The height of the header is 5 rem, plus 1 rem of extra spacing, that's why main is set to have a margin of 6 rem, to push content that otherwise would be hidden behind it down.

100vh is viewport height, which is 100% of the height, and we can subtract 5rem from that to accomodate for the header height.

#### <b>Add code to toggle mobile menu</b>

Add a scripts directory to public, as we need some JavaScript to run in the browser. New method, classList.toggle let's us toggle a class on or off without having to write the logic for it ourselves. To target it in CSS, select element with id mobile-menu and class open: `#mobile-menu.open`

#### <b>Add product admin pages and forms</b>

Add admin-routes, and use it with '/admin' prefix in app.js to avoid having /admin in front of all the admin routes. Then add controller actions for admin. Also add views for these pages

### Going through course content for day 85:

#### <b>Add image upload functionality</b>

Add enctype=multipart/formdata to the form since it has image upload functionality. Then add CSRF token as query parameter as it won't work with hidden input fields on multipart forms.

Install multer: `npm install --save multer` and uuid: `npm install uuid`.

#### <b>Add product model and store products in the database</b>

Add product-model file. Numbers are stored as string by default, so add a + in front of the variable to make sure it's converted to number.