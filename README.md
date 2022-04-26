# My 100 days of code journey notes

Going through [100 days of code - 2022 Web Development Bootcamp](https://www.udemy.com/course/100-days-of-code-web-development-bootcamp/) course on Udemy by [Academind](https://www.udemy.com/user/academind/)

These are my notes as I go along the course and is currently the first draft. In case I have to look up these notes and find they aren't actually helpful for me, I might update the content. But right now, first draft and they are what they are. They might not even be correct as I might have misunderstood the instructor.

The code I write during the course will be in the code-playground folder, but they will be for the last day in this document as I will update it as I go along. The plan is to create branches to easily be able to go back and look at code for a given lecture.

## Day 1 - 2022-04-10
### Going through course content for day 1:

 - What is web development and how does the web work
  - Client/server, DNS and IP-addresses
 - Explaining the basics of HTML, CSS and JavaScript
  - HTML: Content
  - CSS: Styling
  - JavaScript: Making things dynamic, acting on button clicks and so on
 - Don't need a server but can use computer as local development server
 - Creating our first HTML page

### Going through course content for day 2:

 - Setting up a development environment
   - Installing VS Code
- HTML: Language to add extra meaning and structure to our content. In other words, used to define and describe your content and page structure
- What HTML elements that exist and the MDN documentation
- Annotate and describe content - necessary for accessibility, and screen readers
 - Adding text without any HTML tags means screen readers won't know  if it should be a title or just regular text or something else.
 - You should add meaning to every piece of content you have on your page!

CSS to change font on h1 by adding the style attribute:
```HTML
<h1 style="font-family: sans-serif">
```
Important with no whitespace after attribute name and equal sign.<br>
CSS properties also standardized like HTML and can be found on MDN<br>
Can add more properties by separating then with ; like so:
```HTML
<h1 style="font-family: sans-serif; text-align: center;">Hello, world!</h1>
```

Challenge: Can you change the font-color to red? Many color elements on MDN, the correct one here is the one simply called color:
```HTML
<h1 style="font-family: sans-serif; text-align: center; color: red">Hello, world!</h1>
```
## Day 2 - 2022-04-11
### Going through course content for day 3:
<b>Working with colors</b>

Want to style another element as well, but want another shade of grey than is available. Specify color in hex:
```HTML
<h1 style="font-family: sans-serif; text-align: center; color: red">Hello, world!</h1>
<p style="font-family: sans-serif; text-align: center; color: #534b4b">Learn about the basics of web development
```
53 is value of red, first 4b is value of green, second 4b is value of blue.<br>
In VS code you can click the box showing the color in to select color, or change method for representing the colors like HSL instead of RGB for instance.

<b>Formatting your code</b><br>
For human readability, does not matter to the computer (unless it's Python :D)<br>
In VS code on Linux/Windows, File->Preferences->Keyboard shortcuts. Search "format document" for the shortcut. Ctrl-Shift-i on this computer.

Install prettier extension. Then go to File->Preferences-Settings and search for format. Set prettier-vscode as default formatter.

<b>Browser developer tools</b><br>
Right click->Inspect. Elements should be selected by default. Will show what styles are applied to an element.<br>
Element.style will show the style we added, directly on the element. Will also see the "user agent stylesheet" which is styles from the browser. You can edit styles here, directly in the browser to debug, but the changes will be lost when reloading the page as they can not be saved back to the original code.

<b>Adding a link to another page</b><br>
Using a - the anchor tag:
```HTML
<a href="localpage.html">Text describing the local link</a>
<a href="https://www.google.com">Text describing the external link</a>
```
No styling other than the default so far.

<b>Nested HTML elements</b><br>
HTML elements can be nested:
```HTML
<p>This is a paragraph with some text. This is the link: <a href="/default.html">Nested inside the paragraph</a>
</p>
```
<b>Using global styles</b><br>
Add the style element at the top of the HTML file. This is an invisible element, used for applying global styles so we don't have to apply the same style to each and every paragraph for instance.<br>
Need to "target" the element we want to change the styling of. To change style of all paragraph elements:
```CSS
<style>
  p {
    font-family: sans-serif;
    text-align: center;
    color: #534b4b;
  }
</style>
```
Every style line should end with a semi-colon. Styles for multiple elements can be added, by adding the element and the curly braces.

The browser developer tool will tell us when we inspect an element, where the style comes from. For instance it will say index.html:2 which means the second line of the file.

<b>CSS styles should be in the header of the HTML page</b><br>
Styles can be said to be meta-information, the style definition are not directly visible on the page, but the result of them are. The anatomy of a valid HTML document is as follows:
```HTML
<!DOCTYPE html>
<html>
  <head>
    Page metadata:
    <style>
      h1 {
        font-family: sans-serif;
      }
    </style>
    <title>My page</title>
  </head>
  <body>
    Page content
    <h1>Welcome!</h1>
  </body>
</html>
```
<b>Utilize auto-completion in vs code</b><br>
In a file with a known file-ending like .html, vs code will provide suggestions based on what you type. Press tab to use the suggestion. Type just "p" and the paragraph element will be suggested.

Move elements up or down in the file without copying and pasting but pressing the alt-key, and the arrow up or down to move the line you are on, or the lines you have selected up or down.

<b>Code comments</b><br>
Comment in HTML:
```HTML
<!-- This is a comment and will not be shown on screen -->
```
Comment in CSS:
```CSS
/* This is a comment explaining a style for instance */
```
VS code has shortcut called "toggle line comment"

## Day 3 - 2022-04-12
### Going through course content for day 4:

<b>Style the link</b>
```HTML
<style>
  a {
    color: rgb(167,1,78); /* Change default link color */
    text-decoration: none; /* Remove underline */
  }
  a:hover {
    text-decoration: underline; /* Add underline if mouse hovers over the link */
  }
```
```Hover``` is called a pseudo-selector and is used to define a special state of an element. See more in [pseudo classes](https://www.w3schools.com/css/css_pseudo_classes.asp) on w3schools.

Can see from dev tools that multiple rules are affecting the link now. So in other words, we can have multiple CSS rules for elements.

<b>Move CSS rules to their own file</b><br>
Copy all the CSS rules you want to a file ending with .css. This should not have the ```<style>``` tags in it, as that is an HTML element. To load the CSS now, remove the style elements and all the rules copied to the .css file and instead add the following in the head section of the HTML document:
```HTML
<link href="index.css" rel="stylesheet">
```

The link element is called a void element as it doesn't need any content, but is configured with attributes only. The ```rel```attribute explains what relationship this file has with the current document, and here we explain that it is our stlesheets. Notice it only has a starting element, not one for closing.

<b>More about void elements</b><br>
Adding a forward-slash at the end of a tag turns it into a self-closing tag, because it immediately closes itself after the opening tag. This is optional, but might be automatically added by utilities formatting code for readability.

<b>Multiple files and requests</b><br>
The network tab in dev tools will now show the browser loading two files when loading the page, the HTML file and then the CSS file. The browser then applies the styling to the HTML in memory.

<b>Selecting single elements with the ID-selector</b><br>
In case you have multiple paragraphs in your document and want to apply different styling to just one of the paragraphs, they have to be uniquely identifiable. You can add an id attribute to any HTML element:
```HTML
<h1>My code challenge for the day</h1>
<p id="unique-identifier1">Main goal</p>
<p>I'll achieve this goal by</p>
```
Then target that specific HTML element from CSS like this:
```CSS
h1 {
  font-family: sans-serif;
}
#unique-identifier1 {
  color: rgb(170, 96, 83);
  font-weight: bold;
  font-size: 20px;
}
```
px is a unit for size. This is device independant, meaning 1px will occupy the same amount of space on the screen, no matter if it's a high-density screen with many pixels or a low-density with less pixels. However, px is also absolute in that it will not scale with the content on the page<br>
Relative units are rem and % which I'm sure we'll get back to later :)

<b>Using other fonts from google fonts</b><br>
font-family: sans-serif is safe because every browser supports that by default. If you want to use another type of font, like Arial, the browser might not have it built in, and so it will have to be loaded when the web-page loads.<br>
Extra fonts that are free to use are available on [fonts.google.com](https://fonts.google.com/). Search for a font name, like "Fira Sans" and click the result to see what it looks like. Scroll down to regular 400 and click ```select this style``` to the right to see how to load it and use it. Multiple fonts can be selected at the same time. Search for Bold 700 and select that, and finally search for a new font family called Oswald and select the bold version

To make them available add the following to the HTML document
```HTML
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;700&family=Oswald:wght@700&display=swap" rel="stylesheet">

or

<style>
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;700&family=Oswald:wght@700&display=swap');
</style>
```
To use them:
```CSS
font-family: 'Fira Sans', sans-serif;
font-family: 'Oswald', sans-serif;
```

Make sure to only load fonts you will actually be using, as they will be downloaded by the browser of the user visiting your page, and it can slow your page down if loading too much uneccessary stuff.<br>
Note how imported fonts are specified with single quotes around them, and the sans-serif afterwards is a fall-back font. In other words, fonts can be specified in a comma separated list in order of priority, in case one of the fonts fail to load.

### Going through course content for day 5:
<b>Adding an image</b><br>
```HTML
<img src="your-image.jpg" alt="Description of your image for fall-back explanation and accessibility">
```

<b>Style the image</b><br>
```CSS
img {
  width: 200px;
  height: 200px;
  border-radius: 100px; /* Half width and height to make it a circle */
}
```
To center the image is a bit more tricky. ```text-align``` doesn't affect the element itself, but the content of the element. To center the image then, we have to target something outside the img tag and center that. For now we can add it to the body page as everything else on the page is centered anyway.

<b>Styling the page</b><br>
```CSS
body {
  text-align: center;
  background-color: rgb(233, 215, 207); /* Sets a different background color */
  margin: 50px; /* Adds a margin around elements */
}
```

<b>Creating a new page containing preview of the goals for the week</b><br>
Create a new file called full.week.html. In VS code, in the new .html file, type a single ! and press tab to get a HTML skeleton.

<b>Naming conventions for files</b><br>
You can name the files almost whatever you want, but give them names that makes sense. A shopping cart page might be called cart.html for instance, and the products page might be called products.html

For CSS it is good practice to call them the same as the file they style or belong to, so cart.css for shopping cart styling or products.css for styling the prodcuts page. If styling for both pages is in one file, a common name like online-shop.css could be used. Another convention is to keep filenames all lowercase and without spaces in them. Use a dash instead of space.

<b>Shared CSS file</b><br>
Styling used on many pages can be moved to a shared file that multiple HTML pages load. If there are page specific styles, that can be added to its own file and override the shared styles. Load the shared styles first, then the page-specific styles.

## Day 4 - 2022-04-13
### Going through course content for day 6:

VS Code live server plugin - supports hot reload so we don't have to reload the page manually when making changes

<b>Lists</b><br>
Ordered list: ```<ol></ol>```<br>
Unordered list: ```<ul></ul>```<br>
Both use list item: ```<li>item</li>```

What type of list to use is about semantics. Ordered list, the order matters. Unordered list, the order doesn't matter. The numbers or dots marking the individual list items can be removed:
```CSS
li {
  list-style: none;
}
```
<b>Parents, children, container</b><br>
In this example:
```HTML
<body>
  <ul>
    <li>List item one</li>
    <li>List item two</li>
    <li>List item three</li>
  </ul>
</body>
```
li is inside ul which is inside body. If various styling is applied like so:
```CSS
li {
  color: blue;
}
body {
  color: red;
}
ul {
  color: green;
}
```
What color will the list item have? Answer: Blue<br>
Body style sets color to red which ul and li inherits. But ul style sets color to green, overriding what was inherited from body. li inherits green from the parent, ul, but overrides that with blue. So it's not the last style defined that wins, but the last style for the innermost or most precisely specified element.

Inheritance: (Selected) container rules apply to descendants<br>
Cascading style sheets: Multiple rules can be applied to the same element<br>
Specificity: The most specific rule wins, meaning style for li is applied, even if style for ul is defined afterwards, because li is more specific.<br>
Did not at all understand this presenters explanation, so not sure what container is. Don't think it was actually explained, other than in segment title. Guess ```body``` can be seen as a parent container with ```ul``` being a child container.

See branch ```day-006``` for the finished code in the code-playground folder. (Though I had started day 7 already when the branch was created and messed up a little so padding and margin which shouldn't be there at this point is present.)

## Day 5 - 2022-04-14
### Going through course content for day 7:
<b>CSS box model</b><br>

New teacher in the course explains in a way that is nearly impossible for me to understand. Can't re-tell what I'm supposed to have learned here. Will have to re-do this part or find other sources.

Guessing at what is meant from looking at the image presented:<br>
Content - has some padding around it, around that padding there is a border. Around that border is the margin. The margin defines the space between the elements, the padding defines the space between the content and the border.
```CSS
p {
  padding: 2px 5px 2px 5px; /* top 2px, right 5px, bottom 2px, left 5px */
}
```
That's direct space around the content.<br>
Border goes around that and is defined like this:
```CSS
border: 2px dashed black; /* Size of border, type of border, color of border */
```
Margin, for space outside the border of the content:
```CSS
margin: 8px 6px; /* Top and bottom: 8px, left and right: 6px - see different guide for explaining this */
```
```auto``` can be used to have the browser automatically add the identical space to the left and right for instance. This helps, or is necessary if you want to center an element.
```CSS
margin: 36px auto 0 auto;
```
Also look at padding if it doesn't look centered, as that comes in to play as well. It might need to be set to 0. That's why the box model is so important in getting elements aligned properly.

<b>Adding structure to a webpage</b><br>
Basics: Header - main content - footer.
```HTML
<body>
  <header>
    <h1>My upcoming challenges</h1>
    <a href="index.html">View todays challenge</a>
  </header>
  <main>
    <ol>
      <li>Repeat what I learned yesterday</li>
      <li>Move on to todays exercises</li>
    </ol>
  </main>
</body>
```
More details in the documentation on [MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure).

The purpose is semantics, helping both the browser and also other developers who might work on the same code.

<b>Selectors and combinators</b><br>
Selectors:<br>
Type selector: An HTML element, like h1 or p for instance.<br>
ID selector: Adding id="" attribute to an element. Said id have to be unique and can only be used once. Select it with #id<br>
Group selector: Selecting multiple types at the same time: ``` body, h1, p { property: value; }```<br>
Class selector: Adding class="" attribute to one or more elements This does not have to be unique. Select it with .class<br>

Combinators:<br>
Descendant: li p - Selects all p with li as ancestor.<br>
Child: h2 > p - Only p which are direct children of h2

If all of type, combinator and a class targets the same element, specificity comes into play, and class wins. Type will be last because it is a general selector.
```HTML
<main>
  <ol>
    <li>
      <h2>Today</h2>
      <p class="daily-goal">Not quite sure what to put here for a goal</p>
    </li>
    <li>
      <h2>Tomorrow</h2>
      <p class="daily-goal">I'm following a course so path is set by instructor</p>
    </li>
    <li>
      <h2>The day after tomorrow</h2>
      <p class="daily-goal">I have not looked ahead to see what comes next</p>
    </li>
    <li>
      <h2>Two days after tomorrow</h2>
      <p class="daily-goal">But I've created an ordered list as exercise</p>
    </li>
  </ol>
</main>
```
```CSS
p {
  margin: 8px;
  color: rgb(91, 29, 22);
}
main p {
  margin: 10px;
  color: rgb(81, 29, 22);
} */

.daily-goal {
  margin: 12px;
  color: rgb(71, 29, 22); 
}
```

<b>Block vs inline elements</b><br>
Some elements, like h1 occupy a line. Meaning if you have two h1 in a document, they will each be on their own line. The anchor or img tag however does not, you can have multiple of those on the same line. Or in other words, block elements like h1 occupy the full width of the page regardless (unless styling says otherwise I guess, but will have to test that) while inline elements just occupy the space the content needs in width and height.

Common inline elements: a, button, img, span (non-semantic inline container to mark-up text). See MDN documentation on [inline elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements) for more.

See branch ```day-007``` for the updated changes to the pages in code-playground.

## Day 6 - 2022-04-15
### Going through course content for day 8:

<b>Styling differences between block and inline elements</b><br>
Special rule on margin or padding, top or bottom for inline elements: It doesn't have an impact. It is applied as can be seen in browser devtools, and it is shown in the "box-model" view, but it doesn't do anything. Left and right space however works as expected. So I guess it kinda makes sense since inline elements can be placed next to eachother.<br>
Struggeling to really get this and how it works, but maybe a key insight from instructor is this: Top or bottom padding can be added to inline elements, but this does not move other elements up or down.

New property: Display. This can be added to inline elements and allows us to define how our elements are displayed.
```CSS
display: inline; /* Display this element as an inline element */
```
Doesn't have much effect on inline elements like the anchor tag.
```CSS
display: block; /* Display as block element, occupying all space left and right */
```
Define width on the element above to not make it take up all space from left to right on the page.
```CSS
display: inline-block;
```
This combines both worlds, as it behaves like an inline element but we can apply top and bottom margins and padding which affects our distance to other elements.

<b>Understanding margin collapsing</b><br>
Margin collapsing only occurs for vertical margins and only for block elements (since inline elements can't have vertical margins). This is not an issue for inline-block elements either. Margin collapsing means the bigger margin wins and the smaller is ignored. If you have two elements above eachother with a margin of 32 on both, you probably want 3 pixels between them and not 64, this is why this is happening. The list element in the main section shows this.

Need to construct an example showing this more clearly here.

<b>The shadow box property</b><br>
This adds a shadow around the border of the element, with 4 different properties: Offset X, offset Y, blur radius, color
```CSS
box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2);
```
RGBA takes in a fourth option: Opacity. Setting this to 1 makes the color hard, a smaller number softens the color. (Though it seems that blur radius in box-shadow does a little bit of the same.)

<b>Challenge time!</b><br>
Create the page displayed on your own with what you have learned.

My attempt is on branch ```day-008.my-attempt``` while the solution is on branch ```day-008.solution```

Notes from teacher going through the solution: We can't apply vertical margins to inline elements but there is an exception as there are two different types of inline elements: Replaced and non-replaced inline elements. The anchor tag is an example of a non-replaced inline element, while img is example of replaced. The reasoning being that the img tag is replaced by the image. It links somewhere else and retrieves the content from there. For such elements, vertical margins can be applied.

So then, to center the image on the border, see that the image is 210 pixels height (200 pixels in size plus 5px border top and bottom). Divided by two that is 105px for the image. Now add 24px for the main padding and another 5px for the main border = -134px.

<b>New CSS selectors not explained yet</b><br>
Attribute selector: ```[src] { ... }``` would select ```<img src="...">``` for instance

Universal selector: ```* { ... }``` would select all HTML elements directly as if you had targetted them each individually

Grouping selector / selector list: ```p, .some-class { ... }``` would select this for instance: ```<p>...</p>``` and ```<h2 class="some-class">...</h2>``` as it selects all elements that match the individual selectors in the list

Combined selector: ```p.some-class { ... }``` selects all elements that meet both condition, so both p and class like this: ```<p class="some-class">...</p>```

## Day 7 - 2022-04-16
### Going through course content for day 9 and 10:
<b>A practice project</b><br>
Day 9 started with the teacher showing the screenshot of a page, giving the assignment to recreate this on your own. Day 9 was then spent creating this, then the rest of the day and day 10 was spent going through the solution in detail.

This is how the [finished page](https://github.com/academind/100-days-of-web-development/blob/04-html-css-first-practice-summary/extra-files/finished-site.jpg) should look.

Font used is Roboto, 400 and 900 weights

My attempt is on branch ```day-009.my-attempt```. The hardest part was figuring out how to get the yellow mark to the left of the highlighted lines. I also messed up and didn't align the non-highlighted items properly. The trick is to set the border on the list item, but make it transparent. Then set ```border-color``` on the highlighted items.

The teachers solution can be found on branch ```day-009.solution```.

Notes: To center a non-inline element as a whole, and not the content in it, we use a "trick" by setting margin to control outside spacing. Need to revisit this.

<b>New HTML elements</b><br>
For accessibility, the "don't" word that was highlighted by the span element (which doesn't have semantic meaning) won't be read out to blind people. We can instead use the ```em``` element, as that stands for empasize. Or we can use the ```strong``` element as an alternative. Strong is read out by raising the voice a little, em is read out by changing the tone of voice, so you can select which you want.

We can use the ```section``` element to wrap our code in and more easily see the different sections. Without it we don't easily see that the HTML section ends after the paragraph and the CSS part starts after it.

## Day 8 - 2022-04-17
### Going through course content for day 11:
Hosting and deployment explained. Then shown drag and drop to app.netlify.com/drop. I've looked into Github pages myself. Favicon explained:
```HTML
<link rel="icon" href="images/favicon.ico" type="image/x-icon">
```
Also explained was relative vs absolute paths.

Introduction to Git and Github: Git is version control, Github is where you can store your code so multiple people can work on it. Version control is about being able to track changes over time.

Git is a local tool installed on your computer for managing your code, orgaized in repositories.

Github is a cloud hosting provider for git repositories.

Skipped command line introduction for Mac and Windows

## Day 9 - 2022-04-18
### Going through course content for day 12:
Continuing with Git basics, skipped installation instructions for Mac and Windows.

The repository contains commits which is a code snapshot, branches are where the commits are stored.

### Going through course content for day 13:

In VS Code, go to preferences->settings and search for "code lense". Make sure it is activated for merge conflicts.

Rename the branch you are on: ```git branch -m <new name>```

Create a new branch and switch to it: ```git checkout -b <new name>```

Merge branches works from the branch you are on, receiving changes from another branch. So from main branch, merging in new features from feature branch: ```git merge feature```

In case of merge conflicts: ```Accept current change``` to keep what is on the branch you are currently on. ```Accept incoming change``` accepts the changes from the feature branch. Haven't looked at ```Accept both changes``` or ```compare changes``` yet.

<b>Deleting data</b><br>
If you delete a file using VS Code or the command line, you will have to add the file to be staged for commit. If the file is deleted with git, it is automaically added and ready to be commited: ```git rm <file>```

To delete a commit, or in other words, go back to a previous commit: ```git reset --hard HEAD~1```. This resets to HEAD minus one commit, so the previous commit to the latest.

To delete a branch, first you have to be on another branch than the one you want to delete. Then ```git branch -D <branch name>```

If you have made changes to file but want to delete them, you can reset to the latest commit: ```git checkout -- .``` When you have unstaged changes you can't change branches, so you will either have to commit them, delete them, or stash them. Stash is more advanced and not part of this course.

To remove changes that have been added to staging: ```git reset <filename>```. Then reset to latest commit. We can also remove just the changes for an individual file with the same command: ```git checkout -- <filename>``` after it has been reset.

<b>Github</b><br>
Connect local repository to Github, link to my other git document for this.

```Origin``` is a standard naming convention that can be changed but it is not recommended. It is simply a short name for the url of the remote repository. This means we only have to add origin and not the entire url all the time when making changes to remote.

In ```git push -u origin main``` the "-u" can be omitted as it's for upstream which is not relevant to us now. (Will want to investigate this.)

<b>Personal Access Token</b><br>
After having connected a local repository to a newly created one on Github, after you push for the first time, VS Code will probably ask you about credentials. We'll use a token to authenticate.

To create a Personal Access Token, on Github go to settings, scroll down to developer settings and then personal access token. I guess this is for https access, but I'm using SSH-keys.

Anyone who has this token can access any repository on the account it was created for, so be careful with it!

Click cancel on the VS Code pop-up, and see that you're asked for your Github username. Enter this. Then instead of typing in your password, enter your personal access token copied when you generated it.

To delete this token on Windows, in case you want to add a new one:
```zsh
$ git credential reject <enter>
host=github.com <enter>
protocol=https <enter><enter>
```
On Mac, instead use: ```git credential-osxkeychain erase```. The rest is the same as on Windows.

### Going through course content for day 14:
<b>Personal Access Token and git clone</b><br>
To download an existing repository to a new machine use git clone with the address to the repository. If you want to push, you will again need access, meaning entering the username and the access token.

<b>Collaborating on projects</b><br>
On the repository you want to collaborate on, go to settings for the repository (not your Github account) and select manage access. Search for Github account to add by username, full name or email, then add the person found. The other person will get an invite that has to be accepted. This person can now push changes to this repository.

Git pull to get the latest from origin. (Or ```git fetch``` and then ```git merge```, the last command without any branch names)

<b>Forks and pull requests</b><br>
If you're not a direct contributer and can't change code in a repository directly, can you still contribute? Yes, by forking the repository you get a copy on your own account. This you can make changes to, add collaborators to and so on as if it was your own project. If you've made improvements you think the original project should have, you can open a pull request to the original repository. It is up to the original repository collaborators if they want to accept the pull request or not.

## Day 10 - 2022-04-19
### Going through course content for day 15:
<b>Understanding HTML & CSS layouts and positioning</b><br>
New HTML element: ```nav```, which is a block element.<br>
```span``` is a non-semantic inline element<br>
```div``` is a non-semantic block element<br>

To have two block elements after eachother, where one is an anchor tag and inline actually, you can either add ```display: block;``` to its CSS or you can wrap it in a ```div```. The latter is most common.

We will have multiple links on the page, but only one logo, so we'll add an id to the div containing the logo to uniquely select it. To be very specific, the teacher selects it with ```#page-logo a { ... }```

New CSS: ```text-transform``` and ```text-shadow```<br>
```text-transform``` can change how letters are displayed, like capitalize, lowercase, uppercase and more.<br>
```text-shadow``` works the same as ```box-shadow``` but just for text.

When structuring the CSS files, the teacher likes having the type selectors at the top and id selectors at the bottom.

<b>Introducing CSS Flexbox</b><br>
Given the following page:
```HTML
<body>
  <header id="container">
    <div>
      <p>Travel Goals</p>
    </div>
    <nav>
      <ul>
        <li>Destinations</li>
        <li>About</li>
      </ul>
    </nav>
  </header>
</body>
```
With the following styling:

```CSS
#container {
  background-color: rgb(82, 23, 81);
  padding: 10px;
  width: 600px;
}

p {
  background-color: rgb(211, 88, 209);
  margin: 10px;
  width: 250px;
}

ul {
  background-color: rgb(250, 146, 63);
  list-style: none;
  width: 250px;
  margin: 10px;
  padding: 0;
}

li {
  background-color: rgb(238, 212, 192);
  width: 100px;
}
```

The block elements are shown under eachother. We however want the div to the right with the nav to the right. We also want the list items next to eachother and not under eachother. This is where Flexbox comes into play as it allows us to manage the space or the way the elements are aligned or positioned inside such a box. We will need to create a flexbox container to manage the children. In our example here the header is the one to use as it has two direct children, the div and the nav. Add ```display: flex;``` to #container.

When flexbox is added, chrome devtools show a "flex" element after the header. This can be clicked and will show lines around our elements in the browser, showing the flexbox.

With flexbox we have more properties to change the default behavior, which was just showing the elements after eachother.<br>
```Flex-direction``` has row as default. Changing to column positions elements below eachother. Column-reverse reverses the order. Row-reverse also reverses the order.<br>
This different alignment also has implications for the way flexbox works! With direction: row, we have a main axis starting from top left going to the right. From top left and down is the cross axis. Changing direction to row-reverse also reverses the axis, so it is now from top right to the left for main axis, and top right and down for cross axis.<br>
For direction: column the main axis starts from top left going down, with cross axis starting top left and going right. column-reverse changes so main axis goes from bottom left to the top, and cross axis from bottom left to the right.

```Flex-wrap``` is set to nowrap by default, which means that elements won't change position if the window gets smaller. Setting it to wrap makes the element change position, being put under eachother if the width of the window gets too narrow.

```Flex-flow``` is a combination of direction and wrap, where you can set for instance both of row and nowrap on it.

<b>Aligning flex items</b><br>
New property introduced: ```align-items```. Value ```center``` to position items at the center of the container.<br>
With the defined with of 600px and left aligned content, there is some space at the end of the header. The logo should be to the left, and the nav to the left in the flex container. With the property ```justify-content: space-between``` we can move the space from the end of the container, to inbetween the logo and the nav. ```space-around``` will divide the space and put it before the first element, between the two elements, and after the second element with between seemingly getting the most space. ```space-evenly``` divides it evenly instead. ```center``` will divide the space in two and put half before the first element and the rest after the last element.<br>
```justify-content``` has ```flex-start``` as default, putting elements at the beginning and the space at the end. ```flex-end``` puts the space at the beginning, moving the elements towards the end. (And what that is depends on the axis I guess.)

### Going through course content for day 16:
<b>Flexbox challenge time!</b><br>
Can you reposition the nav elements so they are on the same line, and positioned to the right?

My attempt: Add ```id="list-container"``` to ```ul``` element and the style it like this:
```CSS
#list-container {
  display: flex;
  justify-content: flex-end;
}
```
Teacher solved it by adding the exact same styling to the ```ul``` element directly. To really right-align the text, also add ```text-align: right;``` to the list item styling.

Added flexbox to the project.

<b>Adding a background image</b><br>
They are not added in HTML but through CSS, and can then be added to a specific element. Added to our hero-banner:
```CSS
height: 800px; /* increase the height for now to make it more visible */
background-image: url("/code-playground/images/places/ocean.jpg");
```
The image is now behind our other elements, because the elements are children of the section. With an image and an inline element, this would be a bit more tricky.

Two core properties define how the image is displayed. (Right now it only shows some water and not the entire image as it's bigger than the browser window.)
```CSS
background-position: center; /* This centers the image, shows what's in the middle */
background-size: cover; /* Used to cover the entire element, though I guess it scales it to make it so */
```

<b>Create container for the hero content</b><br>
Can use non-semantic block element for this. (div) Add id of "hero-content". Set a background color for the hero element, but use rgba, as we need some opacity, meaning it should be slightly see through:
```CSS
background-color: rgba(51, 47, 47, 0.8);
```
Here you can really see the effect of the opacity, as changing it to 0.2 as has been used previously makes it almost completely transparent.

Adding text-align:center to a container means center will be applied to its content.

To center a block element, use margin with auto. In this case, 0 for top and bottom, auto for left and right:
```CSS
margin: 0 auto;
```

<b>Positioning elements</b><br>
See positioning example in the code-playground folder. The important bit is the div with id of container and the elements inside. We want to move an element down, how do we do that? One option is to change the element position in the document flow. Document flow is the order of elements in the HTML document. The position of the elements in theis document flow can be changed with some new attributes.<br>
```position: static;``` is the default. Nothing changes, the elements are where they are.
```top: 20px;``` will move the element you've selected down 20 pixels. But not if position is static, then nothing changes. Change position to relative, and elements can be moved.<br>
An important thing to observe is that the other elements remain fixed at their position, so by moving #2 down, there will be space between #1 and #2, and #2 will overlap #3.<br>
Other attributes are bottom, right and left.

<b>Styling the hero content</b><br>
Updated code only, no new attributes

<b>Understanding fixed & absolute positioning</b><br>
The task it to move the div containing the background image to behind the header, so that gets the background image as well.
```position: absolute;``` changes so element 1 remains, element 3 follows it, but elements two is on the same line as element 3 and before it but using only a little of the width as it behaves like an inline element. Element 2 is now taken out of document flow. It is positioned relative to the first ancestor with position relative applied. If position relative is added to the container, it will be relative to the container. If not, relative to the HTML tag.

To have a sticky navigation bar position can be set to fixed. Then the element will stay in the same place on the screen, even if scrolling down on the page. In other words, it sticks to the visible area, which is called the viewport.

### Going through course content for day 17:
<b>Working with % units</b><br>
With position set to absolute, width: 100% will be the same width as the html element, which might not be what we want. In the example given, html width is 738 (which the element in question follows) but the body and the container is only 722 in width.<br>
This is because the ```box-sizing``` property is set to content-box by default. This gives us 738 pixels width for the content. (Then we have padding and so on as well extra).<br>
Set box-sizing to border-box to make the entire element 738 pixels wide, and given 50 pixels padding on each side, content only gets 638 pixels. If we now add a border to this content, the entire size of it will stay the same, and the content will get even less space. Border-box only applies to content, padding and border, so margin can't be added.

<b>Styling images with object-fit</b><br>
```object-fit``` has default value of fill, which means it fills the space given, even if that can distort the image by not maintaining aspect ratio. ```Contain``` instead keeps the aspect ratio, but the image will be resized inside the container, and you might have space in the container if image is wider or taller.<br>
To avoid these problems, use ```cover``` which will keep the image in the aspect ratio but also fill the container. This means images might be zoomed in a bit, and top or bottom clipped off

## Day 11 - 2022-04-20
### Going through course content for day 18:
<b>Understanding parent - child margin collapsing</b><br>
Margin collapsing doesn't only occur between adjacent elements as we have seen eariler, but also in a parent-child relationship. For our current project there is some white space below the background image, the #hero section and above the #highlights section. Where does this white space come from? The h2 element, which is actually a child of the highlights section.

To fix this, target the highlights id and add some padding of say 24 pixels. Now devtools will show where the space comes from on the sections instead of having to investigat the children. This occurred now because the parent had no margin or padding applied, but the h2 element inside had a margin. This "collapses" the margin and adds the margin we have in the child to the parent.

<b>CSS functions - Linear gradients</b><br>
CSS supports functions, with that we can set a gradient on the background like this:

```CSS
background: linear-gradient(45deg, rgb(227, 255, 253), rgb(202, 243, 240));
```

What about the degrees? 0 degrees starts with first color at bottom and ends with second color at the top. 45 degrees starts in the bottom left corner, 90 degrees starts on the left and goes to the right, 180 degrees starts at the top and ends at the bottom.

### Going through course content for day 19:
Note: Day 18 was mostly about going through the page setup for the project, using mostly known knowledge, that's why there wasn't many notes.

<b>Creating the card layout</b><br>
Note: Images are pretty much the only element we set the height for. Typically we work with padding to increase the height.

Mostly code changes using flexbox, and structuring the html correctly.

<b>Understanding overflow</b><br>
Border-radius was set up, and we expected rounded corners on the image, as well as the element with the description. However that didn't happen, because the image exceeds the border of the container. It doesn't exceed it in general, but in the corners where we apply the different property to our container. We can change this behavior with a new property called ```overflow```. This allows us to control how an element which exceeds the dimension of the container is behaving. To achieve the rounded corners we want, we want to clip the image in the corners, and overflow can do that. This property is not applied to the child in the container, but the container itself because typically you want all elements that are part of the same container to behave the same way. At least when it comes to overflow.

```overflow: visible;``` is the default behavior. What we want is ```hidden```.

with ```flex-direction: column``` and ```justtify-content: space-between```, if we have 3 elements, they will get even amount of space between them. But what if we want two of the elements grouped together, and all the space between those two and the last? Add a div around the elements you want to group together.

When adding for instance border-radius to have rounded corners when you hover over an element, we don't add it to the a:hover selector, but on the main, regular selector. Otherwise there can be glitches in the styling, and elements can jump around a bit.

<b>CSS Grid</b><br>
While flexbox shines in one-dimensional layouts, we can use it to align elements in row or column, css grid shines in two-dimensional layouts where we want to control column and/or row.

To use it, add the ```display: grid;``` property to the container. We now get a grid "button" in devtools. This will show counters for the rows, from top to bottom, and for the columns, left to right.

```grid-template-columns``` allows us to predefine a specific column count inside our grid. We will have to specify the width for each individual column we want to have, and not simply a number of columns. So if container is 800px wide, we make a two column layout of equal width like this:<br>

```CSS
grid-template-columns: 400px 400px;
```

We can set the second column to use less space, and that will leave more space at the end.<br>
```CSS
grid-template-columns: 400px 200px;
```
This can be intended, or it can be a mistake. That's why we don't work with pixels here normally, but with fractions:<br>
```CSS
grid-template-columns: 1fr 200px;
```
This makes the first column use 600px to fill out the space not used by the second column. We can get the same result by setting first column to 2fr and second column to 1fr. This divides the entire width into 3 fractions, and the first one gets two of those.

To specify the gap, or the distance between our elements, we can use the ```gap```property:
```CSS
gap: 100px 200px;
```
This gives a gap of 100px between rows and 200px between columns.

<b>Understanding Nth-type selector and grid-column</b><br>
To target the first list element in a list, we can do this:

```CSS
li:first-of-type {
  background-color: yellow;
}
```

There seems to be no second-of-type, third-of-type and so on, so how do we select those elements? With ```nth-type-of()```:

```CSS
li:nth-type-of(3) {
  background-color: yellow;
}
```

How would we make our third element take up two columns then? With ```grid-column```. Values are start column / end column like so:

```CSS
grid-column: 1 / 2;
```

This doesn't seem to do anything. Look at numbers displayed on page after having clicked grid button: The first column starts at position 1 and ends at position 2. The second column starts at position 2 and ends at position 3. So the full solution then is this:

```CSS
li:nth-type-of(3) {
  background-color: yellow;
  grid-column: 1 / 3;
}
```

This is not the only way to achive this though. The last grid-column can have a value of ```span 2``` instead, which achives the same.

### Going through course content for day 20:
Challeng time: Can you fix the places page to have two columns for most, but London, the third element, should occupy the entire line?<br>
Yes, simply add
```CSS
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 20px;
```
to main ul selector and then select the third element and set it to span two columns:
```CSS
main ul li:nth-of-type(3) {
  grid-column: 1 / span 2;
}
```
Width in main ul have to be removed, as that seems to override the span settings.

<b>Working with Unicode UTF-8</b><br>
See [Arrows (Unicode block)](https://en.wikipedia.org/wiki/Arrows_(Unicode_block)) on wikipedia for arrows. To add an arrow pointing from left to right, make sure charset of HTML document is set to UTF-8 in the head:
```HTML
<meta charset="UTF-8">
```
Then to add the arrow found at the top row in the column named 2, see the first number on the line which is 219x. Replace the 2 for the x and you get 2192. To add this symbol then, add ```&#x2192``` where you want the arrow to show.

## Day 12 - 2022-04-21
### Going through course content for day 21:
<b>What is responsive design?</b><br>
It is all about the webside content, layout and adjustments depending on the device size, as people no longer only visit pages from a desktop computer with a large screen, but also from mobile devices and tablets with different screen sizes. The idea is to make the website not only function but also look good regardless of screen size.

<b>The problem with pixels</b><br>
Why are units important to implement a proper responsive design? Using font-size as an example. The problem with pixels are that they are not scalable. 10 pixels are 10 pixels, and this doesn't scale if the user has made any scale changes to how they are viewing your content. In other words, if user has changed font size in the browser but you have set a fixed pixel size for your content, the browser adjustments will be ignored.

<b>Introducing em and rem</b><br>
% - Relative to parent element size but hard to mange due to cascading nature<br>
em - ephemeral unit - size is relative to font-size and hard to manage due to cascading nature<br>
rem - root ephemeral unit - size is relative to root elements font size (root element is the html element) - preferred choice if applicable<br>

### Going through course content for day 22:
<b>Setting em and rem for the font-size</b><br>
An example: H2 might have 1.5em set as default by the browser. If we set it to 100%, the size will actually decrease! In browser devtools, if we select the h2 element and go to the computed tab we can see its actual size. Given a font size of 16px set in browser settings, computed will now also show 16px. Changing size in browser settings changes size in computed. In other words, it follows user settings.

We can override user settings if we first sett font-size to say 24px for the parent element. Then if we set size to 200% on the element, computed size will be 48px.

For font-size, and only font-size, and that is important, the em value works the same way as the percentage value. So in the same example as above, setting font-size to 2em will also give 48px in computed. Also, it always refers to parent element font-size and calculates font-size relative to this element. Setting parent to 2em would double the size one time, and then setting the child size to 2em would double the size again, so a 4 times increase!

With rem this doesn't happen, as it is always relative to the root elements font-size. If font-size is not set for the root element (the html tag) the font size follows browser settings. For instance, setting font-size on the body element has no effect on what rem does.

<b>Deep dive into em vs rem vs %</b><br>
If we change padding from say 16px to 10%, what will the padding be? What is the 10% of? Percentage values always depend on parent elements, so it is calculated from that elements width. Parent width in this case 292.7px, so padding ended up being 29.2px or thereabouts.

Changing from percentage to 0.1em on the same example gives us a padding of 3.2 pixels. Both rem and em, when applied to other elements than font-size, still calculates their size based on font-size. Rem on the root elements font-size, while em uses the actual elements font-size. That is 32px in this example, and thus 3.2 pixels padding for 0.1em.

Border-radius is an exception for dynamic unit. If the element gets bigger and bigger, it might not make sense for the corner to change relative to that.

<b>Comparing desktop and mobile first design</b><br>
Desktop first design is the traditional approach, as we had desktops and computer screens before the mobile devices we have today. It means designing for desktop first, then making sure it looks good on mobile afterwards.<br>
Mobile first design is the oposite, we design for mobile first, then make sure it looks good on desktop afterwards.

Know your audience! If you are developing say a corporate site to be used in office, desktop first design is probably fine. This might also be necessary for a feature-rich website.

The mobile first approach is a more functional approach, as we have more limited space on a mobile screen compared to a large screen. (Though I guess the large tablets we have today sort of erases that issue?). This means we have to more clearly think about how we want to present our content, and what type of content to present. Also great for "lifestyle" or "news focused" audience. So what comes here is content first.

<b>Understanding media queries</b><br>
Responsive web design is all about media queries. A media query is CSS code you add to your site, like this:

```CSS
@media (min-width or max-width: 1200px) {
  p {
    font-size: 2rem;
  }
}
```
This means we want to look at device information from the user, and if this device meets certain criteria then the code we define in this query should be executed. The width here refers to the screen width.

If you're using desktop first approach, the media query would use the max-width keyword. Why is that? Because we start with the big screen, and want to adjust the content downwards towards smaller screens.

For mobile first we go from min-width first, for instance for screen width of 768 pixels or more apply the specified settings and work towards larger screen sizes. Next breakpoint could be 1200 pixels for instance.

Common breakpoints, should differentiate between portrait mode which typically are smartphones and in some cases tablets and landscape mode. The last is typically notebooks, desktop computers or TVs.

Breakpoints portrait: 480px, 768px
For landscape: 1024px, 1200px, >1200px

### Going through course content for day 23:
<b>Adding media queries to the project</b><br>
768 pixels breakpoint, we assume the user is in portrait mode on a mobile device. We need a media query stating that starting from desktop view and coming down to a width of 768 pixels or less, the grid layout should change.

Will add the media query to the bottom of our styles.css file.
```CSS
@media (max-width: 768px) {
  #latest-products ul {
    grid-template-columns: 100%; /* or 1fr, use all space for single column */
  }
}
```
We don't need to change gap, since with only one column, there is no gap.

What happens if we change the media query from max width to min width? Then we get the mobile, single-column view on desktop, with screens wider than 768 pixels, and the desktop view with two columns for more narrow screens.

Or again, mobile first means you design for small screens. Then you look at what needs to change to make it more presentable on bigger screens and add media queries to apply those changes. Min-width means the screen needs a minimum size of this, before the media query is applied.

<b>Side drawer and hamburger icon</b><br>
New topics: Internal links. Link to a place on the page. (href="#id")<br>
Target selector which activates if defined ID is selected in the URL. (#id:target)

<b>The hamburger menu first:</b><br>
Inline elements only occupy as much space as needed, and if they don't have any content, they are not displayed at all. Display: block could work to make the element use all the space it was given, but there is a more elegant alternative: Turning it into a flex container. Remember to change from default flex behavior of row, so each element is displayed next to eachother, to column.

```HTML
<a href="" class="menu-btn">
  <span></span>
  <span></span>
  <span></span>
</a>
```

```CSS
.menu-btn {
  width: 3rem;
  height: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.menu-btn span {
  width: 100%;
  height: 3px;
  background-color: white;
}
```

<b>The side drawer:</b><br>
New HTML element: aside
```HTML
</header>
<aside id="side-drawer">
  <nav>
    <ul>
      <li>
        <a href="">Browse Meals</a>
      </li>
      <li>
        <a href="">My Orders</a>
      </li>
    </ul>
  </nav>
</aside>
<main>
```

```CSS
#side-drawer {
  width: 100%;
  height: 100%;
  background-color: rgb(29, 26, 27);
  position: fixed; /* Take it out of the document flow */
  top: 0; /* position it in the viewport */
  left: 0;
}

#side-drawer ul {
  list-style: none;
  margin: 0;
  padding: 4rem 1rem;
  display: flex;
  flex-direction: column;
  /* justify-content: center; main axis can be removed now with column */
  align-items: center;
}

#side-drawer li {
  margin: 1rem 0;
}

#side-drawer a {
  color: rgb(253, 239, 213);
  font-size: 2rem;
}
```

<b>Understanding HTML fragments</b><br>
Did not quite catch that, but I think that you can basically set up an ID somewhere on the page, like so:
```HTML
<div id="something"></div>
```

Then you can jump to that part of the page with a link like this:
```HTML
<a href="#something">Jump to something</a>
```

The empty id, so just the # jumps back to the top of the main page.

### Going through course content for day 24:
<b>Understanding the target selector</b><br>
We don't want to actually jump to the side drawer, but we want to open it when we click the hamburger button. We have a pseudo selector for exactly that: target. So like hover which we have used for links. From the example above, it would be:

```CSS
#side-drawer:target {
  display: block;
}
```
<b>Introducing the z-index</b><br>
With the position property we can change the default element position. Sometimes then, one element can overlap another, and you want to control which element is above the other. For this we have the z-index.

The z-index defines the z-order of a positioned element. (Meaning an element with the position property applied with a value different than static.) The z-order referes to the z-axis, so it controls how elements are stacked above eachother if applicable.

The default is set to auto, which is equivalent to 0. Positioned elements with a higher z-index are positioned above elements with a lower value.

Code example in 1.z-axis folder. Notice that when element 2 was moved on top of element 1, adding z-index: 1; to element 1 was not enough to bring it to top. It also had to have position: relative; added.

<b>Creating beautiful websites</b><br>
This section is not so much about coding, but examining what makes a site look good.

3 thinks to remember:
* Add different features step by step
* Think about core information that should be transferred
* Less is more - don't overstyle your website

<b>Sizing and spacing</b><br>
The convention nowdays is to give the content some space to the left and the right, to keep the content centered. So even if we have very wide screens these days, don't fill all the space you have with content. Have a look at for instance [stripe.com](https://stripe.com/) to see a clear center focus. The same is true for Amazon, though they have a header that fills the width.

Talking about space, look at the card itself in the example. See how there's space around the h1 element, to the left, top and to the right. Give your content more space than needed when starting to design a website, you can always decrease it later.

<b>Choosing the right font</b><br>
Font-type is an option, the font-family. The card uses a serif font for the header only, then sans-serif for the rest of the content.<br>
The second option is the font size.<br>
The third option is font weight.<br>

Font family: Uses Krub for most of the card. This is a sans-serif font. To more easily find a font on google fonts, remove the types you are not interested in. So only leave sans-serif selected for instance. Then play around with the number of styles option. More styles might mean a better font, given more time was possibly spent making it.

Font size: Use them sparingly, 3-4 should be enough. Otherwise it can look messy and possibly make it harder to read.

Font weight: Most of the text should have regular font weight, and bold or semi-bold should be used to emphasize something important.

<b>Understanding the importance of grey, primary and accent colors</b><br>
Grey is always needed. The card for instance is white, so the background is a light grey. The font looks black, but actually has a dark grey color, as pure black can look unnatural.

Primary color: The primary color of the card is the light blue color, as you will see it again and again. Udemy.com for instance has a purple primary color, as you see it many places. This sets the tone, sort of your identity.

Accent color: This could be for a badge on the card for instance, saying we have a special offer at the moment. Here it could be a yellow tone. (Probably some color theory behind this?)

These 3 colors should get you a long way to making a good looking website.

Tip: Maybe create a selection of go-to font-families and colors so you can focus on the design of the website, sort of have a toolbox of some of the basics ready. Otherwise you can quickly get lost in choosing between various color nuances.

## Day 13 - 2022-04-22
### Going through course content for day 25:
<b>Introducing CSS variables / CSS custom properties</b><br>
So far when we've used the same color in multiple places we've had to have the same color values all those places. Wouldn't it be better to defint it once and use it multiple places? 

Enter variables. Typically added to the html element in our styling. Example how to set and use a variable in CSS:
```HTML
html {
  --color-grey-100: rgb(236, 236, 236);
  background-color: var(--color-grey-100);
}
```
The number in the variable is semantic and indicates that this is a light grey color. For a dark grey color, we would set the number to 900.

More variables:
```HTML
html {
  --color-grey-100: rgb(236, 236, 236);
  --color-grey-400: rgb(134, 134, 134);
  --color-grey-600: rgb(58, 58, 58);
  --color-grey-900: rgb(41, 41, 41);

  --color-primary-300: rgb(167, 236, 255);
  --color-primary-700: rgb(0, 170, 255);

  --size-1: 18px; /* Smallest font size we've used on page */
  --size-5: 50px; /* But should be rem I guess and not px */
}
```
For font sizes we don't have has many steps in between as for colors, that's why we typically use 1 to 9 for font size.

<b>Comparing root vs html vs * selectors</b><br>
html - selects the html element which is the root element of an html file. CSS rules are applied to html element and inherited to nested elements inside the html element.

:root (pseudo selector) - selects element which is the root of the document. For html files this will be the html element. But CSS can also be used with other files, so then you have this root selector in case you want to select the root element. It works the same as the html selector, CSS rules are applied to root element and inherited to nested elements inside the root element.

\* - selects all elements of the html document. CSS rules are applied to all elements. (Specificity must be considered though)

<b>Understanding CSS transformations and transitions</b><br>
Transformation - Move / change appearance of element, for example when hovering<br>
Transition - Smooth transition from initial to transformed state<br>

<b>Transformation:</b>
```CSS
.card-container:hover {
  transform: scale(2);
}
```
This will double the size of the card when you hover over it. To increase by 10% instead of doubling, use scale(1.1);

More about [transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) on MDN.

<b>Transition:</b><br>
These have to be defined in the initial state, so not in the state that triggers the transition. Or in other words, it needs to be defined in .card-container, not the :hover pseudo-selector.
```CSS
.card-container {
  transition: transform 0.5s ease-out 1s;
}
```
We want to add a transition to our transformation.
Transform = property, 0.5s = duration, ease-out = timing function, 1s = delay

Can be used for hover effect to change background on buttons like this:
```CSS
.button {
  transition: background-color 0.5s ease-out;
}
```
This transition will then be activated when hovering over the button.

More about [transition](https://developer.mozilla.org/en-US/docs/Web/CSS/transition) on MDN.

<b>Working with SVGs</b><br>
SVG is short for Scalable Vector Graphics and is an XML based markup language to describe two-dimensional vector graphics. Or maybe more friendly definition: Text based description of scalable images that can be rendered by the browser.

Free icons can be found on [heroicons.dev](https://heroicons.dev/) and [heroicons.com](https://heroicons.com/)

Added in an svg element in html.
```HTML
<div class="icon">
  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
</div>
```

### Going through course content for day 26:
<b>Adding forms to websites</b><br>
What are web forms? A way for the user to enter input, as most websites are not just about presenting/showing content. For example a contact form, checkout forms for address and so on, login form, comment form.

There are special HTML elements for getting and handling user input. The most important one that will be used all the time is input: ```<input type="...">```. The type attribute controls which type of input will be shown, for instance single line text input, only numbers input, email-address input and so on. Another important one is ```<textarea>``` which is a multi-line text input field. ```<select>``` is for dropdown multiple-choice or multi-select input. ```<button>``` is not for taking input, but for resetting or submitting the form.

Notice how input and button are both inline elements. Devtools shows it as display: inline-block as default, so margin and padding works as for block elements.

<b>The form element, submission and different types of requests</b><br>
We have the input and we have the button, but we're missing the actual form element. This is not an element for fetching user input, but should wrap around your inputs and should mark the overall form. So if our input and button together should create a form so the user can enter and submit their data, we add the form element around it.

Pressing the button before the form element was added did nothing. After, it clears the input field and a question mark is added to the url. But nothing was actually sent yet. We need the action and method attributes for that. Action specifies where to send the data, ```/user-data```for instance, method specifies the method to use, like POST or PUT.

```Input``` can take a name property, and setting it like this: name="user-name" will send "user-name" as key, with the content of the input field as value for that key when using POST method. If GET method is used, the data will be set as query parameters on the URL.

### Going through course content for day 27:
<b>Styling the form element</b><br>
Just like with any other element:

```CSS
body {
  background-color: rgb(31, 31, 31);
}

form {
  width: 30rem;
  margin: 3rem auto;
  background-color: white;
  padding: 1rem;
  border-radius: 6px;
}

input {
  width: 100%;
  display: block;
  margin-bottom: 1rem;
  box-sizing: border-box;
}

button {
  display: block;
}
```

The input field was using the wrong box sizing, so the space after the element was less than in front of it. Setting it to border-box fixed that issue.

<b>Adding labels</b><br>
The form so far is missing some critical information, namely what input is expected. We can use the label element for this:

```HTML
<label for="your-name">Your name</label>
<input type="text" name="user-name" id="your-name">
```

The for attribute connects the label to a given input, otherwise screen readers wouldn't know what belongs where if there are many input fields. To connect it, the input needs an id. That can be the same as name. The name identifier only matters for the form submission and is meant for the server receiving the request.

Connecting the label to an input fields is mainly for assistive technologies, but it also changes something on the page, though not visibly: You can now click the label, and the corresponding input field will be activated for typing! I did not know that!

<b>More detailed form styling</b><br>
Setting a fony-family on the body tag does not affect the input font, or the button font! This is because they have a font set by the user agent (the browser) and specificity overrides the global body font-family. Because of that, we need to override it again.

Instead of just setting just font-family, we can also use the ```font``` property to override all font properties: ```font: normal 1 rem 'Roboto', sans-serif;``` If we just want to use the same font settings as we have in the rest of the document, we can just use inherit. The same will have to be done for input if you want it to follow the document style.

We can change the cursor on hover for instance, to change to the hand icon.
```CSS
button {
  cursor: pointer;
}
```
Notice how we don't have to specify the :hover pseudo-selector for this

<b>Understanding different input types</b><br>
```<input type="text">``` A single-line input field, can't enter multiple lines easily. Can be as long as we want, unless restricted to a given number.<br>
```<input type="email">``` Looks the same as single-line, but is optimized for email input on mobile. We also get some input validation so if it doesn't look like a valid email address a warning will be shown.<br>
```<input type="number">``` Optimized for numbers on mobile. Also restricts user from inputting anything but numbers. Gives an arrow selector to increase or decrease the number. Can set a step value to control the increments. step="10" would increment/decrement by 10 when clicking the arrows. We can also set max and minimum value.<br>
```<input type="password">``` Character input is hidden.<br>
```<input type="date">``` Opens a date picker when clicked, making it easier to input dates<br>
```<input type="radio">``` Can be used to present multiple options where only one option can be selected at a time.<br>
```<input type="checkbox">``` Can be used to present a toggle (yes/no) option to agree to terms or not.<br>
```<input type="file">``` Allows the user to pick a file to upload.<br>

See more [input types](https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types) on MDN. Note that not all options are supported equally well in all browsers.

<b>Working with radio buttons</b><br>
To force the user to only select one of the options, all radio button choices have to have the same name. They will have different IDs, but the name must be the same. We also have to set the value to be sent when a given radio button is selected.

Note that value can be set for all input types, and will function as something pre-selected or pre-entered or a default value shown.

### Going through course content for day 28:
<b>Using checkboxes</b><br>
For a single checkbox, like agree to terms, there is one special thing to note: If the checkbox is checked, it's name will be sent to server with value on. If it isn't checked, the name won't be sent.

For a group of checkboxes (having the same name property) where you can select from none to many options, value is necessary to discern what the user checked or not. Curious minds wants to know, couldn't we just have different name for the checkboxes? Given they would then send =on if check.

<b>Textarea for longer input</b><br>
The textarea element has a closing tag, separating it from the input element which does not. Typically it will not have any content between the opening and closing tag though.
```HTML
<textarea name="" id="" cols="30" rows="10"></textarea>
```
It also doesn't have a type, as it is always for long standard text.

Note: cols and rows was added by VS Code when it created the element and the teacher did not go through these. It seems they set some default size of the text area in rows and columns, though it doesn't seem to match with 30 character columns and 10 rows. Also in new browsers the text area can be resized by clicking the bottom right corner. To disable this set resize: none; on the element.

<b>Adding a dropdown</b><br>
A dropdown menu is created with two elements, ```select``` for the container and ```option``` for the different options to select from.
```HTML
<label for="favoritecolor">Favorite color?</label>
<select name="favorite-color" id="favoritecolor">
  <option value="blue">My favorite color is blue</option>
  <option value="black">My favorite color is black</option>
  <option value="red">My favorite color is red</option>
</select>
```

By default the value that is submitted is the text shown to the end-user, unless you add a value property.

<b>Forms and semantics (structuring forms)</b><br>
Our huge form is a bit hard to read when looking at the code, so let's see if we can't organize it a little better. We can start by grouping similar items into sections. Then adding titles with h2 makes it easier to digest as a user as well, as it's more clear what it's about. Then add a list for the sections with more than one element.

Removing all padding and margin from lists gives us the semantic value of having a list, but we don't get any (unwanted) visual effects from it

<b>More about form buttons</b><br>
The button, when placed inside a form, submits that form. Then it depends on the attributes set, action and method, how the form is submitted.

Button behavior can be overridden with JavaScript which we'll dive into soon. It is also worth mentioning that buttons can be added outside forms. You don't have to use them in forms. It's just that inside of a form they have a default behavior of submitting the form. Outside of a form you will always have to use JavaScript to do anything when a button is clicked.

Inside a form, if you want to override the default behavior, you can do that with the type attribute. The default for type for a button is submit, so you don't have to set this, but you can to be more explicit. If you sett button type to button, it will not submit the form.

We can add a second button which we can use to reset or clear the form. For this to work, we can set the type to reset.

<b>Validation attributes</b><br>
We can override validation on variour input types by setting the "novalidate" attribute on the form. No value needed, it acts as a boolean. This might be needed if you bring your own validation logic, say because you have written that in JavaScript.

Adding "required" to any input element makes the content required. Meaning, it might not matter what we enter, but we have to enter something. Like novalidate this is a boolean.

We can also add another attribute to require a certain minimum length of the input, for passwords for example: ```minlength="15"```. There is also an option to restrict the input with maxlength.

Notice, we have to set the required attribute for the input to actually be required. If we set a minlength, but not required, we can actually skip the element. It's only if we've typed something in the element that doesn't meet the criteria that it will complain.

To add restrictions on age, simply set the min and max attributes. ```min="18"``` if minimum allowed age is 18 for instance, and ```max="120"``` if maximum allowed age is 120.

Date can also be required, and min here will not be a number, but a date expressed in a certain format. It should look like this: ```min="1921-01-01"``` which would say that the minimum date is january 1 1921. Max for date can be set the same way: ```max="2022-12-31"``` for end of year 2022. The date picker pics up on this, and if max date is less than todays date, it might set max date as default selected date.

Vaølidation can also be added on radio buttons, but adding require to them, and by them it means all of them. It does not mean all of them are required, but one of them.

<b>More input and form attributes</b><br>
You can add placeholders to your input fields. This will be done with the placeholder attribute, instead of entering something as a default value as was mentioned before. The advantage of the placeholder is that it shows in light grey text, and vanish as soon as the element is activated. Meaning the user doesn't have to delete the text first, to start typing. Another way to look at this is that the value will be treated as if the user entered it. (And that might be useful to pre-fill forms later) This should not replace the label, as it does not have the same accessibility value as the label has.

For textarea we have an additional attribute, rows. Rows set how many rows are displayed, how big that textarea is. As for the resize that was mentioned earlier, it can also be set to horisontal, vertical or both, to decide how the area can be resized, if at all.

### Going through course content for day 29:
Challenge time, finished page shown, can you recreate it?

Basically a copy of the form teacher had already walked through, so a walk in the park, just minor variations though time-consuming.

<b>Introduction to JavaScript</b><br>
I'm familiar with some basics already, so these notes will probably not be very thorough and will probably skip over pieces I feel I know very well.

What is JavaScript? A programming language that can be executed by browser. It is in fact the only programming language browsers can execute. That being said, it is also a programming language you only need a browser to use, and who doesn't have that these days?

What we have so far:<br>
HTML - Define structure and semantics<br>
CSS - Style the elements and page content<<br>

What can JavaScript do then? Change the page after it was loaded! JavaScript can do this dynamically without loading a different HTML file, it can do behind the scenes calculations and much, much more!

Some use cases:<br>
Update displayed date behind the scenes, like weather or stock data or chat messages that can be fetched dynamically without reloading the page<br>
Display or use a timer to then do something when the timer is reached<br>
Validate more complex user input and show error message and change styles on elements at the same time<br>
Display and manage complex overlays<br>
Re-order, hide/show or remove elements on the screen, for instance in a drag and drop list<br>
Keep parts of websites working even if the internet connection is lost (would like an explantion on this but none was given).

<b>What will you learn in this module?</b><br>
Syntax: It's the grammar of a programming language, or the rules you have to follow when writing code.<br>
Core features: variables and values, arrays and objects, functions, working with the DOM and finally control structures.<br>

<b>Introducing values and variables</b><br>
Understanding values:<br>
Text, "This is an example of text", which will be referred to as string from now on.<br>
Numbers, 45, is another key value.

When we work with values, we typically do that in the context of variables, another key concept in any programming language. You can think of a variable as a box, that holds something. What it holds is the value. A variable has a name, so you later can reference the correct "box".

## Day 14 - 2022-04-23
### Going through course content for day 30:
<b>Adding the ```<script></script>``` element.</b><br>

Can be added both to head and body. Like the style element it does not render anything on the screen. Can take in JavaScript directly between the tags, or load it from a file with the src="" attribute.

```HTML
<script>
  alert('Warning! This is an alert!');
</script>
```

Use camelCase for naming variables and functions in JavaScript. First letter lowercase, each word after that should be capitalized. No spaces.

```JS
let warningMessage = 'Warning! This is an alert!';
alert(warningMessage);
```

<b>"Outsourcing" JavaScript to external files</b><br>
HTML files should be for HTML, and should not be "bloated" with loads of JavaScript, so we'll move that into it's own file, and load it like this:
```HTML
<script src="script.js"></script>
```

<b>Introducing arrays</b><br>

```JS
let hobbies = ['Photography', 'Reading', 'Rowing'];
alert(hobbies);
alert(hobbies[0]);
alert(hobbies[2]);
```

<b>Introducing objects</b><br>

```JS
let job = {
  title: 'support',
  place: 'abroad',
  years: 5
};
```
### Going through course content for day 31:
<b>Splitting code accross multiple lines</b><br>
See above for object example. Strings can't be split like that, unless backticks are used around the string instead of single or double-quotes.

<b>Accessing object properties</b><br>

```JS
alert(job.title);
alert(job.years);
alert(job.place);
```

<b>Performing operations</b><br>

```JS
let age = 32;
let yearsAsAdult = age - 18;
let multiply = age * 2;
let divide = multiply / 4;
age++;
age += 1;
++age;
age--;
age -= ;
--age;
```

<b>Onwards to custom commands</b><br>
Don't Repeat Yourself, basically. Showing how we're doing the same calculations twice, and if you want to change it, you have to change it both places. Instead of doing that, we should define our own commands which we can use in multiple places. We do that with functions.

<b>Introducing functions</b><br>
Function names should not describe what's in them, but what they do.

```JS
let age = 32;
let yearsAsAdult;
function calculateYearsAsAdult() {
  yearsAsAdult = age - 18;
}

calculateYearsAsAdult();
alert(adultYears);

age = 45;
calculateYearsAsAdult();
alert(adultYears);
```

<b>Functions and variables</b><br>
Variable shadowing - can override variables from outside functions inside them. Also variables have to be defined before the function is defined for the function to access it.

<b>Returning values</b><br>

```JS
let age = 32;
function calculateYearsAsAdult () {
  return age - 18;
}

let yearsAsAdult = calculateYearsAsAdult();
```

<b>Passing data into functions with parameters</b><br>

```JS
function calculateYearsAsAdult(input) {
  return input - 18;
}
let yearsAsAdult = calculateYearsAsAdult(32);
```

<b>Functions - a summary</b><br>
No notes, just repeating what was said about functions already.

### Going through course content for day 32:
<b>Time to practice</b><br>
See exercise.js file for task and solution.

<b>Introducing methods</b><br>
A method is a function in an object. It is then called a method, not a function. Just as a variable in an object is called a property.

```JS
let person = {
  name: 'Joe',
  greet() {
    alert('Hello ' + name);
  }
}
```
 To access the method:
 ```JS
 person.greet();
 ```

 <b>Make our developer life easier</b><br>
 Use ```console.log(toBeOutPut)``` from now on instead of alert, so we don't have to click away those boxes each time. Find the output in the console of devtools.

 <b>Math operations and different types of numbers</b><br>
 Integers: Whole numbers without decimals.<br>
 Floats: (Floating point) - Numbers with decimals.

 <b>The modulus operator</b><br>
 Returns the remainder of the division: 10 % 4 = 2 and not 2.5 because 2*4=8 and 10-8=2, the remainder.

 <b>Math operations and math rules</b><br>
 Multiplication and division has a higher priority than using plus or minus.
 
 ```JS
 console.log(10 + 3 - 5 * 10); // -37 because 5*10 is calculated first, then 10+13 = 13-50=-37
 ```

 Can add parenthesis around the expression you want to be calculated first
 console.log((10 + 3 - 5) * 10); // Now it's 10+3+5=18 and then * 10 = 180
```
 result = 10*4; // 40
 result = result +1; // 41
 result += 1; // 42
 result++; // 43
```
See my musings on this in my other repository from the first time I tried learning JavaScript.

<b>Performing string (text) operations</b><br>
Concatenate, add two strings to eachother: ```console.log('Hello' + ' World!');``` or ```let string = 'Hello' + ' World!';```

<b>String operations and methods</b><br>
Built in functions accessible by adding a . to the string: ```let stringLength = string.length;``` VS Code will show alternatives for what is available after having type the . after a string.

### Going through course content for day 33:
<b>Basic array operations</b><br>
Same as for strings, add a . after the array to get a list of available methods. Notice that array.length gives you the number of elements in the array.

<b>Splitting javascript accross multiple files</b><br>
Can add multiple ```<script></script>``` tags in the header of the HTML document like with stylesheets. They will be loaded in the order they are in.

<b>The global window and document objects</b><br>
Two global variables are always available, as they are built in: ```window``` and ```document```

```window``` holds information and functionality related to the active browser window / tab. ```alert``` which we have been using is also part of window, and can be called directly as we've done, or with ```window.alert``` so you can see it resides there.

```document``` is also part of window, but like alert can be accessed directly. Document holds information and functionality related to the loaded website content. Here we find utility functions to access HTML elements.

<b>What is the DOM?</b><br>
Short for Document Object Model, describes the data representation (internal representation) of the parsed HTML code in object form. Or in other words, the browser parses the HTML code we have written and turns it into a bunch of JavaScript objects. Every element we wrote is turned into an object, and these objects are nested inside eachother, to represent our HTML structure. (Technically it is a bit more advanced than that though, but that will do for now.)

Our JavaScript code is able to interact with the DOM, these objects, and extract data from it or manipulate its contents. For instance we can read som value the user entered and / or manipulate it. We can add new elements, change existing elements, change the content or the styling. Or to cite cable guy: "There's no end to the possibilities!"

<b>Exploring the DOM</b><br>

```JS
console.log(window.document);
console.log(document);
```
This gives the same output, our entire HTML document, as the document variable is made available globally and we don't have to prefix it with window. Now to see the actual object behind this we can use console.dir instead:

```JS
console.dir(document);
```
Here you can find head and body, with children, and see all we added in the HTML document.

<b>Drilling into the DOM to select and change elements</b><br>
Given this page:

```HTML
<body>
  <h1>Hi there!</h1>
  <p>
    This is a
    <a href="#">link</a>
  </p>
</body>
```

Getting the href in the link the hard way with JavaScript looks like this:
```JS
document.body.children[1].children[0].href = 'https://google.com/';
```
This is the same you do when expanding the document object and locating the href on the a. Notice how 'children' objects are arrays. (But why do we set it with = and not : since it's an object?)


<b>Loading our script correctly</b><br>
The defer keyword is required on the script tag loading the script for the above to work, otherwise the script will fail as it loads and executes too early. In other words, it executes before the HTML object has been parsed. Defer means the browser should wait with script execution until the entire document has been parsed.

Another way would be to put our script at the bottom of the body, to make sure the HTML document has been parsed before our script loads and executes. But we normally don't do that.

<b>The DOM tree and DOM traversal</b><br>
```
Document -> head
          ↳ body -> h1
                  ↳ p -> a       
```
So document holds head and body. Body holds h1 and p. p holds a.

Two ways to select elements in the DOM:<br>
1. Drill into the DOM, drill into elements using the dot notation described above<br>
document.body.childre[0].firstChild<br>
With this methid you have to know the DOM structure and if it changes, your code needs to change as well. (You have to know what you want the firstChild of another child, because that will be the link you want to change.)
2. Using a utility function provided to you by the browser, to query for specific elements.<br>
document.getElementById('some-id); or document.querySelector('.some-class);<br>
Selecting elements this way works like in CSS and hence no exact DOM structure knowledge is required.

### Going through course content for day 34:
<b>Drilling into the DOM and exploring text nodes</b><br>
JavaScript can be written directly in the browser console, and unlike VS Code, that actually gives us auto completion for the elements of the document. That's because the browser has parsed the document, VS Code has not.<br>
Simply typing in `document.body.children[0];` and pressing enter will output the contents of what we have selected. The preview helped us see that children[0] was the h1 element.

`document.body.firstChild` gives us a #text object. `document.body.firstElementChild` gives us the content of the first child element. That means if you know that you want to access the first child element of another element, you can use either `.children[0]` or .firstElementChild

The reson for the #text object is because not it's not only the elements that are saved, but the text we have as well. This can maybe be seen more clearly with `document.body.childNodes`. A node is basically either text or an HTML element, and your entire content, your HTML document, is translated to these nodes. In other words, these objects with information about your content.

Up to this point we've only looked at HTML elements and their objects, and these are the most important nodes, but all the text content is also saved as such nodes. With childnode or firstchild which acually accesses the first child node, not the first element child, you get access to both, with children you just get access to the HTML elements.

Why is firstChild text, and not the h1 element? That's because the HTML document contains whitespace, which is also stored here! So the text is actually the whitespace from the end of `<body>` to the beginning of `<h1>`.

<b>DOM drilling limitations</b><br>
If you change the HTML document, you have to change your code. If you add a new paragraph for instance, where before there was only one, code has to change to pick up the right element, even if you don't want to do anything special with the new paragraph.

<b>Searching the DOM for elements</b><br>
`document.getElementById();` searches for an element, by id. This function wants an input, namelit the id to search for.

To find the element with id external-link and then do something with it using dot notation: `document.getElementById('external-link).href = https://google.com/;` We can use .href since we know this is a link, and we want to change it. This can also be done in two steps, to avoid very long code lines:<br>
```JS
let anchorElement = document.getElementById('external-link');
anchorElement.href = 'https://google.com/';
```
This might be easier to read. This would also be the way to do it if we want to use anchorElement again at some later point, otherwise we would have to fetch it again.

<b>Querying elements</b><br>
Querying by id is not the only way to get access to an element. The querySelector method is another alternative built into the browser, and unlike the previous methid this does not want an id as input, but a CSS selector: `document.querySelector('<selector>');` This can be an id like CSS: `#external-link`

Which alternative to use then? Well it depends. If you add id to your elements, getElementsById obviously works. If not, querySelector it is. The latter is more flexible, given it can take any CSS selector as input. For instance, simply selecting the anchor tag with `a` as you could in CSS: `document.querySelector('a');`. Notice that this selects the first, and this is important, the first anchor tag it finds on your page.

To find <b>all</b> matching elements, you will have to use querySelectorAll. This will not return a single element, but an array with all matching elements.

<b>Common query methods</b><br>
In addition to the ones mentioned above, there are these:<br>
`document.getElementsByClassName('some-css-class');` - selects a given class<br>
`document.getElementsByTagName('tag');` - selects all HTML elements of the given tag.

<b>Inserting new HTML elements via JavaScript</b><br>
To add an element:<br>
1. Create the new element
2. Get access to the parene element that should hold the new element
3. Insert the new element into the parent element content.

To create the new element: `let newAnchorElement = document.createElement('a');`
Get access to the parent: `let firstParagraph = document.querySelector('p');`
To insert the new element: `firstParagraph.append(newAnchorElement);`
Can also use `insert` for the last one.

To make the link actually usable:
```JS
newAnchorElement.href = 'https://google.com/';
newAnchorElement.textContent = 'This leads to Google';
```
Before inserting it

### Going through course content for day 35:
<b>Deleting DOM element</b><br>
To remove an element:<br>
1. Select the element you want to remove
2. Remove it

We already know how to select elements, so look at how to delete them after they've been selected: `elementToDelete.remove();`

An alternative is to select its parent, the body for instance: `elementToDelete.parentElement.removeChild(elementToDelete');` This is supposedly only needed for older browsers, like old versions of Internet Explorer, so should probably never be used anymore.

<b>Moving existing elements around</b><br>
To move the first paragraph to after the second paragraph, effectively switch position first select it:<br>
`let firstParagraph = document.querySelector('p');`<br>
Then select its parent element, which is the body and append it, as that adds it at the bottom of the document:<br>
`firstParagraph.parentElement.append(firstParagraph);`<br>
Since we're working on an existing item, we don't have to delete the old occurance of it, the browser will do that for us.

We can also use `.insertBefore` to insert it before some specific element.

<b>Working with innerHTML</b><br>
On all elements you select, you have an innerHTML property, which is a bit like `.textContent`. The latter gives you access to text content, so all the text nodes that are inside this element including texts that might be in nested elements.
What does innterHTML do? It gives you access to all the HTML content store in an element. That could be just text, but it could also include other HTML elements.

Let's access the first paragraph: `let firstParagraph = document.querySelector('p');` then console.log it to see its contents: `console.log(firstParagraph);` The console actually shows a mixture of text (I'm new!), and HTML, the anchor tag leading to Google with the text description that it does. `.textContent` on the same would just return "I'm new!This leads to Google!"

This is maybe most useful when changing new content. `.innerHTML` accepts a string, which can also contain HTML code, not just text. If we use .textContent, it gets saved as text, and any html element we might input, will be shown as text on the page.

<b>Introducing events</b><br>
Events to which we might want to react - to then execute JavaScript code:
User clicks on some element (a button)<br>
User types some text into an input field</br>
User scrolls to a certain part of the page<br>
How? `someElement.addEventListener('<event>');`

<b>Adding a first "click event" listener</b><br>
`.addEventListener` wants two parameters, what should it listen for? And then, when the thing it listens for occurs, what should it do? For the "what should it do part" we can't actually add complex code there, but we can call a function, so that's what we'll do.

Define the function to be called first:
```JS
function changeParagraphText() {
  paragraphElement.textContent = 'Clicked!';
}
```

Then set up the event listener:
```JS
paragraphElement.addEventListener('click', changeParagraphText);
```
This is also called a callback function, a function that is passed as a parameter value to another function or method to be executed in the future. Notice the lack of parenthesis in the callback function. If we add them, then the function will be executed as soon as this line of code is parsed and executed by the browser.

<b>Listening to user input events</b><br>
`.addEventListener('keyup');` could work in this situation, as it is triggered when a key is released, which means something has been typed in the input field. A better listener though is `input` as it also listens for things that are dragged into the field or pasted there.

To get what the user input we can use `.value` like this: `let enteredText = inputElement.value;`

<b>The event object</b><br>
When dealing with events, the browser automatically sends an event object to the callback function. This object describes the event that occured. We pick it up by adding a parameter on the receiving function:

```JS
let inputElement = document.querySelector('input');
function retrieveUserInput(event) {
  let enteredText = inputElement.value;
  console.log(enteredText);
  console.log(event);
}
```

The typed input will be found in the `data` property in the object. An important property is `target` which holds the HTML element object on which this event occured. It is the same object we stored in the `inputElement` variable, which was selected with a querySelector.

This means we have an alternative to get access to the enterred text here by using the event object, and getting the value from target: `let enteredText = event.target.value;`

One important thing to note is that `event.data` only contains the last character that was input, which `.value` holds the entire string so far. The data property will also be null if something is pasted into the input field instead of typed. (And inputType changes from 'insertText' to 'insertFromPaste')

Also by using the event object we don't have to use an external (to the function) variable to get the value needed inside the function, and that might be a good thing.

The information in the event object depends on the event we're listening for. For the code above, it is an 'InputEvent', while if we look at the 'click' event object, it will say 'MouseEvent' and will holds lots of different information compared to input.

## Day 15 - 2022-04-24
### Going through course content for day 36:
<b>A more realistic demo and example</b><br>
See code in code-playground.

In brief, get elements by id, set up an event listener with a callback function, in the callback function get how many characters have been input, subtract from max, and set this in remainingCharacters.

<b>Introducing constant variables - const</b><br>
Instead of using `let` to define a variable, we can use const:

```JS
const myVariable = 'Some string';
```
A const is immutable, meaning it can't be changed after it has been defined. Trying to change it by assigning a new value to it will result in an error.

Looking at the demo project just created, you can see that all the variables created are "fixed", and never updated. In other words, they could have been created with const instead. By using const instead of let, we make it clear that these values will never change.

The variables in the update function is recreated and thrown away for every execution, meaning on every key input in this example. Or in other words, in this code, we always get a new "snapshot" of the situation in the function, and therefore it doesn't actually change.

The `remainingCharsElement.textContent` we update is an object, and data in objects can be updated. We just can't change the object to some other type at a later point. So the data-container itself can't be changed for objects, but the data can.

We also change productNameInputElement as we add an eventlistener to it, but again this is an object so we're allowed to do this.

Or yet another way to try to understand this, values in an object is exactly that, values in an object, and not values stored directly in a constant.

<b>Changing element styles with JavaScript</b><br>
As we've seen, we can get .textContent for an element in JavaScript. In a similar way, we can also get the style to change that, with `.style`. Here we get a nestet object with more properties, so we can add another dot to dive deeper into these properties. An example is `.style.textAlign`, but notice how it's spelled differently! In CSS we type it as `text-align: ...;` (Remember the reason? Dash is not allowed in variable or property names.) Setting it works the same, so we can copy the properties we set from the CSS file.

<b>Managing CSS classes with JavaScript</b><br>
New CSS selector tip as well it seems: `input.warning { ... }` selects all input fields with the warning class applied. Had there been a space between, it would have been descendant selector where we select all warning classes nested inside input. The same applies to id, meaning it selects what has both id remaining-chars and class warning: `#remaining-chars.warning { ... }`

The trick here then, is to select an element by id, and then set a class on that element when it meets certain criteria. Setting a class in JavaScript is done with `.className` as 'class' is a reserved keyword. (For creating classes, in OOP I guess?)

Note that setting a class with `.className`, you have to set all the classes should be on the element. Or in other words, if there were classes on the element, and you set a new class, the old classes will be removed.

A better way then is to use `.classList` which has some utility functions helping us in this matter: This `.classList.add('warning');` would add the warning class, without removing any of the other classes. Given .add, we also have .remove to remove the class specified.

### Going through course content for day 37:
<b>Time to practice</b><br>
See the task in the exercise.js file in code-playground.

Still a little curios why the defer keyword is required. Why is it a problem that JavaScript executes before the HTML file is fully loaded? Given the code should trigger on a button click, which we can only do when the page has fully loaded. Will have to investigate.

<b>Getting started with control structures</b><br>
What are control structures? Special programming language syntax / features that allow you to control:
* Under which conditions code is executed<br>
If-statements
* How often some code is executed<br>
Loops

<b>Introducing boolean values and comparison operators</b><br>
If statements needs boolean values, which is a special type of value that is either true or false. It executes if the statement evaluates to true.

The if-statement:
```JS
if (expression) {
  // run this code if true;
}
```

What expression though? Introducing comparison and logical operators:

<b>Comparison operators (derive boolean values)</b>

Compare equality (value and/or type):<br>
==, ===

Examples:<br>
2 == 2     // true<br>
'2' === 2  // false<br>
3 === 3    // true<br>
3 === 5    // false<br>
'h' == 's' // false<br>


Greater than, lesser than, greater or equal, lesser or equal:<br>
>, <, >= <=

Examples:<br>
5 > 3     // true<br>
5 < 3     //false<br>
'a' < 'b' // true<br>
4 <= 4    // true<br>


Negation/inverse (something is not true)<br>
!, !=, !===

Examples:<br>
!(4 < 4)  // true<br>
5 !== 2   // true<br>
8 != 8    // false<br>
'4' !== 4 // true<br>
'4' != 4  //false<br>

<b>Logical operators (combine boolean values)</b>

AND - yields true if both combined values are true<br>
&&

Examples:<br>
5 == 5 && 3 < 4 // true<br>
5 == 5 && 3 > 4 // false<br>


OR - yields true if one or both values are true<br>
||

Examples:<br>
5 == 5 || 3 < 4 // true<br>
5 == 5 || 3 > 4 // true<br>


<b>Boolean and comparison operator in action</b><br>
Truthy and falsy in JavaScript: The double-equal sign doesn't check for type, so the number 2 evaluates to true when compared to the string '2'. To check for strict equality, meaning that both the value and the type have to be equal, use the tripple-equal sign: 2 === '2'

Expressions are evaluated left to right:<br>
2 === 2 || 2 === 3 && 5 === 6<br>
This returns true because the first part of the expression is true, and that is enough for the OR operator. To change what is compared and evaluated together, add parenthesis:<br>
(2 === 2 || 2 === 3) && 5 === 6<br>
This returns false.


<b>Uning booleans in if-statements (conditional code execution)</b><br>
Only execute the console.log if const myName is set to Joe:
```JS
const myName = 'Joe';
if (myName === 'Joe') {
  console.log('Hello!');
}
```

### Going through course content for day 38:
<b>A real example</b><br>
See demo.js in code-playground.

```JS
  if (remainingCharacters <= 10) {
    remaningCharsElement.classList.add('warning');
    productNameInputElement.classList.add('warning');
  }
```
<b>Alternatives with else and else if</b><br>
We now get the warning in the browser if there are less than 10 characters left. But what if the user removes some characters so there are more than 10 left? The warning doesn't go away as we only have an add statement and no remove.

We need alter our logic a little and add an else statement. If first expression is not true, execute what's in the else part instead:

```JS
  if (remainingCharacters <= 10) {
    remaningCharsElement.classList.add('warning');
    productNameInputElement.classList.add('warning');
  } else {
    remaningCharsElement.classList.remove('warning');
    productNameInputElement.classList.remove('warning');
  }
```
If remove is run on a class that doesn't exist, it does nothing. It doesn't give an error.

To extend our logic we can use `else if`. Add an error class to the CSS that should be applied if characters left is 0.

```JS
  if (remainingCharacters === 0) {
    remaningCharsElement.classList.add('error');
    productNameInputElement.classList.add('error');
  } else if (remainingCharacters <= 10) {
    remaningCharsElement.classList.add('warning');
    productNameInputElement.classList.add('warning');
    remaningCharsElement.classList.remove('error');
    productNameInputElement.classList.remove('error');
  } else {
    remaningCharsElement.classList.remove('error', 'warning');
    productNameInputElement.classList.remove('error', 'warning');
  }
```

<b>More on boolean values</b><br>
```JS
let isLoggedIn = true;
```

Given the variable isLoggedIn is a boolean already, we don't have to compare the value of the variable to true, we can just check it like this:

```JS
if (isLoggedIn) {
  console.log('User is logged in!');
}
```

In case we want to check the oposite, that the user is not logged in, we can check `if (!isLoggedIn) { ... }`

<b>Truthy and falsy values</b><br>
If we want to know if something was input (and therefore stored in a variable) we can of course check that the length of the value in the variable is more than 0. But we don't have to do that, we can just check the variable itself like this:

```JS
if (enteredUserName) {

}
```

Why does this work? Because of the truthy and falsy values in JavaScript. When we provide a non-boolean value where JavaScript wants a boolean, like in the if-statement, it will try to convert the provided value to a boolean according to certain rules.

An empty string or the number 0 will be treated as false. A string with just 0 inside it ('0') would not be treated as false, since it's not an empty string. So falsy values can be said to be treated like false by JavaScript in places where a boolean is wanted.

A string containing the word 'false' will be treated as true, because it's not empty. Again a blank character would also make it not be false. All that matters is the variable empty or not.

<b>Introducing loops</b><br>
For loops:<br>
Loop n number of times

For .. of loops:<br>
Loop through all elements of an array

For .. in loops:<br>
Loop through all properties in an object

While loop:<br>
Loop as long as a certain condition is met

<b>The for loop</b><br>

```JS
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

<b>The for ... of loop</b><br>

```JS
const users = ['Max', 'Anna', 'Joe'];

for (const user of users) {
  console.log(user);
}
```
Before JavaScript got the for ... of loop to use on arrays, a regular for loop could be used like this:

```JS
for (let i = 0; i < ourArray.length; i++) {
  console.log(ourArray[i]);
}
```

<b>The for ... in loop</b><br>

```JS
const loggedInUser = {
  name: 'Joe',
  age: 32,
  isAdmin: true
}

for (const propertyName in loggedInUser) {
  console.log(propertyName);
  console.log(loggedInUser[propertyName]);
}
```
Though 'key' is more commonly used than 'propertyName'

<b>The while loop</b><br>

```JS
let isFinished = false;

while (!isFinished) {
  isFinished = confirm('Do you want to quit?');
}
```
### Going through course content for day 39:
<b>Practice time - using the loops on an example page</b><br>
See code in loops-in-action.js in code-playground.

Trick, to quickly convert a number from a string to a number in Javascript, add a + sign in front of it:

```JS
const enteredNumber = +targetNumberInputElement.value;
```

Remember also you might not have to check if something is true or false, and then set it to a variable, you can just have the comparison on the variable and true or false will be set.

## Day 16 - 2022-04-25
### Going through course content for day 40:
<b>A new milestone project: Tic-tac-toe</b><br>
New concepts that will be introduced:
1. Handling form submission with JavaScript and creating objects with the 'new' keyword.
2. Managing data with JavaScript, HTML and the 'data-' attributes

<b>The proejct plan</b><br>
* Configure player names<br>
Form with input field in modal overlay, also validate input and show validation feedback
* (Re-) start game<br>
"Start game" button should clear current game board or "game over" message
* Turn-based gameplay<br>
Turns should switch automatically between the two players, every player has his/her own symbol.
* Select fields and check for winner<br>
Game fields are clickable and the players symbol is displayed. Check for winner (regular tic-tac-toe rules) after every turn
* Show a "game over" window<br>
Present "game over" message which highlights winner (or draw) once game ends

<b>Creating the HTML structure</b><br>
Setting the type of a button inside a form to button, should make it a button that cancels the input/clears the form. Not quite sure I got that right, will have to test it

<b>Adding base page styles</b><br>
For buttons, create two classes, where the second class is designed to override some of the style from the first class, to make some buttons look almost the same, but slightly different. Making a button "flat" can be done with setting transparent on background-color and border-color.

### Going through course content for day 41:
<b>Adding styling to game configuration area</b><br>
The "aside" will be an overlay, we'll start with that. This is typically called a modal. Even though we only have one modal and only one aside in the document, we'll use class to select it, so it is possible to reuse the styling later should we need it.

We're setting position to fixed so that it is always on top of the content and above everything else. Also if we scroll, it stays where we positioned it and we can't scroll away from it.

When position is fixed we should set distance from top and to the left. The values selected here are typically for mobile devices, so we'll add a media query to override it for bigger screens.

Introducing the 'calc' function in CSS, used to perform calculations!

```CSS
left: calc(50% - 20rem);
```

We use the middle of the screen as our starting point, then subtract 20 rem. Given we've set the width of the modal to 40 rem, this will position it in the middle of the screen.

Also we're setting display to none, since it shouldn't be visible by default, it should only appear when needed.

We will also add a 'backdrop', just a div with id of backdrop that we'll use to hide the rest of the page so we can't interact with it when the modal is open. It won't have any content, it's just there for styling purposes.
```HTML
<body>
  <div id="backdrop"></div>
  <header id="main-header">
    <h1>Play tic, tac, toe</h1>
    ...
```

```CSS
#backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}
```
Using rgba here, we can darken the rest of the page. Though I'm not sure I understand why it doesn't also darken the modal, given it covers the entire page. Maybe because it'f defined early on the page, the modal later, and the modal therefore sits on top of everything else?

Adding a third css file for this project called `configuration.css`. This will hold the styling for everything we can configure, and isn't limited to the modal.

We target the label in the form and set display to block, to force a linebreak. Remember to inherit font for input fields, as they have custom fonts set by the browser. The modal is a little big compared to what it holds, so we could shrink it, or we could center its contents to not get so much space on the right side.

For game-configuration, we set width to 90%, but limit it to a maximum of 40rem, to sort of make it responsive, but without having to use media query. `margin: 3rem auto;` gives some margin top and bottom, and also centers this on the page.

Setting up the ordered list to remove margins, paddings and the list item numbers, as well as display: flex since the default for flex is do diplay on the same line and we want the player configuration next to eachother, not one above the other.

<b>Styling the game field</b><br>
Adding a new css file for this called `game.css`. The game area should not be shown before the game starts, so we'll again set display: none. (Though commented out now so we can see it while we work in it).

For the actual game board, we get to use CSS grid, as it's two dimensional, 3 rows with 3 columns.

Two ways of doing that. What we've learned already:
```CSS
grid-template-columns: 6rem 6rem 6rem;
```

But another way is to use a CSS function called 'repeat':
```CSS
grid-template-columns: repeat(3, 6rem);
```
This tells CSS to add 3 columns, that are each 6 rem wide. We'll configure the rows the same way, as the board should have square boxes.

Remember that you can add the :hover pseudo-selector to any HTML element, and you can also make any element clickable with JavaScript. We'll add a hover select to the game board, but only to elements that haven't been selected already. We'll make sure through JavaScript later that you can't click a particular game cell more than once, to override the piece that was put there. We will be doing that with class="disabled" added dynamically. When an cell has a game piece, it will retain the hover color. This is something I might want to look into changing. Can we disable to hover effect on just these cells as well? Or perhaps not, it looks quite good as is actually, but maybe experiment with it. How about alternating colors, or color per player?

<b>Adding JavaScript, script files and first event listeners</b><br>
We load config and game script files first, so that everything is set up with we load app.js, which will be used to start everything.

A new thing here is how the logic is split up. While we select the button and add the eventListener in app.js, the callback function is added in config.js. This works fine in the browser, it's just important that the files are loaded in the correct order.

<b>Showing and hiding the configuration modal</b><br>
We'll need to change display: none on modal and backdrop to 'block' so that it's shown.

Now we added a new selector in app.js, the file that loads last, that we need in config.js, the file that loads first. Will that work? Yes, as long as the order of execution is correct. And the button can't be clicked before everything has loaded, and thus selectors from app.js is available. (The event listener is later in app.js than the config-overlay and backdrop selector are.)

We'll allow "click outside" to close the modal, and that's done by adding an event listener to the backdrop, that calls the same close overlay function as the cancel button does.

### Going through course content for day 42:
<b>Handling form submission with JavaScript</b><br>
When clicking the confirm button, we wan't to prevent the default action which is to send the form to some server, but instead we want to handle that submission with JavaScript.

We use querySelector now, to practice using the various ways of selecting elements. There is only one form on our page, so it is easy to select by type. Then we add an event listener not to listen for clicks, but the submit event that happens when you click the button.
```JS
formElement.addEventListener('submit', savePlayerConfig);
```
This means the savePlayerConfig function will be executed when the form is submitted. We'll take in the event object that is sent for events, as that has a build in method that will help us prevent the default submit action from the browser:
```JS
function savePlayerConfig(event) {
  event.preventDefault();
}
```
This is important, because when the browser makes this request (possibly because it's to the same page we're on) the page reloads, our JavaScript code is executed again, and everything is reset.

Introducing the 'new' keyword. To create an object in JavaScript, we can do so with the curly braces: `const formData = {}` but that's not what we'll do here:
```JS
function savePlayerConfig(event) {
  event.preventDefault();
  const formData = new FormData();
}
```

Doing it this way is called instantiating an object, based on an object blueprint. FormData is basically a function that knows how to generate an object with a certain shape. We can use these functions by executing them with the 'new' keyword in front of them. We'll learn how to write our own blueprints later in the course, but now we'll use this built in blueprint, which makes working with form data in JavaScript easy. It takes a form and automatically extracts values entered into input for us.

We'll want the event.target data, as that'll make JavaScript look for inputs with a name attribute:
```JS
const formData = new FormData(event.target);
```
And then finally extract the entered player name from the form, by using a built in method that gets data from specific fields for us:
```JS
const enteredPlayerName = formData.get('playername');
```

Documentation for these blueprints can of course be found on MDN. They have a list of web APIs that can be used in JavaScript in the browser.<br>
* [FormData documentation](https://developer.mozilla.org/en-US/docs/Web/API/FormData)<br>
* [Web APIs documentation](https://developer.mozilla.org/en-US/docs/Web/API)

<b>Validating user input with JavaScript</b><br>
`.trim` is available for all strings in JavaScript, and it removes whitespace in front of, or after the input. If user only entered whitespace, after .trim we will now have an empty string, so we can show an error for instance.

We show an error message and add error styling to the modal if user just enters blanks. When clicking the cancel button, we want to remove this error message and the styling. The error message and styling is removed with JavaScript, and we reset the form by changing from type=button to type=reset on the cancel button in index.html. A little contrary to some thing I didn't understand previously.

<b>Storing and managing submitted data</b><br>
How to identify what player we clicked the edit button on? By adding extra data to your HTML elements, that are not shown on the page but we can use and read in our JavaScript code, to then add extra information to certain elements.

```HTML
<button class="btn btn-alt" id="edit-player-1-btn" data-playerid="1">Edit</button>
<button class="btn btn-alt" id="edit-player-2-btn" data-playerid="2">Edit</button>
```
This attribute always starts with data- and can be multiword. What comes after data- is up to you.

We then find it in JavaScript like this:
```JS
const selectedPlayerId = event.target.dataset.playerid;
```
Dataset exists on every HTML element which you interact with JavaScript, and it's an object that will be populated with all the data attributes you add to your elements. You can have multiple data- attributes on the same element. The data- will be removed, so in our example, just playerid will exist as a property. If you defined it as player-id, you'll have to use bracket notation: `event.target.dataset['player-id']` Dash is not allowed with dot notation, that's why it has to be done that way.

With HTML set up like this:
```HTML
<article id="player-1-data">...</article>
<article id="player-2-data">...</article>
```

We can generate the element to update dynamically like this:
```JS
editedPlayer = +event.target.dataset.playerid; // Want number, not string here
const updatedPlayerDataElement = document.getElementById('player-' + editedPlayer + '-data');
```

We can also update our players array dynamically like this:
```JS
const players = [
  {
    name: '',
    symbol: 'X'
  },
  {
    name: '',
    symbol: 'O'
  },
];

players[editedPlayer - 1].name = enteredPlayerName;
```

### Going through course content for day 43:
<b>Adding logic for starting a game</b><br>
We only want to be able to start a new game, if we've input player names first. That's a simple if statement at the beginning of the callback function called when start button is clicked:

```JS
if (players[0].name === '' || players[1].name === '') {
  alert('Please set custom player names for both players!');
  return;
}
```

<b>Managing game rounds</b><br>
We'll start with selecting all list items, even though we could have done the same for the ol element. We'll still be able to avoid repeating a lot of code.

Use querySelectorAll which gives us an array as a result, and loop through that array to add an eventlistener to each element in the array:
```JS
const gameFieldElements = document.querySelectorAll('#game-board li');
for (const gameFieldElement of gameFieldElements) {
  gameAreaElement.addEventListener('click', selectGameField);
}
```

An alternative would be to do this instead:
```JS
const gameBoardElement = document.getElementById('game-board');
gameBoardElement.addEventListener('click', selectGameField);
```
Though now we have to make sure that the user clicked inside a game cell, and not the space between, otherwise the entire ordered list would be replaced by whatever player symbol did that:
```JS
function selectGameField(event) {
  if (event.target.tagName !== 'LI') {
    return;
  }
}
```

<b>Tracking selected fields on the game board</b><br>
We'll need a two-dimensional array for this, which is an array with arrays in it:

```JS
const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];

gameData[selectedColumn][selectedRow] = activePlayer + 1;
```

Now then, the final thing is the make sure that one player can't click a cell the other player has already clicked. So far we've only signalled that it can't be clicked with styling it

```JS
if (gameData[selectedColumn][selectedRow] > 0) {
  alert('Please select an empty field!');
  return;
}
```

### Going through course content for day 44:
<b>Checking for a winner or draw</b><br>
See code in game.js as it's a little too much to repeat here. In brief, we check the top left cell for player id > 0 (board is initialized at 0), then compare that id for the rest of the row and if they are equal, that player won. We return the player id. Do the same for all rows. This is done through a for loop. The logic is the same for columns.

For the diagonals we had to type it in like this:
```JS
  // Check top left to bottom right for a winner
  if(gameData[0][0] > 0 &&
     gameData[0][0] === gameData[1][1] &&
     gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  // Check bottom left to top right for a winner
  if(gameData[2][0] > 0 &&
     gameData[2][0] === gameData[1][1] &&
     gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
 }
  if (currentRound === 9) {
   return -1;
 }

 return 0;
}
```

We return 0 as long as we don't have a winner, otherwise the player id. In case legal moves have been exhausted (9 moves) without a winner, we return -1.

<b>Ending the game and adding restart logic</b><br>
We have to reset everything except the player names, since the same two players might want to play another game. We'll create a functions that does just that, and calls this function every time we click the "start new game" button:

```JS
function resetGameStatus() {
  activePlayer = 0;
  currentRound = 1;
  gameOverElement.firstElementChild.innerHTML = 
  'You won, <span id="winner">PLAYER NAME</span>!';
  gameOverElement.style.display = 'none';

  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameBoardItemElement = gameBoardElement.children[gameBoardIndex++];
      gameBoardItemElement.textContent = '';
      gameBoardItemElement.classList.remove('disabled');
    }
  }
}
```

We also have to disallow clicks if the game is over, which will be done with adding a 'gameIsOver' boolean, and check for its status where we check for clicks outside the list and simply returns.

One thing to maybe fix, is that you can currently change your name while playing.
