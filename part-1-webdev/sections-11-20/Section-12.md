## Section 12: Advanced JavaScript, working with the DOM
<b>The global window and document objects</b><br>
Two global variables are always available, as they are built in: ```window``` and ```document```

```window``` holds information and functionality related to the active browser window / tab. ```alert``` which we have been using is also part of window, and can be called directly as we've done, or with ```window.alert``` so you can see it resides there.

```document``` is also part of window, but like alert can be accessed directly. Document holds information and functionality related to the loaded website content. Here we find utility functions to access HTML elements.

<b>What is the DOM?</b><br>
Short for Document Object Model, describes the data representation (internal representation) of the parsed HTML code in object form. Or in other words, the browser parses the HTML code we have written and turns it into a bunch of JavaScript objects. Every element we wrote is turned into an object, and these objects are nested inside eachother, to represent our HTML structure. (Technically it is a bit more advanced than that though, but that will do for now.)

Our JavaScript code is able to interact with the DOM, these objects, and extract data from it or manipulate its contents. For instance we can read som value the user entered and / or manipulate it. We can add new elements, change existing elements, change the content or the styling. Or to cite cable guy: "There's no end to the possibilities!"

<b>Exploring the DOM</b><br>

```JS
console.log(window.document);
console.log(document);
```
This gives the same output, our entire HTML document, as the document variable is made available globally and we don't have to prefix it with window. Now to see the actual object behind this we can use console.dir instead:

```JS
console.dir(document);
```
Here you can find head and body, with children, and see all we added in the HTML document.

<b>Drilling into the DOM to select and change elements</b><br>
Given this page:

```HTML
<body>
  <h1>Hi there!</h1>
  <p>
    This is a
    <a href="#">link</a>
  </p>
</body>
```

Getting the href in the link the hard way with JavaScript looks like this:
```JS
document.body.children[1].children[0].href = 'https://google.com/';
```
This is the same you do when expanding the document object and locating the href on the a. Notice how 'children' objects are arrays. (But why do we set it with = and not : since it's an object?)


<b>Loading our script correctly</b><br>
The defer keyword is required on the script tag loading the script for the above to work, otherwise the script will fail as it loads and executes too early. In other words, it executes before the HTML object has been parsed. Defer means the browser should wait with script execution until the entire document has been parsed.

Another way would be to put our script at the bottom of the body, to make sure the HTML document has been parsed before our script loads and executes. But we normally don't do that.

<b>The DOM tree and DOM traversal</b><br>
```
Document -> head
          ↳ body -> h1
                  ↳ p -> a       
```
So document holds head and body. Body holds h1 and p. p holds a.

Two ways to select elements in the DOM:<br>
1. Drill into the DOM, drill into elements using the dot notation described above<br>
document.body.childre[0].firstChild<br>
With this methid you have to know the DOM structure and if it changes, your code needs to change as well. (You have to know what you want the firstChild of another child, because that will be the link you want to change.)
2. Using a utility function provided to you by the browser, to query for specific elements.<br>
document.getElementById('some-id); or document.querySelector('.some-class);<br>
Selecting elements this way works like in CSS and hence no exact DOM structure knowledge is required.

### Going through course content for day 34:
<b>Drilling into the DOM and exploring text nodes</b><br>
JavaScript can be written directly in the browser console, and unlike VS Code, that actually gives us auto completion for the elements of the document. That's because the browser has parsed the document, VS Code has not.<br>
Simply typing in `document.body.children[0];` and pressing enter will output the contents of what we have selected. The preview helped us see that children[0] was the h1 element.

`document.body.firstChild` gives us a #text object. `document.body.firstElementChild` gives us the content of the first child element. That means if you know that you want to access the first child element of another element, you can use either `.children[0]` or .firstElementChild

The reson for the #text object is because not it's not only the elements that are saved, but the text we have as well. This can maybe be seen more clearly with `document.body.childNodes`. A node is basically either text or an HTML element, and your entire content, your HTML document, is translated to these nodes. In other words, these objects with information about your content.

Up to this point we've only looked at HTML elements and their objects, and these are the most important nodes, but all the text content is also saved as such nodes. With childnode or firstchild which acually accesses the first child node, not the first element child, you get access to both, with children you just get access to the HTML elements.

Why is firstChild text, and not the h1 element? That's because the HTML document contains whitespace, which is also stored here! So the text is actually the whitespace from the end of `<body>` to the beginning of `<h1>`.

<b>DOM drilling limitations</b><br>
If you change the HTML document, you have to change your code. If you add a new paragraph for instance, where before there was only one, code has to change to pick up the right element, even if you don't want to do anything special with the new paragraph.

<b>Searching the DOM for elements</b><br>
`document.getElementById();` searches for an element, by id. This function wants an input, namelit the id to search for.

To find the element with id external-link and then do something with it using dot notation: `document.getElementById('external-link).href = https://google.com/;` We can use .href since we know this is a link, and we want to change it. This can also be done in two steps, to avoid very long code lines:<br>
```JS
let anchorElement = document.getElementById('external-link');
anchorElement.href = 'https://google.com/';
```
This might be easier to read. This would also be the way to do it if we want to use anchorElement again at some later point, otherwise we would have to fetch it again.

<b>Querying elements</b><br>
Querying by id is not the only way to get access to an element. The querySelector method is another alternative built into the browser, and unlike the previous methid this does not want an id as input, but a CSS selector: `document.querySelector('<selector>');` This can be an id like CSS: `#external-link`

Which alternative to use then? Well it depends. If you add id to your elements, getElementsById obviously works. If not, querySelector it is. The latter is more flexible, given it can take any CSS selector as input. For instance, simply selecting the anchor tag with `a` as you could in CSS: `document.querySelector('a');`. Notice that this selects the first, and this is important, the first anchor tag it finds on your page.

To find <b>all</b> matching elements, you will have to use querySelectorAll. This will not return a single element, but an array with all matching elements.

<b>Common query methods</b><br>
In addition to the ones mentioned above, there are these:<br>
`document.getElementsByClassName('some-css-class');` - selects a given class<br>
`document.getElementsByTagName('tag');` - selects all HTML elements of the given tag.

<b>Inserting new HTML elements via JavaScript</b><br>
To add an element:<br>
1. Create the new element
2. Get access to the parene element that should hold the new element
3. Insert the new element into the parent element content.

To create the new element: `let newAnchorElement = document.createElement('a');`
Get access to the parent: `let firstParagraph = document.querySelector('p');`
To insert the new element: `firstParagraph.append(newAnchorElement);`
Can also use `insert` for the last one.

To make the link actually usable:
```JS
newAnchorElement.href = 'https://google.com/';
newAnchorElement.textContent = 'This leads to Google';
```
Before inserting it

### Going through course content for day 35:
<b>Deleting DOM element</b><br>
To remove an element:<br>
1. Select the element you want to remove
2. Remove it

We already know how to select elements, so look at how to delete them after they've been selected: `elementToDelete.remove();`

An alternative is to select its parent, the body for instance: `elementToDelete.parentElement.removeChild(elementToDelete');` This is supposedly only needed for older browsers, like old versions of Internet Explorer, so should probably never be used anymore.

<b>Moving existing elements around</b><br>
To move the first paragraph to after the second paragraph, effectively switch position first select it:<br>
`let firstParagraph = document.querySelector('p');`<br>
Then select its parent element, which is the body and append it, as that adds it at the bottom of the document:<br>
`firstParagraph.parentElement.append(firstParagraph);`<br>
Since we're working on an existing item, we don't have to delete the old occurance of it, the browser will do that for us.

We can also use `.insertBefore` to insert it before some specific element.

<b>Working with innerHTML</b><br>
On all elements you select, you have an innerHTML property, which is a bit like `.textContent`. The latter gives you access to text content, so all the text nodes that are inside this element including texts that might be in nested elements.
What does innterHTML do? It gives you access to all the HTML content store in an element. That could be just text, but it could also include other HTML elements.

Let's access the first paragraph: `let firstParagraph = document.querySelector('p');` then console.log it to see its contents: `console.log(firstParagraph);` The console actually shows a mixture of text (I'm new!), and HTML, the anchor tag leading to Google with the text description that it does. `.textContent` on the same would just return "I'm new!This leads to Google!"

This is maybe most useful when changing new content. `.innerHTML` accepts a string, which can also contain HTML code, not just text. If we use .textContent, it gets saved as text, and any html element we might input, will be shown as text on the page.

<b>Introducing events</b><br>
Events to which we might want to react - to then execute JavaScript code:
User clicks on some element (a button)<br>
User types some text into an input field</br>
User scrolls to a certain part of the page<br>
How? `someElement.addEventListener('<event>');`

<b>Adding a first "click event" listener</b><br>
`.addEventListener` wants two parameters, what should it listen for? And then, when the thing it listens for occurs, what should it do? For the "what should it do part" we can't actually add complex code there, but we can call a function, so that's what we'll do.

Define the function to be called first:
```JS
function changeParagraphText() {
  paragraphElement.textContent = 'Clicked!';
}
```

Then set up the event listener:
```JS
paragraphElement.addEventListener('click', changeParagraphText);
```
This is also called a callback function, a function that is passed as a parameter value to another function or method to be executed in the future. Notice the lack of parenthesis in the callback function. If we add them, then the function will be executed as soon as this line of code is parsed and executed by the browser.

<b>Listening to user input events</b><br>
`.addEventListener('keyup');` could work in this situation, as it is triggered when a key is released, which means something has been typed in the input field. A better listener though is `input` as it also listens for things that are dragged into the field or pasted there.

To get what the user input we can use `.value` like this: `let enteredText = inputElement.value;`

<b>The event object</b><br>
When dealing with events, the browser automatically sends an event object to the callback function. This object describes the event that occured. We pick it up by adding a parameter on the receiving function:

```JS
let inputElement = document.querySelector('input');
function retrieveUserInput(event) {
  let enteredText = inputElement.value;
  console.log(enteredText);
  console.log(event);
}
```

The typed input will be found in the `data` property in the object. An important property is `target` which holds the HTML element object on which this event occured. It is the same object we stored in the `inputElement` variable, which was selected with a querySelector.

This means we have an alternative to get access to the enterred text here by using the event object, and getting the value from target: `let enteredText = event.target.value;`

One important thing to note is that `event.data` only contains the last character that was input, which `.value` holds the entire string so far. The data property will also be null if something is pasted into the input field instead of typed. (And inputType changes from 'insertText' to 'insertFromPaste')

Also by using the event object we don't have to use an external (to the function) variable to get the value needed inside the function, and that might be a good thing.

The information in the event object depends on the event we're listening for. For the code above, it is an 'InputEvent', while if we look at the 'click' event object, it will say 'MouseEvent' and will holds lots of different information compared to input.

## Day 15 - 2022-04-24
### Going through course content for day 36:
<b>A more realistic demo and example</b><br>
See code in code-playground.

In brief, get elements by id, set up an event listener with a callback function, in the callback function get how many characters have been input, subtract from max, and set this in remainingCharacters.

<b>Introducing constant variables - const</b><br>
Instead of using `let` to define a variable, we can use const:

```JS
const myVariable = 'Some string';
```
A const is immutable, meaning it can't be changed after it has been defined. Trying to change it by assigning a new value to it will result in an error.

Looking at the demo project just created, you can see that all the variables created are "fixed", and never updated. In other words, they could have been created with const instead. By using const instead of let, we make it clear that these values will never change.

The variables in the update function is recreated and thrown away for every execution, meaning on every key input in this example. Or in other words, in this code, we always get a new "snapshot" of the situation in the function, and therefore it doesn't actually change.

The `remainingCharsElement.textContent` we update is an object, and data in objects can be updated. We just can't change the object to some other type at a later point. So the data-container itself can't be changed for objects, but the data can.

We also change productNameInputElement as we add an eventlistener to it, but again this is an object so we're allowed to do this.

Or yet another way to try to understand this, values in an object is exactly that, values in an object, and not values stored directly in a constant.

<b>Changing element styles with JavaScript</b><br>
As we've seen, we can get .textContent for an element in JavaScript. In a similar way, we can also get the style to change that, with `.style`. Here we get a nestet object with more properties, so we can add another dot to dive deeper into these properties. An example is `.style.textAlign`, but notice how it's spelled differently! In CSS we type it as `text-align: ...;` (Remember the reason? Dash is not allowed in variable or property names.) Setting it works the same, so we can copy the properties we set from the CSS file.

<b>Managing CSS classes with JavaScript</b><br>
New CSS selector tip as well it seems: `input.warning { ... }` selects all input fields with the warning class applied. Had there been a space between, it would have been descendant selector where we select all warning classes nested inside input. The same applies to id, meaning it selects what has both id remaining-chars and class warning: `#remaining-chars.warning { ... }`

The trick here then, is to select an element by id, and then set a class on that element when it meets certain criteria. Setting a class in JavaScript is done with `.className` as 'class' is a reserved keyword. (For creating classes, in OOP I guess?)

Note that setting a class with `.className`, you have to set all the classes should be on the element. Or in other words, if there were classes on the element, and you set a new class, the old classes will be removed.

A better way then is to use `.classList` which has some utility functions helping us in this matter: This `.classList.add('warning');` would add the warning class, without removing any of the other classes. Given .add, we also have .remove to remove the class specified.

### Going through course content for day 37:
<b>Time to practice</b><br>
See the task in the exercise.js file in code-playground.

Still a little curios why the defer keyword is required. Why is it a problem that JavaScript executes before the HTML file is fully loaded? Given the code should trigger on a button click, which we can only do when the page has fully loaded. Will have to investigate.

