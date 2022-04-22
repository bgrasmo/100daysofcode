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
What is JavaScript? A programming language that can be executed by browser. It is in fact the only programming language browsers can execute.

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
<b>Adding the ```<script>``` element.
