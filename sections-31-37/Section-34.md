## Section 34: Deploying websites

## Day 41 - 2022-05-20

### Going through course content for day 94:

#### <b>How are websites made available to the public?</b>

For others to reach our websites, they must be hosted on servers that are publically available, so we must upload our code from our development machine to such a server.

There are many hosting providers out there with different services. Finding a suitable one is left as an exercise to the reader.

Largely familiar with this topic so no more notes on this.

#### <b>Static vs dynamic websites</b>

Static sites are sites that only contains static HTML files, so no EJS or other template engines that run on the server, and static CSS and JavaScript files, like the ones that have been served from the public directory.

Dynamic websites can have code running on the server, like a Node backend and a template engine like EJS, and by that change data sent to the browser based on the user or other criteria.

What kind of site you can host depends on the hosting provider. Google is your friend here, so search for 'static site hosting' for instance or 'nodejs hosting provider' to find providers supporting a node backend.

#### <b>Hosting database servers</b>

There are hosting providers for database servers as well, MongoDB Atlas is one example for MongodB, which has a free tier.

#### <b>Preparing for deployment</b>

* Test your website thoroughly, on different browsers and with different screen sizes.
* Check feature compatibility with browsers. Not all browsers support all features
* Search Engine Optimization, add metadata to make content discoverable
* Improve performance, by shrinking javascript, images and css so users don't have to download too much to visit your site

#### <b>The example website</b>

Extract instructors example sites, one static and one dynamic example.

#### <b>Testing and code preparation</b>

Exploratory testing and automated checking. The last part is about writing some code that runs some checks on the code to see if it works as expected.

Remove and replace dummy values with real ones. Remove and replace testing data and keys with real data and keys.

Use different variables for data that differs between test and production environment. Example for the MongoDB database connection. Change from:

```JS
const client = await MongoClient.connect('mongodb://localhost:27017');
```

To:

```JS
let mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const client = await MongoClient.connect(mongodbUrl);
```

Though there is no real environment check here, we just check if an environment variable is set, and then use that instead of the fallback to localhost.

A cloud provider can also be used for file storage, cloudinary is one example. Can be used both for user uploads, and hosting our sites images.

#### <b>Evaluating cross browser support</b>

Be aware of the CSS and JavaScript functionality used on the website, and check with caniuse.com for browser compatibility. Search for 'flexbox' for example to see browser support accross various versions. Google is also helpful here by searching for 'can i use css grid' for instance and that page should appear early if not first in the results. CSS variables are relatively new and might be problematic.

MDN also lists browser support at the bottom of the page after the documentation for the functionality, so that can be checked before the functionality is used.

#### <b>Search Engine Optimization</b>

When you've built an amazing website you want people to find it, so it should rank high in google search results.

Do so by describing your page and highlight your content. Add important metadata but spamming keywords will have a negative effect.

Title in the head section is important, this is shown on Google if the page makes it there. Then there should be a short description which will also be shown on Google:

```HTML
<meta name="description" content="I completed a comprehensive web development course and this page has information on what I learned">
```

This should be repeated for every page, and tailored to that specific page.

General and often used keywords like 'JavaScript' will probably not be easy to get a good ranking for, so aim for something more niche.

This was just a short intro, there are entire courses on this topic.

#### <b>Add a favicon</b>

See previous lecture for notes on this.

### Going through course content for day 95:

#### <b>Improving performance and shrinking assets</b>

The code so far has been pretty small so not much is needed, but a tool for later is minifyjs.

Image size should also be reduced. No need for an image 4000 pixels or more wide if it's never actually shown in that size. Cloudinary offers some optimization of images so have a look at their documentation.

#### <b>Deployment example: Static site</b>

Netlify Drop explained again, see previous notes for this.

#### <b>Deployment example: Dynamic site with backend code</b>

Introducing Heroku. Free tier available. Full documentation for deploying a NodeJS application to Heroku can be found [here](https://devcenter.heroku.com/categories/nodejs-support). This will create a sample application in case you have nothing built yourself yet or you just want to test this so we'll skip this tutorial.

Instead see the [deploy with git](https://devcenter.heroku.com/categories/deploying-with-git) documentation for using git to deploy, since we've already been through using git and have a site ready.

Add procfile to let Heroku know how to start the app. Make sure the app listens on a port set by an environment variable, as it will be dynamically allocated for us.

#### <b>Deploy a MongoDB database with Atlas</b>

Sign up to Atlas and select the free options. Not sure why we have to select between Amazon cloud, Google cloud or Microsoft cloud, given we'll be accessing this through Atlas. Cluster is the database server. While that is created, create a database user and give privilege to read and write any database. Can set up ip-address allow list, but only useful if you know what address your server will send requests from.

After cluster is created, click 'connect' to see how to connect to it. This will be set in an environment variable on our Heroku installation.

#### <b>Finish the dynamic website deployment</b>

In package.json, set "engines" to specify the node version to use on Heroku. The first push to Heroku will fail the first time, because connecting to the database fails, but it will return the address of the website so we can visit the site. Log in to Heroku to add the environment variables. Add a SSL certificate as well. After this is done, go to 'more' in upper right corner, and select restart.

