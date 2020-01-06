const Sequelize = require('sequelize');
const Commit = require('./Commit');
const { db } = require('../config');

module.exports = db.define('bug', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    commit_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Commit,
            key: 'id',
        }
    },
    severity: Sequelize.INTEGER,
    priority: Sequelize.INTEGER,
    description: Sequelize.STRING
}, {
        timestamps: false
    })