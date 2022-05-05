## Section 26: NodeJS and MongoDB
## Day 26 - 2022-05-06
### Going through course content for day 65:
<b>Planning the database structure and layout</b><br>
In the end this will look exactly like the SQL version, but we can skip some steps when working with NoSQL. We won't start with intializing much data for instance. Authors have to be added though, since we don't have functionality on the website to add those.

Give this is a blog, there probably won't be a lot of posts added, or at least not many posts a minute. However, we hopefully will create a popular blog and have many reads.

Since we need a list of authors to select from when creating a blog post, we need to have the authors in a separate collection. Then we will have the posts collection which will contain the actual posts, as well as the name of the author, so we don't have to fetch the authors collection all the time and look up author in our code.

<b>Project and database initialization</b><br>
Extract the starting point provided by the teacher, then run 'npm install'.

Set up our blog database with 'use blog' in mongosh then insert some author data:

```
blog> db.authors.insertOne({name: "Joe Schmoe", email: "joe@example.com"})
blog> db.authors.insertOne({name: "Jane Doe", email: "jane@example.com"})
```

<b>Connecting to MongoDB from Node</b><br>
Actually the MongoDB team maintain a Node package, and we'll use that: `npm install mongodb`.

Like with SQL we'll add a data directory and then a file called database.js. Then set up the connection:

```JS
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let database;

const connect = async () => {
  const client = await MongoClient.connect('mongodb://localhost:27017');
  database = client.db('blog');
}
```

The MongoClient.connect returns a promise as can be seen, so we use async on the function call and then await before we progress when calling the function. This will be a connection pool, and not just a single connection.

We don't want to perform our database queries from this file, so that's why we set up the database variable. The client object has a db method that connects to a given database on the server, so here we'll set it up to the blog.

Then we'll add a function to return the database, or thrown an error if we don't have a connection, and export those two functions like this:

```JS
const getDb = () => {
  if (!database) {
    throw {message: 'Database connection not established!' };
  }
  return database;
}

module.exports = {
  connectToDatabase: connect,
  getDb: getDb
};
```

Then in our app.js we'll only want to start our express server if we have a database connection:

```JS
const db = require('./data/database');
// (...)
db.connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
```

the connectToDatabase method returns a promise, but since we're not in a function we can't use async here, so we use '.then' to only start the server when the db connection is established.

<b>Fetching and displaying the list of authors</b><br>
To get our authors we'll add a query in the get /new-post route in blog.js. In the shell we fetched data by typing db.authors.find() and it's a little different when doing this in Node. The object we get has a method called collection, and we pass the collection we want to that as a parameter. Then we can run find on that, or any of the other commands we ran in the shell. Now this returns a promise, so we have to add async to the function and then await the result. What we get back is a cursor pointing to our documents. This is a tool we can use to move through the documents that were fetched, step by step. This is mostly useful if we're working with possibly many hundres or thousands of documents and you don't want to use them all at once, but rather deal with them in chunks. Since we're not dealing with that much data, we can just get our documents by adding '.toArray()' after find.

```JS
// To get a document cursor
const documentCursor = await db.getDb().collection('authors').find();
// Or to get our authors
const authors = await db.getDb().collection('authors').find().toArray();
```

The result from the last one will be an array containing objects, so we will want to loop through that the normal way in the 'create-post.ejs' file:

```HTML
<select id="author" name="author">
  <% for (const author of authors) { %>
    <option value="<%= author._id %>"><%= author.name %></option>
  <% } %>
</select>
```

<b>Inserting new documents, new blog posts</b><br>
If we have the id string from MongoDB and we want to add it back to the database with the ObjectId and all, we need to require the mongodb package in the file we want to do this. Then we can get the ObjectId function by accessing mongodb.ObjectId. This will actually be a class we can instantiate. Storing the mongodb back as a string would work though.

Since we want to store the authors name in the posts document, so we don't have to look that up for every post we're going to show, we actually need to fetch it first. It's available in the ejs file, but from the HTML above we can see that we only send in the id. But fetching it when we create a post is fine, since we probably don't create a lot of posts. But there can be lots of lookups for posts, so that's why it's important to have it available when getting posts, but not when storing new posts.

```JS
router.post('/posts', async (req, res) => {
  const authorId = new ObjectId(req.body.author);
  const author = await db.getDb().collection('authors').findOne({ _id: authorId});

  const newPost = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
    date: new Date(),
    author: {
      id: authorId,
      name: author.name,
      email: author.email
    }
  }
});
```

As for author email that we have do show on each post, it's a bit of either or. Does email addresses change a lot? If so, then we don't want to store it in posts since we possibly would have to update a lot of posts each time it changes. If it's something that doesn't change often then it's fine storing it in posts and having it readily available.

Then when the newPost object is created we'll want to insert the post into the collection. Noe the nice thing here is that the collection doesn't exist yet, but it will be created when the first post is added

```js
const result = await db.getDb().collection('posts').insertOne(newPost);
```

### Going through course content for day 66:
<b>Fetching and displaying documents</b><br>
We can use projection to limit the amount of that that is fetched. So instead of fetching everything like this:

```JS
const posts = await db.getDb().collection('posts').find().toArray();
```

We will still fetch every post, but we won't get all the data from every posts. So we pass an empty object as the first argument to find (we don't want to filter) and then use the project() method on the result to specify the values we want to fetch:

```JS
router.get('/posts', async (req, res) => {
  const posts = await db
    .getDb()
    .collection('posts')
    .find({})
    .project({ title: 1, summary: 1, 'author.name': 1 })
    .toArray();
  res.render('posts-list', { posts: posts });
});
```

Note: This .project method only seems to exist on find(). (Maybe because it supposedly returns a cursor?) I tried it on findOne() and that didn't work, that required the regular second object to specify fields returned. An object as the second argument works on find() as well for me, but that could maybe be because we're not getting enough data for it to be a cursor? Much confusion. Anyway, moving on.

Then update posts-list to include the post-item for each post (check if there are posts first) and in post-item update to show the post title, summary and author.

<b>Fetching a single post</b><br>
We'll start by fixing the link in post-item, by setting it to '/posts/<%= post.\_id %>' as we always get the MongoDB id unless we specify we don't want it. Then we'll add that route

```JS
router.get('/posts/:id', async (req, res) => {
  const postId = req.params.id;
  const post = await db
    .getDb()
    .collection('posts')
    .findOne({ _id: new ObjectId(postId) }, { summary: 0 });

  if (!post) {
    return res.status(404), render('404');
  }
  res.render('post-detail', { post: post });
});
```

<b>Transforming and preparing data</b><br>
I feel the teacher contradicts himself here, or I misunderstood something, as previously I thought he said the date from mongodb was in machine readable format. Now he still wants us to change it with toISOString() to make it a machine readable string.

In any case we'll have to change the date displayed on the screen to make it easier to read and understand. We did this once already:

```JS
post.humanReadableDate = post.date.toLocaleDateString('en-GB', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
```

<b>Updating documents</b><br>
To update a document we first have to get it from the database:

```JS
router.get('/posts/:id/edit', async (req, res) => {
  const postId = req.params.id;
  const post = await db
    .getDb()
    .collection('posts')
    .findOne({ _id: new ObjectId(postId) }, { title: 1, summary: 1, body: 1 });

  if (!post) {
    return res.status(404), render('404');
  }

  res.render('update-post', { post: post });
});
```

Then update the 'update-post' file to display the fetched data, and enable posting them back. Then we need to update the database with the changes:

```JS
router.post('/posts/:id/edit', async (req, res) => {
  const postId = new ObjectId(req.params.id);
  const result = await db.getDb()
    .collection('posts')
    .updateOne(
      { _id: postId },
      {
        $set: {
          title: req.body.title,
          summary: req.body.summary,
          body: req.body.content,
        },
      }
    );

    res.redirect('/posts');
});
```

Functionality we can add is storing the date for when the document last was updated, or perhaps even store every update timestamp. Maye we should even require a short summary of what was changed.

<b>Deleting documents</b><br>
Again add the form around the "delete" button and the delete route:

```JS
router.post('/posts/:id/delete', async (req, res) => {
  const postId = new ObjectId(req.params.id);
  const result = await db
    .getDb()
    .collection('posts')
    .deleteOne({ _id: postId });
  res.redirect('/posts');
});
```

Isn't there a DELETE method we could use, when we actually are deleting posts?

<b>Express and handling asynchronous code errors</b><br>
There is apparently a limitation and an issue when working with node, express and mongodb. When we have asynchronous routes (or middlewares I think he said) for getting a specific post by ID, when an error is thrown inside this function the default express error handling middleware will not activate.

This can be seen by trying to view a specific post, but changing the ID to one that doesn't exist. Now the app crashes instead of showing our 404 error page. Apparently the crash happens before we get to the "if not posts, then show 404 page" part because of the ObjectId. We try to create an invalid ID and makes mongodb throw an error. And because we're in an async function which returns a promise, express does not catch this error. So this is a usecase for try/catch!

```JS
let postId = req.params.id;
try {
  postId = new ObjectId(postId);
} catch (e) {
  return res.status(404).render('404');
}
}
```

If you instead of handling it manually like above, activate the default error handling by setting the third parameter to the route: next.

```JS
router.get('/', async (req, res, next) => {
  try {
    postId = new ObjectId(postId);
  } catch (e) {
    return next(error);
  }
});
```
