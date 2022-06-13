## Section 22: Utilizing browser storage

## Day 62 - 2022-06-10

#### <b>Browser storage options</b>

The browser has some options for storing data, namely localStorage and sessionStorage as well as cookies and IndexedDB. This can be used to store temporary 'convenience' data.

Storing data on the server is for essential and persistent data.

|localStorage, sessionStorage|Cookies|IndexedDB|
|----------------------------|-------|---------|
|Simple key-value store|Simple key-value store (some config options like expire time)|Relatively sophisticated client-side database|
|Manage user preferences or basic user-data|Manage user preferences or basic user-data|Manage complex data your web app needs|
|Can be cleared by the user or with JavaScript|Can be cleared by the user or with JavaScript|Can be cleared by the user or with JavaScript|
|Easy to use, quite versatile, not goot for complex data|A bit more clunky to use than localStorage, quite versatile, sent to the server, not good for complex data|A bit clunky to use, great for complex (non-critical) data, good performance|

#### <b>localStorage and sessionStorage</b>

localStorage can be accessed in our frontend JavaScript simply with the localStorage object. It has some methods, like 'clear' to clear any data there, 'key' to look at an item at a given index, 'length' to find out the size of the storage or getItem, setItem, removeItem for working with single items.

To add an item to localStorage: `localStorage.setItem('key', 'value');`.

To add an item to sessionStorage: `sessionStorage.setItem('key', 'value');`.

The difference between session and local is that session data only lives as long as your page is open in the browser. localStorage is never cleared, unless the user does it or the browser does it because it's running low on storage.

#### <b>Getting started with cookies</b>

We can access the cookie with `document.cookie = '';` and this will add a new string to the cookie, it won't override or clear it. Under the hood this triggers a setter method, which will add this as a new key-value pair to the existing pairs. We'll have to set key=value in the string, and with template literals that would look like this:

```
document.cookie = `uid=${userId}`;
```

We need to add this from a server though, using the file protocol doesn't work. To read the value, we can call 'document.cookie' from our script.

If a cookie has the 'http only' flag set, it means the cookie is only available by the server and not frontend JavaScript code, so a bit of an extra security mechanism.

#### <b>Working with cookies</b>

We can add more data to cookies by using JSON.srtingify for instance. So we could append a stringified object to the cookie we set earlier containing just the uid. However, we don't have a nice way to get the data we want, we either get all or nothing. That is why we have a lot of string methods on the cookie object, which lets us for instance split the string on ; which is what separates the data we've set.

There could be some whitespace added, so to remove that:

```JS
const cookieData = document.cookie.split(';');
const data = cookieData.map(i => i.trim());
console.log(data);
```

The advantage of cookies is that you can set them to expire and you can send them to the server on requests.

If we don't set an expire time the cookie should expire when the browser is closed (and not just a tab) though that's really up to the browser to decide.

To set an expiration time on a cookie, we need to add '; max-age=' to it for instance, with a number of seconds for it to live. An alternative is to set '; expires=' and that takes a date for when the cookie expires.

See [Document.cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie) documentation on MDN.

#### <b>Getting started with IndexedDB</b>

MDN [documentation](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB)

Create a new database if it doesn't exist, open it if it does. Version number must be set and can be used in case you want to upgrade the database, add or remove fields and so on, so that you can have the right query for the right version of the database. There are no promises here, and the open returns an object for the database connection. We can call onsuccess and onerror on this to check if the connection succeeded or not. On success, the event object passed to the function contains an object for the database we've created / connected to. Then we can add data by going through multiple steps: Create the object store, once that transaction is complete, create the object and then finally add the data:

```JS
const dbRequest = indexedDB.open('StorageTest', 1);

dbRequest.onsuccess = event => {
  const db = event.target.result;

  const objStore = db.createObjectStore('products', {keyPath: 'id'});

  objStore.transaction.oncomplete = event => {
    const productStore = db.transaction('products', 'readwrite').objStore('products');
    productStore.add({
      id: 'p1',
      title: 'The first product',
      price: 16.99,
      tags: ['Inexpensive', 'Common']
    });
  }
};

dbRequest.onerror = event => {
  console.log('An error occurred with the database!');
};
```

And that actually gives an error, as we should apparently use 'onupgradeneeded' instead of 'onsuccess', because that's what you have to do when creating a database for the first time or if version number changes. So I guess I was wrong about being able to have multiple versions of the database and different queries for them, as this seems to ensure everyone is on the latest version.

#### <b>Working with indexedDB</b>

Now that the database is created, we can't use 'onupgradeneeded' anymore, but will have to use 'onsuccess'. Conflicting information given, 'onsuccess' will run if database was created or if it was opened? By why didn't it the first time?

In any case, to get data from the database:

```JS
const productsStore = db.transaction('products', 'readwrite').objectStore('products');
const request = productsStore.get('p1');

request.onsuccess = () => console.log(request);
```

Fortunately there are third party libraries available that makes working with this easier. `idb.js` was an example given. It can be found at https://github.com/jakearchibald/idb

