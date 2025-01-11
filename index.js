const express = require('express');
const sequelize = require('./database/connect'); // Import the database connection
const bodyParser = require('body-parser');
const routerApi = require('./routes/api');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

// Sync the models (optional)
sequelize.sync({ alter: true }) // Use { force: true } to reset tables
    .then(() => console.log('Database synced'))
    .catch(console.error);
    
// Routes
app.use('/api', routerApi);
// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});