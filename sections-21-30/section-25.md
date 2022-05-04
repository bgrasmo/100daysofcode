## Section 25: NoSQL and MongoDB - an introduction
## Day 25 - 2022-05-04
### Going through course content for day 63:
<b>The idea behind NoSQL database systems</b><br>
The idea is maybe store data more easily since we don't have to think about a strict schema or datastructures, or relationships accross tables.

Instead we work with collections that unlike tables don't have a fixed structure but rather store entities as a whole, so it's like a container for data. Like tables, you can have multiple collections, but they won't be connected like tables can be, so I guess it's more of a grouping function.

Inside the collections we have what's called documents, and these look like JavaScript objects though they are not. JavaScript objects only exist in memory while the program is running, but documents in NoSQL can be saved to disk. Not sure why this was mentioned, perhaps mention json instead? It's short for JavaScript Object Notation but I don't think that's been mentioned in the course so far.

Documents in the same container doesn't have to have the same structure, they can be as simple or as complex you want and be totally different. They do need to have the key-value pairs we're used to from JavaScript objects (and json) although these can be different in different documents. So in other words if you start out with a given structure when saving documents, and later find out you need to change that structure, you can easily do that without having to alter the table and then having to handle what to do with the old data.

Because of this, data is not normalized and isn't split accross multiple tables, but related data is mostly stored in the same document. This can be done maybe with nested documents (not sure I got that right) or nested objects in the document.

There can be relations in NoSQL but that is stored differently than in SQL. In the case of a books collection and a movies collection, some movies might be based on books. Then in the books collection we can store the id of the related movie, or in the movies collection we might store the id of the related book, or both. Then you might fetch a list of movies, or just a single one, but typically when using NoSQL you wouldn't often ask for all the movies that are based on a given book.

You should try to optimize your database layout based on the queries you plan on performing, and that means data that is frequently queried together should be stored together.

<b>Introducing MongoDB</b><br>
As with SQL there are a lot of NoSQL databases. The most popular one might be MongoDB, so that will be used in this course. You can learn more about it on [their own pages](https://www.mongodb.com/)

<b>Installing MongoDB</b><br>
We'll want the community edition for our small, private projects. If you need this for work, for a large corporation, the enterprise edition is the way to go.

See installation instructions for Linux [here](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)

Get the public GPG key from MongoDB first, so we know the software we download was actually from them. (The signature will be checked to verify this.)

```zsh
$ wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
```

I got the following warning from that command that I should look into:
`Warning: apt-key is deprecated. Manage keyring files in trusted.gpg.d instead (see apt-key(8)).`

The directory being referenced is /etc/apt/trusted.gpg.d/.

Adding the key seemed to work though as it exited with OK.

Now we need to create a list file for our version of Ubuntu. To find the correct version, see `lsb_release -a`. We are on 'impish' which MongoDB doesn't seem to have a build for, so we'll have to try with focal as described in the official documentation. This might be something we have to update manually when updating to a new Ubuntu version, I don't know how that works yet.

```zsh
$ echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
```

Reload the local package database since we've added a new repository to fetch files from with the command above:

```zsh
$ sudo apt update
```

Then finally MongoDB can be installed:

```zsh
$ sudo apt install mongodb-org
```

Then to start the database server:

```zsh
$ sudo systemctl start mongod
```

To check that it started successfully and is running:

```zsh
$ sudo systemctl status mongod
```

If you want mongod to start after a restart:

```zsh
$ sudo systemctl enable mongod
```

To stop mongod:

```zsh
$ sudo systemctl stop mongod
```

Or to restart the process:

```zsh
$ sudo systemctl restart mongod
```

To connect to the database server and being using MongoDB:
```zsh
$ mongosh
```

Got some startup notes:

```zsh
To help improve our products, anonymous usage data is collected and sent to MongoDB periodically (https://www.mongodb.com/legal/privacy-policy).
You can opt-out by running the disableTelemetry() command.

------

The server generated these startup warnings when booting:
2022-05-04T14:55:11.148+02:00: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine. See http://dochub.mongodb.org/core/prodnotes-filesystem
2022-05-04T14:55:11.326+02:00: Access control is not enabled for the database. Read and write access to data and configuration is unrestricted
```

Note: The database files are stored in /var/lib/mongodb

It seems some things are similar to MySQL, `show databases`, `use <database>` and `show tables` works as expected. Though the last one can probably be `show collections` instead.

<b>Inserting data with MongoDB</b><br>
Unlike SQL we don't have to create tables or similar structure, we can just start inserting some data. We do however have to use a database, and we create it by simply storing some data in it:

```sql
test> use ratingportal
ratingportal> db.restaurants.insertOne()
```

The 'db' prefix is used to refer to the currently active database. The word following is the collection, 'restaurants' in this example. This collection doesn't exist either, but it will be created when we insert data into it. While this looks like JavaScript notation, this is a special language written for the MongoDB and can only be used for MongoDB. That's a key difference to SQL where every database uses the same language (possibly with some extensions to it). NoSQL databases typically have their own language written for their own software.

The insertOne() at the end looks like a JavaScript method, and can be used to insert one element of data. It takes an object as input, again looking like JavaScript objects with key-value pairs (Split up for readability):

```
ratingportal> db.restaurants.insertOne({ 
  name: "Max Power Restaurant", address: {
    street: "Some Street 89", streetNumber: "23b"
  }
})
```

Fun output from that command:

```
Browserslist: caniuse-lite is outdated. Please run:
  npx browserslist@latest --update-db
  Why you should do it regularly: https://github.com/browserslist/browserslist#browsers-data-updating
{
  acknowledged: true,
  insertedId: ObjectId("627285ebf26560abbfacfcd9")
}
```

Insert second document as well:
```
db.restaurants.insertOne({ name: "Minumum Power Restaurant", address: { street: "Another street", streetNumber: "15" } })
```

MongoDB automatically creates a unique id for all documents that are inserted.

### Going through course content for day 64:
<b>Reading and filtering data</b><br>
To read back the data we just added, or basically any document in the collection, we can use the following command:

```
ratingportal> db.restaurants.find()
```

To search for a specific restaurant we add an object to the find function:

```
ratingportal> db.restaurants.find({ name: "Max Power Restaurant" })
```

To list all restaurants, but only return the name of them send in an empty object for the first parameter (the search parameter I guess) and then send this for the optional second parameter:

```
ratingportal> db.restaurants.find({}, {name: 1})
```

The _id key-value is always returned but can be suppressed by adding it with a _id:0. Having at least one key set to 1 like above will exclude all other fields except _id.

As can be seen, Mongo returns an array to us, as it doesn't know if there will only be one match for our restaurant with a given name when using the find function. If we want to get exactly one document returned, the first match, then we can use the findOne() function instead. Then you'll get an object back instead of an array.

```
ratingportal> db.restaurants.findOne({ name: "Max Power Restaurant" })
```

<b>Updating documents</b><br>
We added the wrong address for one of our restaurants. How can we change (update) it? Simply by using the update function. As with find it has two variants, though now they are explicitly called updateOne() or updateMany(). Again the first parameter you should pass to the function is the search argument and this time we'll want to use the id.

To find or update on id we have to specify it the same way it's shown in find:
_id: ObjectId("627285ebf26560abbfacfcd9")

Then the second parameter defines what we want to update and it's again another object that takes a reserved word as first parameter: $set. Then that takes another object as input, and here we set the new value we want set. (updated/changed). To update a neste object like address is we need to specify the path to it like this:

```
ratingportal> db.restaurants.updateOne({_id: ObjectId("627285ebf26560abbfacfcd9")}, 
   { $set: { "address.street": "Some street" }
  })
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
```

<b>Deleting documents</b><br>
The last thing we're missing from the CRUD operations are the D: Delete. The function is again simply deleteOne or deleteMany. The deleteOne deletes the first matching document, even though the search matches multiple documents. That might be both a little scary and a little helpful. (Think deleting a queue, one by one)

```
ratingportal> db.restaurants.deleteOne({_id: ObjectId("627286f4f26560abbfacfcda")})
{ acknowledged: true, deletedCount: 1 }
```

<b>Planning a complete database design / layout</b><br>
Now let's look at the restaurants tables we implemented with SQL and plan using MongoDB instead.

Instead of 4 tables we can reduce it to 3 collections: Restaurants, types and reviews. Address will be a nested object in restaurants, as it won't change often and we're likely to need it when fetching restaurant information.

What about types, why couldn't that be part of the restaurants collection? A restaurant probably doesn't change from Italian to Mexican food often. The idea is to have identical types for all restaurants of the same type, in case someone introduces a typo or thinks up a new name for an existing type of restaurant. If we now want to update the type names we can do that in only one place. Again, in case someone introduced a typo when adding a new type.

Having reviews added directly to the restaurant it applies to is a bad idea since reviews can grow infinitely and there is a limit to how large a document might be.

<b>Implementing the planned design and layout</b><br>
Start out by clearing out the data we've added by calling deleteMany() with an empty object. That will delete everything.

```
ratingportal> db.types.insertOne({name: "French"})

ratingportal> db.restaurants.insertOne({name: "Sausage House", address: { street: "Culinary Circus Drive", streetnumber: "1A", postalCode: 80833, city: "Munich", country: "Germany" }, type: {typeId: ObjectId("6272a774329e5aa9ef25f47d"), name: "German"}})

ratingportal> db.restaurants.insertOne({name: "Burger Heaven", address: { street: "Red Meat Street", streetnumber: "15", postalCode: 10115, city: "Berlin", country: "Germany" }, type: {typeId: ObjectId("6272a77f329e5aa9ef25f47f"), name: "American"}})

ratingportal> db.reviews.insertOne({reviewer: { firstName: "Joe", lastName: "Schmoe"}, rating: 3, text: "The sausages were good, the service was not the German efficiency I expected", date: new Date("2022-05-04"), restaurant: {id: ObjectId("6272aa76329e5aa9ef25f484"), name: "Sausage House"} })
```

<b>Practice time and more filtering operations</b><br>
Inserting one more review:

```
db.reviews.insertOne({reviewer: { firstName: "Joe", lastName: "Schmoe"}, rating: 5, text: "Best burgers in town! No contest!", date: new Date("2022-05-04"), restaurant: {id: ObjectId("6272a9c1329e5aa9ef25f483"), name: "Burger Heaven"} })
```

Now we want to find reviews greater than 4, we have to put those comparisons in their own objects, and use special operators $gt for greater than or $lt for less than. There is also $gte for greater than or equal and $lte for less than or equal:

`db.reviews.find({rating: {$gt: 4}})`

To search for multiple conditions we use $and and an array with a list of conditions that should be met:

`db.reviews.find({$and: [{rating: {$gt: 1}}, {rating: {$lt: 3}}] })`
