const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const users = require('./routes/users');
const teams = require('./routes/teams');
const projects = require('./routes/projects');
const commits = require('./routes/commits');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/users', users);
app.use('/teams', teams);
app.use('/projects', projects);
app.use('/commits', commits);

module.exports = app;