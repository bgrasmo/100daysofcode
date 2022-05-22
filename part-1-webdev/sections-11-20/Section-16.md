## Section 16: Onwards to backend development
<b>Onwards to backend development</b><br>
What we've learned so far:<br>
<b>HTML</b> is there for content and structure of the displayed page.<br>
<b>CSS</b> adds styling to the displayed page and its content and is optional.<br>
<b>JavaScript</b> brings interactivity that might be needed, and is also optional.<br>

So far we've stayed in the browser, written content that is displayed by the browser and changed how the loaded website behaves in the browser. This is called the front-end because the browser is a tool installed on the computer of your end users. The browser displayes the front-end of your website, what the user sees.

For some websites that is enough. But other websites need server-side capabilities as well.

Examples of things taking place on the server would be store data in a database, store uploaded images so others can see them, load data, send back different HTML content based on the user, or data loaded from a database, and so on. It could also save and share game state for the tic-tac-toe game we created so you wouldn't need to share a computer to play, but each player could use their own device and be in different places.

Brief recap of how the web works with client and server and the communication between them I skip writing notes for again. The new part is showing how the server, the backend, might have some code being executed for the requests they receive, which affects what the client sees.

<b>Dynamic vs static</b><br>
Static websites are sites that only consist of HTML, CSS and JavaScript.

Dynamic websites are sites that in addition rely on some code running on the server, which might mean the HTML code sent is not always the same, and probably not the same for different users.

<b>Frontend vs backend vs fullstack development</b><br>
Browser instructions, option a: we can write all of it ourselves and then send all of it to the browser. Or option b, we could write some code on the server the generates some of these instructions for us based on various criteria, and then send them to the browser.

So again:<br>
The frontend - executes in the browser, on the visitors machine. Code that controls what the users sees and interacts with, divided between HTML, CSS and JavaScript. Static and finished code.

The backend - executes on the server, a remote machine. The code that controls what is being served and executes behind the scenes. May parse and store incoming data, fetch data, store files and so on.

So then, as a web developer you can work on either the frontend, or the backend. Or you can work on both, and then you are a fullstack developer.

<b>Choosing a backend programming language</b><br>
So then, how do we write backend code? We need a programming language that can be executed on the server. Given that a server is very similar to a normal computer, you can basically use any programming language on the server.

Of the various languages listed, python, php, Java, C#, NodeJS (Javascript) one obviously stands out: NodeJS.

NodeJS is JavaScript, but outside the browser as they took the JavaScript engine browsers (specifically the Chrome V8 engine) use, and made it run without a browser. In doing that they enhanced it with more features, like read and write to and from files, parse incoming requests, send responses and so on. And thus we have NodeJS which can be seen as JavaScript for the server side.
