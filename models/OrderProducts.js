const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        OrderProduct_ID: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
        Order_ID: { type: 'UNIQUEIDENTIFIER', allowNull: false },
        Product_ID: { type: 'UNIQUEIDENTIFIER', allowNull: true },
        ProductPlatform_ID: { type: DataTypes.STRING, allowNull: false },
    };

    return sequelize.define('OrderProducts', attributes);
}