const Sequelize = require('sequelize');
const Team = require('./Team');
const { db } = require('../config');

module.exports = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    team_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Team,
            key: 'id',
        }
    }
}, {
        timestamps: false
    })