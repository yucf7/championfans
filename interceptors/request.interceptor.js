const { API_KEY, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

const protectedRoutes = {
  '/api/messages': ['GET'], 
  '/api/users': ['GET', 'DELETE'], 
  '/api/auth/newadmin': ['POST'], 
  '/api/messages': ['GET'], 
  '/api/articles': ['POST', 'PUT', 'DELETE'], 
  '/api/media': ['POST', 'PUT', 'DELETE'], 
};

const apiKeyInterceptor = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const token = req.headers['authorization'];

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(403).json({ message: 'Forbidden: Invalid API key' });
  }

  const method = req.method.toUpperCase();

  // Find a matching protected route (handles dynamic routes)
  const matchedRoute = Object.keys(protectedRoutes).find(route => req.path.startsWith(route));
  if (matchedRoute && protectedRoutes[matchedRoute].includes(method)) {
    try {
      
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Token is required' });
    }

      const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
      
      if (!decoded.isAdmin) {
        return res.status(403).json({ message: 'Forbidden: Admin access required' });
      }

      req.user = decoded;
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  }

  next();
};

module.exports = apiKeyInterceptor;
