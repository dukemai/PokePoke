const express = require('express');
const bodyParser = require('body-parser');

const setupUnsplashAPI = require('./unsplash');

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

module.exports = setupUnsplashAPI(server);
