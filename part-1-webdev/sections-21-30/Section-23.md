## Section 23: SQL databases, introduction and core concepts
<b>What and why</b><br>
As has been mentioned SQL is considered to stand for Structured Query Language and is used to send queries to relational database management systems (RDBMS). These have a strict schema with data structured accross multiple tables and table entries can be connected via identifiers or keys. We can send queries to perform so called CRUD operations, Create, Read, Update and Delete. The RDBMS then handles storing this data for us.

<b>RDBMS options</b><br>
SQL is actually just a language, a structured query language. We need to have an RDBMS to use this language to talk with a database.

There are plenty of options! Some examples are MySQL, PostgreSQL, Microsoft SQL, SQLite and of those MySQL might be the most popular (but SQLite is the most used, it's on your phone!).

MySQL, PostgreSQL and SQLite are open source and free, while Microsoft SQL (and Oracle and others) are commercial and needs a license to use.

<b>Installing MySQL and setup</b><br>
Instructions for installing MySQL on MacOS and Windows. For Linux:

```zsh
$ sudo apt install mysql-server
```

Then to secure it:

```zsh
$ sudo mysql_secure_installation
```

To restart it:

```zsh
$ sudo service mysql restart
```

Log in with the command line client:

```zsh
$ mysql -u <username> -p
```

<b>Database servers vs databases vs tables</b><br>
What we've just installed is a database server. This will be the server for our databases. In a database on the server we have tables, which consists of rows and columns of data.

To show databases on our server, and switch to a database and show the tables it contains:

```zsh
mysql> SHOW databases;
mysql> USE mysql;
mysql> SHOW tables;
mysql> SELECT * FROM user;
```

<b>Writing our first SQL code and creating a database</b><br>
After connecting to the database server, a database can be created like this:

```zsh
mysql> CREATE SCHEMA restaurant_finder;
```

We can replace schema with database, both work.

See MySQL documentation for this [here](https://dev.mysql.com/doc/refman/5.7/en/create-database.html).

### Going through course content for day 58:
<b>Creating a table and table structures</b><br>
See MySQL documentation for [create table](https://dev.mysql.com/doc/refman/5.7/en/create-table.html) here. We can have various datatypes for our columns, some common ones are int, varchar and date. See documentation for more and their use-cases-

```zsh
mysql> CREATE TABLE restaurants (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `type` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));
```

The backticks can be removed if there are not special characters in the columns.

To see the definition of a table:

```zsh
mysql> DESCRIBE restaurants;
```

<b>Inserting data into a table</b><br>

```sql
mysql> INSERT INTO restaurants (name, type) VALUE ('At the end of the universe', 'French');
```

<b>Reading data from a table</b><br>

```sql
mysql> SELECT * FROM restaurants;
```

Insert a couple of new restaurant of your choosing, then select just the second one (which will have an id of 2) like this:

```sql
mysql> SELECT * FROM restaurants where id=2;
```

Or only if they are italian:

```sql
mysql> SELECT * FROM restaurants where type = 'Italian';
```

To just select some columns:

```sql
mysql> SELECT name, type FROM restaurants where id = 2;
```

To use aggregation functions:

```sql
mysql> SELECT count(1) FROM restaurants where type = 'French';
```

You need to tell MySQL what to count, but you can also just use '1' to return number of rows fetched. You can also use '*' or a column name.

<b>Updating and deleting data</b><br>

```sql
mysql> UPDATE restaurants SET name = 'Paris' where id = 4;
```

```sql
mysql> DELETE from restaurants where id = 4;
```

Pro-tip, try the delete command with SELECT (*) instead first, that will show you what data you will delete so you can make sure your query is correct.

<b>Designing a more complex database</b><br>
Imagine if you will these 4 tables: Addresses, restaurants, types, reviews.

reviews.RestaurantId links to restaurants.restaurantId. Restaurants contain addressId which links to addresses.addressId as well as a typeId that links to types.id

Addresses: id, street, street number, city, postal code, country
Restaurants: id, name, addressId, typeId
Types: id, name
Reviews: id, reviewer name, rating, text, date, restaurantId

Create the address table:

```sql
CREATE TABLE addresses (
  id INT NOT NULL AUTO_INCREMENT,
  street VARCHAR(255) NOT NULL,
  street_number VARCHAR(15) NOT NULL,
  city VARCHAR(255) NOT NULL,
  postal_code INT NOT NULL,
  country VARCHAR(255) NOT NULL,
  PRIMARY KEY(id));
```

### Going through course content for day 59:
<b>Implementing a more complex design with relations</b><br>

Creating the types table:

```sql
CREATE TABLE types (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY(id));
```

We need to change the restaurants table. We can either using alter table, or dropping it and recreating it. Since we don't have any meaningful data in it, ww'll do the latter:

```sql
CREATE TABLE restaurants (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  address_id INT NOT NULL,
  type_id INT NOT NULL,
  PRIMARY KEY(id));
```

Finally, create the reviews table:

```sql
CREATE TABLE reviews (
  id INT NOT NULL AUTO_INCREMENT,
  reviewer_name VARCHAR(255) NOT NULL,
  rating INT NOT NULL,
  text TEXT,
  date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  restaurant_id INT NOT NULL,
  PRIMARY KEY(id));
```

<b>Inserting related data</b><br>

```sql
insert into types (name) values ('Italian');
insert into types (name) values ('Mexican');
insert into types (name) values ('French');
insert into addresses (street, street_number, city, postal_code, country) values ('Teststreet', '45 B', 'Paris', 79680, 'France');
insert into addresses (street, street_number, city, postal_code, country) values ('Main street', '83 A', 'Berlin', 11073, 'Germany');
insert into restaurants (name, address_id, type_id) values ('At the end of the universe', 1, 3);
insert into restaurants (name, address_id, type_id) values ('Maximum Max Power', 2, 2);
```

Then we can select restaurants and show their type name instead of just the type id like this:

```sql
select * from restaurants r, types t where r.type_id = t.id;
```

<b>Inserting more related data</b><br>

```sql
insert into reviews (reviewer_name, rating, text, restaurant_id) values (
  'Joe Schmoe',
  5,
  'Very strong food indeed!',
  2
);
insert into reviews (reviewer_name, rating, text, restaurant_id) values (
  'Jane Doe',
  4,
  'Awesome strong food!',
  2
);
insert into reviews (reviewer_name, rating, text, restaurant_id) values (
  'Anne with an E',
  5,
  'I will return for sure!',
  1
);
```

<b>Querying and joining related data</b><br>

```sql
select * from restaurants r, types t where r.type_id = t.id;
```

Or we canspecify what fields we want from the tables like this, so we don't need the id _and_ their description:

```sql
select r.name, t.name as 'cuisine' from restaurants r, types t where r.type_id = t.id;
```

Or with the use of the join keyword:

```sql
select r.name, street, street_number, city, postal_code, country from restaurants r inner join addresses a on r.address_id = a.id;
```

Inner join with more tables limiting to restaurants in Paris:

```sql
select r.name, street, street_number, city, postal_code, country, t.name as cuisine
from restaurants r
inner join addresses a on r.address_id = a.id
inner join types t on r.type_id = t.id
where a.city = 'Paris';
```

<b>Practice: More joins</b><br>

```sql
select reviews.*, restaurants.name as restaurant_name,
addresses.*, types.name as 'cuisine'
from reviews
inner join restaurants on reviews.restaurant_id = restaurants.id
inner join addresses on restaurants.address_id = addresses.id
inner join types on restaurants.type_id = types.id
where rating > 3;
```

<b>Understanding relationships</b><br>
One-to-one: One record in table A is related to exactly one other record in table B. A restaurant has one address, and that address has one restaurant.

One-to-many: One record in table A is related to many records in table B, but each record in table B is only related to one record in table A. A restaurant has many reviews, but each review is for that one restaurant.

Many-to-many: One record in table A is related to many records in table B, and each record in table B is related to many records in table A. A restaurant has many customers and customers visits many restaurants.
