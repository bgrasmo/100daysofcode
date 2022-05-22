const path = require('path');

const express = require('express');
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session');

const db = require('./data/database');
const demoRoutes = require('./routes/demo');

const MongoDBStore = mongodbStore(session);

const app = express();

const sessionStore = new MongoDBStore({
  uri: 'mongodb://localhost:27017',
  databaseName: 'auth-demo',
  collection: 'sessions',
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'Super-secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

app.use(async (req, res, next) => {
  const isAuth = req.session.isAuthenticated;
  
  if (!req.session.user || !isAuth) {
    return next();
  }
  const user = await db.getDb()
    .collection('users')
    .findOne({ _id: req.session.user.id });
  
  const isAdmin = user.isAdmin;

  res.locals.isAuth = isAuth;
  res.locals.isAdmin = isAdmin;

  next();
});

app.use(demoRoutes);

app.use(function (error, req, res, next) {
  res.render('500');
});

const port = process.env.PORT || 3000;

db.connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
