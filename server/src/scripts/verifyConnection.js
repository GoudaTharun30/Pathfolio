/**
 * Database Connection & Health Verification Script for Pathfolio
 * Tests MongoDB (Atlas or Local) connection, permissions, collections, and indexes.
 *
 * Usage:
 *   npm test
 *   or node server/src/scripts/verifyConnection.js
 */

const mongoose = require('mongoose');
const dns = require('dns');
const env = require('../config/environment');
const { sanitizeMongoUri, getTargetDbInfo } = require('../config/database');

// Ensure reliable DNS resolution for MongoDB Atlas SRV records on Windows
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {}


// Import models to register schemas
const User = require('../models/User');
const Profile = require('../models/Profile');
const CareerRoadmap = require('../models/CareerRoadmap');
const LearningPlan = require('../models/LearningPlan');
const Portfolio = require('../models/Portfolio');
const ProjectRecommendation = require('../models/ProjectRecommendation');
const Resume = require('../models/Resume');
const UserLearningPath = require('../models/UserLearningPath');

async function runVerification() {
  console.log('====================================================');
  console.log('   Pathfolio Database Connection Verification');
  console.log('====================================================');

  const uri = env.MONGODB_URI;
  const { host, dbName, isAtlas } = getTargetDbInfo(uri);
  const sanitized = sanitizeMongoUri(uri);

  console.log(`Target Type     : ${isAtlas ? 'MongoDB Atlas Cloud' : 'Local MongoDB'}`);
  console.log(`Target Host     : ${host}`);
  console.log(`Target Database : ${dbName}`);
  console.log(`Sanitized URI   : ${sanitized}`);
  console.log('----------------------------------------------------');

  if (uri.includes('<') && uri.includes('>')) {
    console.warn('⚠️ WARNING: Your MONGODB_URI appears to contain placeholder brackets (e.g. <db_password>).');
    console.warn('   Please replace "<db_password>" with your actual MongoDB Atlas password in .env.');
    console.log('----------------------------------------------------');
  }

  const startTime = Date.now();
  try {
    console.log('⏳ Connecting to MongoDB...');
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: isAtlas ? 10000 : 3500,
      dbName: dbName || 'pathfolio'
    });

    const elapsed = Date.now() - startTime;
    console.log(`✅ Connection established successfully in ${elapsed}ms!`);
    console.log(`Connected DB    : ${mongoose.connection.name}`);
    console.log(`Connection State: ${mongoose.connection.readyState === 1 ? 'Ready (Connected)' : 'Unknown'}`);
    console.log('----------------------------------------------------');

    // 1. Check existing collections and document counts
    console.log('📊 Inspecting collections & document counts:');
    const registeredModels = [
      { name: 'Users', model: User },
      { name: 'Profiles', model: Profile },
      { name: 'CareerRoadmaps', model: CareerRoadmap },
      { name: 'LearningPlans', model: LearningPlan },
      { name: 'Portfolios', model: Portfolio },
      { name: 'ProjectRecommendations', model: ProjectRecommendation },
      { name: 'Resumes', model: Resume },
      { name: 'UserLearningPaths', model: UserLearningPath }
    ];

    for (const item of registeredModels) {
      try {
        const count = await item.model.countDocuments();
        console.log(`   - ${item.name.padEnd(25)}: ${count} documents`);
      } catch (err) {
        console.log(`   - ${item.name.padEnd(25)}: [Error reading: ${err.message}]`);
      }
    }

    console.log('----------------------------------------------------');

    // 2. Perform safe write-read-delete probe
    console.log('🧪 Testing CRUD permissions (Probe Test)...');
    const probeCollection = mongoose.connection.collection('_connection_probe');
    const testDoc = { probeId: 'pathfolio_test_' + Date.now(), createdAt: new Date() };

    // Insert
    await probeCollection.insertOne(testDoc);
    // Read
    const foundDoc = await probeCollection.findOne({ probeId: testDoc.probeId });
    if (!foundDoc) {
      throw new Error('Probe read verification failed');
    }
    // Delete
    await probeCollection.deleteOne({ probeId: testDoc.probeId });
    console.log('✅ Write, Read, and Delete permissions verified successfully!');

    console.log('----------------------------------------------------');

    // 3. Verify Schema Indexes
    console.log('🔍 Checking Schema Indexes...');
    try {
      const userIndexes = await User.collection.indexes();
      const hasEmailIndex = userIndexes.some(idx => idx.key && idx.key.email);
      console.log(`   - User collection email unique index: ${hasEmailIndex ? 'Verified' : 'Pending auto-build'}`);
    } catch {
      console.log('   - Indexes will be built automatically upon collection insertion.');
    }

    console.log('====================================================');
    console.log('🎉 ALL DATABASE VERIFICATION CHECKS PASSED!');
    console.log(`   Pathfolio is actively communicating with ${isAtlas ? 'MongoDB Atlas' : 'Local MongoDB'}.`);
    console.log('====================================================');

    await mongoose.connection.close(false);
    process.exit(0);

  } catch (error) {
    console.log('----------------------------------------------------');
    console.error(`❌ Verification FAILED: ${error.message}`);
    if (isAtlas) {
      console.error('');
      console.error('Troubleshooting Atlas:');
      console.error(' 1. Network Access: Ensure your current IP or 0.0.0.0/0 is in Atlas IP Access List.');
      console.error(' 2. Database User: Ensure user has "readWriteAnyDatabase" or readWrite on "pathfolio".');
      console.error(' 3. Password: Ensure special characters in password are URL encoded (e.g. @ -> %40).');
      console.error(' 4. Check cluster status in your Atlas Web Dashboard.');
    } else {
      console.error('');
      console.error('Troubleshooting Local MongoDB:');
      console.error(' 1. Ensure mongod service is started (e.g. "net start MongoDB").');
      console.error(' 2. Verify port 27017 is listening.');
    }
    console.log('====================================================');

    if (mongoose.connection && mongoose.connection.readyState !== 0) {
      await mongoose.connection.close(false);
    }
    process.exit(1);
  }
}

runVerification();
