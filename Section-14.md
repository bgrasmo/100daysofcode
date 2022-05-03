## Section 14: Milestone project, building a Tic-Tac-Toe game
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
