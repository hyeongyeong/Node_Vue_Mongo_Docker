'use strict';

const config = require('./config/server.config');
const express = require('express');
const bodyParser  = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const {swaggerUi, specs} = require('./swagger');

// 앱
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World!!');
});

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [CONFIGURATE CORS]
app.use(cors())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type")
    next()
})


// [CONFIGURE MONGOOSE]
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.connect(config.dbUrl(), {useUnifiedTopology:true});

var db = mongoose.connection;
db.on('error', function(){
  console.log('Connection Failed!');
});
db.once('open', function() {
  console.log('Connected!');
});

autoIncrement.initialize(db);

app.use('/', require('./router'));
app.use('/sts', express.static('/data'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}));

app.listen(config.serverPort, config.serverHost);
console.log(`Running on http://${config.serverHost}:${config.serverPort}`);
