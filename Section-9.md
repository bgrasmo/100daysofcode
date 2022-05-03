## Section 9: Creating beautiful websites
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
