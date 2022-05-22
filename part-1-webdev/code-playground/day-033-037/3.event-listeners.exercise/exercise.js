// Practice what you learned!

// 1) Select the two <button> elements and store them in two different variables.
//    - Select the first button without adding or using any "id"
//    - Select the second button by using an "id"
// 2) Add "click" event listener to both buttons (with two different functions).
//    The functions should "console.dir()" the clicked buttons.
//    - Output the first button by using the variable in which it's stored
//    - Output the second button WITHOUT using the variable in which it's stored
// 3) Now select and store the paragraphs mentioned in the text you see on the page
//    (first and third paragraph)
//    - Select BOTH paragraphs by drilling into the document and "navigating" to the
//      mentioned elements
//    - If you struggle with DOM drilling, use "ids" instead but watch the solution!
// 4) Change the functions from (2) such that:
//    - The first button removes the third paragraph (i.e. the <p> prior to it)
//    - The second button changes the background color of the first paragraph to blue
// 5) Solve (4) both by changing the "inline styles" as well as by adding CSS classes
//    Note: You'll have to add those classes to the styles.css file first!

const firstButtonElement = document.querySelector('button');
const secondButtonElement = document.getElementById('second-button');

const firstParagraphElement = document.body.children[2].children[1];
console.log(firstParagraphElement); // Hover it in console to see that you've got the right element

const thirdParagraphElement = document.body.children[2].children[3];
console.log(thirdParagraphElement);

// Given we have the first paragraph selected, we can also select the third paragraph like this:
// thirdParagraphElement = firstParagraphElement.nextElementSibling,nextElementSibling
// Doing it this way just to learn and understand the structure of the DOM objects and how
// they are related to eachother.

function removeParagraph() {
  console.dir(firstButtonElement);
  thirdParagraphElement.remove();
}
function changeBackgroundColor(event) {
  console.dir(event.target);
  // firstParagraphElement.style.backgroundColor = 'blue'; // task 4 solved
  firstParagraphElement.classList.add('blue-background'); // task 5 solution 1
  // firstParagraphElement.className = 'blue-background'; // task 5 solution 2
}

firstButtonElement.addEventListener('click', removeParagraph);
secondButtonElement.addEventListener('click', changeBackgroundColor);
