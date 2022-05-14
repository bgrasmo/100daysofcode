const path = require('path');

const express = require('express');
const csrf = require('csurf');
const expressSession = require('express-session');

const createSessionConfig = require('./config/session');
const db = require('./data/database');
const addCSRFTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const authRoutes = require('./routes/auth-routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));
app.use(csrf());
app.use(addCSRFTokenMiddleware);

app.use(authRoutes);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

db.connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Online webshop listening on port ${port}`);
    });
  })
  .catch((e) => {
    console.log('Failed to connect to the database');
    console.log(e);
  });
