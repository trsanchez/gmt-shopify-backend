var express = require('express');
var router = express.Router();
var url = require('url');

/* GET home page. */
router.get('/', function (req, res, next) {

	res.json({ status: "success", message: "Parcel Pending API", data: { "version_number": "v1.0.0" } });
});

module.exports = router;