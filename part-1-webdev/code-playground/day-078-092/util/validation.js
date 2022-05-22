const isEmpty = (value) => {
  return !value || value.trim() === '';
};

const userCredentialsAreValid = (email, password) =>
  email && email.includes('@') && password && password.trim().length >= 12;

const userDetailsAreValid = (email, password, name, street, postalcode, city) =>
  userCredentialsAreValid(email, password) &&
  name &&
  !isEmpty(name) &&
  !isEmpty(street) &&
  !isEmpty(postalcode) &&
  !isEmpty(city);

const emailIsConfirmed = (email, confirmEmail) => email === confirmEmail;

module.exports = {
  userDetailsAreValid: userDetailsAreValid,
  emailIsConfirmed: emailIsConfirmed,
}
