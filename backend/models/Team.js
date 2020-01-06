const Sequelize = require('sequelize');
const { db } = require('../config');

module.exports = db.define('team', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING
})