// Load HTTP and the Express app
const http = require('http');
const app = require('./main'); // Make sure 'main.js' exists in the same folder

// Define port (use .env or fallback to 3000)
const PORT = process.env.PORT || 3000;

// Create the server
const server = http.createServer(app);

// Start listening
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

// Optional: Handle common server errors
server.on('error', (err) => {
  console.error('❌ Server error:', err.message);
});
