const express = require('express');

const app = express();

app.get('/api/register', (req, res) => {
  res.send('Welcome to register.');
});

const port = process.env.APP_PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}.`)
})