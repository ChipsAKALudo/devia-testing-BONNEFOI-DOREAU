const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');
const Billing = require('./billingModel.js');

// Define the User model
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: true
});

User.hasMany(Billing, {
    foreignKey: 'User',
    as: 'billings'
});

module.exports = User;
