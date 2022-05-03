## Section 19: More express, static and dynamic content with templates (EJS)
<b>More express: static and dynamic content with templates (ejs)</b><br>
Demo site shared in the course used as a starting point for us to develop the backend features.

<b>Setting up a basic express app</b><br>
Basically just require express, execute the express function and store the result in the 'app' constant. Now call 'app.get' to define a route and finally 'app.listen' to listen for incoming requests

<b>Serve HTML files with express</b><br>
Instead of serving our frontend-site html files from the html files directly, we'll serve them from express, so we'll need to set up paths for them. '/' will be used for index.html. 'restaurants' will serve 'restaurants.html'. But first weæll restructure our files a little bit, by adding a folder called 'views' where the files served from express will be. So all html files from frontend-site should be moved to the views folder.

To send a file back as a response, we don't actually have to read it in, possibly parse it, and then send it "ourselves" by using the res.send method. Express has a method called sendFile which does all of that for us! This function also looks at the file to determine if it contains html content, and if it does, sends it back correctly so the browser understand it received html and treats it as that. We will still have to construct the path to the file though, so we need the 'path' package as well.

```JS
app.get('/restaurants', (req, res) => {
  const htmlFilePath = path.join(__dirname, 'views', 'restaurants.html')
  res.sendFile(htmlFilePath);
});
```
Now we need to fix the html pages, since they link to eachother with full filename, like 'about.html' or 'restaurants.html' but our routes don't have the '.html' part. Dynamic websites normally don't use filenames, as they probably have paths or handling like this. It is now important to add the slash before for instance 'restaurants' as that will create an absolute path, and append it directly after the domain. Also move the styles folder to the views folder so the links to the styles are correct. Yet they are not working. We'll look at that next.

## Day 19 - 2022-04-28
### Going through course content for day 50:

<b>Serving static files, CSS and JavaScript files</b><br>
Because we have a custom server, we have to explicitly define which files we want to allow and handle. Since we have not set anything up for the CSS files, they won't be served.

Fortunately express has a built in feature for general, static files we want to serve, so we don't have to define a route for each and every css file and image. To do that we add a middleware, like we did for parsing request body:
```JS
app.use(express.static('public'));
```
Public is a common name to use for this folder, since files in it will be public, available to all. We will need to create this directory in our project as well. Then we need to move the styles folder to it, as well as the scripts folder.

For incoming requests now, express checks if it's for a file it finds in the public folder, and then returns that. If not, it checks it it's for one of the route handlers, and then serve that. If neither matches, it returns an error.

Also just to be very clear, anything in the public folder can be access by just typing in the url and the filename, so we don't want to store user data there for instance.

<b>Parsing form data and redirecting requests</b><br>
For parsing we have to add another middleware, the urlencoded so now we have two:

```JS
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
```

To extract the various fields then, we could do like we did previously by extracting from body like this:
```JS
const restaurantName = req.body.name;
```

Or we could just store the entire body, since we want all the elements in an object anyway, so there's no need to pick them out one by one and then add them to an object.
```JS
consrt restaurant = req.body;
```
To store the data we'll create a data folder as we did before and create a restaurants.json file which will contain an empty array. Again we will need to use the global JSON object with method parse to parse the text into a JavaScript array.

After the data has been saved, we want to show a confirmation. To do that we send a redirect to route our users to the confirmation page. That means if they try to reload the page, they won't get the "do you want to post again?" warning.
```JS
res.redirect('/confirm');
```

Our form was not complete configured, so we'll finish that now by adding the action and the method to it, to say where and how data should be submitted.

<b>Adding the EJS template engine</b><br>
This is used by many, and is officially supported by express. There are however many template engines that can be used, because templates are really only HTML files with some placeholders and some special syntax. The different engines simply use different syntax or language that they define themselves. These placesholders and so on is what will be replaced by the actual content by the engine.

On available for express that is popular is called EJS which we'll install into the project:

```zsh
$ npm install ejs
```

Now we need to tell express that we want to use a template engine, and this is typically added as the first thing after creating the app object:
```JS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
```

We need to set that we want to use a 'view engine' and what the name of that engine is. Then we need to set the 'views' setting, telling express where to find these files and we'll be using the views folder for that.

Then we'll need to rename all the existing HTML files and turn them into templates. For ejs, the file ending should simply be changed from .html to .ejs.

We now have to change the route handler from sending the file directly, to calling the render function. That takes the file to be rendered as input:

```JS
app.get('/', (req, res) => {
  res.render('index');
});
```

<b>Rendering dynamic content with templates</b><br>
Add a new paragraph to the restaurants.ejs file, that EJS will change for us. This is the syntax used for variables to be replaced:
```HTML
<p>We found <%= numberOfRestaurants %> restaurants.</p>
```

Then we need to send what it should be replaced with, from app.js. That means extending what we send to toe renderer with an object:
```JS
app.get('/restaurants', (req, res) => {
  res.render('restaurants', { numberOfRestaurants: 9});
});
```
Here we've just hardcoded the value to 9, getting the actual value is easy. We'll just re-use code from the POST to /recommend to read in the data, and then look at the length of the array:
```JS
app.get('/restaurants', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'restaurants.json');
  
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);
  res.render('restaurants', { numberOfRestaurants: storedRestaurants.length });
});
```

<b>Outputting repeated content with EJS and loops</b><br>
Now on to actually displaying the restaurants that was shared. To do that, we want to repeat the restaurant list for every restaurant we've stored in restaurants.json.

We can actually write JavaScript inside the EJS tags. Inside the unordered list, add a new line right after the start of it and add:
```JS
<% for (const restaurant of restaurants) { %>
```
Then we need to close the opening curly braces as well, so add a new line before the ul closes:
```JS
<% } %>
```

Now we can use the restaurant variable inside our block, just like we would in regular JavaScript code, just as long as we wrap it in the EJS tags:
From:
```HTML
<h2>Restaurant Title</h2>
```

To:
```HTML
<h2><%= restaurant.name %></h2>
```

We're using the equal sign in the tag when we want to output a single value.

Now we just need to send an array called restaurants to the renderer:
```JS
res.render('restaurants', {
  numberOfRestaurants: storedRestaurants.length,
  restaurants: storedRestaurants,
});
```

<b>Rendering conditional content</b><br>
In case we don't have any recommended restaurants to show yet, we'd like to remove the text "Find your next favorite restaurants..." and that can be done with an if statement
```JS
<% if (numberOfRestaurants === 0) { %>
<% } else { %>
<% } %>
```
Then we put the relevant HTML inside those blocks.

## Day 20 - 2022-04-29
### Going through course content for day 51:
<b>Including partial content</b><br>
In our html files (now called ejs files) we have the same header and navbar in all the files. When we changed from static html to serving them from express, we had to go through each and every single file and make the same changes, remove the .html and add a / in front. If we use these files for other projects, we might have to do the same again, and that is certainly something to avoid. EJS has a feature to help us with exactly that: Include.

An include is an EJS file, that contains a part of a page which can be used on many other pages by being included there. This means we can split large files into smaller, more managable pieces.

We'll add a new sub-folder to the views folder and call it 'includes'. In that folder we'll create a header.ejs file, and move the header from one of the existing files into that. In place of the header in the file we removed it from, we can add the following: `<%- %>`. The dash is saying we want to render some HTML content. If we had used the equal sign we've used before, it would output that literally, meaning HTML as text. This is a security mechanism, as the equal sign 'escapes' the value it outputs so that users can't inject HTML pieces into your page. Instead by escaping, it comes out as raw text that is not being rendered/executed. That is useful for user generated content, but not when we want to include our own content.

To include then, we need to use the include function. We can pass a second argument to this, being an object with extra configuration sent in to that file like we did for the restaurants file, but we don't need that now.
```JS
<%- include('includes/header') %>
```

The actual HTML head can be moved as well since that is the same in all files, except for some page specific styles. We can leave the page specific styles there, but include the rest. That way we have common code included, but can still have page specific styles. The same was done for the navbar.

Then to make the restaurants file a little more managable, we'll move the restaurant-item to an include. Not to avoid duplication, but to make it easier to find and also more mangable. The restaurant-item uses dynamic data, so it needs the key 'restaurant' passed to it, as well as the value for that restaurant. We'll do that like this:
```JS
<% for (const restaurant of restaurants) { %>
  <%- include('includes/restaurants/restaurant-item', {restaurant: restaurant}) %>
<% } %>
```

<b>How to get IDE support for EJS</b><br>
Install an extension for it, to help VS Code understand the EJS syntax, so it can help us with it. Search for 'ejs' in 'extensions' in vs code and install the one called 'EJS language support' by DigitalBrainstem.

We can see that in our restaurants.ejs file that we've gotten syntax highlighting, and that `<%= ... %>` isn't red anymore. Also when we start typing EJS tags, we get auto-completion now, and we can see which tags we can use.

Unfortunately auto-formatting doesn't work too well, because prettier doesn't understand EJS syntax yet.
