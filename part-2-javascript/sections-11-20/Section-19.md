## Section 19: Working with JavaScript libraries

## Day 60 - 2022-06-08

#### <b>Adding lodash</b>

To subtract one array from another to get the difference between them, there's no built in method in JavaScript to do that, but we can obviously write our own function for it. However, since this is a common problem many encounter, this has already been solved by third party libraries. One such library is lodash.

To use loadash we can simply download it to the project directory where we need its functionality, and include it in the HTML file. Then to solve the problem above, we call it like this:

```JS
_.difference(array1, array2);
```

When used frontend we don't have to download a copy and serve with our pages, we can use a CDN instead. Find the link and add that to the page instead.

#### <b>jquery</b>

I guess that shows the age of this course? Though Vue, react and angular was mentioned as too big and complex to go through right now. JQuery was popular as it made working with the DOM easier, but improvements have been made to JavaScript since then so you "don't need it as often". Also provides a lot of pre-made utility functions that can make development quicker and easier.

#### <b>Discovering libraries</b>

Google a specific problem, for instance 'javascript http requests'. That will quickly return blogs mentioning for instance Axios

#### <b>Axios</b>

Axios can be used both in the browser and from Node, and for the browser it can again be added from a CDN.

Kind of already working on a script to make API requests with Axios.

Other learnings, if you send an array or object, Axios assumes you want to send it as json, so does that for you. If you send formdata instead, it will detect that as well and send it was formdata.

#### <b>Third party library considerations</b>

Including lodash to only use one or two functions might slow our application down, or at least the initial loading time as we'll be loading a lot of data, but only use very little of it.

It's also important to use libraries that are secure and maintained.
