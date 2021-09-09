const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const apiRouter = require('./api-router.js');

const server = express();

server.use(helmet());

const morganFormat = process.env.NODE_ENV === 'development' ? 'dev' : 'combined';
server.use(morgan(morganFormat));

server.use('/api', apiRouter);

module.exports = server;
