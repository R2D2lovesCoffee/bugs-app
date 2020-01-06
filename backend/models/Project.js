const Sequelize = require('sequelize');
const Team = require('./Team');
const { db } = require('../config');

module.exports = db.define('project', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    repo: Sequelize.STRING,
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