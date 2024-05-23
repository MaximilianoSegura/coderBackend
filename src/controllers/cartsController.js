const fs = require('fs');
const path = require('path');
const cartsFilePath = path.join(__dirname, '../data/carts.json');
const productsFilePath = path.join(__dirname, '../data/products.json');

const readCartsFile = () => {
    const data = fs.readFileSync(cartsFilePath, 'utf-8');
    return JSON.parse(data);
};

const writeCartsFile = (data) => {
    fs.writeFileSync(cartsFilePath, JSON.stringify(data, null, 2));
};

exports.createCart = (req, res) => {
    const carts = readCartsFile();
    const newCart = {
        id: (carts.length + 1).toString(),
        products: []
    };
    carts.push(newCart);
    writeCartsFile(carts);
    res.status(201).json(newCart);
};

exports.getCartById = (req, res) => {
    const carts = readCartsFile();
    const cart = carts.find(c => c.id === req.params.cid);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).send('Cart not found');
    }
};

exports.addProductToCart = (req, res) => {
    const carts = readCartsFile();
    const cart = carts.find(c => c.id === req.params.cid);
    if (!cart) {
        return res.status(404).send('Cart not found');
    }

    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const product = products.find(p => p.id === req.params.pid);
    if (!product) {
        return res.status(404).send('Product not found');
    }

    const productInCart = cart.products.find(p => p.product === req.params.pid);
    if (productInCart) {
        productInCart.quantity += 1;
    } else {
        cart.products.push({ product: req.params.pid, quantity: 1 });
    }

    writeCartsFile(carts);
    res.json(cart);
};
