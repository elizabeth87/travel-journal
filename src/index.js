const express = require('express');
// a logger to automatically log all incoming request
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose')

require('dotenv').config()

// access control dot origin header sets its to start any origin
const cors = require('cors');
const middlewares = require('./middlewares');
const logs = require('./api/logs')

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}) 

app.use(morgan('common'));
app.use(helmet('helmet'));
// in the browser only request coming from this origin can return backend
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));

app.get('/', (req, res) => {
  res.send('HELLO!!');
});

app.use('/api/logs', logs)

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 3434;
app.listen(port, () => {
  console.log(`Listening at http://localhost: ${port}`);
});
