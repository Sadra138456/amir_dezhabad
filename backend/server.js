
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
// Allow the host to set the port, or default to 3001
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// 1. Serve Static Files (The React App)
// We assume the React build files will be in a '../dist' or '../build' folder relative to this file
const buildPath = path.join(__dirname, '..', 'dist'); 
app.use(express.static(buildPath));

// Database Initialization
// On some hosts, you might need to set an absolute path or use a persistent disk volume
const dbPath = path.resolve(__dirname, 'portfolio.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  )`);
});

// --- API Endpoints ---

app.get('/api/profile-image', (req, res) => {
  db.get("SELECT value FROM settings WHERE key = ?", ['profile_image'], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ image: row ? row.value : null });
  });
});

app.post('/api/profile-image', (req, res) => {
  const { image } = req.body;
  
  if (!image) {
    return res.status(400).json({ error: "Image data is required" });
  }

  db.run(`INSERT INTO settings (key, value) VALUES (?, ?) 
          ON CONFLICT(key) DO UPDATE SET value = excluded.value`, 
          ['profile_image', image], 
          function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, message: "Image saved to SQLite database" });
  });
});

// 2. Handle React Routing (Catch-all)
// Any request that isn't an API call goes to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
