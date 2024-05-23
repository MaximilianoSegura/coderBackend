const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');

const readProductsFile = () => {
    const data = fs.readFileSync(productsFilePath, 'utf-8');
    return JSON.parse(data);
};

const writeProductsFile = (data) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(data, null, 2));
};

exports.getAllProducts = (req, res) => {
    const products = readProductsFile();
    const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
    res.json(products.slice(0, limit));
};

exports.getProductById = (req, res) => {
    const products = readProductsFile();
    const product = products.find(p => p.id === req.params.pid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
};

exports.addProduct = (req, res) => {
    const products = readProductsFile();
    const newProduct = {
        id: (products.length + 1).toString(),
        ...req.body,
        status: req.body.status !== undefined ? req.body.status : true
    };
    products.push(newProduct);
    writeProductsFile(products);
    res.status(201).json(newProduct);
};

exports.updateProduct = (req, res) => {
    const products = readProductsFile();
    const productIndex = products.findIndex(p => p.id === req.params.pid);
    if (productIndex === -1) {
        return res.status(404).send('Product not found');
    }
    const updatedProduct = { ...products[productIndex], ...req.body };
    products[productIndex] = updatedProduct;
    writeProductsFile(products);
    res.json(updatedProduct);
};

exports.deleteProduct = (req, res) => {
    let products = readProductsFile();
    products = products.filter(p => p.id !== req.params.pid);
    writeProductsFile(products);
    res.status(204).send();
};
