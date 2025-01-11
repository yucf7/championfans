const { API_KEY } = process.env; // Store your API key in environment variables

// Middleware to check API key
const apiKeyInterceptor = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(400).json({ message: 'API key is required' });
  }

  if (apiKey !== API_KEY) {
    return res.status(403).json({ message: 'Forbidden: Invalid API key' });
  }

  next();
};

module.exports = apiKeyInterceptor;
