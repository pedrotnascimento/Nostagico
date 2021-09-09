var express = require("express");
var router  = express.Router();
var bodyParser = require('body-parser');

var urlEncodedParser = bodyParser.urlencoded({extended:false});
var postRank = function(req, res, next){
    response = {
        text: req.body.rank,
        date: new Date().toUTCString()
    }
    console.log(response);
    res.end(JSON.stringify(response));
}

router.post("/", urlEncodedParser, postRank)

module.exports = router;