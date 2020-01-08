const Sequelize = require('sequelize');
const fs = require('fs');

const config = {
    port: 5000,
    dbName: 'bugsapp',
    dbUser: 'root',
    dbPass: JSON.parse(fs.readFileSync('../../pass.json', 'utf8')).pass,
    dbHost: '127.0.0.1',
    dbDialect: 'mysql'
};

const db = new Sequelize(
    config.dbName,
    config.dbUser,
    config.dbPass, {
    host: config.dbHost,
    dialect: config.dbDialect,
}
)

module.exports = { config, db }