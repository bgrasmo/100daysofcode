## Section 33: Working with services and APIs

## Day 40 - 2022-05-19

### Going through course content for day 93:

#### <b>What are services and APIs?</b>

Services are services you can use in your projects and your websites to enhance them, like the third party packages that have been used. Bcrypt to hash passwords, mongodb to connect to the database and so on.

Other services can be an API for Google Maps, to show a map on your site or Google Analytics that gather statistics about your users. The one in focus in this section is Stripe payments that lets you add payment to your site without having the handle the complex things, like negotiating contracts with credit card companies and so on.

All these services expose actions or endpoints you can access from your code, which are the APIs.

#### <b>Why would you use services and APIs?</b>

You don't want to build all functionality on your own, that would be too slow, complex and error prone. While something like Express could probably be built from the ground up on your own, something like bcrypt would be a lot harder. Also, given the packages and services already exist, why not use them?

#### <b>Introducing Stripe</b>

Stripe has an API for collecting payments and that is what we will use. Their product is called Stripe checkout, and they have a pre-built checkout page we can use. Documentation on their site.

#### <b>Creating an account</b>

Go to 'developers' menu after having created an account and then 'API keys'. Make sure page is in 'test mode'.

Install the Stripe package in the project: `npm install --save stripe`. This will send the requests to Stripe for us, when we initiate them.

#### <b>Setting up a Stripe API request</b>

Add stripe example code in the orders controller, add success and failure views, routes for those views and some simple render code in orders-controller.

#### <b>Configuring the stripe request and handling payments</b>

The line_items data added was not correct as it was hardcoded.