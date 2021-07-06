'use strict';

const express = require('express');
const bodyParser  = require('body-parser');

const {swaggerUi, specs} = require('./swagger');

// 상수
const PORT = 8080;
const HOST = '0.0.0.0';

// 앱
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World!!');
});

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

