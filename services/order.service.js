const { to, TE } = require('./utils');
const db = require('./db');

module.exports = {
    create,
    getAll
};

async function create(params) {
    const currentOrder = await db.Order.findOne({where: {Platform_ID: params.id}})
    if(currentOrder) return;
    
    const newOrder = new db.Order({
        Platform_ID: params.id
    })

    await newOrder.save();
    params.line_items.forEach(async element => {
        let currentProduct = await db.Product.findOne({where: {Platform_ID: element.id}});
        let prodID = null;
        if(currentProduct) prodID = currentProduct.Product_ID;
        let newOrderProduct = new db.OrderProducts({
            Order_ID: newOrder.Order_ID,
            Product_ID: prodID,
            ProductPlatform_ID: element.id
        })
        await newOrderProduct.save();
    })
}

async function getAll() {
    return await db.Order.findAll({
        attributes: [['Order_ID', 'id'], // Product_ID AS id
        ['Platform_ID', 'platform_id']],
        include: { model: db.OrderProducts, as: 'line_items', attributes: [['Product_ID', 'product_id']]} 
      });
}