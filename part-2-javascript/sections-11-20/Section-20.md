## Section 20: Working with modules

## Day 60 - 2022-06-08

#### <b>A first step towards JavaScript modules</b>

Given a tooltip.js file that extends class component that is in the component.js file, how do we make this work? The tooltip clearly needs access to component, but we just split them into different files to make our code more modular and maintainable.

To say in tooltip that it depends on component can be done with JavaScript modules. One important thing here is that as soon as we do this, the file will be 'locked down'. Currently everything loaded from the files are added to the global object, but for modules it won't as they will get their own scope. Simply add 'export' keyword in front of the class to tell JavaScript that it should be available to other files as well.

Then we need to add type="module" to the main app script, app.js. That tells JavaScript that all files referenced by this script will use modules. Currently though that presents a new problem, CORS. When loading scripts we have to be strict with security so that they can't load scripts from other pages that might be malicious, and that's a problem when using the file:// protocol which we have so far. So we need a development server.

#### <b>Getting a development server</b>

There's a package for this on npm simply called 'serve'. (Or I guess we could use the 'go live' vs code extension.) To install serve globally: `npm install -g serve`. To then start that server, be in your project directory and simply type `serve`. Go to the address shown in the terminal and now the cors error should have gone away.

#### <b>First import / export work</b>

To use the exported class component we need to import it, so add this to the top of tooltip.js: `import { Component } from './Component.js';`. Since we can export more than one thing from our file, we have to specify what we want to export even though we for now only export one class. Now we also need to add type="module" to tooltip.js in our HTML file. An optional thing to do could be to rename the module file to .mjs to signal that it is indeed a module.

#### <b>More named export syntax variation</b>

To import multiple things from the same file, specify them in a comma separated list: `import { DOMHelper, moveElement } from '../utility/domhelper.js';`.

To import everything exported from a file into an object, so you can call everything on the object with dot notation: `import * as DOMHelper from '../utility/domhelper.js';`.

In case we don't want to use the name as they are exported, we can also change them with the 'as' keyword to assign it as an alias: `import { ProjectItem as projItem } from './ProjectItem.js'`.

#### <b>Working with default exports</b>

If we have one core element exported, or maybe only one element exported, we can change the export to this: `export default class {` where previously it was `export class Component {`. With the 'default' export we can still add named exports though. To import this: `import whatever from './Component.js` and we can now call it as 'whatever'. Since it's not wrapped in curly braces, JavaScript understands it's the default export being imported here.

To combine a default export with a named export: `import whatever, { doSomething } from './Component.js`.

#### <b>Dynamic imports and code splitting</b>

To load modules conditionally, meaning don't load tooltip for instance on page load because it's only needed if the user clicks a given button, there's an alternative import syntax. The import sytax we've seen so far is the static import syntax, it statically defines the dependency of a file.

To import dynamically, we can call a function called 'import' in our code just before the code that needs the functionality. This import function returns a promise so we can add a .then block or use async await. Using .then, we receice 'module' as input and can there run the code that depends on this module:

```JS
import ('./Tooltip.js').then(module => {
  const tooltip = new module.Tooltip(() => {
    this.hasActiveTooltip = false;
  },
  tooltipText,
  this.id
  );
  tolltip.attach();
  this.hasActiveTooltip = true;
});
```

#### <b>When does module code execute?</b>

When imported for the first time. Add a 'console.log' to a module file to verify.

#### <b>Module scope and global 'this'</b>

If we define a global variable in a module file, because we want to use other places, how will that work? It was easy before we used modules, but what now? It doesn't work because it's not exported on the global object anymore as mentioned earlier. We can however use the window object to share something globally, but it has to be done from inside something that is exported.

There's also a 'globalThis' variable available both in the browser and in Node. The window is not available in Node.

The 'globalThis' in modules replaces 'this' as your pointer to the window object, because 'this' inside of modules is not defined. Modules run in strict mode, and there 'this' does not point at window.

#### <b>Wrap up</b>

[More on modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) on MDN
