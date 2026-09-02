const mongoose = require('mongoose');
const env = require('./environment');

let isConnected = false;
let useMemoryStore = true; // Default to true until MongoDB actively establishes connection

// Simple in-memory fallback store if local MongoDB service is not running
const memoryStore = {
  users: [],
  profiles: [],
  roadmaps: [],
  learningPlans: [],
  projectRecommendations: [],
  resumes: [],
  portfolios: []
};

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    // Timeout quickly (2.5s) if local mongod is not listening so app loads fast
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 2500
    });
    isConnected = true;
    useMemoryStore = false;
    console.log('✅ Connected to MongoDB successfully:', env.MONGODB_URI);
  } catch (error) {
    console.warn('⚠️ Could not connect to local MongoDB. Activating in-memory DB fallback for seamless development execution.');
    console.warn('   (Error details: ' + error.message + ')');
    isConnected = false;
    useMemoryStore = true;
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
  memoryStore
};
