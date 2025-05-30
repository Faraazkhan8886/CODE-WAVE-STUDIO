// server.js
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: 'supersecretcodewave',
  resave: false,
  saveUninitialized: true
}));

// Dummy credentials
const USERNAME = 'admin';
const PASSWORD = '123456';

app.get('/', (req, res) => {
  res.redirect('/login.html');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USERNAME && password === PASSWORD) {
    req.session.loggedIn = true;
    res.redirect('/dashboard.html');
  } else {
    res.send('<h2>Invalid credentials. <a href="/login.html">Try again</a></h2>');
  }
});

app.get('/dashboard.html', (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect('/login.html');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login.html');
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
