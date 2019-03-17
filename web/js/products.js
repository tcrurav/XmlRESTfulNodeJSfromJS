//See following links:
//https://www.w3schools.com/xml/xml_parser.asp

window.onload = initialize;

function initialize() {
    downloadAllProducts();
    document.getElementById("form-product").addEventListener("submit", createProduct);
}

function validatedProduct(event) {
    let name = event.target.name.value;
    let price = event.target.price.value;

    let error = false;
    document.getElementById("error-price-required").style.display = "none";
    document.getElementById("error-price-format").style.display = "none";
    document.getElementById("error-name").style.display = "none";

    if (!name) {
        document.getElementById("error-name").style.display = "block";
        error = true;
    }

    if (!price) {
        document.getElementById("error-price-required").style.display = "block";
        error = true;
    } else if (!validateEuros(price)) {
        document.getElementById("error-price-format").style.display = "block";
        error = true;
    }

    return !error;
}

function validateEuros(numStr) {
    var regex = /^\d+$|^\d+\.\d{0,2}$/;
    return regex.test(numStr);
}

function createProduct(event) {
    event.preventDefault();

    if (validatedProduct(event)) {
        var request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:1337/products', true);
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                downloadAllProducts();
            }
        };
        request.setRequestHeader('Content-Type', 'text/xml');
        request.send('<?xml version="1.0" encoding="UTF-8"?>' +
            '<products>' +
            '<product>' +
            '<name>' + event.target.name.value + '</name>' +
            '<price>' + event.target.price.value + '</price>' +
            '</product>' +
            '</products>'
        );
        event.target.reset();
    }
}

function downloadAllProducts() {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:1337/products', true);
    request.onload = function () {

        console.log(this.response);

        // Begin accessing JSON data here
        showAllProducts(this.response);
        document.getElementById("show_all").click();
    }
    request.send();
}

function showAllProducts(data) {

    parser = new DOMParser();
    xmlData = parser.parseFromString(data, "text/xml");

    let xmlProducts = xmlData.getElementsByTagName("product");

    console.log(xmlProducts);
    console.log(xmlProducts[0]);
    console.log(xmlProducts[0].childNodes[0].childNodes[0]);


    let result = "";

    for (var i = 0; i < xmlProducts.length; i++) {
        result +=
            '<div class="card mt-2">' +
            '<div class="card-body">' +
            '<h4 class="card-title">' + xmlProducts[i].childNodes[0].childNodes[0].data + '</h4>' +
            '<p class="card-text">' + xmlProducts[i].childNodes[1].childNodes[0].data + '€</p>' +
            '</div>' +
            '</div>';
    }

    document.getElementById("products_show").innerHTML = result;
}