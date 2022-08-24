const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = expressAsyncHandler (async (req, res, next) => {
  //initialize token
  let token;

  //check if any token comes in headers, 'Bearer jwtoken'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from headers
      token = req.headers.authorization.split(' ')[1];

      //Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Get user by token
      //Exclude password
      req.user = await User.findById(decoded.id).select('-password');

      //if everything is ok, next();
      next();

    } catch (error) {
      res.status(401);
      throw new Error('Auth error/Not Authorized');
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
  
});


module.exports = { protect };