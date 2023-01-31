const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('unhandledRejection', (err) => {
  console.log('Unhandler rejection! Shutting down');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.log('Uncaught exception! Shutting down');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const port = process.env.PORT || 3000;
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log('DB connection success');
  });
// console.log(process.env);
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
