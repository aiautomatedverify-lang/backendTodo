require('dotenv').config();
require('express-async-errors'); // handle async errors
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./utils/db');
const tasksRouter = require('./routes/tasks');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Configure CORS to allow requests from your frontend
// app.use(cors({
//   origin: ['http://localhost:5173', 'http://localhost:5000', 'https://task9mern.netlify.app'],
//   credentials: true,
//   optionsSuccessStatus: 200
// }));
app.use(cors());


app.use(express.json());

// API routes
app.use('/api/tasks', tasksRouter);

// Health check endpoint
app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'Backend is running' }));

// For all other routes, return a simple message
app.get('/', (req, res) => {
  res.json({ 
    message: 'Todo App Backend API', 
    version: '1.0.0',
    endpoints: {
      tasks: '/api/tasks',
      health: '/api/health'
    }
  });
});

// error handler (should be last)
app.use(errorHandler);

// start
const PORT = process.env.PORT || 5000;

// Connect to database and start server
connectDB()
  .then(() => {
    const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    
    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully');
      server.close(() => {
        console.log('Process terminated');
      });
    });
  })
  .catch((error) => {
    console.error('Failed to connect to database:', error.message);
    console.error('Server will not start without database connection');
    process.exit(1);
  });