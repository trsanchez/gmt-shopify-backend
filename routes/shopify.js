var express = require('express');
var router = express.Router();
var request = require('request-promise');
const ProductController = require('../controllers/product.controller')
const OrderController = require('../controllers/order.controller')
const storefrontAccessToken = process.env.STOREFRONT_ACCESS_TOKEN;
const shop = process.env.STORE_URL;
const apiVersion = process.env.STORE_APIVERSION;

/* GET home page. */
router.get('/products', async function (req, res, next) {

    let url = shop + '/admin/api/' + apiVersion + '/products.json?fields=id,title&limit=3';
   
    var _include_headers = function(body, response, resolveWithFullResponse) {
        return {'headers': response.headers, 'data': body};
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

    request(options)
        .then(function (parsedBody) {
            let linkHeader = parsedBody.headers;
            if(linkHeader["link"]) {
                console.log(linkHeader["link"]);
                let startPos = linkHeader["link"].indexOf('page_info=');
                let endPos =  linkHeader["link"].indexOf('>;');
                if(startPos >= 0 && endPos >= 0) {
                    console.log(linkHeader["link"].substring((startPos + 10), (endPos)));
                }
            }
            console.log(parsedBody.data);
            res.json(parsedBody.data);
        })
        .catch(function (err) {
            console.log(err);
            res.json(err);
        });


});

router.get('/products/populate', ProductController.populateDB);
router.get('/orders/populate', OrderController.populateDB);
router.get('/products/getProducts', ProductController.getProducts);
router.get('/orders/getOrders', OrderController.getOrders);

module.exports = router;