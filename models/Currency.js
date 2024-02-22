const { Model, DataTypes} = require("sequelize");
const {sequelize} = require("../db");
const Country = require("./Country");

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
    countryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Country,
            key: 'id'
        }
    },
    conversionRate: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, { sequelize, timestamps: true, modelName: 'Currency', freezeTableName: true })

Currency.hasOne(Country, {foreignKey: 'id'})

Currency.sync()

module.exports = Currency