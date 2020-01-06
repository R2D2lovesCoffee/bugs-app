const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const users = require('./routes/users');

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', users);

module.exports = app;