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
