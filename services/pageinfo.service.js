const { to, TE } = require('./utils');
const { Op } = require("sequelize");
const db = require('./db');

module.exports = {
    getByEntity,
    create
};

async function getByEntity(params) {
    let pageInfo;
    pageInfo = await db.PageInfo.findOne({where: { EntityName: params.entity}});
    return pageInfo;
}

async function create(params) {
    let pageInfo;
    pageInfo = await db.PageInfo.findOne({where: { EntityName: params.entity}});
    const newPageInfo = new db.PageInfo({
        PageInfoKey: params.pageInfoLink,
        EntityName: params.entity
    })

    if(pageInfo) {
        // await pageInfo.Update({PageInfoKey: params.pageInfoLink})
        pageInfo.PageInfoKey = params.pageInfoLink;
        await pageInfo.save();
    } else {
        await newPageInfo.save();
    }
}