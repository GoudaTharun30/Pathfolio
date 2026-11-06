const mongoose = require('mongoose');
const dns = require('dns');
const env = require('./environment');

// Ensure reliable DNS resolution for MongoDB Atlas SRV records on Windows networks
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {}

let isConnected = false;

let useMemoryStore = true; // Default to true until MongoDB actively establishes connection

// Simple in-memory fallback store if MongoDB is not reachable during local offline development
const memoryStore = {
  users: [],
  profiles: [],
  roadmaps: [],
  learningPlans: [],
  projectRecommendations: [],
  resumes: [],
  portfolios: []
};

/**
 * Redacts credentials from MongoDB connection URI for safe console logging
 */
const sanitizeMongoUri = (uri) => {
  if (!uri || typeof uri !== 'string') return '';
  try {
    return uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@');
  } catch {
    return '[REDACTED_URI]';
  }
};

/**
 * Extracts human-readable host and database info without exposing credentials
 */
const getTargetDbInfo = (uri) => {
  if (!uri || typeof uri !== 'string') return { host: 'unknown', dbName: 'pathfolio', isAtlas: false };
  const isAtlas = uri.startsWith('mongodb+srv://') || (!uri.includes('127.0.0.1') && !uri.includes('localhost'));
  let dbName = 'pathfolio';
  let host = 'localhost';
  try {
    const afterAt = uri.split('@')[1] || uri.split('://')[1] || '';
    const hostPart = afterAt.split('/')[0] || '';
    host = hostPart;
    const pathPart = afterAt.split('/')[1] || '';
    const cleanDb = pathPart.split('?')[0];
    if (cleanDb) dbName = cleanDb;
  } catch {
    // fallback defaults
  }
  return { host, dbName, isAtlas };
};

const connectDB = async () => {
  const uri = env.MONGODB_URI;
  const { host, dbName, isAtlas } = getTargetDbInfo(uri);
  const sanitizedUri = sanitizeMongoUri(uri);

  try {
    mongoose.set('strictQuery', false);

    // Register connection lifecycle event listeners
    if (!mongoose.connection.listenerCount('disconnected')) {
      mongoose.connection.on('disconnected', () => {
        console.warn('⚠️ MongoDB connection lost/disconnected.');
        isConnected = false;
      });
      mongoose.connection.on('reconnected', () => {
        console.log('🔄 MongoDB reconnected successfully.');
        isConnected = true;
        useMemoryStore = false;
      });
      mongoose.connection.on('error', (err) => {
        console.error('❌ MongoDB runtime error:', err.message);
      });
    }

    // Atlas connections require longer timeout for DNS SRV lookup and TLS negotiation
    const timeoutMs = isAtlas ? 10000 : 3000;

    // Check if URI still contains placeholder brackets
    if (uri.includes('<') && uri.includes('>')) {
      console.warn('⚠️ WARNING: Your MONGODB_URI contains placeholder brackets (e.g. <db_password>).');
      console.warn('   Please replace "<db_password>" with your actual database password in your .env file.');
    }

    console.log(`🔌 Attempting connection to ${isAtlas ? 'MongoDB Atlas Cloud' : 'Local MongoDB'} (Target DB: "${dbName}")...`);


    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: timeoutMs,
      dbName: dbName || 'pathfolio'
    });

    isConnected = true;
    useMemoryStore = false;

    console.log(`✅ Connected successfully to ${isAtlas ? 'MongoDB Atlas Cloud' : 'Local MongoDB'}:`);
    console.log(`   Host: ${host}`);
    console.log(`   Database: ${mongoose.connection.name || dbName}`);
    console.log(`   Target URI: ${sanitizedUri}`);

  } catch (error) {
    isConnected = false;

    if (isAtlas) {
      // Atlas connection failure - clear, honest error handling without credential leakage
      console.error('❌ FAILED to connect to MongoDB Atlas Cloud:');
      console.error(`   Host: ${host}`);
      console.error(`   Database: ${dbName}`);
      console.error(`   Error Reason: ${error.message}`);
      console.error('');
      console.error('   👉 TROUBLESHOOTING CHECKLIST FOR MONGODB ATLAS:');
      console.error('      1. Check Network Access: In MongoDB Atlas -> Network Access, ensure your IP address is whitelisted (or 0.0.0.0/0).');
      console.error('      2. Check Database User: In Atlas -> Database Access, ensure username & password match your .env file.');
      console.error('      3. URL-encode special characters in password (e.g., %40 for @, %23 for #).');
      console.error('      4. Verify MONGODB_URI in your .env file.');
      console.error('');
      console.warn('⚠️ Activating temporary in-memory store so server remains functional during development.');
      console.warn('   ⚠️ NOTICE: Changes will NOT be saved to MongoDB Atlas until connection is fixed.');
      useMemoryStore = true;
    } else {
      // Local MongoDB connection failure
      console.warn('⚠️ Could not connect to local MongoDB on 127.0.0.1:27017.');
      console.warn(`   (Details: ${error.message})`);
      console.warn('   Activating in-memory DB fallback for local development.');
      useMemoryStore = true;
    }
  }
};

const getDbState = () => {
  const ready = mongoose.connection && mongoose.connection.readyState === 1;
  return {
    isConnected: ready || isConnected,
    useMemoryStore: !ready && useMemoryStore,
    memoryStore
  };
};

module.exports = {
  connectDB,
  getDbState,
  memoryStore,
  sanitizeMongoUri,
  getTargetDbInfo
};

