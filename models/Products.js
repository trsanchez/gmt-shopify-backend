const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        Product_ID: { type: 'UNIQUEIDENTIFIER', defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
        Platform_ID: { type: DataTypes.STRING, allowNull: false },
        Product_Name: { type: DataTypes.STRING, allowNull: false }
    };

    // const options = {
    //     defaultScope: {
    //         // exclude password hash by default
    //         attributes: { exclude: ['passwordHash'] }
    //     },
    //     scopes: {
    //         // include hash with this scope
    //         withHash: { attributes: {}, }
    //     }
    // };

    return sequelize.define('Products', attributes);
}