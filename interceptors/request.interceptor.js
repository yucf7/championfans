const { API_KEY, JWT_SECRET } = process.env; // Store your API key and JWT secret in environment variables
const jwt = require('jsonwebtoken'); // For JWT verification

// Configuration for protected routes
const protectedRoutes = {
  '/api/messages': ['GET'], 
  '/api/admin': ['GET', 'POST'], 
  // Add more routes and methods as needed
};

// Middleware to check API key and token
const apiKeyInterceptor = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const token = req.headers['authorization'];

  // Check API key
  if (!apiKey) {
    return res.status(400).json({ message: 'API key is required' });
  }

  if (apiKey !== API_KEY) {
    return res.status(403).json({ message: 'Forbidden: Invalid API key' });
  }

  // Check if the current route and method require a token
  const route = req.path;
  const method = req.method.toUpperCase();

  if (protectedRoutes[route] && protectedRoutes[route].includes(method)) {
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Token is required' });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);

      // Check if the user is an admin
      if (!decoded.isAdmin) {
        return res.status(403).json({ message: 'Forbidden: Admin access required' });
      }

      // Attach the decoded user to the request object
      req.user = decoded;
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  }

  next();
};

module.exports = apiKeyInterceptor;