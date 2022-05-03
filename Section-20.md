## Section 20: Handling dynamic routes, errors and managing bigger express projects
<b>Handling dynamic routes, errors and managing bigger express projects</b><br>
Instead of having a page with all the restaurants and a link to their page, we want to set up individual pages for each restaurant, so sharing exactly the one you mean is easier.

We copied restaurants.ejs to restaurant-detail.ejs and simplified with to just contain information about one restaurant.

Now then, how to serve that detail page? We need dynamic routes for that, since we have an "unknown" number of restaurants when we write the code, as they can dynamically be added by users. So we should have an ID per restaurant, but then we can't pre-generate one route per number, as we don't know how many there will be, and it doesn't make sense to have thousands of routes generated, if we only needed 50 for instance.

Express has a way to handle that with one route, that has a dynamic segment in the path. We set it up like this, with colon and then the dynamic element:
```JS
app.get('/restaurants/:id', (req, res) => {
  const restaurantId = req.params.id;
  res.render('restaurant-detail', { rid: restaurantId });
});
```
What we set after the colon will be available in req.params with the same name.

Because we've only had one level of folders before, the styles having relative paths loaded fine. Now that we have two levels, the /restaurants/id the styles doesn't load, as the server tries to load them from /restaurants/styles, and that doesn't exist. the solution is easy, switch to absolute paths in the head.ejs file in the 'includes' folder. We also have to do that on the restaurant-detail.ejs file.

<b>Managing data with unique IDs</b><br>
Install a third-party package called UUID so we don't have to generate IDs ourselves:
```zsh
$ npm install uuid
```
We have to add this package to our apps.js file with a require the normal way. The documentation shows some more advanced require we can use, but we'll get to that later. Doing it the way we've done so far still works.

To use this whenever we store a new restaurant, we'll have to modify our post handler. There we have the request.body that was created by the user, and we want to add an ID to that. With JavaScript that is easy, as we can just access the property we want, and if it doesn't exist, it will be created for us. Then we set that property to the new and guaranteed to be unique id like this:

```JS
const restaurant = req.body;
restaurant.id = uuid.v4();
```

Now we need to add the restaurant id to the link in restaurant-item.ejs to link to the correct one.

## Day 21 - 2022-04-30
### Going through course content for day 52:
<b>Loading and displaying detail data</b><br>
We will need to read in the detail data and look for the id we're supposed to show. When we find the ID we're looking for we can stop searching. Instead of first calling reder and then return to finish the search, we can actually do that on one line:

```JS
for (const restaurant of storedRestaurants) {
  if (restaurant.id === restaurantId) {
    return res.render('restaurant-detail', { restaurant: restaurant });
  }
}
```

<b>Showing a 404 page</b><br>
If we send an unknown restaurant id, the page will not do anything and eventually time out, because we're not returning anything for that case. So if we end up outside the for loop above it means we didn't find the ID in our dataset, and we should return an error message.

We'll create a new page called 404.ejs, copy the page skeleton from about.ejs and modify the content to say that page was not found. Then return that page when we're outside the for loop.

<b>More 404 page use (route not found)</b><br>
We should also have a 404 page in case the user enters an invalid page, by misspelling restaurant for instance. A way to handle that, to set up this fall-back page in case none of our routes were met, would be to use our own custom middleware. That is done by simply creating an 'app.use' where we only send in a function as argument. We're not filtering on any routes. This will have to be added last, so just before the 'app.listen' otherwise it would be executed before our existing pages.

```JS
app.use((req, res) => {
  res.render('404');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

<b>Handling server-side errors (500 status code)</b><br>
Our website is simple so not many sources for problems, but one thing that could possibly fail is the read and write from and to our restaurants.json file. We can simulate this by renaming this file so it's not found. That will show an error message in the browser that doesn't look very good, and isn't very understandable to the user.

We'll create a new generic page, 500.ejs, instead of having one page for each error code (501, 503 and so on) and change the content based on the error code. This is a pretty typical scenario, so express has build in support for this, for if something goes wrong with one of our routes.

We again use a middleware for this, but a special one this time that only executes if an error happens on your server. This needs to receive four paramaters, because that signals to express that this is the special default error handler middleware function. The four parameters in order are: error, req, res, next. The last one, next, could have been added to all other routes as well, but we haven't had a need for it yet. If we call next inside of a middleware it allows the request to move on to the next middleware or route handler, and so we can have multiple middlewares working together.

```JS
app.use((error, req, res, next) => {
  res.render('500');
});
```

<b>Working with error codes</b><br>
A list of all the [HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) on Wikipedia.

While we are returning specific pages in cases of 404 or 500 errors, we're not actually returning that as status codes. That is something we should do to help browsers, search engines and so on help understand what is going on.

To set the status code we call the res.status() method before you call render. These can be chanined together, or in other words, call one method after having called another method. So the second method is called on the result of the first one, and status simply returns an updated response object with the status code set.

``` JS
app.use((req, res) => {
  res.status(404).render('404');
});
```

<b>Code refactoring and adding more functions</b><br>
We have some code that is duplicated, meaning used multiple places, so we'll want to create a function for that and call that when needed. Then we'll also want to split our code into multiple files, so it will be easier to manage. Our project, which is fairly simple, has grown quite a bit and it might get harder to have a good overview of it.

Create a new folder called util, short for utility. In there we'll create a file called 'restaurant-data.js' which will hold the code for working with the restaurants.json file. Then we'll simply call the read and write functions in there, from the app.js file when we need to.

### Going through course content for day 53:
<b>Importing and exporting code in NodeJS</b><br>
Our code is now actually a little broken, since we've moved some functions to a separate file without telling Node. The new code in restaurant-data.js also doesn't work since it depends on the fs and path packages, and it isn't imported (the require keyword) in that file. We'll fix all this now.

First we need to require the fs and path packages in restaurant-data.js, then we need to require restaurant-data.js in app.js:

```JS
const resData = require('./util/restaurant-data');
```

Then there is one more thing to do, since our file doesn't actually 'expose' anything, it just contains two functions that are just there. We'll have to explicitly mark what should be made available to other files with `module.exports = { .. }`. As can be seen, the module.exports is set equal to an object, so that's what we'll be returning to other files:

```JS
module.exports = {
  getStoredRestaurants: getStoredRestaurants,
  storeRestaurants: storeRestaurants
}
```

The first property is the key, and that decides what it will be called in other files. The second property is the name of the function in that same file, and it must be the same.

Since what we've imported is an object, we will have to add 'resData.' in front of what used to be a function, but is now a method in the resData object.

We also have one more issue, since we've moved the file handling functions to a new folder, the path to the data file isn't the same. We'll change that like this:

```JS
const filePath = path.join(__dirname, '..', 'data', 'restaurants.json');
```

Start in current folder, but then go up one level, and then into data.

<b>Using the express router to split the route configuration</b><br>
The express router allows us to group and split routes, which can help making bigger projects easier to maintain. We'll make a new folder called routes and add two files, detault.js and restaurants.js there. The default.js file will be for routes that are not directly related to restaurants, like the index and about page.

As we learned before, when moving code to its own file, and that code depend on something external, we have to import it in that file as well. Now we don't want to create the app object again since that should only be done once. Instead we'll call the Router method, which also has the same routes app has to register route handlers.

We will need to export our configured router so that they can be used in app.js. Since router already is an object, it will be a simple `module.exports = router;`

Then in app.js we need to import these routes and then register them with middleware. With app.get and .post we registered exact matches, however app.use works a little differently. Registering '/' means start with a slash, which every path does, since the URL is domain/path. In other words, app.use with a path only check for the beginning of the incoming path that matches. This will in other words become active for all incoming requests. If one of them matches, that route handler will be executed and checking stops. If no match is found there, then it will continue with other routes we have in app.js.

Now we'll move all other routes related to restaurants to its own file, export that router object, import it in app.js and use it with middleware.

If we had set app.use filter for /restaurants, then the 'router.get' specific routes would only match if the path was /restaurants/restaurants, so we don't want to do that.

We also have to move the resData const from app.js since it isn't used there anymore, but rather in the restaurants.js file. We'll again have to fix the path by going up on level first. (Which begs the question, why can we hardcode paths when we import, but not for files we want to read?). Uuid also have to be moved. The fs package can be removed from apps.js because it isn't used there anymore.

<b>Introducing query parameters and hidden form fields</b><br>
We want the option the sort the list of recommended restaurants by title, both in ascending and descending order, and we want a button to do that.

But first get sort working. JavaScript has a built in method that can be called on arrays called 'sort' which we'll use. This will try to sort automatically, and that can work for numbers, but for more complex data like our list of restaurants we'll have to send in a function that will be executed for every restaurant. This will return -1 or 1, depending on whether the elements should change their order or not.

The sort function will always receive two parameters, so a pair of restaurants in this case, and it will be run for every pair. We then write our own logic for how the sort should be done. Returning 1 means the order of the two restaurants should be changed, returning -1 means the order should stay the same.

```JS
storedRestaurants.sort((resA, resB) => {
  if (resA.name > resB.name) {
    return 1; // Should flip order
  }
  return -1; // Should not flip order
});
```

Now add a form, a hidden input field with a value we set, and a button:
```HTML
<form action="/restaurants" method="GET">
  <input type="hidden" value="asc" name="order">
  <button class="btn">Change order</button>
</form>
```

The idea with the hidden input field is for the button to actually having something to submit, but it's not something we want the user to input. That's why we've set a predefined value. We use GET because there's not actually any data we want to store anywhere, we just want to change the sort order of the restaurants on the page by reloading it.

Clicking the button now takes you to the same page, but with a query parameter: `?order=asc`. This query parameter is ignored when going through which route should be loaded. So we'll still get the /restaurants page, even though it has the query parameter at the end. In the server-side code we can now access this query parameter and then change the sort order based on its value.

To find the query parameter, we first look at the request object, which in turn contains a query object, and that again can contain our order key. We check if it is either asc or desc and then do nothing, if not, we set it to asc.

```JS
let order = req.query.order;
if (order !== 'asc' && order !== 'desc') {
  order = 'asc';
}
```

The sort function now looks like this:
```JS
storedRestaurants.sort((resA, resB) => {
  if (
    (order === 'asc' && resA.name > resB.name) ||
    (order === 'desc' && resB.name > resA.name)
  ) {
    return 1; // Should flip order
  }
  return -1; // Should not flip order
});
```

To make the button work we add logic in restaurants.js to determine what current value is, and set nextOrder to the other one (either asc or desc). Then we pass in that value to the render function, and then finally in restaurants.ejs we pick it up by using an EJS value instead of hardcoding value="asc".

Remember that query parameters are optional, so we should write code that treats it as optional, meaning it should handle that it isn't present.

<b>Query parameters vs route parameters</b><br>
It's important to note that a query parameter is optional, and doesn't have to be there. A route parameter however, in the case of /restaurant/:id is an integral part of the route. Without the id, that route handler would not be executed. But it can be executed no matter if there is a query parameter on it or not.
