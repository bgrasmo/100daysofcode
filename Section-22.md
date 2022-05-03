## Section 22: Onwards towards databases
<b>Onwards towards databases</b><br>
Why databases? And what are databases in the first place? We've so far only stored data in files, and then read it back from that file. Since we've had very limited amount of data to work with, that has worked fine.

But to create data, we've replaced the entire content in the file with the new content. When we've read data, we've always read the entire file. When we've updated data, we've first read in the entire file, and written the entire thing with the updated content back. If we wanted to delete data, we would again read the entire file, find what to delete, delete it, and then write the rest of the file back. This works for our small data, but not for larger data sets, or multiple users.

These operations are common and referred to as CRUD operations: Create, Read, Update, Delete.

The problems with files is that multiple read / write operations might target the same file at the same time. And too many read / write operations might overwhelm our file system. So we would not store our data in files for a typical website.

Enter databases

DBMS: DataBase Management Systems are software systems optimized for data storage tasks. That takes away us having to find clever solutions to writing data or reading data to files, as that's what they are doing. they're still writing to and reading from files, but in a more optimized way than we've done so far.

They (DBMS) optimize simultaneous read / write access, optimize data storage and retrieval, optimize data querying. (Rich queries with filters and conditions so we don't have to load entire files)

There are two main database systems:
1. Relational database management systems (RDBMS / SQL databases)<br>
People think SQL is short for Structured Query Language, but it might not be, the origin might have been that it was called 'sequel' and then shortened to SQL eventually.
2. Non-relational database management systems (NoSQL databases)<br>
NoSQL does not use SQL for querying for data, but different query languages.

## Day 23 - 2022-05-02
### Going through course content for day 57:
<b>A quick introduction to SQL databases</b><br>
SQL - stores normalized data accross multiple tables

(I just learnt about tables in markdown for this)

Airports table:
| ID  | City      | Country |
|-----|-----------|---------|
| MUC | Munich    | Germany |
| JFK | New York  | USA     |
| BCN | Barcelona | Spain   |

Flights table:
| ID    | Start | Dest |
|-------|-------|------|
| FL123 | MUC   | JFK  |
| FL331 | BCN   | MUC  |
| FL591 | JFK   | BCN  |

This is said to be normalized since we don't have any nested data in any table. Every column in both tables only hold one value per row. It is also split accross multiple tables. The database management system will store these tables in files for you.

Tables have clearly defined schemas and data types, and this is set up before you start interacting with the database. For instance the ID in both tables should be some unique string, the other fields should just be strings, but we can have other types like integer as well. Without an unique ID you can not have clear relations between the tables. If 'MUC' in airports was listed twice, for two different cities, you wouldn't know which was the correct when looking it up. And the same flight can't go to two cities at the same time.

Data and relations can be queried, which is the entire point. Just storing them in a database and never looking them up doesn't provide much value. You could search for all flights that start in 'MUC' for instance, and you would only get back the first row. Or in case you don't know the airport code for Munich, you could instead search for airports where City = Munich, and id of airports is equal to start of flights. Or you could enrich the results when searching for flights that start in 'MUC' to also give info about what city and country that is by joining flights start on airports id.

SQL databases can consist of _a lot_ of tables, and typically do, but it does of course depend on the project.

<b>A quick introduction to NoSQL databases</b><br>
NoSQL is different in that instead of possibly a lot of tables, you will normally work with only a few tables. Instead of the separation between airports and flights seen in the SQL example, we could instead have a flights table that contains all the data you want to store:

<div style="display: flex; margin: 0 0.5rem;">

```json
{
  "FlightCode": 123,
  "Start": {
    "APCode": "MUC",
    "APCity": "Munich",
    "APCountry": "Germany"
  },
  "Dest": {
    "APCode": "JFK",
    "APCity": "New York",
    "APCountry": "USA"
  },
}
```

```json
{
  "FlightCode": 331,
  "Start": {
    "APCode": "BCN",
    "APCity": "Barcelona",
    "APCountry": "Spain"
  },
  "Dest": {
    "APCode": "MUC",
    "APCity": "Munich",
    "APCountry": "Germany"
  },
}
```

```json
{
  "FlightCode": 591,
  "Start": {
    "APCode": "JFK",
    "APCity": "New York",
    "APCountry": "USA"
  },
  "Dest": {
    "APCode": "BCN",
    "APCity": "Barcelona",
    "APCountry": "Spain"
  },
}
```

</div>

It seems Github strips out styling in markdown as those documents should have been shown next to each other, as they are when previewing this file in VS Code.

Here we have some data duplication, since the same airport information exists in multiple documents. That might not be a problem though, as long as the duplicated data doesn't change a lot. And an airport will typically have the same information for a long time.

The advantage with this is what we can store more information in fewer tables, and therefore get more information with fewer (and simpler) queries. This can perhaps also improve database performance since less complex queries have to be executed.

The size of the stored data might be bigger than for SQL, but that is probably not a problem. The performance bottleneck is usually the querying of data.

The way of thinking is also a little different. Instead of rows and columns, you have objects or documents stored in a table. You also don't have a clearly set schema since you can have different structures in different documents in the same table.

<b>SQL vs NoSQL databases</b><br>
Which one should we use? It depends.

If you get to decide which to use, think about the queries you'll be running and the data you need to store.

SQL databases provide more structures and rules, while NoSQL can be more flexible and reduce amount of queries needed.
