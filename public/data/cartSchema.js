var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
    image: String,
    product: String,
    brand: String,
    price: Number
});

var CartModel = mongoose.model('CartModel', cartSchema);

module.exports = CartModel;
