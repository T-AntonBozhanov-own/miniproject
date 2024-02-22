const { Model, DataTypes} = require("sequelize");
const {sequelize} = require("../db");

class Currency extends Model {}

Currency.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    currencyCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    conversionRate: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, { sequelize, timestamps: true, modelName: 'TestCurrency', freezeTableName: true })

module.exports = Currency