// import jwt from 'jsonwebtoken';

// // Protect middleware to ensure user is authenticated
// export const protect = (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ message: 'Not authorized' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach user data to request object
//     next(); // Call next middleware
//   } catch (err) {
//     res.status(401).json({ message: 'Token expired or invalid' });
//   }
// };

// // Role-based access control middleware
// export const roleCheck = (role) => (req, res, next) => {
//   if (req.user?.role === role) {
//     next(); // User has required role
//   } else {
//     res.status(403).json({ message: 'Forbidden' }); // Forbidden for users without the role
//   }
// };

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
    next(); // Proceed to next middleware
  } catch (err) {
    res.status(401).json({ message: 'Token expired or invalid' });
  }
};

// Middleware for role-based access control
export const roleCheck = (role) => (req, res, next) => {
  if (req.user?.role === role) {
    next(); // User has the required role
  } else {
    res.status(403).json({ message: 'Forbidden - insufficient role' });
  }
};
