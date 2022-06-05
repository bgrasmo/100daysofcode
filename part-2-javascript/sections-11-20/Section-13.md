## Section 13: Back to the DOM and more browser APIs

## Day 56 - 2022-06-04

#### <b>Using dataset attributes</b>

I've been through this in the web dev course, so don't expect much notes here. Will write down what I consider new to me, as in new ideas for understanding this or solving a problem.

Remember that data-extra-info will be converted to extraInfo in the dataset.

#### <b>Getting element box dimensions</b>

Select an element in the browser dev tools with the mouse. Then type $0 to access that element, and you can see the methods available for the element. To get the size, getBoundingClientRect() is the one to use, and it returns an object to us with some information. This can be run for any element on the page. It returns some coordinates and sizes, and to understand this we need to know that the browser renders the page in a two-dimensional coordinate system. The X-axis goes from left to right, and the Y-axis goes from top to bottom.

See offsetTop for the distance for the topmost point to the top of this coordinate, and offsetLeft for the same but from the left. There's also clientTop and clientLeft for the inner positioning. See also offsetWidth and offsetHeight, as well as clientWidth and clientHeight.

scrollHeight is the entire height, including the non-visible parts. scrollTop is how much from the top we have scrolled the content.

This is better documented on MDN, in the HTMLElement article.

document.documentElement.clientWidth and clientHeight will give you size without any visible scrollbars.

#### <b>the DOM and prototypes</b>

Every HTMLElement has an Element prototype which has a Node prototype which has an EventTarget prototype is how to read the graph at the top of the page on MDN about HTMLElement. See other html elements on the page.

An example is the HTMLInputElement. How would we create such an object? We don't, but that's the object we get when selecting it

#### <b>Positioning the tooltip</b>

We get position information from the HTML elements, but the values are read only. To set a position we have to use CSS, and we might have to set the position property to 'absolute' for it to work when using pixels. However, that is a problem if we have scrolled down on the page, then we need to take that into account as well.

#### <b>Handle scrolling</b>

We can not only get how far the user has scrolled on the page, we can also actively scroll the user on the page. 'scrollTo(x, y)' for scrolling to a position, 'scrollBy(x, y)' to scroll by a given amount. Add  argument behavior: 'smooth' in an object for the scrolling to be smooth, and not directly jumping with the values you set.

There's also a 'scrollIntoView()' method we can use on an element in JavaScript to do exactly that. So when clicking a button that puts something in a cart, we can scroll to where that cart element is. To set smooth scrolling from JavaScript send in an object with behavior: 'smooth'. Supposedly not supported in Safari.

#### <b>Working with template tags</b>

We can add `<template></template>` tags in HTML, that won't be rendered right away, that we then can select in JavaScript and add content to.

#### <b>Loading scripts dynamically</b>

You can also create and run a script with JavaScript. Use createElement to create an element with the script tag. Now we can set the textContent of that element to some JavaScript code, and then append it where you want it.

This can also be used to control that some script will only be downloaded and run at some point we decide. Create the element the same way, don't set textContent though, but set the 'src' property to the path to your script. (As it appears on the webserver.) Then set defer to true to make sure it only loads after all HTML has finished parsing.

#### <b>Setting timers and intervals</b>

Function 'setTimeout();' takes two arguments: The first one is the function to execute, the second is how long to wait for executing said function in milliseconds. This is asynchronous code and won't halt the rest of your script while counting down.

A third argument can be added as well, an array of arguments to give the function when it executes.

Function 'setInterval();' takes two arguments: The first one is the function to execute, the second is how long to wait between each execution. It will wait the time before the first execution. A third argument can be added as well, an array of arguments to give the function when it executes.

These functions will return an id, so you can clear timeout with clearTimeout(id) and interval with clearInterval(id);. Though clearTimeout can seemingly be used for both, using the correctly named functions makes your intentions more clear in the code.

#### <b>The location and history objects</b>

Location exist on the window so it can be accessed directly with just 'location'. This object has some methods and properties all related to the URL and the page the user is on. That can also be used to navigate the user away by setting 'location.href' equal to the address of some other page.

Another method would be to use localtion.replace which prevents the user from going back, because we replace the page the user was on with the new one in the browser history.

There's also a location.assign which does the same as href and they can be used interchangably.

location.host returns the hostname the page is on, while location.origin gives the full page address with protocol in front. location.pathname returns the path to the page.

Location and history sort of works together as location allows you to edit history. history.back() navigates the user to the previous page and history.forward() to go forward to the next page. history.length shows how many pages the user has visited in this tab, and history.go(number) navigates the user back the given number of pages.

#### <b>The navigator object</b>

The navigator is the browser and lets you get certain information about that. userAgent is typically used to see what browser that is for checking compatibility, don't run some script feature if the browser used doesn't support it for instance.

The navigator object also exposes access to the clipboard API, so you can add something to the clipboard or paste something from it into an input field. geolocation is also available and can be used to check users location with getCurrentPosition. This takes in a function that will execute once position has been fetched, which is after the user has accepted the request or not.

#### <b>Working with dates</b>

All about [the Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

```JS
const date = new Date();

date.getTime(); // 1569313204758: Like epoch in perl, but in milliseconds

const dateThen = new Date('07/11/19');

date - dateThen; // Time difference in milliseconds
```

#### <b>The error object and constructor function</b>

```JS
throw new Error('Something went wrong at line 94');
```

You can 'throw' anything, but the advantage of using the error object is that you get a stack trace which tells you a little about where this error stems from. As with other objects we can add our own information to it.
