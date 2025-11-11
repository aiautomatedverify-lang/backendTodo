require('dotenv').config();
require('express-async-errors'); // handle async errors
const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/db');
const tasksRouter = require('./routes/tasks');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Configure CORS to allow requests from your Netlify domain
app.use(cors({
  origin: ['http://localhost:5173', 'https://task8mern.netlify.app'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());

// routes
app.use('/api/tasks', tasksRouter);

// health
app.get('/health', (req, res) => res.send({ status: 'ok' }));

// error handler (should be last)
app.use(errorHandler);

// start
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});