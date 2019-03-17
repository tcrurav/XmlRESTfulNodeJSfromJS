//Help found in following links:
//https://github.com/libxmljs/libxmljs/wiki
//https://www.npmjs.com/package/xsd-schema-validator
//https://github.com/remind101/express-xml-bodyparser

var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    xmlparser = require('express-xml-bodyparser');

var cors = require('cors');
app.use(cors());

// .. other middleware ... 
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(xmlparser());
// ... other middleware ... 

var validator = require('xsd-schema-validator');
var schemaPath = "xsd/products.xsd";

var libxmljs = require("libxmljs");

//In a more real case this information would be stored in a DB
var products = '<?xml version="1.0" encoding="UTF-8"?><products></products>';

app.get('/products', function (req, res, next) {
    res.set('application/xml').send(products);
});

app.post('/products', function (req, res, next) {
    // req.body contains the parsed xml
    var reqRawBody = req.rawBody;

    validator.validateXML(reqRawBody, schemaPath, function (err, result) {
        if (err) {
            console.log(err);
            //throw err;
            res.set('application/xml').send(`<response>Error</response>`);
            return;
        }
        console.log(result);

        var xmlProducts = libxmljs.parseXml(products);
        var xmlReqRawBody = libxmljs.parseXml(reqRawBody);

        var gProducts = xmlProducts.get('//products');
        var gNewProducts = xmlReqRawBody.get('//product');
        gProducts.addChild(gNewProducts);

        products = gProducts.toString();

        res.set('application/xml').send(`<response>Added!</response>`);
    });
});

server.listen(1337);