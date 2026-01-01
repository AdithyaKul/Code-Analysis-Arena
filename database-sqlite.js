const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Create database directory if it doesn't exist
const dbDir = path.join(__dirname, 'data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'code-debate-arena.db');
const db = new Database(dbPath);

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS analyses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    code TEXT NOT NULL,
    pragmatist TEXT NOT NULL,
    optimizer TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );
  
  CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
  CREATE INDEX IF NOT EXISTS idx_analyses_user_id ON analyses (user_id);
  CREATE INDEX IF NOT EXISTS idx_analyses_timestamp ON analyses (timestamp);
`);

console.log('✓ SQLite database initialized at:', dbPath);

function connectDB() {
  console.log('✓ Connected to SQLite database');
  return Promise.resolve(db);
}

function getDB() {
  return db;
}

function closeDB() {
  db.close();
  console.log('✓ SQLite database connection closed');
  return Promise.resolve();
}

module.exports = {
  connectDB,
  getDB,
  closeDB
};