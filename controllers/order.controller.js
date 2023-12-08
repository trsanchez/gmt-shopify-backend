var request = require('request-promise');
const storefrontAccessToken = process.env.STOREFRONT_ACCESS_TOKEN;
const shop = process.env.STORE_URL;
const apiVersion = process.env.STORE_APIVERSION;
const pageInfoService = require('../services/pageinfo.service');
const orderService = require('../services/order.service');
module.exports = {
    populateDB,
    getOrders
};

async function populateDB(req, res) {

    let url = shop + '/admin/api/' + apiVersion + '/orders.json?fields=id,line_items&limit=50';
    let pageInfoDB = await pageInfoService.getByEntity({entity: 'ORDERS'})
    let reqResponse = {
        totalRecords: 0, pageInfo: '' };
    if(pageInfoDB ) {
        url = url + `&page_info=${pageInfoDB.PageInfoKey}`;
    }

    var _include_headers = function (body, response, resolveWithFullResponse) {
        return { 'headers': response.headers, 'data': body };
    };

    let options = {
        method: 'GET',
        uri: url,
        json: true,
        transform: _include_headers,
        headers: {
            'X-Shopify-Access-Token': storefrontAccessToken,
            'content-type': 'application/json'
        }
    };

    let reqResult = await request(options);
    let linkHeader = reqResult.headers;
    let reqData = reqResult.data;
    console.log(reqData)
    let pageInfo = '';
    if (linkHeader["link"]) {
        let startPos = linkHeader["link"].indexOf('page_info=');
        let endPos = linkHeader["link"].indexOf('>;');
        if (startPos >= 0 && endPos >= 0) {
            pageInfo = linkHeader["link"].substring((startPos + 10), (endPos));
            await pageInfoService.create({entity: 'ORDERS', pageInfoLink: pageInfo});
        }
    }
    
    if(reqData) {
        reqData.orders.forEach(async element => {
            let saveResult = await orderService.create({
                id: element.id, line_items: element.line_items
            })
        });
        reqResponse.totalRecords = reqData.orders.length;
        reqResponse.pageInfo = pageInfo;
    }

    res.json(reqResponse);
}

async function getOrders(req, res, next) {
    orderService.getAll()
    .then(orders => res.json(orders))
    .catch(next);
}