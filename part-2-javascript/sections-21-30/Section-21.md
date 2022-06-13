## Section 21: JavaScript tooling and workflows

## Day 61 - 2022-06-09

#### <b>Project limitations and why we need tools</b>

We so far need to 'micromanage' imports, and can possibly have unneccessary http requests. Our code is not 'optimized', meaning minimized to reduce loading times. It also used to be that browser support was a problem, given someone for some reason still used internet explorer. Though I guess safari is the new internet explorer, so we need some tool which converts our code to something safari supports.

One developer experience thing is we've had to reload the page when the code changes. Also code quality has not been checked.

Some helpful tools and why to use them:

|Tool purpose|Tool name|What is does and why|
|------------|---------|--------------------|
|A development server |webpack-dev-server| serve under more realistic circumstances and auto-reload|
|Bundling tool|Webpack|Combine multiple files into bundled code (less files)|
|Code optimization tool|Webpack optimizer plugins|Optimize code, shorrten function names, remove whitespace and so on|
|Code compilation tool|Babel|Write modern code, transpile to 'older' code as output|
|Code quality checker|ESLint|Check code quality, check for conventions and patterns|

#### <b>Workflow overview</b>

Something should happen when we save our code, then something else should happen for production.

During development, when we save we want linting to run, bundling probably, and the dev server should reload / refresh for the code changes to become 'visible'.

For production we might still want linting though that should have run already as part of development, we want bundling to reduce number of files sent from server and compilation (babel), as well as minifying the code

#### <b>Setting up linting</b>

Add ESLint extension to vs code, then shift-ctrl-p on windows/linux to open the command menu. Search for eslint to enable it. Now it also needs to be added to the project as a dev dependency: `npm install --save-dev eslint`.

Then shift-ctrl-p, search for eslint again and select 'create configuration'. For some reason that doesn't work for me as it tries to open a new shell and execute 'eslinit --init' which isn't a program installed globally.

Ugh, this introduces so many problems as it complains about semi-colons being there, which is what I want, and documentation seems to be incorrect for this feature. Or perhaps it's the tooltip in vs code that is wrong, or I don't understand how to input rules correctly. Vs code doesn't suggest or even accept "always" on its own, but is fine combined with "error". Sigh.

Some linting documentation:

https://eslint.org/docs/user-guide/configuring<br>
https://eslint.org/docs/rules/<br>
https://www.npmjs.com/search?q=eslint-config<br>
https://eslint.org/docs/user-guide/getting-started<br>

#### <b>Bundling with webpack</b>

Install the necessary tools with `npm install --save-dev webpack webpack-cli`. Create a new file in the same directory as the .eslintrc.json called `webpack.config.js`. This file is executed by Node behind the scenes.

To make the configuration available we use module.exports and set it equal to an object which will hold our configuration. We now need to reorganize our files a little, because we need a place for the input files as well as a place for the files to be output. `src` is commonly used for input.

Then add `"build": "webpack"` to package.json and you can run `npm run build` to have webpack to the build.

In case there are more than one entry point, entry can also be an object specifying the various entry files:

```JS
entry: {
    welcome: './src/welcome-page/welcome.js',
    about: './src/about-page/about.js',
    // etc.
}
```

More about [code splitting](https://webpack.js.org/guides/code-splitting/) and [entry point](https://webpack.js.org/concepts/#entry)

#### <b>Development mode and fixing lazy loading</b>

Set `mode: 'development'` to bundle but not optimize files during development.

Using lazy loading gives us two app.js files. The second one can't be found, as we also need to set the public path so webpack knows how to reference the file when needed: `publicPath: 'assets/scripts/'`.

#### <b>Using webpack dev-server</b>

Install this with `npm install --save-dev webpack-dev-server`. We can add `devServer: { contentBase: './' }` to the webpack config but since that is the default we can omit it. To easily run this add a new command to package.json: `"build:dev": "webpack-dev-server"`. This will take webpack config into consideration and build and then run the code. Keep this running as it will watch for code changes, and then rebuild and reload for you.

#### <b>Generating sourcemaps</b>

What about debugging? With everything bundled up, looking at the code in the browser is a little harder. For that add a 'devtool' entry to webpack config. The documentation tells what options we have. Use 'cheap-module-eval-source-map' for now. This allows us to find our original code in the sources tab in devtools in the browser. Here we can add breakpoints as before.

#### <b>Building for production</b>

Copy the existing webpack config to a new file, for instance webpack-production.config.js. Leave most everything as it is, but change mode to 'production' and devtool to one for production: 'cheap-source-map'. The point of the latter is that you might have to debug your production code so it is useful to have some kind of source map.

To build this 'production' code, add the following to package.json: `"build:prod": "webpack --config webpack-production.config.js"`.

#### <b>Final optimizations</b>

The output folder can be a little cluttered with new files added, but never removed. To handle that install this package: `npm install --save-dev clean-webpack-plugin`.

We then need to add that to our webpack config:

```JS
const CleanPlugin = require('clean-webpack-plugin');
//...
  plugins: [
    new CleanPlugin.CleanWebpackPlugin()
  ]
```

Do the same for the prod config. Running a build now removes unused files from the destination directory.

To avoid browsers caching our files, which they do to optimize the experience for the end user by not having to load files it's already downloaded, let's generate the filenames dynamically whenever we do a new build.

This is most relevant in the production config perhaps (though caching issues can happen during development as well), so set filename in output like this: `filename: '[contenthash].js'`.

Now we actually have to manually update the script file we import in index.html to the hashed name before we upload to the server. Surely there must be a better way?

#### <b>Using third-party modules and webpack</b>

To import lodash (when using webpack?) we can do this: `import * as _ from 'lodash';`. Webpack will find the package even though we didn't specify a path, and load it for us. Which of course means we will always have to build our code before we can run it, but webpack takes care of that for us now.

Side note, some libraries like lodash allows you to only import some functionality, if you're not interested in all of it. For instance you can import just 'lodash/array' if you're just interested in the array functions.
