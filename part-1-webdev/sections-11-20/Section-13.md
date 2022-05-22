## Section 13: Advanced JavaScript control structures
<b>Getting started with control structures</b><br>
What are control structures? Special programming language syntax / features that allow you to control:
* Under which conditions code is executed<br>
If-statements
* How often some code is executed<br>
Loops

<b>Introducing boolean values and comparison operators</b><br>
If statements needs boolean values, which is a special type of value that is either true or false. It executes if the statement evaluates to true.

The if-statement:
```JS
if (expression) {
  // run this code if true;
}
```

What expression though? Introducing comparison and logical operators:

<b>Comparison operators (derive boolean values)</b>

Compare equality (value and/or type):<br>
==, ===

Examples:<br>
2 == 2     // true<br>
'2' === 2  // false<br>
3 === 3    // true<br>
3 === 5    // false<br>
'h' == 's' // false<br>


Greater than, lesser than, greater or equal, lesser or equal:<br>
>, <, >= <=

Examples:<br>
5 > 3     // true<br>
5 < 3     //false<br>
'a' < 'b' // true<br>
4 <= 4    // true<br>


Negation/inverse (something is not true)<br>
!, !=, !===

Examples:<br>
!(4 < 4)  // true<br>
5 !== 2   // true<br>
8 != 8    // false<br>
'4' !== 4 // true<br>
'4' != 4  //false<br>

<b>Logical operators (combine boolean values)</b>

AND - yields true if both combined values are true<br>
&&

Examples:<br>
5 == 5 && 3 < 4 // true<br>
5 == 5 && 3 > 4 // false<br>


OR - yields true if one or both values are true<br>
||

Examples:<br>
5 == 5 || 3 < 4 // true<br>
5 == 5 || 3 > 4 // true<br>


<b>Boolean and comparison operator in action</b><br>
Truthy and falsy in JavaScript: The double-equal sign doesn't check for type, so the number 2 evaluates to true when compared to the string '2'. To check for strict equality, meaning that both the value and the type have to be equal, use the tripple-equal sign: 2 === '2'

Expressions are evaluated left to right:<br>
2 === 2 || 2 === 3 && 5 === 6<br>
This returns true because the first part of the expression is true, and that is enough for the OR operator. To change what is compared and evaluated together, add parenthesis:<br>
(2 === 2 || 2 === 3) && 5 === 6<br>
This returns false.


<b>Uning booleans in if-statements (conditional code execution)</b><br>
Only execute the console.log if const myName is set to Joe:
```JS
const myName = 'Joe';
if (myName === 'Joe') {
  console.log('Hello!');
}
```

### Going through course content for day 38:
<b>A real example</b><br>
See demo.js in code-playground.

```JS
  if (remainingCharacters <= 10) {
    remaningCharsElement.classList.add('warning');
    productNameInputElement.classList.add('warning');
  }
```
<b>Alternatives with else and else if</b><br>
We now get the warning in the browser if there are less than 10 characters left. But what if the user removes some characters so there are more than 10 left? The warning doesn't go away as we only have an add statement and no remove.

We need alter our logic a little and add an else statement. If first expression is not true, execute what's in the else part instead:

```JS
  if (remainingCharacters <= 10) {
    remaningCharsElement.classList.add('warning');
    productNameInputElement.classList.add('warning');
  } else {
    remaningCharsElement.classList.remove('warning');
    productNameInputElement.classList.remove('warning');
  }
```
If remove is run on a class that doesn't exist, it does nothing. It doesn't give an error.

To extend our logic we can use `else if`. Add an error class to the CSS that should be applied if characters left is 0.

```JS
  if (remainingCharacters === 0) {
    remaningCharsElement.classList.add('error');
    productNameInputElement.classList.add('error');
  } else if (remainingCharacters <= 10) {
    remaningCharsElement.classList.add('warning');
    productNameInputElement.classList.add('warning');
    remaningCharsElement.classList.remove('error');
    productNameInputElement.classList.remove('error');
  } else {
    remaningCharsElement.classList.remove('error', 'warning');
    productNameInputElement.classList.remove('error', 'warning');
  }
```

<b>More on boolean values</b><br>
```JS
let isLoggedIn = true;
```

Given the variable isLoggedIn is a boolean already, we don't have to compare the value of the variable to true, we can just check it like this:

```JS
if (isLoggedIn) {
  console.log('User is logged in!');
}
```

In case we want to check the oposite, that the user is not logged in, we can check `if (!isLoggedIn) { ... }`

<b>Truthy and falsy values</b><br>
If we want to know if something was input (and therefore stored in a variable) we can of course check that the length of the value in the variable is more than 0. But we don't have to do that, we can just check the variable itself like this:

```JS
if (enteredUserName) {

}
```

Why does this work? Because of the truthy and falsy values in JavaScript. When we provide a non-boolean value where JavaScript wants a boolean, like in the if-statement, it will try to convert the provided value to a boolean according to certain rules.

An empty string or the number 0 will be treated as false. A string with just 0 inside it ('0') would not be treated as false, since it's not an empty string. So falsy values can be said to be treated like false by JavaScript in places where a boolean is wanted.

A string containing the word 'false' will be treated as true, because it's not empty. Again a blank character would also make it not be false. All that matters is the variable empty or not.

<b>Introducing loops</b><br>
For loops:<br>
Loop n number of times

For .. of loops:<br>
Loop through all elements of an array

For .. in loops:<br>
Loop through all properties in an object

While loop:<br>
Loop as long as a certain condition is met

<b>The for loop</b><br>

```JS
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

<b>The for ... of loop</b><br>

```JS
const users = ['Max', 'Anna', 'Joe'];

for (const user of users) {
  console.log(user);
}
```
Before JavaScript got the for ... of loop to use on arrays, a regular for loop could be used like this:

```JS
for (let i = 0; i < ourArray.length; i++) {
  console.log(ourArray[i]);
}
```

<b>The for ... in loop</b><br>

```JS
const loggedInUser = {
  name: 'Joe',
  age: 32,
  isAdmin: true
}

for (const propertyName in loggedInUser) {
  console.log(propertyName);
  console.log(loggedInUser[propertyName]);
}
```
Though 'key' is more commonly used than 'propertyName'

<b>The while loop</b><br>

```JS
let isFinished = false;

while (!isFinished) {
  isFinished = confirm('Do you want to quit?');
}
```
### Going through course content for day 39:
<b>Practice time - using the loops on an example page</b><br>
See code in loops-in-action.js in code-playground.

Trick, to quickly convert a number from a string to a number in Javascript, add a + sign in front of it:

```JS
const enteredNumber = +targetNumberInputElement.value;
```

Remember also you might not have to check if something is true or false, and then set it to a variable, you can just have the comparison on the variable and true or false will be set.
