const Sequelize = require('sequelize');
const Commit = require('./Commit');
const User = require('./User');
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
    description: Sequelize.STRING,
    alocated_user_id: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    solved_with_commit: {
        type: Sequelize.INTEGER,
        references: {
            model: Commit,
            key: 'id'
        }
    }
}, {
    timestamps: false
})