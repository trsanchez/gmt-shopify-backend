const { to, ReE, ReS } = require('../services/utils');
var request = require('request-promise');
const storefrontAccessToken = process.env.STOREFRONT_ACCESS_TOKEN;
const shop = process.env.STORE_URL;
const apiVersion = process.env.STORE_APIVERSION;
const pageInfoService = require('../services/pageinfo.service');
const productService = require('../services/product.service');
module.exports = {
    populateDB,
    getProducts,
};

async function populateDB(req, res, next) {

    let url = shop + '/admin/api/' + apiVersion + '/products.json?fields=id,title&limit=50';
    let pageInfoDB = await pageInfoService.getByEntity({entity: 'PRODUCTS'})
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
    let pageInfo = '';
    if (linkHeader["link"]) {
        let startPos = linkHeader["link"].indexOf('page_info=');
        let endPos = linkHeader["link"].indexOf('>;');
        if (startPos >= 0 && endPos >= 0) {
            pageInfo = linkHeader["link"].substring((startPos + 10), (endPos));
            await pageInfoService.create({entity: 'PRODUCTS', pageInfoLink: pageInfo});
        }
    }
    
    if(reqData) {
        reqData.products.forEach(async element => {
            let saveResult = await productService.create({
                id: element.id, title: element.title
            })
        });
        reqResponse.totalRecords = reqData.products.length;
        reqResponse.pageInfo = pageInfo;
    }

    res.json(reqResponse);
}

async function getProducts(req, res, next) {
    productService.getAll()
    .then(products => res.json(products))
    .catch(next);
}