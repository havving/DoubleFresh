const Sequelize = require('sequelize');

module.exports = ((sequelize, DataTypes) => {
    return sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: Sequelize.STRING(40),
            allowNull: false
        },
        name: {
            type: Sequelize.STRING(40),
            allowNull: false
        },
        phone: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
});