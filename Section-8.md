## Section 8: Understanding responsive web design
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
