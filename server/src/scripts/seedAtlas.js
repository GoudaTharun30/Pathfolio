/**
 * Database Seeder Script for Pathfolio
 * Populates MongoDB Atlas or local MongoDB with Career Roadmaps and Project Recommendations.
 *
 * Usage:
 *   npm run seed
 *   or node server/src/scripts/seedAtlas.js
 */

const mongoose = require('mongoose');
const dns = require('dns');
const env = require('../config/environment');
const { sanitizeMongoUri, getTargetDbInfo } = require('../config/database');
const CareerRoadmap = require('../models/CareerRoadmap');
const ProjectRecommendation = require('../models/ProjectRecommendation');
const seedData = require('../seeds/seedData');

// Ensure reliable DNS resolution for MongoDB Atlas SRV records on Windows networks
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {}


async function seedDatabase() {
  console.log('====================================================');
  console.log('        Pathfolio Database Seed Utility');
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

  try {
    console.log('⏳ Connecting to database...');
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: isAtlas ? 10000 : 3500,
      dbName: dbName || 'pathfolio'
    });

    console.log('✅ Connected successfully.');
    console.log('----------------------------------------------------');

    // 1. Seed Career Roadmaps
    const existingRoadmaps = await CareerRoadmap.countDocuments();
    if (existingRoadmaps === 0) {
      console.log(`🌱 Inserting ${seedData.roadmaps.length} Career Roadmaps...`);
      await CareerRoadmap.insertMany(seedData.roadmaps);
      console.log(`✅ ${seedData.roadmaps.length} Career Roadmaps seeded successfully!`);
    } else {
      console.log(`ℹ️ Career Roadmaps already present (${existingRoadmaps} found). Skipping.`);
    }

    // 2. Seed Project Recommendations
    const existingProjects = await ProjectRecommendation.countDocuments();
    if (existingProjects === 0) {
      console.log(`🌱 Inserting ${seedData.projects.length} Project Recommendations...`);
      await ProjectRecommendation.insertMany(seedData.projects);
      console.log(`✅ ${seedData.projects.length} Project Recommendations seeded successfully!`);
    } else {
      console.log(`ℹ️ Project Recommendations already present (${existingProjects} found). Skipping.`);
    }

    // 3. Sync Indexes
    console.log('⚙️ Synchronizing collection indexes...');
    await CareerRoadmap.syncIndexes();
    await ProjectRecommendation.syncIndexes();
    console.log('✅ Collection indexes synchronized.');

    console.log('====================================================');
    console.log('🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log('====================================================');

    await mongoose.connection.close(false);
    process.exit(0);

  } catch (error) {
    console.error(`❌ Seeding failed: ${error.message}`);
    if (mongoose.connection && mongoose.connection.readyState !== 0) {
      await mongoose.connection.close(false);
    }
    process.exit(1);
  }
}

seedDatabase();
