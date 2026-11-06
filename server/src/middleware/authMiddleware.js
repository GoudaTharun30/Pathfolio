const { getAuth } = require('@clerk/express');
const jwt = require('jsonwebtoken');
const env = require('../config/environment');
const { getDbState } = require('../config/database');
const User = require('../models/User');

/**
 * Hybrid Authentication Middleware for Pathfolio
 * Supports Clerk session tokens AND standard JWT tokens.
 * Guarantees that whether a user logs in via Clerk or standard credentials,
 * req.user = { id: ... } is reliably attached and valid.
 */
const authMiddleware = async (req, res, next) => {
  try {
    // 1. Try Clerk session authentication
    try {
      const { userId } = getAuth(req);
      if (userId) {
        req.user = { id: userId };
        return next();
      }
    } catch (clerkErr) {
      // Continue to JWT fallback
    }

    // 2. Fall back to standard Authorization: Bearer <jwt> token
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, env.JWT_SECRET);
        if (decoded && decoded.userId) {
          const { useMemoryStore, memoryStore } = getDbState();
          if (useMemoryStore) {
            const user = memoryStore.users.find(u => u._id.toString() === decoded.userId.toString());
            req.user = {
              id: decoded.userId.toString(),
              name: user ? user.name : 'User',
              email: user ? user.email : ''
            };
          } else {
            const user = await User.findById(decoded.userId).select('-password');
            req.user = {
              id: decoded.userId.toString(),
              name: user ? user.name : 'User',
              email: user ? user.email : ''
            };
          }
          return next();
        }
      } catch (jwtErr) {
        // Token was invalid or expired
      }
    }

    return res.status(401).json({ error: 'Authentication required. Please sign in.' });
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    return res.status(401).json({ error: 'Invalid or expired session token.' });
  }
};

module.exports = authMiddleware;

