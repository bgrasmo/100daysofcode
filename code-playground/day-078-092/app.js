const path = require('path');

const express = require('express');
const csrf = require('csurf');

const db = require('./data/database');
const addCSRFToken = require('./middlewares/csrf-token');
const authRoutes = require('./routes/auth-routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(csrf());

app.use(authRoutes);

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
