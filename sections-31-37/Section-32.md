## Section 32: Milestone project: A complete online shop fra A to Z
## Day 33 - 2022-05-12
### Going through course content for day 78:
<b>Module introduction</b><br>
This will be a big one! A complete online shop built from scratch where users can signup and log in, browse goods, add them to their cart, update them in their cart, view their orders and so on. The shop will also have an administration interface where an administrator with special access can manage products and orders. The admin can add new products, change existing ones, their price, description and so on. The admin can also change the status of orders, to shipped for instance, so users can see their goods are on their way.

<b>Planning the project</b><br>
We'll build a demo online shop. What do we need for it?
1. A frontend with HTML, CSS and JavaScript
2. A backend, and we'll use Node, Express and MongoDB for that.

We will have two websites in one as we'll have the website our customers are using where they can browse and purchase goods, and we have the administration website for administering the goods and customer orders.

Key pages or views, as we will be using the MVC pattern:

|Customer|Administrator|
|--------|-------------|
|Signup  | Signup      |
|Login   | Login       |
|View all products            |First page dashboard |
|See product details          |View all products |
|Add products to shopping cart|Add new products |
|View their own orders        |Update products |
|                             |View all orders|

We also need some data entities, or models in the MVC pattern. Which data are we going to store?

User: Email, password, isAdmin, name, address
Product: Name, summary, price, image, description (available inventory?)
Cart: Items, total price, number of items
Order: User data, products / cart data, date, status

<b>Your challenge</b><br>
You've been given all the information you need to build this, you've learned all you need to do through this course. Can you now build this on your own?

Sounds fun, but I think it would take me weeks to complete fully on my own at this point. I will probably try a little on my own first and then see how the instructor solved it.

<b>Course project setup</b><br>
Where do we start? Perhaps start with authentication first and when that is complete, we can implement the admin pages.

Set up a new directory for the project, run `npm init -y` and then add express. Then add node-mon with '--save-dev' as it'll only be used during development. Now we can add a start script to start nodemon on our app.js. Then add the app.js file and in it add the basic lines to start a basic express server.

<b>Creating directories, files and a first set of routes</b><br>
Given the Model View Controller pattern, it makes sense to make directories called exactly that, models, views, controllers. The demo shop will contain a lot of views, so to structure our code a little better than previously we add an 'auth' and an 'admin' directory under views, which will holds views related to that functionality. We can also add 'cart' and 'products' directories.

Outside of the mvc directories we add one for our routes, and start with an 'auth-routes.js' file since that's what we'll be building first. Add the basic lines for setting up express router in it, and add a first route.

Now we can add the middleware function from auth-controller in the route handler in auth-routes. Add a login route and function as well.

Add the auth-routes to app.js as well, and register them as middleware with app.use.

## Day 33 - 2022-05-13
### Going through course content for day 79:
<b>Adding EJS and first views</b><br>
