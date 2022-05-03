## Section 24: Using MySQL in Node and Express websites
## Day 24 - 2022-05-03
### Going through course content for day 60:
<b>Why should database access be run from the backend</b><br>
In short, because everything in the frontend can be seen and manipulated by users, meaning they can find database passwords and then get access to the database.

<b>What we'll build</b><br>
A basic blog but with complete CRUD functionality, but without any security. Every visitor will be able to do everything: Create blog posts, Read blog posts, Update blog posts, Delete blog posts.

The steps we need to take: Plan and design our database and tables, create database and tables, add initial data to the database, connect to database and interact via the node/express app we will build

<b>Planning our database structure</b><br>
Need a posts table to hold the title, summary, body and date. We'll also want an author table to hold name and email address.

<b>Setting up the database</b><br>
Creating the database and tables:

```sql
create database blog;
create table authors (
  id int not null auto_increment,
  name varchar(255) not null,
  email varchar(255) not null,
  primary key(id));
create table posts (
  id int not null auto_increment,
  title varchar(255) not null,
  summary varchar(255) not null,
  body text not null,
  date datetime default current_timestamp,
  author_id int not null,
  primary key(id));
)
```

Insert some data to have a starting point:

```sql
insert into authors (name, email) values ('Joe Schmoe', 'joe@example.com');
insert into authors (name, email) values ('Jane Doe', 'jane@example.com');
```

<b>Project setup</b><br>
Unzip the project the instructor has set up into day-060-062 folder in code playground. Then go into that folder and run `npm install`.

We've got nodemon to watch for changes

<b>Creating our first routes</b><br>
Create routes folder, create blog.js file in it then import express, set up the router object and add routes:

```JS
router.get('/', (req, res) => {
  res.redirect('/posts');
});

router.get('/posts', (req, res) => {
  res.render('posts-list');
});

router.get('/new-post', (req, res) => {
  res.render('create-post');
})
```

### Going through course content for day 61:
<b>Connecting to our database</b><br>
We need to install a node module to connect to our MySQL database:

```zsh
$ npm install --save mysql2
```

Then create a new folder called data, and database.js inside that. Import the mysql2 package as normal, and then set up a connection pool:

```zsh
const pool = mysql.createPool({
  host: 'localhost',
  database: 'blog',
  user: 'root',
  password: '<redacted>'
});
```

In our blog.js file we will now have to import this:

```js
const db = require('../data/database');
```

And then we can use the db object to make queries:

```js
router.get('/new-post', (req, res) => {
  db.query('select * from authors');
  res.render('create-post');
});
```

Now the call to the database can take a little while, but fortunately the mysql2 package supports asynchronous operations. We just have to change the import statement in database.js to 'mysql2/promise'.

Then we can use async / await on it like this:

```js
router.get('/new-post', async (req, res) => {
  const result = await db.query('select * from authors')
  res.render('create-post');
});
```

We'll always get an array as a result from this, and this array always contains another array as the first element with the values fetched from the database. The second array contains some meta-data, and since we don't want that, we'll use destructuring to only get the first array:

```js
router.get('/new-post', async (req, res) => {
  const [authors] = await db.query('select * from authors')
  res.render('create-post', { authors: authors });
});
```

Then we need to go to 'create-post.ejs' in the views folder to take in the data read from the database:

```HTML
<div class="form-control">
  <label for="author">Select Author</label>
  <select id="author" name="author">
    <% for (const author of authors) {  %>
      <option value="<%= author.id %>"><%= author.name %></option>
    <% } %>
  </select>
</div>
```

<b>Inserting data with placeholders (injecting dynamic data)</b><br>
The MySQL package we are using helps us inject dynamic values into SQL queries like the one below. We just need to put a question mark in the values parenthesis, and then the query takes a second argument, an array. We could put in four questions marks, one for each value we're inserting, but with using just one we can add an array in the array and the package will handle it for us.

```JS
router.post('/posts', async (req, res) => {
  const data = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author
  ]
  await db.query('insert into posts (title, summary, body, author_id) values (?)', [data]);
  res.redirect('/posts');
});
```

This is sending in an array in an array, and with just the one question mark, the second array will replace that with all the values in it. So replacing the one value with four without us having to list them individually.

<b>Fetching and displaying a list of blog posts</b><br>
For readability we store the query in a constant with backticks, that allows us to break it up accross multiple lines. Again we only want the first array returned, and not the metadata.

```JS
router.get('/posts', async (req, res) => {
  const query = `
    select posts.*, authors.name as author_name from posts 
    inner join authors on posts.author_id = authors.id
  `;
  const [posts] = await db.query(query);
  res.render('posts-list', { posts: posts });
});
```

### Going through course content for day 62:
<b>Fetching and displaying a single blog post</b><br>
Quite similar to getting all posts, except we filter on an id, and we set up an dynamic route for it. We then have to handle empty result, in case someone enters an invalid id manually:

```JS
router.get('/posts/:id', async (req, res) => {
  const query = `
    select posts.*, authors.name as author_name, authors.email as author_email
    from posts
    inner join authors on posts.author_id = authors.id
    where posts.id = ?
  `;
  const [posts] = await db.query(query, [req.params.id]);
  
  if (!posts || posts.length === 0) {
    return res.status(404).render('404');
  }
  res.render('post-detail', { post: posts[0] });
});
```

We're calling it posts since an array is returned to us, even though we know from there where statemene it will actually only return one result. Since we know it will only return one result, and that's the only thing we're interested in, we'll send the first element of the array to the post-detail.ejs file.

Then we update post-detail.ejs as well:

```HTML
<address><a href="mailto:<%= post.author_email %>"><%= post.author_name %></a></address> |
<time datetime="<%= post.date %>"><%= post.date %></time>
```

Address is a standard html element that can be used to output addresses, and not just addresses to houses but also email addresses.

Time can be used to output a time, and we should always have the datetime property with some value in it for assistive technologies. We'll fix the date and time shown on the screen later so it's easier to read for us.

<b>Formatting and transforming fetched data</b><br>
If you pressed enter when typing your blog post, you'll find that those lineshifts are actually preserved. That is not something you should take for granted, as whitespace is normally ignored. But we have this CSS rule in posts.css:

```CSS
#body {
  white-space: pre-wrap; /* This ensures that line breaks and whitespace are kept */
}
```
The default value is 'normal' and that does not preserve whitespace.

Now we want to format the date in a more human readable way, so we'll make some changes to the get('/posts/:id') route to where we've ensured that we found a post in the database.

We'll create a new constant, and then we'll use the spread operator to put all key-value pairs from the returns post there. Or in other words, they are copied over to this new object. We did that, because we want to enrich that object with some new data. Specifically we want to overwrite the date property with a date formatted differently.

The MySQL package will convert a date fetched from the database to a date object in JavaScript so we can call date object methods on it. ToISOString() is supposed to be a standard machine-readable string representation, and that's what we need for the date-time attribute for assistive technologies.

To add a human readable date and time we'll add a new object and call toLocaleDateString on it. This method takes two parameters, first we need to set the locale, then we send in an object that tells JavaScript how this should be formatted. Again, [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString) is your friend here for values that can be used.

```JS
const postData = {
  ...posts[0],
  date: posts[0].date.toISOString(),
  hunamReadableDate: posts[0].date.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
};
```

<b>Preparing the update post page</b><br>
We'll need to add the address for the edit post button, and we'll set it to this:

```HTML
<a href="/posts/<%= post.id %>/edit">Edit Post</a>
```

So you see you can have the dynamic element in the middle of a route as well, not just at the end.

Then set up the route:

```JS
router.get('/posts/:id/edit', async (req, res) => {
S  res.render('update-post', { post: posts[0] });
});
```

Now we can update the update-posts.ejs to fill in the post we got from the database. We do that be adding the 'value' property to the input elements, but simply the 'post.body' before the closing tag of 'textarea'.

```HTML
<input type="text" id="title" value="<%= post.title %>" name="title" required>
<input type="text" id="summary" value="<%= post.summary %>" name="summary" required maxlength="255">
<textarea id="content" name="content" required rows="5"><%= post.body %></textarea>
```

Remember that we take whitespace into consideration so we don't want to add linebreaks to the textarea tags, as that would show that linebreaks and whitespace.

<b>Updating posts</b><br>
We'll set the same action for updating posts, but we'll use the POST method instead of the GET method we used above.

```HTML
<form action="/posts/<%= post.id %>/edit" method="POST">
```

```JS
router.post('/posts/:id/edit', async (req, res) => {
  const query = `
    update posts set title = ?, summary = ?, body = ?
    where id = ?
  `;

  await db.query(query, [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.params.id,
  ]);

  res.redirect('/posts');
});
```

The request.body paramenters are 'names' in the HTML page. The ID of the post is a query parameter.

<b>Deleting posts</b><br>
There are at least two ways to do this. We could set up a link to for instance '/posts/id/delete' and then a route handler for that get request which deletes the post.

Or if we want to use the POST method we can set up a form, with action="/posts/id/delete" for instance and a button in that form. Not giving the button a type means it will submit the form

```HTML
<form action="/posts/<%= post.id %>/delete" method="POST">
  <button class="btn btn-alt">Delete Post</button>
</form>
```

```JS
router.post('/posts/:id/delete', async (req, res) => {
  await db.query('delete from posts where id = ?', [req.params.id]);
  res.redirect('/posts');
});
```
