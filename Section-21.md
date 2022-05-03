## Section 21: Exploring more advanced JavaScript concepts
### Going through course content for day 54:
<b>Functions and default parameters</b><br>
We can set default values for parameters to functions, and thereby make them optional. In other words, we want to be able to call a function both with a parameter, and without and it shouldn't fail.

Calling this function without an argument:
```JS
function greetUser(userName) {
  console.log('Hi there ' + userName + '!');
}
```

Would make it output `Hi there undefined!`. So not working as intended.

To set a default value, we set it in the function definitom like this: `function greetUser(userName = 'user')`. Now calling it without any parameters it would output `Hi there user!`. If we send in a parameter, that would override the default.

If the function takes multiple parameters as input, the ones with a default value has to be at the end. The reason for that is that they become optional. We cam send a value for them, but we don't have to. If the first value was optional, JavaScript wouldn't know what to do, if the argument passed should be in the first place or the second for instance.

<b>Rest operator and the spread operator</b><br>
We want to make a function that takes in a list of numbers and sums them up. We could expect an array as argument, and then loop through that array with for ... of adding each number found and return that, but JavaScript has a shorthand for doing this where you don't have to change your list of number into an array just to call this function. This feature is called 'rest parameters'. In your function definition, you can add three dots in front of the paramter name:

```JS
function sumUp(...numbers) {
  let result = 0;
  for (const number of numbers) {
    result += number;
  }
  return result;
}
```
This states that this function accepts any amount of parameters, and that they will be merged into an array behind the scenes. So `sumUp(1,2);` will work just as well as `sumUp(1,2,3,4,5,6,7);`

Now then, we if we have a list of numbers in an array, and pass that array to our sumUp function, what will happen? Unexpected result!
```JS
const inputNumbers = [1, 5, 10, 11, 20, 31];
console.log(sumUp(inputNumbers));
```
Results in `01,5,10,11,20,31` being output. The sumUp function is written such that it wants a list of values, but it gets a single value which holds an array and JavaScript does not check that.

To fix this, if you have an array, but the function wants a list of values, we will have to convert the array into that list of values. That can again be done with the three dots, but now in the function call:

```JS
console.log(sumUp(...inputNumbers));
```
And this now returns the correct result of 78. In this case, the three dots is known as the spread operatior, as it spreads an array into multiple individual values.

<b>Summary:</b><br>
Rest parameters:<br>
* Combine any mount of received parameters into an array
* Used in funtion parameter list (when defining a function)

Spread operator:<br>
* Split array or object values into a comma-separated list of values
* Used in any place where an array or object should be split up

<b>Functions are objects</b>
Internally in JavaScript and behind the scenes, functions are objects. This is best seen in the browser console. Add a function like this: `function add(num1, num2) { return num1 + num2}` and then console.log or even better, console.dir it. If you expand the result, you'll see key value pairs like we've seen in our objects before. And these are indeed key value pairs of our function object that our function is.

This means we can add properties to function, though it isn't something we typically do. But an example of where it is useful is in express, which can be executed as a function, and then be used like an object when we access properties.

<b>Working with template literals</b><br>
We can use backticks instead of concatenating multiple elements together. That also allows us to have multiline strings, which single-quotes doesn't allow. But perhaps more importantly we can add dynamic values inside the string, without concatenating:

```JS
console.log(`A string with a value after it: ${number} and again a string`);
```

<b>Primitive vs reference values</b><br>
Why does this code work?

``` JS
const storedRestaurants = JSON.parse(fileData);
storedRestaurants.push(restaurant);
```

We've declared a constant and you shouldn't be able to change the value stored in the constant, and yet we're able to push new values to it. Because this is an array, and arrays are actually objects under the hood, and objects are stored in a special kind of memory by JavaScript. Strings, numbers, booleans and so on are stored in a different kind of memory because they are primitive values. Objects on the other hand are reference values.

Primitives are simple, it's a single number or a single string for instance. Reference values like objects for instance are more complex since they can contain multiple values, multiple key/value pairs and maybe even some methods.

So primitives are stored in a more basic kind of memory, while reference values are stored in more advanced memory.

Because objects can be more complex, they are stored in such a way that unnecessary copies are avoided. Primitives which are simple doesn't take up a lot of space an memory, but a complex object can. Because of that we want to avoid copying objects around.

I think pointer information from the C language would help here. I'm not really able to follow what the teacher is saying, but guess what he means is this: For primitive values, you have the actual value stored. For reference values (objects/arrays/functions) you have a pointer to their place in memory. In other words, when you do things to an array you defined previously, you are actually working on the original array, you don't have your own copy of it. You actually only have a reference (pointer) to the original array, and are changing that.

That should explain why, if you've defined a constant that is an array, you can't set that constant to be a new array. Because the new array would occupy a difference space in memory.

But quite honestly it's easy enough. Arrays, objects and functions can be updated even if they're defined as constants, because the constant is just a reference to their place in memory, primitive values can not be updated because they point to their actual value, and we've said we don't want to be able to update those.

Now then, to increase the complexity, take the following example where we've defined a person object like this:

```JS
const person = { age: 32 };
```

Then we create a function to calculate years as adult, like this:
```JS
function getAgultYears(p) {
  p.age -= 18;
  return p.age
}
```

Then we call the function with the person object (but how does this function pick out the age from that?):
```JS
console.log(getAdultYears(person));
```

And this somehow returns 14 as is expected from 32 - 14. But now look what happens when we console.log the person object:

```JS
console.log(person);
```

We get the object as expected output, but with age value changed from 32 to 14...

The reason is that we sent in an object, JavaScript looks up the address for that object, and then changed the value for that object and not only the person object in the function, but the original object as well since it's the same object.

As opposed to "there is no spoon", there is only one object, because we're working with the address to it. Again, since objects can be very complex, new objects are not passed around but rather the address to the original object.

What's worth noting here is that this operation can have an unintended side-effect, as we ended up changing the original person object. How can we avoid this? By not updating the person (p) object, and instead just returning p - 18.

If we have a function that needs to manipulate the object itself, we can work around this problem by passing in a copy of the object. That can be done by passing in an object with all the properties like this: `getAdultYears({ age: person.age });`. Or we can just use the spread operator: `getAdultYears({ ...person });` as that would spread our person object into a new object in this function.

Here's an example where the original array is updated, even though we push to another array, because that second array simply got the address to the original array:

```JS
const hobbies = ['Sports', 'Cooking'];
const newHobbies = hobbies;
newHobbies.push('Reading');
console.log(hobbies);
```

## Day 22 - 2022-05-01
### Going through course content for day 55:
<b>Custom error handling with try / catch</b><br>
We'll create a new file 'errors.js' for this concept, and this example since it uses the fs package will only work in Node, but the overall logic and way of doing things will work in the browser as well. We're just setting up some function to fail (because it tries to read a file that doesn't exist).

How do we catch this error so we can handle it gracefully? We can let JavaScript "try" to execute the code (it obviously will execute it, it can't just try something). If that fails, we can catch the error that occurred.

```JS
function readFile() {
  try {
    const fileData = fs.readFileSync('data.json');
  } catch {
    console.log('The file read failed!');
  }
  console.log('Hi there!');
}
```

One obvious advantage is that when we catch the error, the function execution doesn't stop. Without it, the last console.log would never run.

Why don't we wrap everyhing in try catch then? Because that will catch errors that should let the application crash, that you should fix during development. That something unexpected went wrong might be harder to detect when handled gracefully. Another reason is that different errors that stem from different sources should be handled differently from each other. So try catch then should only be used in places where we can expect some errors in some circumstances, and only for as little code as possible.

<b>Error data and throwing custom errors</b><br>
We actually get some data, some more information when something fails, typically in an object. We can get a hold of that data like this:

```JS
try {
  failingFunction();
} catch (error) {
  console.log(error.message);
}
```

We can also throw our own errors:

```JS
function dosomething() {
  // We've done something
  throw { message: 'The thing we did failed' };
}
```

<b>Variable scoping and shadowing</b><br>
What is scoping? It means that variables, constants and functions can only be used in certain places, or more precisely, they are only available in the block where you defined them.

What is a block? Something inside curly braces, except for the creation of objects. You don't have a block in there: `const person = { age: 32 };`, but the person object belongs to some block.

```JS
function readFile() {
  let fileData = 'string'; // Make it available in the entire function
  try {
    const numbers = 0; // This is only available in this try block
    fileData = fs.readFileSync('data.json');
  } catch (e) {
    console.log(`An error occurred: ${e.message}`);
    console.log(numbers); // This will fail
    console.log(fileData); // But this will work
  }
  console.log(numbers); // And this will fail
  console.log(fileData); // And this will work
}
```

In total this is called block scoping.

What is shadowing? The situation where you define a variablename again, but in a smaller block:

```JS
function readFile() {
  let fileData = 'string';
  try {
    const fileData = fs.readFileSync('data.json');
  } catch (e) {
    console.log(`An error occurred: ${e.message}`);
  }
  console.log(fileData);
}
```

Here fileData was defined again in the try block, and that const is what being used in there, and it only exists in there. As soon as we're outside the try block that const vanishes, and we're left with the fileData defined at the top of the function. The last console.log will therefore output 'string' and not whatever data was read in from the file.

I again think some reference to C, or at least something with pointers and memory addresses would make it easier to explain this as I guess that's what going on here.

Somehow hoisting was not explained in this section, I expected that.

<b>Introducing classes as object blueprints</b><br>
Given the following object:

```JS
const job = {
  title: 'Developer',
  location: 'New York',
  salary: 50000,
};
```

What if we need multiple object like this, but with different values? Instead of having to create new objects like this: `const job2 = { ... }; const job3 = { ... };` we can use blueprints. Date is a good example for this, and one that we've actually used before: `console.log(new Date().toISOString());`.

We can create date like this:

```JS
const date = new Date();
```

What we really have there then is an object, and it comes with certain utility functions (or methods) that allow us to change its output:

```JS
const date = new Date();
console.log(date.toDateString());
console.log(date.toISOString());
```

How do we create a blueprint then? By using the class keyword. A class is a blueprint for an object. Then we give the blueprint a descriptive name, and the naming conventions for this is that it should start with a capital letter. Then we need to add a special method called 'constructor'. This tells JavaScript how to construct a concrete instance of this class, how to construct an object based on this blueprint. The constructor keyword is reserved for this in JavaScript.

```JS
class Job {
  constructor() {}
}
const developer = new Job();
```

When we call Job like that with new in front, the constructor method in the object is executed. So the constructor method is required. In the constructor method you can do what you want. The Date class for instance will get the system time and date and return that. We here however want to set up an object with some properties that can hold some values. For this we need to use another special keyword called 'this'.

'This' refers to the object that will be created and we can use dot notation to read or write properties. Since we're in the constructor and nothing exists yet we can assign the properties we want, that will then be added to the object when it is created.

Since the constructor is a method it can take input, so we set up some parameters it expects and then when the object is created, the parameters will be added as properties with values in the object:

```JS
class Job {
  constructor(jobTitle, place, salary) {
    this.title = jobTitle;
    this.location = place;
    this.salary = salary;
  }
}
const developer = new Job('Developer', 'New York', 50000);
```

The developer object made from the blueprint looks the same, and is the same kind as the object literal we created a little earlier. With console.log we can see that, and we also see that Node gives us the name of the blueprint used to create the object:

```JS
// Object literal:
{ title: 'Developer', location: 'New York', salary: 50000 }

// Object created from blueprint Job:
Job { title: 'Developer', localtion: 'New York', salary: 50000 }
```

Now by having this blueprint, we can easily generate multiple job objects by executing the code over and over again.

<b>Classes and methods (and this)</b><br>
We can add our own methods to an object we create with the class keyword. That has to be done outside the constructor method, as that is reserved for creating the object:

```JS
class Job {
  constructor(jobTitle, place, salary) {
    this.title = jobTitle;
    this.location = place;
    this.salary = salary;
  }
  describe() {
    console.log(`I'm a ${this.title}, I work in ${this.location} and I earn ${this.salary}`.);
  }
}
```

We again need to use the 'this' keyword to refer to the properties in the object that was created.

<b>Destructuring objects and arrays</b><br>
Given this simple array, we want to get the individual elements and store them in their own variables, as it can be more convenient to refer to them by name instead of having to deal with array element position all the time:

```JS
const input = ['Joe', 'Schmoe'];
const firstName = input[0];
const lastName = input[1];
```

For this scenario, we can instead use what's called array destructuring. That allows us to define multiple variables or constants in one go, and even without having to refer to array element position:

```JS
const [ first, last ] = input;
```

If there had been more than two values in the array, we would only have gotten the first two as we've only defined two constants. That also means position matters!

This can also be applied to objects, but then position doesn't matter as we'll refer to the properties we want to destructure:

```JS
const job = { title: 'Developer', location: 'New York', salary: 50000, };
const { title, location } = job;
```

We now get new constants with the same name as the property in the object. In case you don't want that, you can change it like this:

```JS
const { title: jobTitle, location: jobLocation } = job;
```

Flashback now to the UUID package, as the instructions there said to use object destructuring when importing the package:

```JS
const { v4: uuidv4 } = require('uuid');
uuidv4();
```

### Going through course content for day 56:
<b>Diving into asynchronous code and callback functions</b><br>
We'll start by copying the content from the errors.js file to a new file we call async.js, but we remove try / catch from it. We'll also create a data.txt file with some text in it, and then read from the text file instead of the json file.

```JS
const fs = require('fs');

function readFile() {
  let fileData;

  fileData = fs.readFileSync('data.txt');

  console.log(fileData);
  console.log('Hi there!');
}
readFile();
```

Outputting what was read in we now get a buffer again. To force a conversion to a string we can add .toString() to it, and it will be readable for us. That is a built in method that can be used on basically all objects and values.

Nothing new here, but let's look at how we read in the file: `fileData = fs.readFileSync('data.txt');`. We specifically use Sync to read the file in, and that blocks the rest of the code from running while this operation is in progress. Instead we can use async, and that means the operation can be executed simultanousely with other operations, and that it does not block the rest of the code from executing while in progress.

To read the file asynchronously we remove the Sync part. But that call now fails, as it now expectes a second argument, a callback function. This function will be executed by readFile once reading the file is done. It can perhaps be compared to adding an event listener and waiting for clicks that we did previously in the course.

```JS
fileData = fs.readFile('data.txt', () => {
  console.log('File parsing done!');
});
```

Executing the file now, and it still fails, this time with `TypeError: Cannot read properties of undefined (reading 'toString')`

The problem is that fileData at this point is undefined, because the file hasn't finished reading in yet. Another difference is that the async version doesn't return the file data, so we can't actually store it in the variable, like we did with the Sync version. The data will actually only be available in the callback function we defined.

With the finished version:

```JS
function readFile() {
  let fileData;

  fs.readFile('data.txt', (error, fileData) => {
    console.log('File parsing done!');
    console.log(fileData.toString());
  });
  console.log('Hi there!');
}
readFile();
```

We get this in the terminal:

```zsh
Hi there!
File parsing done!
This works - data from the text file
```

So we see the console.log for 'hi there' was executed before file parsing was done.

Looking at the documentation for fs.read for instance, we see that it takes a callback function as input, and that indicates its an asynchronous operation as it will execute that function at some point in the future.

<b>Introducing promises</b><br>
What if we have multiple asynchronous tasks that depend on each other? For instance we need to read data from a file and then stores them in a database? Nesting these inside each other is referred to as callback hell, and the code is quite difficult to read.

To avoid this we can use promises, in this sense it is something that will happen in the future. "If you can lend me some money now, I promise to return it next week."

This is build into JavaScript and can be wrapped around asynchronous operations. For the fs package, we can import it in a way that gives us the promise versions of the methods: `const fs = require('fs/promises');`

The readFile method does not want a callback anymore as it returns a promise, which is a kind of object. This object is standardized and has certain properties and methods, and the one that will help us here is the 'then' method. This 'then' method now takes a function as an argument which again might return some value depending on how the promise is configured.

```JS
function readFile() {
  fs.readFile('data.txt').then((fileData) => {
    console.log('File parsing done!');
    console.log(fileData.toString());
  });
  console.log('Hi there!');
}
```

The output is identical to the other version with just a callback function, but the advantage with promises is that you can write code in a more structured way. If you inside the callbac function wants to have another async operation, you can easily do that, and then add a new 'then' on that callback function. That can be formatted so instead of the deep nesting and indentation with callback hell, it looks like this:

```JS
function readFile() {
  fs.readFile('data.txt')
    .then((fileData) => {
      console.log('File parsing done!');
      console.log(fileData.toString());
      // return anotherAsyncOperation();
    })
    .then((someVariable) => {
    // Now that other async operation is finished as well
    });
}
```

That is called a promise chain.

<b>Asynchronous code and error handling</b><br>
Now both with callback functions and promises, things can go wrong. Since async operations are started, and the code coming afterwards is executed without waiting for the result of the async operation, we can't use try/catch around the promise. We can't do that with a callback function either, that would not work as expected. Try would only check if readFile succeeds, and not if the result of the file read is a success.

In the callback approach for readFile, we get the error parameter we can check. For promises it is a bit different, as we have the catch method to catch any errors. So this is almost like try catch without the try, but catch here takes a function that gets the error object.

```JS
function readFile() {
  fs.readFile('data.txt')
    .then((fileData) => {
      console.log('File parsing done!');
      console.log(fileData.toString());
      // return anotherAsyncOperation();
    })
    .then((someVariable) => {
    // Now that other async operation is finished as well
    })
    .catch((error) => {
      console.log(`We got an error! ${error.message});
    });
```

<b>Improving code with async / await</b><br>
This concept only applies to functions that return a promise.

Promises allow us to write code a little bit more structured than having multiple functions nested inside each other, with lots of indentation. We still have to write those extra '.then' methods though.

Imagine we only have one asynchronous function, but that function takes quite a while to run. Or possibly multiple operations that depend on each other, but should not be started at the same time. Most packages won't give us the option to choose between sync and async versions like the fs package does, but most probably will only have the async version. In that case we'll be stuck with using a promise or a callback function, even though we know that the code after reading the file should only execute once the file read is done.

In scenarios like this, we can simplify our code with async / await:

With async / await we can turn any function into an async function. That is done by simply adding the async keyword in front of it. That means this function now will return a promise without us having to return one. When doing that, we can use the 'await' keyword inside the function in front of any method that returns a promise. In that case we can get rid of '.then' and instead store the result in fileData like we did previously:

```JS
async function readFile() {
  const fileData = await fs.readFile('data.txt')

  console.log('File parsing done!');
  console.log(fileData.toString());
  console.log('Hi there!');
```
With await, JavaScript will wait for the operation to finish before it continues executing the code below.

Under the hood. JavaScript will add '.then' to that promise for us, and it will return the value which we would otherwise get in the '.then(fileData) =>'. In other words, this will behave as if we had used the readFileSync where we got the file contents returned to us.

So this looks like synchronous code to use, even though it is asynchronous under the hood, and it might be easier to write and read afterwards. A way to think about it could be that JavaScript puts all the code after the await into the '.then' block. It might look like a step back since we started using asynchronous code to perform multiple operations simultaneously, but if we don't have a use case where that is important and the code only returns a promise to us, we can simplify with async / await.

Since this again looks like synchronous code, we can use try / catch to handle errors gracefully here.

```JS
async function readFile() {
  try {
    const fileData = await fs.readFile('data.txt')
  } catch (e) {
    console.log(e.message);
  }
}
```

I'm not sure I get why putting code inside '.then' is a problem, given we've turned the entire function into an async function so the function itself won't block, but we want to block execution inside that function until an async operation has finished. It's been said to be a simplification, but I'm not sure I understand the complexity with having a '.then' block then.

I guess I'll find out when I get some experience with it myself.
