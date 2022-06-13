## Section 27: An introduction to Node.js

## Day 64 - 2022-06-12

#### <b>JavaScript is a hosted language</b>

JavaScript is a hosted language, which means that the definition of the language can be implemeneted in different environments. All we need is a JavaScript engine that parses the code and executes it. As browsers have their own JavaScript engine, so does Node.js. (Though it's based on the V8 engine from Chrome)

While browsers have the engine, they also have some APIs to for instance interact with the DOM. This in combination makes JavaScript in the browser.

Node.js does not interact with the DOM, so has no APIs for that, but can interact with the filesystem instead so has APIs for that. So the combination of the engine and the extra APIs make JavaScript in Node.

Also mostly familiar with this from the web dev course so just watched through it as a refresher.

(Is it just me or are most courses about Node really about learning express? This was mostly about express)
