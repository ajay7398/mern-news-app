import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const getUser = async (req, res) => {
  try {
    // 1. Get token from cookies
    const token = req.cookies.token;
    // 2. First check if token exists
    if (!token) {
      return res.status(200).json({ user: "" });
    }

    // 3. Now verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Find user
    const existingUser = await User.findOne({ _id: decoded.id });
    
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // 5. Return user data (without sensitive info)
    res.status(200).json({ 
     
        user: existingUser.username,
      
        // Add other non-sensitive fields as needed
      
    });
    
  } catch (error) {
    console.error("Error in getUser:", error);
    
    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (error.name === 'TokenExpiredError') {
       res.clearCookie('token');
      return res.status(401).json({ message: "Token expired" });
    }
    
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default getUser;