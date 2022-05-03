## Section 3: Diving deeper into HTML and CSS
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
