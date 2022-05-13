const path = require('path');

const express = require('express');

const authRoutes = require('./routes/auth-routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.use(authRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Oneline webshop listening on port ${port}`);
});
