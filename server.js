const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require("dotenv");
const helmet = require('helmet');

app.use(helmet())

process.on('uncaughtException', err=> {
  console.log(err.name,err.message);
  console.log('UNCAUGHT EXCEPTION! Shutting down..');
  process.exit(1); 
})

dotenv.config({path: '.env'})

mongoose.connect(process.env.DB_CONNECTION_STRING)
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err =>{
  console.log(err.name,err.message);
  console.log('UNHANDLED REJECTION! Shutting down..');
  server.close(() => {
    process.exit(1);
  })  
});
