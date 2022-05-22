// If and comparisons
const myName = 'Joe';

if (myName === 'Joe') {
  console.log('Hello!');
}

let isLoggedIn = true;

if (isLoggedIn) {
  console.log('User is logged in!');
}

const enteredUserName = 'Something';

if (enteredUserName) {
  console.log('Hello again!');
}

// Loops
for (let i = 0; i < 10; i++) {
  console.log(i);
}

const users = ['Max', 'Anna', 'Joe'];

for (const user of users) {
  console.log(user);
}

const loggedInUser = {
  name: 'Joe',
  age: 32,
  isAdmin: true
}

for (const key in loggedInUser) {
  console.log(key); // just the key, or the property name
  console.log(loggedInUser[key]); // just the value
}

let isFinished = false;

while (!isFinished) {
  isFinished = confirm('Do you want to quit?');
}
