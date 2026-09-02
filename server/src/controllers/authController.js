const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/environment');
const { getDbState, memoryStore } = require('../config/database');
const User = require('../models/User');
const Profile = require('../models/Profile');

const register = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please provide all required fields (Name, Email, Password).' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }

    const { useMemoryStore } = getDbState();
    const cleanEmail = email.toLowerCase().trim();

    if (useMemoryStore) {
      const existing = memoryStore.users.find(u => u.email === cleanEmail);
      if (existing) {
        return res.status(400).json({ error: 'An account with this email already exists.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = 'mem_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);

      const newUser = {
        _id: userId,
        name,
        email: cleanEmail,
        password: hashedPassword,
        createdAt: new Date()
      };

      memoryStore.users.push(newUser);

      // Create empty default profile
      const newProfile = {
        _id: 'prof_' + userId,
        userId: userId,
        basicInfo: { fullName: name, email: cleanEmail, profilePhoto: '', phone: '', dob: '', location: '', aboutMe: '' },
        education: [],
        skills: ['HTML5', 'CSS3', 'JavaScript'],
        experience: [],
        projects: [],
        certifications: [],
        achievements: [],
        links: { github: '', linkedin: '', leetcode: '', website: '', other: '' },
        careerPreferences: { interestedRoles: ['Full Stack Developer'], preferredTechnologies: ['React', 'Node.js'], preferredIndustries: ['Software'], preferredWorkType: 'Hybrid', preferredJobType: 'Full-time' },
        activeRoadmapId: 'fullstack-developer',
        updatedAt: new Date()
      };
      memoryStore.profiles.push(newProfile);

      const token = jwt.sign({ userId: userId }, env.JWT_SECRET, { expiresIn: '7d' });
      return res.status(201).json({
        message: 'Account created successfully!',
        token,
        user: { id: userId, name: newUser.name, email: newUser.email }
      });
    } else {
      const existingUser = await User.findOne({ email: cleanEmail });
      if (existingUser) {
        return res.status(400).json({ error: 'An account with this email already exists.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email: cleanEmail,
        password: hashedPassword
      });

      // Create default Profile document
      await Profile.create({
        userId: newUser._id,
        basicInfo: { fullName: name, email: cleanEmail },
        skills: ['HTML5', 'CSS3', 'JavaScript'],
        activeRoadmapId: 'fullstack-developer'
      });

      const token = jwt.sign({ userId: newUser._id }, env.JWT_SECRET, { expiresIn: '7d' });
      return res.status(201).json({
        message: 'Account created successfully!',
        token,
        user: { id: newUser._id, name: newUser.name, email: newUser.email }
      });
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please enter your email and password.' });
    }

    const { useMemoryStore } = getDbState();
    const cleanEmail = email.toLowerCase().trim();

    if (useMemoryStore) {
      const user = memoryStore.users.find(u => u.email === cleanEmail);
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      const token = jwt.sign({ userId: user._id.toString() }, env.JWT_SECRET, { expiresIn: '7d' });
      return res.json({
        message: 'Login successful!',
        token,
        user: { id: user._id.toString(), name: user.name, email: user.email }
      });
    } else {
      const user = await User.findOne({ email: cleanEmail });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      const token = jwt.sign({ userId: user._id }, env.JWT_SECRET, { expiresIn: '7d' });
      return res.json({
        message: 'Login successful!',
        token,
        user: { id: user._id, name: user.name, email: user.email }
      });
    }
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getCurrentUser
};
