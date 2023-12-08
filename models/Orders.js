const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        Order_ID: { type: 'UNIQUEIDENTIFIER', defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
        Platform_ID: { type: DataTypes.STRING, allowNull: false },
    };

    return sequelize.define('Orders', attributes);
}