import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

// Signup function
export const signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Create new user
    const user = new User({ email, password, role });
    await user.save();

    res.status(201).json({  user: { id: user._id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// // Login function
// // Login function
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Input check
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//     }

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: 'User with this email does not exist' });
//     }

//     // Optional debug logs
//     console.log('Stored (hashed) password:', user.password);
//     console.log('Entered (raw) password:', password);

//     // Compare password
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Incorrect password' });
//     }

//     // Generate JWT
//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });

//     res.status(200).json({
//       message: 'Login successful',
//       token,
//       user: { id: user._id, email: user.email, role: user.role },
//     });
//   } catch (error) {
//     console.error('Login error:', error.message);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

const generateToken = (payload, expiresIn) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User with this email does not exist' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generate tokens
    const accessToken = generateToken({ id: user._id, role: user.role }, '15m');
    const refreshToken = generateToken({ id: user._id }, '7d');

    // Set cookies
    res
      .cookie('token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      res.status(200).json({
        message: 'Login successful',
        token: accessToken,
        refreshToken,
        user: { id: user._id, email: user.email, role: user.role },
      });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token not found. Please log in again.' });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found. Please log in again.' });
    }

    // Generate new access token
    const newAccessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    // Send new token in cookie
    res
      .cookie('token', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      .status(200)
      .json({ message: 'Access token refreshed successfully' });
  } catch (error) {
    console.error('Refresh error:', error.message);
    res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};
