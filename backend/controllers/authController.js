import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {authSchema, loginSchema} from '../validations/auth.schema.js';

// ======================= Signup Controller =======================
const signup = async (req, res) => {
  try {
    // Validate user input
    const { error, value } = authSchema.validate(req.body, { abortEarly: false });
    console.log(error)
    if (error) {
      const details = error.details.map(err => ({
        field: err.context.key,
        message: err.message
      }));
      return res.status(400).json({ details });
    }

    const { username, email, password } = value;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        details: [{ field: 'email', message: 'User already exists' }]
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(200).json({user:newUser.username, message: 'Sign up successful' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error during signup' });
  }
};



// ======================= Login Controller =======================
const login = async (req, res) => {
console.log("this is login conroller")
  try {

     const { error, value } = loginSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const details = error.details.map(err => ({
        field: err.context.key,
        message: err.message
      }));
      return res.status(400).json({ details });
    }

    const {  email, password } = value;
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        details: [{ field: 'email', message: 'Invalid email or password' }]
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        details: [{ field: 'password', message: 'Invalid email or password' }]
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Set token as HTTP-only cookie
res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  maxAge: 60 * 60 * 1000,
});



console.log(token)

    return res.status(200).json({user:user.username, message: 'Login successful' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error during login' });
  }
};



// ======================= Logout Controller =======================
const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  return res.status(200).json({ message: 'Logged out successfully' });
};


export { signup, login, logout };
