// First example: Sum numbers
const calculateSumButtonElement = document.querySelector('#calculator button');

function calculateSum() {
  const userNumberInputElement = document.getElementById('user-number');
  const enteredNumber = userNumberInputElement.value;

  let sumUpToNumber = 0;

  for (let i = 0; i <= enteredNumber; i++) {
    sumUpToNumber += i;
  }
  const outputResultElement = document.getElementById('calculated-sum');
  outputResultElement.textContent = sumUpToNumber;
  outputResultElement.style.display = 'block';
}
calculateSumButtonElement.addEventListener('click', calculateSum);

// Second example: Highlight elements
const highlightLinksButtonElement = document.querySelector('#highlight-links button');

function highlightLinks() {
  const anchorElements = document.querySelectorAll('#highlight-links a');
  for (const anchorElement of anchorElements) {
    anchorElement.classList.add('highlight');
  }
}
highlightLinksButtonElement.addEventListener('click', highlightLinks);

// Third example: Display user data
const dummyUserData = {
  firstName: 'Joe',
  lastName: 'Schmoe',
  age: 32
}

const displayUserDataButtonElement = document.querySelector('#user-data button');

function displayUserData() {
  const outputDataElement = document.getElementById('output-user-data');

  outputDataElement.innerHTML = ''; // Clear the data before setting it again to not append forever

  for (const key in dummyUserData) {
    const newUserDataListElement = document.createElement('li');
    const outputText = key.toUpperCase() + ': ' + dummyUserData[key];
    newUserDataListElement.textContent = outputText;
    outputDataElement.append(newUserDataListElement);
  }
}

displayUserDataButtonElement.addEventListener('click', displayUserData);

// Fourth example: Dice roll (statistics)
const rollDiceButtonElement = document.querySelector('#statistics button');

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function deriveNumberOfDiceRolls() {
  const targetNumberInputElement = document.getElementById('user-target-number');
  const diceRollsListElement = document.getElementById('dice-rolls');

  const enteredNumber = targetNumberInputElement.value;
  diceRollsListElement.innerHTML = '';

  let hasRolledTargetNumber = false;
  let numberOfRolls = 0;

  while (!hasRolledTargetNumber) {
    const rolledNumber = rollDice();

    // Input number will be a string, so not strict equality check here
    // But this is old way of doing things anyway, so commented out
    // if (rolledNumber == enteredNumber) {
    //   hasRolledTargetNumber = true;
    // }

    numberOfRolls++;
    const newRollListItemElement = document.createElement('li');
    const outputText = 'Roll ' + numberOfRolls + ': ' + rolledNumber;
    newRollListItemElement.textContent = outputText;
    diceRollsListElement.append(newRollListItemElement);

    // Sets the value to true when the comparison matches.
    hasRolledTargetNumber = rolledNumber == enteredNumber;
  }
  const outputTotalRollsElement = document.getElementById('output-total-rolls');
  const outputTargetNumberElement = document.getElementById('output-target-number');

  outputTargetNumberElement.textContent = enteredNumber;
  outputTotalRollsElement.textContent = numberOfRolls;
}

rollDiceButtonElement.addEventListener('click', deriveNumberOfDiceRolls);