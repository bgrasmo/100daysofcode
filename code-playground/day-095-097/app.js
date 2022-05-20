const express = require('express');

const app = express();

app.get('/quote', (req, res, next) => {
  res.json({
    quote: 'You are here!'
  });
});

app.listen(3000);