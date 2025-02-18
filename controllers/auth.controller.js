const jwt = require('jsonwebtoken');
const authHelper = require('../helpers/auth.helper')
const { ADMIN_PASS } = process.env;
module.exports.checkAdmin = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  // Secret key to verify the JWT
  const secretKey = process.env.JWT_SECRET; 
  
  // Verify the JWT token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    // Check if the user has an 'admin' role
    if (decoded.isAdmin) {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    console.log(decoded)
    return res.status(200).json({ user: decoded });

  });
};

module.exports.adminLogin = async (req, res) => {
  try {
    const user = await authHelper.adminLogin(req.body);
    return res.status(200).json(user);
  } catch (error) {
    // Handle specific errors with appropriate status codes
    if (error.message === "user_not_exists" || error.message === "invalid_password") {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(500).json({ message: error.message }); 
    }
  }
};


module.exports.createAdmin = async (req, res) => {
    try{
        if(req.headers.adminpass != ADMIN_PASS) 
            return res.status(401).json({message: 'Unauthorized'});
        const user = await authHelper.createAdmin(req.body);
        return res.status(201).json(user);
    }catch(error){
        console.log(error)
        return res.status(500).json({message: error.message ? error.message : error});
    }
}
