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
  const priceObj = { index: idx, taxAdjPrice: price * (1 + tax)}
  // taxAdjustedPrices.push(price * (1 + tax));
  taxAdjustedPrices.push(priceObj);
})
```

