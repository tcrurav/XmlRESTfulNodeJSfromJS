# NodeJS RESTFul XML accessing from JS Example

It's just that: an API and a client which send/receive XML data. 

It's quite rare nowadays because in most cases you just send/receive JSON data instead of XML.

In the "api" directory you will find the API made with NodeJS, libxmljs, xsd-schema-validator and express-xml-bodyparser.

In the "web" directory you will find the client, just pure HTML, CSS and JavaScript, using AJAX.

This example is nothing special. The client can:
* Create new products with name and price.
* Show all available products.

### Prerequisites

Before starting you need some background on NodeJS and JavaScript. Check the links bellow.

To install this project you need a working NodeJS environment. Again see the links bellow...

### Installing

Open a command line console and clone this project.

```
git clone https://github.com/tcrurav/XmlRESTfulNodeJSfromJS
```

Go to the new created directory

```
cd XmlRESTfulNodeJSfromJS
```

Go to the api directory

```
cd api
```

Install all dependencies

```
npm install
```

Boot your API

```
node index.js
```

Test the project with a browser

```
open your favourite browser with the file XmlRESTfulNodeJSfromJS/web/index.html
```

### XML and XSD files 

An example of XML file sent from client to web service to create a new product:

```
<?xml version="1.0" encoding="UTF-8"?>
<products>
    <product>
        <name>Samsung S7</name>
        <price>352</price>
    </product>
</products>
```

An example of XML file stored in the Server:

```
<?xml version="1.0" encoding="UTF-8"?>
<products>
    <product>
        <name>Samsung Galaxy S10 Dual</name>
        <price>1003</price>
    </product>
    <product>
        <name>LG V30 LTE 64GB H930 Plata</name>
        <price>334</price>
    </product>
    <product>
        <name>Samsung Galaxy A6 Plus</name>
        <price>239</price>
    </product>
</products>
```

XSD file in Server:

```
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">  
    <xs:element name="products">
        <xs:complexType>
            <xs:sequence>
                <xs:element name="product" type="productType" maxOccurs="unbounded"/>
            </xs:sequence>
        </xs:complexType>
    </xs:element>
    <xs:complexType name="productType">
        <xs:sequence>
            <xs:element name="name" type="xs:string"/>
            <xs:element name="price" type="xs:decimal"/>
        </xs:sequence>                        
    </xs:complexType>
</xs:schema>
```


## Built With

* [NodeJS](https://nodejs.org/es/) - Node.js un entorno de ejecución para JavaScript
* [libxmljs](https://github.com/libxmljs/libxmljs) - LibXML bindings for node.js.
* [xsd-schema-validator](https://www.npmjs.com/package/xsd-schema-validator) - Allows XML validation with an XML Schema.
* [express-xml-bodyparser](https://github.com/remind101/express-xml-bodyparser) - For those rare cases when you have to parse incoming raw xml-body requests. This middleware works with any connect- or express-based nodejs application.
* [AJAX](https://www.w3schools.com/js/js_ajax_intro.asp) - Allows an HTML client to read, update, create and detele data from a web service.

## Acknowledgments

* https://gist.github.com/PurpleBooth/109311bb0361f32d87a2#file-readme-template-md. A very good Readme.md template.