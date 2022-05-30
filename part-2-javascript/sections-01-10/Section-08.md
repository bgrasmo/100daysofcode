## Section 8: More on arrays and iterables

## Day 48 - 2022-05-27

#### <b>What are iterables and array-like objects?</b>

What is an iterable? Technically it is an object that implements the iterable protocol and have an @@iterator method, like Symbol.iterator for instance. Or more easily accessible, that we can use the for-of loop on it.

Not every iterable in JavaScript is an array as can probably be understood from the above. Other examples are NodeList, String, Map, Set

What is an array-like object? Technically it is an object that have a length property and uses index to access items.

Not every array-like object in JavaScript is an array, as again can probably be understood from the above. Other examples are NodeList, String.

#### <b>Creating arrays</b>

| | | | |
|----|----|----|----|
|const arr = [1];| const arr = ['Hi'];| const arr = Array.of(1);| |
|const arr = Array(1);| const arr = Array('Hi');| const arr = Array.of('Hi');| const arr = Array.from(1);|
|const arr = new Array(1);| const arr = new Array('Hi');| const arr = Array.from('Hi');| |

The most common way is to just use `const numbers = [1, 2, 3, 4];`

Another way would be to create it with the New keyword: `const numbers = new Array(1, 2, 3, 4);`. Nothing new so far, but if we pass in a single number, like this: `const numbers = new Array(5);` an array with 5 empty elements will be created. The 'New' keyword can be omitted and it will behave in the same way.

Another special way is Array.from. This takes something that isn't an array, but array-like or an interable, and converts it to an array.

#### <b>Which data can you store in arrays?</b>

Strings, numbers, objects, other arrays. With nested arrays and using loops, be careful to not have non-iterables like numbers in the outer array as that would break when encountered:

```JS
const oneArray = [[1, 6], [2, 5], 4];

for (const data of oneArray) {
  for (const dataPoint of data) {
    console.log(dataPoint);
  }
}
```

#### <b>Array methods or how we can add data to or remove data from an array</b>

Add elements to an array:<br>
`array.push();` adds new elements to the end of the array.<br>
`array.unshift();` adds new elements to the beginning of the array.<br>
These return the new length of the array.

Remove elements from an array:<br>
`array.pop();` removes the last element.<br>
`array.shift();` removes the first element<br>
These return the element that was removed.

Shift and unshift are slower than push and pop because they cause the entire array to be changed, unlike just working with the last item of the array which just affects that.

If you want to replace an item, you will have to know the index of the element you want to replace, but that can then be anywhere in the array. If you add a new element but using an index that is outside the array, empty elements will be created in between to fill up the gap. Probably not a good idea to do.

#### <b>splice() - insert or remove elements somewhere in an array</b>

This method is only available on real arrays, not iterables or array-like objects. It takes some arguments: The first is the index to start at, the next is the number of elements to delete. If set to 0, no elements will be deleted. Then following that comes the elements you want to insert.

```JS
array.splice(3, 0, 'something', 'new', 'shiny');
```

This inserts three new elements starting at position 4, and deletes nothing.

To delete one element at a given position, set the first argument to the position and the second to 1. This returns the element removed.

If start position is set to a negative number it will count from the end of the array. -1 is the last element, -2 is the second last element and so on.

#### <b>Selecting ranges and creating copies with slice()</b>

Calling slice() on an array will make a copy of it. You can also tell slice to just copy the first two elements by passing in arguments 0 and 2. 0 being the start position, 2 being the end position which is not included. So start and end at the same position would return an empty array.

To select from the end of the array, use negative indexes, but be aware that end still has to be a larger number than start. So if you set -5 for start position, you can't select -8 for end position, it will have to be -4 or higher (closer to zero).

If only the start index is specified, everything from that position to the end is selected.

#### <b>Adding arrays to arrays with concat</b>

If you push an array onto an existing array, that would end up being a neste array. Or in other words, the pushed array would be pushed in as a single element. To add one array to the end of another the concat method can be used, and this method will return this as a new array:

```JS
const array1 = [1, 2, 3, 4, 5];
const array2 = [6, 7, 8, 9, 10];

const combined = array1.concat(array2);
```

#### <b>Retrieving indexes with indexOf() / lastIndexOf()</b>

If you want to find where in an array some element is, you can search for it with indexOf(). This will find the first matching value and return the index:

```JS
const array = [1, 2, 3, 3, 4, 5, 6];
console.log(array.indexOf(3)); // shows 2
```

To find the last matching element in an array, use lastIndexOf instead. That will search from the end instead of from the start.

One caveat here is that this works fine for primitive values, but not for reference values. And I thought arrays were reference values so how is this working in the first place? Apparently depending on how you create the array. With the = [] it seems to be primitive, but with = new Array it is reference.

#### <b>Finding elements with find() and findIndex()</b>

find() takes a function as an argument, and this function receives three arguments: The first is a single object of an array we can name what we want. The second argument will be the index of that single element and we can again name that what we want. The third argument will be the full array.

```JS
const personData = [{name: 'Joe'}, {name: 'Anna'}, {name: 'Jane'}];

const findUser = personData.find((person, idx, persons) => {
  return person.name === 'Anna';
});
```

find() does not create a copy, but works with the actual data, so if we do this: `findUser.name = 'Schmoe';` the name of Anna would be changed to 'Schmoe' everywhere.

Instead of finding and returning the actual object, you can find the index with findIndex. It takes in the exact same arguments as find but will return the index instead of the object.

#### <b>Is it included?</b>

The includes method can be used for checking if a value is included in the thing where you're looking for it, and it will return true or false depending on if the value was found or not. Can be used for primitive values. (Color me confused, because the instructor talks about an array having reference values, so why does this work for arrays? Not explained)

#### <b>The forEach method</b>

Say we have an array of numbers and we want to do something with every number in that array, by adding a 25% tax for instance. We could use the for of loop, do some maths on the prices and push them onto a new array or we could use the forEach method. This takes three arguments; the current value, the index of the element and the full array. Given we have the index we can transform this to an object if we want.

```JS
const prices = [5, 10, 15, 20, 25, 50, 100];
const tax = 0.25;
const taxAdjustedPrices = [];

// for (const price of prices) {
//   taxAdjustedPrices.push(price * (1 + tax));
// }

prices.forEach((price, idx, prices) => {
  const priceObj = { index: idx, taxAdjPrice: price * (1 + tax)};
  // taxAdjustedPrices.push(price * (1 + tax));
  taxAdjustedPrices.push(priceObj);
})
```

#### <b>Transforming data with map</b>

Instead of what we did above we can use matp to achieve the same result. Map takes in an array, runs a function on every element in that array, and returns a new element for every element as a new array:

```JS
const prices = [5, 10, 15, 20, 25, 50, 100];
const tax = 0.25;

const taxAdjustedPrices = prices.map((price,idx, prices) => {
  const priceObj = { index: idx, taxAdjPrice: price * (1 + tax)};
  return priceObj;
})
```

#### <b>Sorting and reversing</b>

This should be as simple as `const sortedPrices = prices.sort();` right? Of course it isn't. Numbers are sorted as strings, giving unexpected values. "Fortunately" then the sort function takes a function as an argument, which takes in two arguments that are compared. Now you need to make a comparison to check if the first argument A is greater than the second argument B. If so, return 1 and nothing will happen. If they are equal, return 0, and then if a is less than b, return -1 and their order will be swapped:

```JS
const sortedPrices = prices.sort((a, b) => {
  if (a > b) {
    return 1;
  } else if (a === b) {
    return 0;
  } else {
    return -1;
  }
});
```

What we do in the anonymous function in sort is completely up to us. though.

After an array is sorted, we can call reverse() on it, and that doesn't take any arguments as it just reverses the order of it. If that's what we want though, we could just reverse our logic in the sort function and return it in reversed order right there.

#### <b>Filtering arrays with the filter() method</b>

What if you want to reduce the amount of elements in an array based on some filter? Here let's say we only want prices larger than 25. Filter then takes in a function as a parameter and this is executed on every element of the array. Again we get the current value it's looking at, the index of that value and the entire array. This function has to return a value, and that should be true if the element should be kept, false otherwise:

```JS
const filteredArray = prices.filter((price, idx, prices) => {
  return price > 25;
});
```

#### <b>Where arrow functions shine</b>

In the above filtering example where we only use the price parameter, and then only return the simple comparison, the function can be simplified to this:

```JS
const filteredArray = prices.filter(price => price > 25);
```

If that isn't short enough, the price parameter could be shortened to just 'p' and then it can't get any shorter and it should still be readable.

```JS
const filteredArray = prices.filter(p => p > 25);
```

P is the parameter and then the value of that parameter is compared to 25 and returns true if bigger, false if not.

#### <b>The important reduce() method</b>

To sum up our prices, we could do it like this:

```JS
const prices = [5, 10, 15, 20, 25, 50, 100];
let sum = 0;
prices.forEach((price) => {
  sum += price;
});
console.log(sum);
```

Or we can use the reduce method which lets use simplyfy the above code to this:

```JS
const sum = prices.reduce((prevValue, curValue, curIndex, prices) => {
  return prevValue + curValue;
}, 0);
```

Now the last two parameters, the current index and the original array are not that often used. Perhaps the index could be used some times, but the original array not so much.

So the first parameter to reduce is the function. The second parameter is optional, and is the initial value with which you want to start. If we want to work with numbers, sum something, we should start with 0.

As is in the name, reduce takes an array and reduces it to a simpler value, a single number or a single string or whatever it is.

As was mentioned, the function passed to reduce is called for every element, and for the first exectution the prevValue is the initial value we set. (The 0 as the optional second parameter.) Current value is the first element of the array.

Again we have to return the updated value. Now in the second execution prevValue is the value we returned from the first execution (so 0 + something) and the curValue is the second value in the array.

So given a starting value of 0, an array of 1, 2, 3, the prevValue will first be 0, then 0+1=1, then 1+2=3, then the function will return 3+3=6 in the last execution.

Again we can really shorten this expression to this:

```JS
const sum = prices.reduce((prevValue, curValue) => prevValue + curValue, 0);
```

#### <b>Chaining methods in JavaScript</b>

Now it gets interesting. I believe the web dev course briefly touched upon this subject by calling another function directly on map and that's what is taught here.

Instead of first calling map to get a new array stored, and then call reduce on that new array, reduce can be appended directly to the map function. This way reduce will get the result from map directly without going through an extra variable.

Old example:

```JS
const array = [{price: 10}, {price: 20}, {price: 30}, {price: 50}];
// Get just the prices from the objects. (Each object is the input, then the price is just returned)
const prices = array.map(object => object.price);
// Sum up the prices
const sum = prices.reduce((sumValue, currentValue) => sumValue + currentValue, 0);
```

We could write all the logic in the reduce function:

```JS
const sum = array.reduce((sumValue, currentValue) => sumvalue + currentValue.price, 0);
```

But we might not want to do that if we have more complex extraction logic and have a reusable map function we want to use.

Skipping the part where the function to map is defined elsewhere as a callback function now, to focus on method chaining:

```JS
const sum = array
  .map(object => object.price)
  .reduce((sumValue, currentValue) => sumValue + currentValue, 0);
```

## Day 49 - 2022-05-28

#### <b>Arrays and strings - split and join</b>

Given a string we've perhaps read from file we perhaps want to split it by the delimited fields and store it in an array to work with later, we can do this:

```JS
const data = 'New York;Restaurant;10.99;2022';
const transformedData = data.split(';');
```

The character to split on can be other things as well, like just a space, comma, exclamation mark or similar. The split method can take in a second, optional arguments to limit the number of elements created. To just get the first 2 elements split can be used like this: `data.split(';', 2);` and the rest of the elements will be ignored.

Note that everything will be stored as string elements in the array, so if you want your numbers to be numbers you will have to parse them with parseInt for instance.

The reverse operation can be performed with join. Given you have an array but you want the elements in a string:

```JS
const nameFragments = ['Joe', 'Schmoe'];
const fullName = nameFragments.join(' ');
```

By default join uses comma as separator when creating the string but that can be changed to space for instance as shown above. Join takes no further arguments.

#### <b>The spread operator</b>

The three dots '...' are called 'the rest operator' when used in functions and 'the spread operator' when used to copying objects or arrays. When used as spread operator it can't be used on its own with the array you want to copy: `const newArray = ...array;` But it will have to have the square brackets around it: `const newArray = [...array];`. For objects you will need to use curly braces.

This can also be used in a similar way to the rest operator where you want to send in a list of arguments to a function, and not an array of arguments. Math.min() which finds the smallest number in the list requires such a list: `const minimum = Math.min(...prices);`

Fun fact: While the array is copied, if the array contains objects, these objects are not copied but their references are kept.

```JS
const array = [{price: 10}, {price: 20}, {price: 30}, {price: 50}];
const newArray = [...array];
array[0].price = 15;

console.log(array, newArray);
```

The first price is now set to 15 in both arrays even though it was changed after copying.

To actually copy the object values as well and not just their references, we again can use map:

```JS
const copiedPrices = [...array.map(priceObject => ({price: priceObject.price}))];
```

Remember when you return an object from an arrow function like this it has to be wrapped in parenthesis. This isn't the best example since we don't actually need the spread operator and the square brackets since map already returns a new array:

```JS
const copiedPrices = array.map(priceObject => ({
  price: priceObject.price
}));
```

If the original array contains another layer of object, we again would have the same problem that just the references to this nested layer would be copied. We can then again copy it with the spread operator, but you could end up duplicating a lot of code by doing this. Also it could be fine that some values are references, as you should aim to only copy what you want to change without it being changed both places.

#### <b>Array destructuring</b>

Again this was touched upon in the web dev course. Given the name fragments array, we could extract the elements to individual variables by using the index of the array. However we can instead use 'array destructuring' and set the variables we want in square brackets and JavaScript will populate them for us.

```JS
const nameFragments = ['Joe', 'Schmoe', 'Mr.', 35];
// const firstName = nameFragments[0];
// const lastName = nameFragments[1];
const [ firstName, lastName ] = nameFragments;
```

If we have more elements in the array we are interested in, we can store the rest in an array using the rest operator so we can access it if we want, though not as conveniently as having it in separate variables.

`const [ firstName, lastName, ...remains ] = nameFragments;`

#### <b>Maps and sets overview</b>

Javascript has three major iterable data structures, with array perhaps being the most important one.

|Arrays|Sets|Maps|
|------|----|----|
|Store nested data of any kind and length|Store nested data of any kind and length|Store key-value data of any kind and length, any key values allowed (objects and arrays can be keys)|
|Iterable, many special array methods available|Iterable, some special set methods available|Iterable, some special map methods available|
|Order is guaranteed, duplicates are allowed, zero-based index|Order is not guaranteed, duplicates are not allowed, no index based access|Order is guaranteed, duplicate keys are not allowed, key-based access|

#### <b>Working with sets</b>

A set is created with `new Set();` and it takes in an iterable as input, so it can be a nodelist, an array or even another set. IDs could be useful to store in a set since that doesn't allow duplicates.

Logging the set created shows and index so it would seem we can access by index but that is not allowed and returns 'undefined' if we try. Instead we can use one of the set methods made available to us. Now there is no get method, and that makes sense since every value can only be stored once. In other words, if you're looking for a given value, you know what value you are looking for and it doesn't make sense to get it from the set. You can however check if the set contains this value with the 'has' method.

```JS
const ids = new Set([3, 5, 7]);
console.log(ids.has(5)); // Returns true or false
```

Values can be added to the set with .add and if you add a value that already exists, the set will be returned to you, but other than that nothing happens. 2 isn't now stored twice.

If you want to go through all values in a set, that can be done with the 'entries' method. This method returns an iterable and so it can be used in a for of loop for instance.

```JS
for (const entry of ids.entries()) { 
  console.log(entry);
}
```

Now this will return an array of two identical values for each entry in the set. Aparently to be inline with the entries method available on maps which also returns two values, though there they are different. It is maybe useful if you'd want to switch from map to set or vice versa and you get the same data strcture returned.

`
[ 3, 3 ]
[ 5, 5 ]
[ 7, 7 ]
`

An alternative to entries is 'values' which only return the set values once. To only get the values once, accessing the first element of the array could also work.

To manage the set, add as was shown before can be used to add values or delete can be used to remove values.

And to finish, sets are for working with values that are / has to be unique.

#### <b>Working with maps</b>

What I think I got from the introduction here is that you can have some regular objects which you use various places in your code. Now for some situations you want more data in those objects, but to not clutter the objects or possibly create problems elsewhere you don't want to actually add this new data to the objects themselves. That is what map can help with.

Map is created like set with the 'new' keyword, but map takes key-value as input and key-value here is quite flexible as it can be strings, numbers, arrays, objects or more.

```JS
const person1 = { name: 'Joe' };
const person2 = { name: 'Jane' };

const personData = new Map([[person1, [{ date: '2022-05-01', price: 10 }]]]);
console.log(personData);
```

I did not get why map first needs an array, then it needs another array, and inside that again we can add our extra information.

To get data from the map we use the get method, and we can send in our object as the thing we want to get:

```JS
console.log(personData.get(person1));
```

That will give us the extra information we set for this object. So I guess I understood the introduction correctly, now I just need to find out what's up with all that nesting.

To add information to a map use the set method:

```JS
personData.set(person2, [{date: '2022-04-30', price: 15.99}])
```

To get all information from the map there are three different ways. First we can use the for of loop:

```JS
for (const entry of personData.entries()) {
  console.log(entry);
}
```

We could use array destructuring here since we get exactly two elements, a key and the value:

```JS
for (const [key, value] of personData.entries()) {
  console.log(key, value);
}
```

If you're just interested in the stored keys, the keys method can be used:

```JS
for (const key of personData.keys()) {
  console.log(key);
}
```

Then we can do the same for just the values:

```JS
for (const value of personData.values()) {
  console.log(value);
}
```

#### <b>Maps vs objects</b>

|Maps |Objects |
|-----|--------|
|Can use any values and types as keys |May only use strings, numbers or symbols as keys |
|Better performance for large quantities of data |Perfect for small to medium sized sets of data |
|Better performance when adding + removing data frequently |Easier / quicker to create, typically also with better performance |

#### <b>Understanding WeakSet</b>

This sounds like it's about garbage collection. If we have an object and we 'clear' it by setting it to null, JavaScript will eventually free up that memory. However, if that object was part of a set, JavaScript will detect this and not clear it.

With WeakSet JavaScript will clear the object when all other references to it are cleared, even though it's not cleared from the set.

#### <b>Understanding WeakMap</b>

Pretty much same as WeakSet, with limited methods available given we can't guarantee that the object exists anymore.

#### <b>Section wrap up</b>

[Array documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) on MDN.

