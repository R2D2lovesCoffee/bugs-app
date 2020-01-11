const Sequelize = require('sequelize');
const Project = require('./Project');
const User = require('./User');
const { db } = require('../config');

module.exports = db.define('commit', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id',
        }
    },
    project_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Project,
            key: 'id',
        }
    },
    link: Sequelize.STRING,
    message: Sequelize.STRING
}, {
    timestamps: false
})