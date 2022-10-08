const dotenv = require('dotenv');
// dotenv.config('../.env');
const express = require('express');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler.js');
const notFoundRoute = require('./routes/notFound.js');

// init app
const app = express();

app.use(express.static('public'));

// use json() to read req.body as a json object
app.use(express.json());

// create db connection and dry test
const db = require('./db.js');

// use morgan
app.use(morgan('dev'));

// use routes
app.use('/api/v1/todos', require('./routes/todoRoutes.js'));
app.use(notFoundRoute);

// use error handler
app.use(errorHandler);

// run server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`);
});
