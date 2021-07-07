'use strict';

const config = require('./config/server.config');
const express = require('express');
const bodyParser  = require('body-parser');
const mongoose = require('mongoose');

const {swaggerUi, specs} = require('./swagger');

// 앱
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World!!');
});

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [CONFIGURE MONGOOSE]
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);

mongoose.connect(config.dbUrl());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}));

app.listen(config.serverPort, config.serverHost);
console.log(`Running on http://${config.serverHost}:${config.serverPort}`);

