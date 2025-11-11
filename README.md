# Todo App Backend

This is the backend API for the Todo application built with Node.js, Express, and MongoDB.

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file based on `.env.example` and configure your environment variables:
   - PORT: The port to run the server on (default: 5000)
   - MONGO_URI: MongoDB connection string
   - JWT_SECRET: Secret for JWT token signing

## Running Locally

```
npm run dev
```

The server will start on `http://localhost:5000`

## Deployment to Render

1. Create a MongoDB database on MongoDB Atlas:
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Get your connection string

2. Update your `.env` file with your MongoDB Atlas connection string:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/todoapp?retryWrites=true&w=majority
   ```

3. Push your code to GitHub

4. Deploy to Render:
   - Go to https://render.com and create an account
   - Create a new Web Service
   - Connect your GitHub repository
   - Set the following configuration:
     - Name: Your service name
     - Environment: Node
     - Build command: `npm install`
     - Start command: `node server.js`
     - Environment variables: Add your MONGO_URI and JWT_SECRET

5. After deployment, Render will provide a URL for your API (e.g., `https://your-app-name.onrender.com`)

## API Endpoints

- GET `/api/tasks` - Get all tasks
- POST `/api/tasks` - Create a new task
- GET `/api/tasks/:id` - Get a specific task
- PUT `/api/tasks/:id` - Update a task
- PATCH `/api/tasks/:id` - Partially update a task
- DELETE `/api/tasks/:id` - Delete a task

## CORS Configuration

The API is configured to accept requests from:
- http://localhost:5173 (local development)
- https://task8mern.netlify.app (production)

If you're using a different frontend URL, update the CORS configuration in `server.js`.