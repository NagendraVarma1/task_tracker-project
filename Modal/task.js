const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const TaskTracker = sequelize.define('task-table', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    task: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = TaskTracker;