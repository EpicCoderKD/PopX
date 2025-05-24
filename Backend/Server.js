// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Example in-memory data (replace with DB in production)
let users = [{ username: 'test', password: '1234' }];

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Example data endpoint
app.get('/api/data', (req, res) => {
  res.json({ data: 'This is some protected data!' });
});

// Signup endpoint
app.post('/api/signup', (req, res) => {
  const { name, phone, email, password, company, agency } = req.body;
  if (!name || !phone || !email || !password) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }
  const userExists = users.find(u => u.username === email);
  if (userExists) {
    return res.status(409).json({ success: false, message: 'User already exists' });
  }
  users.push({ username: email, password, name, phone, company, agency });
  res.json({ success: true, message: 'Signup successful' });
});

// Profile endpoint
app.get('/api/profile', (req, res) => {
  const { email } = req.query;
  const user = users.find(u => u.username === email);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({
    email: user.username,
    name: user.name,
    phone: user.phone,
    company: user.company,
    agency: user.agency,
    img: user.img || null
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));