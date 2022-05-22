## Section 7: Understanding HTML and CSS layouts and positioning
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
