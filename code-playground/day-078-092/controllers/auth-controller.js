const User = require('../models/user-model');
const authUtil = require('../util/authentication');

const getSignup = (req, res) => {
  res.render('customer/auth/signup');
}

const signup = async (req, res) => {
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postalcode,
    req.body.city
  );

  await user.signup();

  res.redirect('/login');
}

const getLogin = (req, res) => {
  res.render('customer/auth/login');
}

const login = async (req, res) => {
  const user = new User(req.body.email, req.body.password);
  const existingUser = await user.getUserWithSameEmail();

  if (!existingUser) {
    return res.redirect('/login');
  }

  const gotCorrectPassword = await user.verifyPassword(existingUser.password);

  if (!gotCorrectPassword) {
    return res.redirect('/login');
  }

  authUtil.createUserSession(req, existingUser, () => {
    res.redirect('/');
  });
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
};