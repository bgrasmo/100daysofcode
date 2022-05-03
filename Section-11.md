## Section 11: Understanding the JavaScript basics
<b>Introduction to JavaScript</b><br>
I'm familiar with some basics already, so these notes will probably not be very thorough and will probably skip over pieces I feel I know very well.

What is JavaScript? A programming language that can be executed by browser. It is in fact the only programming language browsers can execute. That being said, it is also a programming language you only need a browser to use, and who doesn't have that these days?

What we have so far:<br>
HTML - Define structure and semantics<br>
CSS - Style the elements and page content<<br>

What can JavaScript do then? Change the page after it was loaded! JavaScript can do this dynamically without loading a different HTML file, it can do behind the scenes calculations and much, much more!

Some use cases:<br>
Update displayed date behind the scenes, like weather or stock data or chat messages that can be fetched dynamically without reloading the page<br>
Display or use a timer to then do something when the timer is reached<br>
Validate more complex user input and show error message and change styles on elements at the same time<br>
Display and manage complex overlays<br>
Re-order, hide/show or remove elements on the screen, for instance in a drag and drop list<br>
Keep parts of websites working even if the internet connection is lost (would like an explantion on this but none was given).

<b>What will you learn in this module?</b><br>
Syntax: It's the grammar of a programming language, or the rules you have to follow when writing code.<br>
Core features: variables and values, arrays and objects, functions, working with the DOM and finally control structures.<br>

<b>Introducing values and variables</b><br>
Understanding values:<br>
Text, "This is an example of text", which will be referred to as string from now on.<br>
Numbers, 45, is another key value.

When we work with values, we typically do that in the context of variables, another key concept in any programming language. You can think of a variable as a box, that holds something. What it holds is the value. A variable has a name, so you later can reference the correct "box".

## Day 14 - 2022-04-23
### Going through course content for day 30:
<b>Adding the ```<script></script>``` element.</b><br>

Can be added both to head and body. Like the style element it does not render anything on the screen. Can take in JavaScript directly between the tags, or load it from a file with the src="" attribute.

```HTML
<script>
  alert('Warning! This is an alert!');
</script>
```

Use camelCase for naming variables and functions in JavaScript. First letter lowercase, each word after that should be capitalized. No spaces.

```JS
let warningMessage = 'Warning! This is an alert!';
alert(warningMessage);
```

<b>"Outsourcing" JavaScript to external files</b><br>
HTML files should be for HTML, and should not be "bloated" with loads of JavaScript, so we'll move that into it's own file, and load it like this:
```HTML
<script src="script.js"></script>
```

<b>Introducing arrays</b><br>

```JS
let hobbies = ['Photography', 'Reading', 'Rowing'];
alert(hobbies);
alert(hobbies[0]);
alert(hobbies[2]);
```

<b>Introducing objects</b><br>

```JS
let job = {
  title: 'support',
  place: 'abroad',
  years: 5
};
```
### Going through course content for day 31:
<b>Splitting code accross multiple lines</b><br>
See above for object example. Strings can't be split like that, unless backticks are used around the string instead of single or double-quotes.

<b>Accessing object properties</b><br>

```JS
alert(job.title);
alert(job.years);
alert(job.place);
```

<b>Performing operations</b><br>

```JS
let age = 32;
let yearsAsAdult = age - 18;
let multiply = age * 2;
let divide = multiply / 4;
age++;
age += 1;
++age;
age--;
age -= ;
--age;
```

<b>Onwards to custom commands</b><br>
Don't Repeat Yourself, basically. Showing how we're doing the same calculations twice, and if you want to change it, you have to change it both places. Instead of doing that, we should define our own commands which we can use in multiple places. We do that with functions.

<b>Introducing functions</b><br>
Function names should not describe what's in them, but what they do.

```JS
let age = 32;
let yearsAsAdult;
function calculateYearsAsAdult() {
  yearsAsAdult = age - 18;
}

calculateYearsAsAdult();
alert(adultYears);

age = 45;
calculateYearsAsAdult();
alert(adultYears);
```

<b>Functions and variables</b><br>
Variable shadowing - can override variables from outside functions inside them. Also variables have to be defined before the function is defined for the function to access it.

<b>Returning values</b><br>

```JS
let age = 32;
function calculateYearsAsAdult () {
  return age - 18;
}

let yearsAsAdult = calculateYearsAsAdult();
```

<b>Passing data into functions with parameters</b><br>

```JS
function calculateYearsAsAdult(input) {
  return input - 18;
}
let yearsAsAdult = calculateYearsAsAdult(32);
```

<b>Functions - a summary</b><br>
No notes, just repeating what was said about functions already.

### Going through course content for day 32:
<b>Time to practice</b><br>
See exercise.js file for task and solution.

<b>Introducing methods</b><br>
A method is a function in an object. It is then called a method, not a function. Just as a variable in an object is called a property.

```JS
let person = {
  name: 'Joe',
  greet() {
    alert('Hello ' + name);
  }
}
```
 To access the method:
 ```JS
 person.greet();
 ```

 <b>Make our developer life easier</b><br>
 Use ```console.log(toBeOutPut)``` from now on instead of alert, so we don't have to click away those boxes each time. Find the output in the console of devtools.

 <b>Math operations and different types of numbers</b><br>
 Integers: Whole numbers without decimals.<br>
 Floats: (Floating point) - Numbers with decimals.

 <b>The modulus operator</b><br>
 Returns the remainder of the division: 10 % 4 = 2 and not 2.5 because 2*4=8 and 10-8=2, the remainder.

 <b>Math operations and math rules</b><br>
 Multiplication and division has a higher priority than using plus or minus.
 
 ```JS
 console.log(10 + 3 - 5 * 10); // -37 because 5*10 is calculated first, then 10+13 = 13-50=-37
 ```

 Can add parenthesis around the expression you want to be calculated first
 console.log((10 + 3 - 5) * 10); // Now it's 10+3+5=18 and then * 10 = 180
```
 result = 10*4; // 40
 result = result +1; // 41
 result += 1; // 42
 result++; // 43
```
See my musings on this in my other repository from the first time I tried learning JavaScript.

<b>Performing string (text) operations</b><br>
Concatenate, add two strings to eachother: ```console.log('Hello' + ' World!');``` or ```let string = 'Hello' + ' World!';```

<b>String operations and methods</b><br>
Built in functions accessible by adding a . to the string: ```let stringLength = string.length;``` VS Code will show alternatives for what is available after having type the . after a string.

### Going through course content for day 33:
<b>Basic array operations</b><br>
Same as for strings, add a . after the array to get a list of available methods. Notice that array.length gives you the number of elements in the array.

<b>Splitting javascript accross multiple files</b><br>
Can add multiple ```<script></script>``` tags in the header of the HTML document like with stylesheets. They will be loaded in the order they are in.
