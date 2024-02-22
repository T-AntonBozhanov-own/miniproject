const { Model, DataTypes} = require("sequelize");
const {sequelize} = require("../db");

class Country extends Model {}

Country.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, { sequelize, timestamps: true, modelName: 'Country', freezeTableName: true })


Country.sync()

module.exports = Country