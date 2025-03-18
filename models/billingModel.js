const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');
const Order = require('./orderModel.js');

const Billing = sequelize.define('Billing', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: true
});

Billing.hasMany(Order, {
    foreignKey: 'Billing',
    as: 'orders'
});

module.exports = Billing;