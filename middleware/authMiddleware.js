
import jwt from 'jsonwebtoken';

// Middleware to verify JWT from cookie or Authorization header
export const protect = (req, res, next) => {
  let token;

  // 1. Try to get token from Authorization header
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // 2. Fallback: check token from cookie
  else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  // If token not found
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to req
    res.locals.token = token;
    next(); // Proceed to next middleware
  } catch (err) {
    res.status(401).json({ message: 'Token expired or invalid' });
  }
};


