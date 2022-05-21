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

See code in directory 1.first-simple-api-quotes for changes.

#### <b>A more complex API - first steps</b>

See code directory 2.more-complex-api-starting-snapshot

In the todos-controller for getAllTodos, we can just return the array fetched from the database, that is valid json, but we'll wrap the array in an extra object. This can make things easier in the future if we want to expand what is returned, and then it's just the matter of adding data to the object, rather than having to rewrite to handle an object first.

## Day 42 - 2022-05-21

### Going through course content for day 97:

#### <b>Finishing the first API endpoints</b>

We will of course have to add the express.json middleware to parse the incoming json requests

#### <b>Testing APIs with Postman</b>

Or Insomnia, which I think is easier to set up and use for simple requests like this. Set method to post, add the url to the API and select json for body. Type in the first note:

```json
{
	"text": "Learn building web APIs"
}
```

Header will now have a new field which says content-type is application/json, which is what the express middleware will use to detect that the incoming request is json, and that it should be parsed by it.

Send it, and we get back the response we created:

```json
{
	"message": "Added todo successfully",
	"createdTodo": {
		"text": "Learn building web APIs",
		"id": "6288cb18e01f91cdb2074792"
	}
}
```

We can now either use the browser to send a get requests to our /todo API, or we can use Insomnia. Doing that returns our todo:

```json
{
	"todos": [
		{
			"text": "Learn building web APIs",
			"id": "6288cb18e01f91cdb2074792"
		}
	]
}
```

#### <b>Add patch and delete routes / endpoints</b>

Fairly straightforward, just add update and delete functions in the controller file then connect said functions to the routes. See code for the solution.

#### <b>Add a decoupled frontend website - SPA</b>

Extract instructors example site. It's decoupled because it's a separate project from our backend and we can run it on a different server from our backend. This will connect to the backend with ajax fetch requests.

Basically it's a website to use our /todos API in a more convenient way than having to use an API client, writing the json ourselves and making the changes through that client.

#### <b>Why would you use a decoupled frontend?</b>

Why have this decoupled frontend, instead of adding views to the backend like we've done so far? In case, as was mentioned before, we built and API and want to have different clients accessing it. Also something about it could provide a better user experience by not having to wait for the server, though in a way we kind of have to due to the fetch requests in the background.

#### <b>Understanding CORS errors</b>

Starting the decoupled frontend greets you with an error, and the devtools says access has been blocked by CORS policy.

CORS is short for Cross-Origin Resource Sharing and is a mechanism in the browser that allows servers to indicate which origins (server domains) may access its resources. So I guess, basically our express server is set up saying it only allows access from the same server it's running on, and thus the browser fails the request. Insomnia didn't care about that and sent the requests as expected.

So this must be fixed on the server by setting certain response headers:
* Access-Control-Allow-Origin: Which origins (domains) may request resources
* Access-Control-Allow-Methods: Which http requests may be sent by the allowed origins
* Access-Control-Allow-Headers: Which headers may be attached to the requests sent by the origins.

See also MDN documentation on [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

#### <b>Fix the CORS errors to connect our frontend to the API</b>

There are ready-made middlewares for this, but we will write it ourselves now to understand how this works. Add a middlewares folder and add a cors.js file. Add this middleware to app.js the usual way.

In the enableCors function, use method 'setHeader' provided by express on the 'res' object and add the headers listed above.

For the allowed methods we set 'options' as a method as that is something fetch will send before it sends the actual request, to evaluate if the actual request will be allowed by the server.

A lot of headers are allowed by default, we will just add one for this project, and that is content-type.

We finally need to call next so the requests can be further parsed by other middlewares and route handlers.