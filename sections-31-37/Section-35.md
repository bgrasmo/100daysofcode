## Section 35: Web services and building custom (rest) APIs

## Day 41 - 2022-05-20

### Going through course content for day 95:

#### <b>APIs and services - What and why?</b>

Web services or APIs are about exchanging data and performing certain actions.

#### <b>JavaScript packages vs URL-based APIs</b>

A JavaScript package can provide APIs for us that we can use. For Stripe we used their third party package, and that package again used URL-based APIs to talk with their services. Such a JavaScript package would expose certain functions, objects and methods that others can use in their code and can be quite complex to develop so that is out of scope here. This also doesn't primarily need web development skills, but perhaps a deeper JavaScript and backend understanding.

URL-based APIs are as the name suggests APIs at some (remote) URL that we for instance need 'fetch' to get data from. We can also create such APIs for ourselves, and in a way I would say we have done that already with the express routes we've set up and the requests we've sent there either from the browser or through ajax. This can perhaps require more web development skills, but doesn't have to if you write an API handling data from databases for instances.

#### <b>When should you build an API?</b>

To offer a service others can integrate with by making remote calls to our servers.

Or for ourselves, for instance for some common Create, Read, Update and Delete operations that we want to do, perhaps from multiple clients. We can have multiple websites interacting with the same data for instance, or we can have the frontend in one place and the backend in another. (Decoupled web frontend.) And yet another alternative is if we want to serve the same data to a website and a mobile app.

### Going through course content for day 96:

#### <b>Introducing REST APIs</b>

REST stands for REpresentational State Transfer and follows certain rules that are not officially standardized, but is more of a common ground for these APIs.

REST is just one way of building APIs, but perhaps the most common or popular form when it comes to URL-based APIs.

One important rule, perhaps the most important is the core idea that an API is an endpoint which consists of an URL and a HTTP method combination. Every such endpoint maps to a certain action. Ref. the routes created with express previously.

#### <b>Building a first, basic REST API</b>

Simple express route for GET /quote added that returns a static json.

#### <b>Enhancing the API and making it more realistic</b>

