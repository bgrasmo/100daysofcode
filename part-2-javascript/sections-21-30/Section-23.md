## Section 23: JavaScript and browser support

## Day 63 - 2022-06-11

#### <b>What is browser support about?</b>

Some functionality isn't available in all browsers that might be in use. That goes both for browser features (browser apis) as well as JavaScript syntax. Have mostly been through this before, so will only note down if I learn something new or if there are new ideas for understanding or solving a problem.

#### <b>Determine browser support for a JavaScript feature</b>

MDN documentation, caniuse.com, google, ES6/JS compatibility table -> for new/next-gen js features. Currently at https://kangax.github.io/compat-table/es6/

#### <b>Feature detection and fallback code</b>

Let's say we want to use the clipboard API that might not be fully supported by every browser, though it seems to be improved now compared to when the course was recorded in 2019. Wrapping this in a try / catch block supposedly gives code that is a bit dirty, so don't do that. Instead navigator.clipboard will be undefined which is falsy on browsers that doesn't support it, so check for that:

```HTML
<button>Copy</button>
<p>This text will be copied</p>
```

```JS
const button = document.querySelector('button');
const textParagraph = document.querySelector('p');

button.addEventListener('click', () => {
  const text = textParagraph.textContent;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
      .then(result => {
        console.log(result);
    })
      .catch(error => {
        console.log(error);
      });
  } else {
    alert('That feature does not seem to be available in the browser');
  }
});
```

#### <b>Using polyfills</b>

A polyfill is a third party package that provides functionality that might be missing in a browser. Can only be used for functionality that can be recreated in JavaScript, so it doesn't work for some core features. Promises is an example that might not be supported everywhere, but said browsers might provide other functionality which makes it possible to recreate the promise functionality.

Another feature would be fetch, and searching for that on caniuse.com should also show polyfill options. Just searching for 'fetch polyfill' might also work, given you already know you need polyfill for this feature. Incidentally the fetch polyfill also needs a promise polyfill, see how nice that worked out?

#### <b>Using transpilation</b>

Some core features like let, const, async/await and arrow functions can't be polyfilled, you can't use feature detection and you can't use fallback code for them. (The difference here is that 'let' for instance is a keyword that tells the JavaScript engine what to do with the code that comes after it, it's not a function we call like for creating a promise.) Then what?

We can use a tool to 'transpile' our modern JavaScript code to the older syntax. Babel is one such prominent tool. Install it with `npm install --save-dev babel-loader @babel/core @ababel/preset-env`. Learn more about babel [here](https://babeljs.io/docs/en/).

#### <b>Automatically detect and add polyfills</b>

Babel can automatically add a polyfill for promises for instance, so we don't have to keep track of everything ourselves, and adding them all manually. Under the hood it depends on a package called 'corejs', which is like a collection of polyfills.

We need to install this manually: `npm install --save core-js` and then tell babel to use it by adding it to presets. If useBuiltIns is set to 'entry' we manually need to add very general polyfill imports like `import 'core-js';` and babel will replace it with the actual polyfills we need. Setting it to 'usage' instead will have babel add entries as it detects them.

```JS
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            ['@babel/preset-env', {useBuiltIns: 'usage'}]
          ]
        }
      }
    }
  ]
},
```

We actually also need another package called 'regenerator-runtime' so install that with npm as well. It handles something corejs does not so babel will try to use that if it needs to.

And we're not actually done yet, we also need to set which version of corejs we're using as there was a bigger change between version 2 and 3:

```JS
presets: [
  [
    '@babel/preset-env',
    { useBuiltIns: 'usage', corejs: { version: 3 } },
  ],
],
```

Set 'useBuiltIns' to 'entry' and add the core-js and regenerator-runtime imports to the top of your file. Babel will then look at what've you set for browser support and add necessary polyfills for that. This will probably make your app bundle a lot larger, but remember that might not only be due to your code using a lot of various features, it could be the third party libraries you depend on. Actually, babel does not check this third party packages, so it's all about the browserslist.

I didn't mention it before, but it can look like this in package.json:

```
"browserslist": "> 0.25%, not dead"
```
