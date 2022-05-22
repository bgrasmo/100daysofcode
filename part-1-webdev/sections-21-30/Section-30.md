## Section 30: Security days
## Day 30 - 2022-05-09
### Going through course content for day 74:
<b>Authentication vs website security</b><br>
Authentication is about differentiating between unknown users, so people just visiting our website, from users we know, the ones that have logged in.

Website security is about protecting from attacks and malicious actions by other people. For instance, no one should be able to get a list of our stored user database or delete our databases.

<b>Understanding CSRF attacks</b><br>
This is a short for Cross Site Request Forgery and is about sending a forged request that triggers an action on our backend that shouldn't be allowed. They often involve sessions that are used in an unintended way.

This can be done by having an attacker prepare a website that looks like ours. They will then send emails with link to that site to the victims. If the victims unknowingly use those sites, the forged site can use the victims session to our website, and send requests to our backend.

Extract the instructurs example sites and install node modules as usual. Create a user on the actual site first, log in and create a transaction that you can then see in the database.

Then start up the attacker site, which has hardcoded the recipient of the transaction to themselves, as well as the amount of the transaction. Another important piece here is that the form action is our original site, so they post to our site from theirs, but override whatever input we give. Our site will now see a request, and if the victim is logged in on our site, the cookie will be sent with and the action is performed.

Adding a transaction on the attacker site looks identical, but looking in the database we see that the target and amount was different from what we input. We were also redirected to our original site, so we can't see that we were on the wrong site before.

<b>Partial CSRF protection with 'same-site' cookie</b><br>
We can set something called 'lax' on sameSite in the cookie which means that if you click a link in an email and are taken to the attackers site, the cookie won't be sent to your site from theirs. It will however be attached if you went directly to the attackers site, then the cookie will be attached in the request to our site. (Or so I think. It could be that our site has to link to attackers site for this to work, so the victim clicked the link from our site originally).

This is only partial protection, the next lecture will cover best practice for defending against this type of attack.

<b>Implementing a better CSRF protection</b><br>
The solution is to generate CSRF tokens, which are short lived, they only exist for one request response cycle, and are only known by the server. These strings are then injected into the templates rendered by the server in a hidden input field for instance. Then for incoming requests the server checks if a valid token is part of that request and if they are not, the request will be blocked.

A package we can use for node express apps is csurf. Simply require it and use it `app.use(csrf());`. It can be configured as can be seen from the documentation, but the default values should work fine. Then we'll need to add these tokens on our routes. The ones containing forms that the attacker can rebuild and manipulate are the ones we have to protect.

```JS
const csrfToken = req.csrfToken();
res.render('transaction', { csrfToken: csrfToken });
```

Now we need to add a hidden input field containing this token in the form on the /transaction page:

```HTML
<input type="hidden" value="<%= csrfToken %>" name="_csrf">
```

The name needs to be set exactly like that, as that's what the csrf package we're using is looking for.

Now this attack doesn't work anymore as we're getting an error on our page.

<b>Understanding XSS attacks</b><br>
XSS stands for cross site scripting and is all about injecting malicious javascript code into the content of a website. The vulnerable parts are the input elements where the attacker will inject their own code, "making it a part of" the website. Will have to research better definitions here.

Authentication is not required to be vulnerable to XSS and in fact, having authentication can actually cause more damage as the attackers can gain more access than without.

Set up the instructors project as usual, it's the xss folder. Instead of adding a regular plain text comment, let's add a script instead:

```HTML
<script>
  alert('Got you!');
</script>
```

CSRF won't protect here, since we are on our site with valid tokens. Our script was added to our database, and is now served back to everyone who visits the page. It is legal HTML, so the alert is executed. While this alert is harmless, we could instead have sent an ajax request given we're on the page, has the cookie and token and so on.

We will have to guard against this *everywhere* we output user generated content.

<b>Protecting against XSS attacks</b><br>
Anywhere we output user generated content, we have to "escape" it, meaning disabling certain features of HTML. Or in other words, instead of sending back the script above as legal HTML, we need to send it back as plain text that the browser won't execute. We've previously touched upon this with someElement.textContent which is output as plain text and not executed, while someElement.innerHTML will be parsed as HTML.

An alternative would be to sanitize or clean the user input before processing and storing it. By doing this we will look for certain suspicious things like script tags and remove them before the content is stored, or convert them to something that can't do any harm.

The problem on the site we experiment with now is that a dash was used instead of the equal sign in the EJS tag. We've learned that equal sign escapes content while dash outputs it as is.

```HTML
<!-- This is bad -->
<%- comment.text %>

<!-- This is good -->
<%= comment.text %>
```

By changing this, the script is now output as plan text and not executed. In the developer tools it looks exactly the same, but the text is now white instead of blue. The blue color shows the parsed HTML code while white shows what is just text.

The priority should be escaping, as sanitizing might be harder. Are you sure you caught all the dangerous ways code might be injected? We won't have to write our own code for this but can use a package simply called xss that can be used for any node project.

All we have to do is import it, and then in any route we receive input that might be dangerous, we wrap that input in the xss function.

Looking in our database we can see that the first malicious comment looks like this:

```
text: "<script>\r\n  alert('Got you!');\r\n</script>\r\n"
```

If we add another, now with the sanitizing applied before it is save, it looks like this:

```
text: "&lt;script&gt;\r\nalert('Got you again!');\r\n&lt;/script&gt;"
```

With the equal sign in the EJS template the comment will be output exactly as above on the page. If we change it to the unsafe dash instead we can see the script clearly, and it's not executed:

```HTML
<script> alert('Got you again!'); </script>
```

Sanitizing changed the special characters to those codes, and they are shown on the page as text, not interpreted as commands to execute.

The XSS package can be configured, see the documentation for that. There's also an 'express-validator' package that is a great alternative as it also offers validation of input so we don't have to write that ourselves either.

### Going through course content for day 75:
<b>Understanding SQL injection attacks</b><br>
Malicious content that may alter our SQL queries, again mostly originating from user generated content.

Set up the database connection, create a database called security and in it create a commens table:

```SQL
create table comments (id int not null auto_increment, author varchar(255) not null, text text not null, primary key(id));
```

Add a couple of comments to have some data to compare with.

The problem on this site is in the get /discussions route where we filter on something that is input by the user (the name they type in the search field). An attacker can then input something that ends the first query and starts a second one. With this code:

```JS
filter = `WHERE author = "${req.query.author}"`;
```

The attack, which is entered into the input field, can look like this:

```
Joe"; DROP TABLE comments; SELECT * FROM comments where author = "Jane
```

The string in the filter variable contains double quotes around the filter parameter, so we need to match those so we close them properly.

<b>Protecting against SQL injection attacks</b><br>
For starters we should not use user input like that, it should be escaped first. SQL injection attacks are so common that most packages have built in protection against them. Also, the example is constructed by the instrctor to demo the attack, as it's now how we learned to write queries previously. When we use question marks instead for filtering or inserting data, the value that will be used or inserted will be escaped by the MySQL package.

So the fix for the bad request is changing to

```JS
filter = `WHERE author = ?`;
const query = `SELECT * FROM comments ${filter}`;
const [comments] = await db.query(query, [req.query.author]);
```

By sending in the author input field like that, it will be escaped before it is used.

The MySQL package has another protection step that was disabled for this demo. In the database set up, multipleStatements was set to true. This allows you to run multiple queries at once.  The default is that it is set to false and then you wouldn't be allowed to run multiple queries at the same time, like in this attack. You should still use question marks to escape input though.

<b>A word about NoSQL</b><br>
Out of the box NoSQL is supposedly more difficult to attack, and you would have to write more complex queries on the server to open up for vulnerabilities, especially with Node and MongoDB.

It can happen however, as can be seen from the articles found when searching for 'node nosql injection'.

<b>Module summary</b><br>
Never trust your users and especially not their input. Also don't trust any frontend validation like HTML validation attributes (required) or browser JavaScript. All these things can be changed or disabled by an attacker.

You should escape, and maybe sanitize or clean input before you handle it, like executing a database query based on it or showing it on a page. Unescaped input data should only be shown in rare cases and you'll have to know what you are doing to not open yourself up to attacks.

You should also always have CSRF tokens on every page taking input through the use of forms.

<b>Avoid exposing your server-side code or data accidentally</b><br>
Be careful when serving folders and their content statically.

Anything in those folders can be accessed by anyone, so be sure to don't put anything in there that should not be publically accessible. For instance you can simply request domain/styles/ in the browser manually, and maybe see the contents of the folder. Otherwise you can start guessing names of files that might be there, and get their content. So user data, passwords or other sensitive data should absolutely not be stored in a public folder. So in other words, files here should only be those that are needed for the site to function and look as it should, so the CSS files and JavaScript files to make things dynamic.

Avoid sending raw error messages to visitors.

You should send back a standardized error message in the cases where something goes wrong. The detailed error message, perhaps with paths and usernames is not something the visitor should see. So you should have custom error handling for when something goes wrong, and the error object should not be forwarded to the frontend.
