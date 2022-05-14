const User = require('../models/user-model');
const authUtil = require('../util/authentication');
const validation = require('../util/validation');
const sessionFlash = require('../util/session-flash');

const getSignup = (req, res) => {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: '',
      confirmEmail: '',
      password: '',
      fullname: '',
      street: '',
      postalcode: '',
      city: ''
    }
  }
  res.render('customer/auth/signup', { inputData: sessionData });
};

const signup = async (req, res, next) => {
  const enteredData = {
    email: req.body.email,
    confirmEmail: req.body['confirm-email'],
    password: req.body.password,
    fullname: req.body.fullname,
    street: req.body.street,
    postalcode: req.body.postalcode,
    city: req.body.city,
  };

  if (
    !validation.userDetailsAreValid(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postalcode,
      req.body.city
    ) ||
    !validation.emailIsConfirmed(req.body.email, req.body['confirm-email'])
  ) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage: 'Please check your input and try again.',
        ...enteredData,
      },
      () => res.redirect('/signup')
    );
    return;
  }

  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postalcode,
    req.body.city
  );

  try {
    const existsAlready = await user.existsAlready();

    if (existsAlready) {
      sessionFlash.flashDataToSession(
        req,
        {
          errorMessage: 'Invalid data, please correct it and try again!',
          ...enteredData,
        },
        () => res.redirect('/signup')
      );
      return;
    }
    await user.signup();
  } catch (e) {
    return next(e);
  }

  res.redirect('/login');
};

const getLogin = (req, res) => {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: '',
      password: ''
    };
  }
  res.render('customer/auth/login', { inputData: sessionData });
};

const login = async (req, res, next) => {
  const user = new User(req.body.email, req.body.password);
  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (e) {
    return next(e);
  }

  const SessionErrorData = {
    errorMessage: 'Invalid username or password',
    email: user.email,
    password: user.password,
  };

  if (!existingUser) {
    sessionFlash.flashDataToSession(req, SessionErrorData, () => {
      res.redirect('/login');
    });
    return;
  }

  const gotCorrectPassword = await user.verifyPassword(existingUser.password);

  if (!gotCorrectPassword) {
    sessionFlash.flashDataToSession(req, SessionErrorData, () => {
      res.redirect('/login');
    });
    return;
  }

  authUtil.createUserSession(req, existingUser, () => {
    res.redirect('/');
  });
};

const logout = (req, res) => {
  authUtil.destroyUserAuthSession(req);
  res.redirect('/login');
};

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout,
};
