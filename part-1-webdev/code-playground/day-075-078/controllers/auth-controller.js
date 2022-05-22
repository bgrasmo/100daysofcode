const validationSession = require('../util/validation-session');
const validation = require('../util/validation');
const User = require('../models/user');

const get401 = (req, res) => {
  res.status(401).render('401');
}

const getSignup = (req, res) => {
  const sessionErrorData = validationSession.getSessionErrorData(req, {
    email: '',
    confirmEmail: '',
    password: '',
  });

  res.render('signup', {
    inputData: sessionErrorData,
  });
};

const getLogin = (req, res) => {
  const sessionErrorData = validationSession.getSessionErrorData(req, {
    email: '',
    password: '',
  });

  res.render('login', {
    inputData: sessionErrorData,
  });
};

const signup = async (req, res) => {
  const userData = req.body;
  const enteredEmail = userData.email; // userData['email']
  const enteredConfirmEmail = userData['confirm-email'];
  const enteredPassword = userData.password;

  if (
    !validation.userCredentialsAreValid(
      enteredEmail,
      enteredConfirmEmail,
      enteredPassword
    )
  ) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: 'Invalid input, please correct it and try again.',
        email: enteredEmail,
        confirmEmail: enteredConfirmEmail,
        password: enteredPassword,
      },
      () => res.redirect('/signup')
    );
    return;
  }

  const newUser = new User(enteredEmail, enteredPassword);
  const userExistsAlready = await newUser.existsAlready();

  if (userExistsAlready) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: 'Invalid username, please change and try again!',
        email: enteredEmail,
        confirmEmail: enteredConfirmEmail,
        password: enteredPassword,
      },
      () => res.redirect('/signup')
    );
    return;
  }

  await newUser.signup();

  res.redirect('/login');
};

const login = async (req, res) => {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredPassword = userData.password;

  const newUser = new User(enteredEmail, enteredPassword);
  const existingUser = await newUser.getUserWithSameEmail();

  if (!existingUser) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: 'Could not log you in - please check your credentials!',
        email: enteredEmail,
        password: enteredPassword,
      },
      () => res.redirect('/login')
    );
    return;
  }

  const success = await newUser.login(existingUser.password);

  if (!success) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: 'Could not log you in - please check your credentials!',
        email: enteredEmail,
        password: enteredPassword,
      },
      () => res.redirect('/login')
    );
    return;
  }

  req.session.user = { id: existingUser._id, email: existingUser.email };
  req.session.isAuthenticated = true;
  req.session.save(() => res.redirect('/admin'));
};

const logout = (req, res) => {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect('/');
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout,
  get401: get401,
};
