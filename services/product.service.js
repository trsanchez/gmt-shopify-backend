const { to, TE } = require('./utils');
const db = require('./db');

module.exports = {
    create, 
    getAll,
};

async function create(params) {
    const currentProduct = await db.Product.findOne({where: {Platform_ID: params.id}})
    const newProduct = new db.Product({
        Platform_ID: params.id,
        Product_Name: params.title
    })

    if(currentProduct) {
        currentProduct.Product_Name = params.title;
        await currentProduct.save();
        return 0;
    } else {
        await newProduct.save();
        return 1;
    }
}

async function getAll() {
    return await db.Product.findAll({
        attributes: [['Product_ID', 'id'], // Product_ID AS id
        ['Platform_ID', 'platform_id'],
        ['Product_Name', 'name']] 
      });
}