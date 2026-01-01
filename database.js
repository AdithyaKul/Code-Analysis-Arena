const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-debate-arena';
const client = new MongoClient(uri);

let db = null;

async function connectDB() {
  try {
    await client.connect();
    db = client.db();
    console.log('✓ Connected to MongoDB');
    
    // Create indexes for better performance
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('analyses').createIndex({ userId: 1, timestamp: -1 });
    
    return db;
  } catch (error) {
    console.warn('⚠️  MongoDB not available - running in memory-only mode');
    console.warn('   Authentication and history features will be disabled');
    return null;
  }
}

function getDB() {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB() first.');
  }
  return db;
}

async function closeDB() {
  if (client) {
    await client.close();
    console.log('✓ MongoDB connection closed');
  }
}

module.exports = {
  connectDB,
  getDB,
  closeDB
};
