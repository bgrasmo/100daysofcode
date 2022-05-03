## Section 4: HTML and CSS, practice and summary
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
