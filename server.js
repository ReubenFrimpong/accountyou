const mongoose = require('mongoose');
const makeApp = require('./app');
const dotenv = require("dotenv");
const helmet = require('helmet');

process.on('uncaughtException', err=> {
  console.log(err.name,err.message);
  console.log('UNCAUGHT EXCEPTION! Shutting down..');
  process.exit(1); 
})

dotenv.config({path: '.env'})

mongoose.connect(process.env.DB_CONNECTION_STRING)
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;

makeApp()
  .then(app => {
    app.use(helmet())
    app.listen(port)
  })
  .then(() => {
    console.log(`App running on port ${port}...`)
  })
  .catch(err => {
    console.error('caught error', err)
});

process.on('unhandledRejection', err =>{
  console.log(err.name,err.message);
  console.log('UNHANDLED REJECTION! Shutting down..');
  server.close(() => {
    process.exit(1);
  })  
});
