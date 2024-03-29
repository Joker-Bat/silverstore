const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err, origin) => {
  console.log('uncaughtException');
  console.log('Error: ', err.name, err.message);
  console.log('Origin: ', origin);
  process.exit(1);
});

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

// Connect To Database
mongoose
  .connect(DB)
  .then(() => console.log('Connected To Database Successfully. :)'))
  .catch((err) => console.log('Error in database connection', err.message));
// Error happen after initial connect
mongoose.connection.on('error', (err) => {
  console.log('Error in Mongoose collection', err);
});

// Start Server
const port = process.env.PORT || 8000;
const server = app.listen(port, () => `Server running on port ${port}`);

// Unhandled Rejection
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  server.close(() => {
    process.exit(1);
  });
});

// Heroku
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM Received. Shutting down gracefully');
  server.close(() => {
    console.log('❓ Process Terminated');
  });
});
