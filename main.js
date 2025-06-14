const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const historyRoutes = require('./routers/history'); // ✅ match your folder name

const app = express();

// Middleware to parse JSON and serve frontend
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Load decision tree
const decisionTreePath = path.join(__dirname, 'bot-logic', 'decision-tree.json');
let decisionTree = {};
try {
  const rawData = fs.readFileSync(decisionTreePath, 'utf-8');
  decisionTree = JSON.parse(rawData);
} catch (err) {
  console.error('❌ Error loading decision tree:', err.message);
}

// Respond to chat requests
app.post('/api/chat', (req, res) => {
  const node = req.body.node;
  const response = decisionTree[node] || {
    message: "❓ Sorry, I don't understand.",
    options: []
  };
  res.json(response);
});

// Save history API
app.use('/api', historyRoutes);

// Serve the main HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
