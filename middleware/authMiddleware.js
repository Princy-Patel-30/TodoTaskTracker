import jwt from 'jsonwebtoken';

// Protect middleware to ensure user is authenticated
export const protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request object
    next(); // Call next middleware
  } catch (err) {
    res.status(401).json({ message: 'Token expired or invalid' });
  }
};

// Role-based access control middleware
export const roleCheck = (role) => (req, res, next) => {
  if (req.user?.role === role) {
    next(); // User has required role
  } else {
    res.status(403).json({ message: 'Forbidden' }); // Forbidden for users without the role
  }
};
