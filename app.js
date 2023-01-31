const express = require('express');
const app = express();
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static('public'));

// app.use((req, res, next) => {
//   console.log('Hello from middleware');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

app.all('*', (req, res, next) => {
  // const err = new Error(`Cant find ${req.originalUrl} on this server`);
  // err.status = 'Fail';
  // err.statusCode = 404;
  const err = new AppError(`Cant find ${req.originalUrl} on this server`, 404);
  next(err);
});

app.use(globalErrorHandler);

module.exports = app;
