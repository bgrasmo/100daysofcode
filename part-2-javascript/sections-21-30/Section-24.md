## Section 24: Practice time - share my place app

## Day 63 - 2022-06-11

#### <b>Setting up the project</b>

Extract the instructors starting project and run npm install. Which is quite interesting with package-lock.json file created in 2019. Lots of security vulnerabilities since then and interestingly, 'npm audit fix' tells me to run 'npm audit fix' to fix the problems. Sigh.

Solution, remove package-lock.json, remove all dev-dependencies from packages.json and reinstall them with: `npm install --save-dev babel-loader @babel/core @babel/preset-env clean-webpack-plugin core-js regenerator-runtime webpack webpack-cli webpack-dev-server`.

That changed packages from:
```
  "devDependencies": {
    "@babel/core": "^7.6.2",
    "@babel/preset-env": "^7.6.2",
    "babel-loader": "^8.0.6",
    "clean-webpack-plugin": "^3.0.0",
    "core-js": "^3.2.1",
    "regenerator-runtime": "^0.13.3",
    "webpack": "^4.40.2",
    "webpack-cli": "^3.3.9",
    "webpack-dev-server": "^4.9.2"
  }
```

to:
```
  "devDependencies": {
    "@babel/core": "^7.18.2",
    "@babel/preset-env": "^7.18.2",
    "babel-loader": "^8.2.5",
    "clean-webpack-plugin": "^4.0.0",
    "core-js": "^3.22.8",
    "regenerator-runtime": "^0.13.9",
    "webpack": "^5.73.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.9.2"
  }
```

Now of course there's been breaking changes between the versions so webpack has to change order of config from:<br>
`cheap-module-eval-source-map`<br>
to<br>
`eval-cheap-module-source-map`.

Then contentBase doesn't exist anymore, but has been replaced by 'directory' in 'static'. So from this:
```
devServer: { contentBase: './dist' },
```

to this:

```
devServer: {
  static: {
    directory: './dist'
  }
},
```

And scratch all that. It doesn't work. Sigh, back to the drawing board. Created a directory with a shorter name than the one given and unzipped the files again, ignored security warnings and got it working. Or it was the order I did things in the last time that got it working. It wasn't working earlier when I just unzipped, ran npm install and started the dev build.

Will have to rewatch this as it was not very well explained.
