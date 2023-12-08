const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        PageInfo_ID: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        PageInfoKey: { type: DataTypes.STRING, allowNull: false },
        EntityName: { type: DataTypes.STRING, allowNull: false },
    };

    return sequelize.define('PageInfos', attributes);
}