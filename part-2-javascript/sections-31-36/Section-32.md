## Section 32: Bonus - programming paradigms

## Day 65 - 2022-06-13

#### <b>What are programming paradigms</b>

A way of writing and organizing your code

|Object-oriented|Prodedural|Functional|
|---------------|----------|----------|
|Organize data and logic in object with properties and methods|Write sequential series of execution steps/tasks|Organize code in (pure) functions with clearly defined tasks|
|Organize code in logical entities (like real world items)|Top to bottom code execution|Pass data around via parameters|

#### <b>Procedural programming in practice</b>

A typical example which looks like most of the code that has been written in the course so far:

```JS
const form = document.getElementById('user-input');

const signupHandler = event => {
  event.preventDefault();
  const userNameInput = document.getElementById('username');
  const enteredUsername = userNameInput.value;

  const passwordInput = document.getElementById('password');
  const enteredPassword = passwordInput.value;

  if(enteredUsername.trim().length === 0) {
    return alert('Invalid input - username must not be empty!');
  }
  if(enteredPassword.trim().length <= 11) {
    return alert('Invalid input - password must be at least 12 characters long!');
  }

  const user = {
    userName: enteredUsername,
    password: enteredPassword
  };

  console.log(user);
  console.log('Hi ' + userName);
}

form.addEventListener('submit', signupHandler);
```

#### <b>Object-oriented programming in practice</b>

An example with object-oriented programming, which obviously looks similar to what was taught in the OOP portion of this course. Seems to be a bit more code to achieve the same thing though:

```JS
class Validator {
  static REQUIRED = 'REQUIRED';
  static MIN_LENGTH = 'MIN_LENGTH';

  static validate(value, flag, validatorValue) {
    if (flag === this.REQUIRED) {
      return value.trim().length > 0;
    }
    if (flag === this.MIN_LENGTH) {
      return value.trim().length > validatorValue;
    }
  }
}

class User {
  constructor(uName, uPassword) {
    this.userName = uName;
    this.password = uPassword;
  }

  greet() {
    console.log('Hi ' + this.userName);
  }
}

class UserInputForm {
  constructor() {
    this.form = document.getElementById('user-input');
    this.userNameInput = document.getElementById('username');
    this.passwordInput = document.getElementById('password');

    this.form.addEventListener('submit', this.signupHandler.bind(this));
  }

  signupHandler(event) {
    event.preventDefault();
    const enteredUsername = this.userNameInput.value;
    const enteredPassword = this.passwordInput.value;

    if (
      !Validator.validate(enteredUserName, Validator.REQUIRED) ||
      !Validator.validate(enteredPassword, Validator.MIN_LENGTH, 11)
    ) {
      return alert(
        'Invalid input - username or password is wrong and password should be at least 12 characters'
      );
    }
    const newUser = new User(enteredUserName, enteredPassword);
    console.log(newUser);
    newUser.greet();
  }
}

new UserInputForm();
```

#### <b>Functional programming in practice</b>

An example with functional programming and mostly pure functions. Sometimes we get functions with "side-effects", meaning calling something outside the function, like alert and console.log in this case:

```JS
const REQUIRED = 'REQUIRED';
const MIN_LENGTH = 'MIN_LENGTH';

const validate = (value, flag, validatorValue) => {
  if (flag === REQUIRED) {
    return value.trim().length > 0;
  }
  if (flag === MIN_LENGTH) {
    return value.trim().length > validatorValue;
  }
};

const getUserInput = (inputElementId) => {
  return document.getElementById(inputElementId).value;
};

const createUser = (userName, userPassword) => {
  if (
    !validate(userName, REQUIRED) ||
    !validate(userPassword, MIN_LENGTH, 11)
  ) {
    throw new Error(
      'Invalid input - username or password is wrong and password should be at least 12 characters'
    );
  }
  return {
    userName,
    password: userPassword,
  };
};

const greetUser = user => console.log('Hi ' + user.userName);

const signupHandler = (event) => {
  event.preventDefault();

  const enteredUserName = getUserInput('user-input');
  const enteredPassword = getUserInput('password');

  try {
    const newUser = createUser(enteredUserName, enteredPassword);
    console.log(newUser);
    greetUser(newUser);
  } catch (e) {
    alert(e.message);
  }
};

const connectForm = (formId, formSubmitHandler) => {
  const form = document.getElementById(formId);
  form.addEventListener('submit', formSubmitHandler);
};

connectForm('user-input', signupHandler);
```
