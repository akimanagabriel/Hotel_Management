const jwt = require('jsonwebtoken');
const prisma = require('../config/prismaClient');


// Middleware function to check if a user is authorized
const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from the request header
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Authentication token missing.' });
    }

    // Token format should be 'Bearer <token>'
    if (!token.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Invalid token format.' });
    }

    // Extract the token without 'Bearer '
    const tokenValue = token.split(' ')[1];

    // Verify the token and decode it
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET); // Replace with your secret key

    // Check if the user exists in the database
    const user = await prisma.user.findFirst({ where: { id: decoded.userId } });

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    // Attach the user object to the request for later use
    req.user = user;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed.' });
  }
};

module.exports = authMiddleware;
