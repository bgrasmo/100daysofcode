## Section 17: Vue and authentication

## Day 88 - 2022-07-06

#### <b>How authentication works in Vue</b>

Firebase doesn't store a session for our users, as it "doesn't care" about the clients. It does however send back a token when a user has logged in successfully, and only the server can validate this token. So we need to send this token with any requests needing authentication. Though we're likely to have our API keys in the source code which is sent to the browser, so others can in theory mimic us and our client and use our resources? It seems [firebase docs](https://firebase.google.com/docs/projects/api-keys) seems to say this key can only be used for registering users, which "everyone" can do anyway since we have an open signup page, so I guess it's ok.

#### <b>Locking / protecting backend resources</b>

Set up rules in firebase so reading from and writing to is allowed for everyone / only when authenticated where appropriate.

```json
"rules": {
  "resource": {
    ".read": true,
    ".write": "auth != null"
  }
}
```

#### <b>Adding an authentication page for login and signup</b>

Nothing new in particular, except for the button to switch a button from 'login' to 'signup' instead of showing both in some variant.

Another interesting thing to note is that if we enter an address manually we restart the app, so we lose all vuex state data. Use `localStorage.setItem` to store login data in the browser and then 'getItem' when the app starts and commit it to vuex to keep the login state.

```JS
const expiresIn = +responseData.expiresIn * 1000;
const expirationDate = Date.now() + expiresIn;

localStorage.setItem('token', responseData.idToken);
localStorage.setItem('userId', responseData.localId);
localStorage.setItem('tokenExpiration', expirationDate);
```

To automatically log a user out when the timer expires, a global timer could be used to dispatch the logout method with expiresIn as time to execute. Remember to clear the timer if the user manually logs out. On login, we should again get the expiresIn from localStorage and set a new timer on the remaining time, if any.

On auto-logout due to the timer or other reasons, redirect the user. To do this we can set a new state and then add a watcher for this state and when it changes, redirect.

See the code and the changes for what was done, though it was mostly repeating what has already been learned.
