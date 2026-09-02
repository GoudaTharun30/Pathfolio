const jwt = require('jsonwebtoken');
const env = require('../config/environment');
const { getDbState } = require('../config/database');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.JWT_SECRET);

    const { useMemoryStore, memoryStore } = getDbState();

    if (useMemoryStore) {
      const user = memoryStore.users.find(u => u._id.toString() === decoded.userId);
      if (!user) {
        return res.status(401).json({ error: 'User session expired or user not found.' });
      }
      req.user = { id: user._id.toString(), email: user.email, name: user.name };
    } else {
      const user = await User.findById(decoded.userId).select('-password');
      if (!user) {
        return res.status(401).json({ error: 'User session expired or user not found.' });
      }
      req.user = { id: user._id.toString(), email: user.email, name: user.name };
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired session token.' });
  }
};

module.exports = authMiddleware;
