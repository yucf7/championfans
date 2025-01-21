const express = require('express');
const cors = require('cors');

const sequelize = require('./database/connect');
const bodyParser = require('body-parser');
const routerApi = require('./routes/api');
const apiKeyInterceptor = require('./interceptors/request.interceptor');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sync the models (optional)
sequelize.sync({ alter: true }) // Use { force: true } to reset tables
    .then(() => console.log('Database synced'))
    .catch(console.error);

app.use(apiKeyInterceptor);
// Routes
app.use('/api', routerApi);
// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});